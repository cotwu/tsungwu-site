// Static site generator for tsungwu.tw — zero framework.
// content/{en,zh}/**/*.md  →  personal-site/{en,zh}/<path>/index.html
// Every page is fully rendered at build time so crawlers and AI see real content.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, copyFileSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { marked } from "marked";
import { execSync } from "node:child_process";

const SITE = "https://tsungwu.tw";
const OUT = "personal-site";
const LANGS = {
  en: { htmlLang: "en", hreflang: "en", label: "EN", locale: "en_US", brand: "Tsung-Ta Wu, MD",
        nav: [["/en/concepts/", "Concepts"], ["/en/research/", "Research"], ["/en/blog/", "Blog"], ["/en/about/", "About"]],
        dateLocale: "en-GB", readMore: "All posts",
        footer: "Revised as the evidence moves." },
  zh: { htmlLang: "zh-Hant", hreflang: "zh-Hant", label: "中文", locale: "zh_TW", brand: "吳宗達 Tsung-Ta Wu, MD",
        nav: [["/zh/concepts/", "概念"], ["/zh/research/", "研究"], ["/zh/blog/", "Blog"], ["/zh/about/", "關於"]],
        dateLocale: "zh-TW", readMore: "全部文章",
        footer: "隨證據更新而改寫。" },
};

// `## Heading {#id}` → <h2 id="id">
const renderer = {
  heading({ tokens, depth }) {
    let text = this.parser.parseInline(tokens);
    let id = "";
    const m = text.match(/\s*\{#([\w-]+)\}\s*$/);
    if (m) { id = m[1]; text = text.slice(0, m.index); }
    return `<h${depth}${id ? ` id="${id}"` : ""}>${text}</h${depth}>\n`;
  },
  table({ header, rows }) {
    const cell = (c, tag) => `<${tag}>${this.parser.parseInline(c.tokens)}</${tag}>`;
    const thead = `<tr>${header.map((c) => cell(c, "th")).join("")}</tr>`;
    const tbody = rows.map((r) => `<tr>${r.map((c) => cell(c, "td")).join("")}</tr>`).join("");
    return `<div class="table-wrap"><table><thead>${thead}</thead><tbody>${tbody}</tbody></table></div>\n`;
  },
};
marked.use({ gfm: true, renderer });

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: raw.slice(m[0].length) };
}

const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

// Home: sections split on `## `; "Tracks" bullets are `Title | /url/ | description`
function latestEntries(lang) {
  const items = [];
  for (const sub of ["blog", "concepts"]) {
    const dir = join("content", lang, sub);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "index.md")) {
      const file = join(dir, f);
      const { meta } = parseFrontmatter(readFileSync(file, "utf8"));
      const date = meta.date || gitDate(file);
      items.push({ title: meta.title, url: `/${lang}/${sub}/${f.replace(/\.md$/, "")}/`, date, kind: sub });
    }
  }
  return items.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
}

function renderHome(lang, meta, body) {
  const sections = body.split(/^## /m).filter((s) => s.trim());
  let html = `      <section class="hero">
        <p class="kicker">${esc(meta.kicker || "")}</p>
        <h1>${esc(meta.title)}</h1>
        <p class="lede">${esc(meta.lede || "")}</p>
        <p class="question">${esc(meta.question || "")}</p>
      </section>\n`;
  for (const s of sections) {
    const nl = s.indexOf("\n");
    const heading = s.slice(0, nl).trim();
    const rest = s.slice(nl + 1);
    const bullets = rest.split("\n").filter((l) => l.startsWith("- ") && l.includes(" | "));
    if (bullets.length) {
      const items = bullets.map((l) => {
        const [t, url, d] = l.slice(2).split("|").map((x) => x.trim());
        return `<li><h3><a href="${url}">${marked.parseInline(t)}</a></h3><p>${marked.parseInline(d || "")}</p></li>`;
      }).join("\n");
      html += `      <section><h2>${esc(heading)}</h2><ul class="tracks">\n${items}\n</ul></section>\n`;
    } else if (/^latest$|^最新$/i.test(heading)) {
      const kindLabel = { blog: lang === "zh" ? "Blog" : "Blog", concepts: lang === "zh" ? "概念" : "Concept" };
      const list = latestEntries(lang).map((e) => `<li><a href="${e.url}">${esc(e.title)}</a><span class="date">${kindLabel[e.kind]} · ${fmtDate(lang, e.date)}</span></li>`).join("\n");
      html += `      <section><h2>${esc(heading)}</h2><div class="featured">${marked.parse(rest)}</div><ul class="posts compact">\n${list}\n</ul></section>\n`;
    } else {
      html += `      <section><h2>${esc(heading)}</h2>${marked.parse(rest)}</section>\n`;
    }
  }
  return html;
}

function layout({ lang, path, meta, main, head = "" }) {
  const L = LANGS[lang];
  const url = `/${lang}/${path}`;
  const has = (l) => l === lang || (EXISTS[l] && EXISTS[l].has(path));
  const alt = (l) => `${SITE}/${l}/${path}`;
  const langsHere = Object.keys(LANGS).filter(has);
  const alternates = langsHere.map((l) => `    <link rel="alternate" hreflang="${LANGS[l].hreflang}" href="${alt(l)}" />`).join("\n");
  // fall back to the section index (or home) when the page has no counterpart in that language
  const fallback = (l) => { const seg = path.split("/")[0]; return has(l) ? `/${l}/${path}` : (seg && EXISTS[l].has(`${seg}/`) ? `/${l}/${seg}/` : `/${l}/`); };
  const switcher = Object.keys(LANGS).map((l) =>
    `<a${l === lang ? ' class="active" aria-current="true"' : ""} href="${fallback(l)}" hreflang="${LANGS[l].hreflang}" lang="${LANGS[l].htmlLang}">${LANGS[l].label}</a>`).join("");
  const xDefault = has("en") ? alt("en") : `${SITE}${url}`;
  const nav = L.nav.map(([href, label]) => `<a href="${href}"${url.startsWith(href) ? ' aria-current="page"' : ""}>${label}</a>`).join("\n        ");
  const title = path === "" ? meta.title : `${meta.title} · ${L.brand}`;
  return `<!doctype html>
<html lang="${L.htmlLang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(meta.description || "")}" />
    <link rel="canonical" href="${SITE}${url}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${xDefault}" />
    <meta property="og:type" content="${/^(concepts|blog)\//.test(path) ? "article" : "website"}" />
    <meta property="og:site_name" content="Tsung-Ta Wu, MD" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(meta.description || "")}" />
    <meta property="og:url" content="${SITE}${url}" />
    <meta property="og:locale" content="${L.locale}" />
    <meta name="twitter:card" content="summary" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Inter:wght@400;500;600&family=Noto+Serif+TC:wght@500;600&family=Noto+Sans+TC:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/styles.css" />
    ${head}
  </head>
  <body>
    <header class="site-header">
      <div class="wrap">
        <a class="brand" href="/${lang}/">${L.brand}</a>
        <nav class="nav">
        ${nav}
        </nav>
        <div class="lang" role="group" aria-label="Language">${switcher}</div>
      </div>
    </header>

    <main class="wrap">
${main}
    </main>

    <footer>
      <div class="wrap">
        <span>© ${new Date().getFullYear()} ${L.brand}</span>
        <span>${L.footer}</span>
      </div>
    </footer>
  </body>
</html>
`;
}

function* walk(dir) {
  for (const f of readdirSync(dir).sort()) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (f.endsWith(".md")) yield p;
  }
}

const AUTHOR = { en: "Tsung-Ta Wu, MD", zh: "吳宗達" };

// last commit date (YYYY-MM-DD) of a content file; falls back to today for uncommitted files
function gitDate(file) {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${file}"`, { encoding: "utf8" }).trim();
    if (out) return out;
  } catch {}
  return new Date().toISOString().slice(0, 10);
}

function jsonLd(lang, meta, url, kind) {
  const d = {
    "@context": "https://schema.org",
    "@type": kind,
    headline: meta.title,
    description: meta.description || "",
    inLanguage: LANGS[lang].htmlLang,
    url: SITE + url,
    author: { "@type": "Person", name: "Tsung-Ta Wu", alternateName: "吳宗達", url: SITE + "/en/about/" },
  };
  if (meta.date) d.datePublished = meta.date;
  if (meta.updated) d.dateModified = meta.updated;
  return `<script type="application/ld+json">${JSON.stringify(d)}</script>`;
}

function fmtDate(lang, iso) {
  if (!iso) return "";
  return new Date(iso + "T00:00:00Z").toLocaleDateString(LANGS[lang].dateLocale, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

function readPosts(lang) {
  const dir = join("content", lang, "blog");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "index.md")
    .map((f) => {
      const { meta } = parseFrontmatter(readFileSync(join(dir, f), "utf8"));
      return { ...meta, url: `/${lang}/blog/${f.replace(/\.md$/, "")}/` };
    })
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

function pathOf(lang, file) {
  const rel = relative(join("content", lang), file).replace(/\.md$/, "").split(sep).join("/");
  return rel === "index" ? "" : `${rel.replace(/\/index$/, "")}/`;
}

function buildPage(lang, file) {
  const rel = relative(join("content", lang), file).replace(/\.md$/, "").split(sep).join("/");
  const path = pathOf(lang, file);
  const { meta, body } = parseFrontmatter(readFileSync(file, "utf8"));
  const isArticle = /^(concepts|blog)\//.test(path);
  if (isArticle) meta.updated = gitDate(file);
  const byline = (label) => `<span class="byline">${esc(label)}</span>`;
  const revised = lang === "zh" ? "最後修訂" : "Last revised";
  let main;
  if (meta.layout === "home") {
    main = renderHome(lang, meta, body);
  } else if (meta.layout === "blog") {
    const posts = readPosts(lang);
    const list = posts.map((p) => {
      const thumb = p.cover ? `<a class="post-thumb" href="${p.url}" aria-hidden="true" tabindex="-1"><img src="${esc(p.cover)}" alt="" loading="lazy"></a>` : "";
      const meta = `<div class="post-meta"><span class="date">${fmtDate(lang, p.date)}</span>${p.description ? `<p>${esc(p.description)}</p>` : ""}</div>`;
      return `<li class="post-row"><a class="post-title" href="${p.url}">${esc(p.title)}</a><div class="post-body">${meta}${thumb}</div></li>`;
    }).join("\n");
    main = `      <article>\n${marked.parse(body)}\n      </article>\n      <ul class="posts">\n${list}\n      </ul>`;
  } else if (rel.startsWith("blog/")) {
    const parts = [byline(AUTHOR[lang]), fmtDate(lang, meta.date)];
    if (meta.origin) parts.push(esc(meta.origin));
    main = `      <p class="kicker">${parts.join(" · ")}</p>\n      <article>\n${marked.parse(body)}\n      </article>`;
  } else {
    const parts = [];
    if (meta.track) parts.push(esc(meta.track));
    if (isArticle) parts.push(byline(AUTHOR[lang]), `${revised} ${fmtDate(lang, meta.updated)}`);
    const kicker = parts.length ? `      <p class="kicker">${parts.join(" · ")}</p>\n` : "";
    // strip the hand-written "Last revised" footer line — the date is now automatic
    const cleaned = body.replace(/\n---\n\n\*(Entries on this site are revised|本站條目會隨證據更新)[^\n]*\*\n?$/, "\n");
    main = `${kicker}      <article>\n${marked.parse(cleaned)}\n      </article>`;
  }
  let head = isArticle ? jsonLd(lang, meta, `/${lang}/${path}`, path.startsWith("blog/") ? "BlogPosting" : "Article") : "";
  if (meta.cover) head += `\n    <meta property="og:image" content="${SITE}${esc(meta.cover)}" />`;
  const html = layout({ lang, path, meta, main, head });
  const dir = join(OUT, lang, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  return { lang, path, url: `/${lang}/${path}`, updated: meta.updated || meta.date };
}

// ---- build ----
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
copyFileSync("src/styles.css", join(OUT, "styles.css"));
if (existsSync("src/img")) {
  mkdirSync(join(OUT, "img"), { recursive: true });
  for (const f of readdirSync("src/img")) copyFileSync(join("src/img", f), join(OUT, "img", f));
}

const EXISTS = {};
for (const lang of Object.keys(LANGS)) {
  EXISTS[lang] = new Set();
  const dir = join("content", lang);
  if (!existsSync(dir)) continue;
  for (const f of walk(dir)) EXISTS[lang].add(pathOf(lang, f));
}

const pages = [];
for (const lang of Object.keys(LANGS)) {
  const dir = join("content", lang);
  if (!existsSync(dir)) continue;
  for (const f of walk(dir)) pages.push(buildPage(lang, f));
}

writeFileSync(join(OUT, "_redirects"), `/  /en/  301\n`);
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync(join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  pages.map((p) => {
    const alts = Object.keys(LANGS).filter((l) => EXISTS[l].has(p.path)).map((l) => `    <xhtml:link rel="alternate" hreflang="${LANGS[l].hreflang}" href="${SITE}/${l}/${p.path}"/>`).join("\n");
    const mod = p.updated ? `\n    <lastmod>${p.updated}</lastmod>` : "";
    return `  <url>\n    <loc>${SITE}${p.url}</loc>${mod}\n${alts}\n  </url>`;
  }).join("\n") + `\n</urlset>\n`);

console.log(`Built ${pages.length} pages → ${OUT}/`);
for (const p of pages) console.log("  " + p.url);

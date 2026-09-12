// Static site generator for tsungwu.tw — zero framework.
// content/{en,zh}/**/*.md  →  personal-site/{en,zh}/<path>/index.html
// Every page is fully rendered at build time so crawlers and AI see real content.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, copyFileSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { marked } from "marked";
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import { ogPng } from "./src/og.mjs";
import { Resvg } from "@resvg/resvg-js";

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

const H2_IDS = { Mechanism: "mechanism", Evidence: "evidence", "Open questions": "open-questions", "機制": "mechanism", "證據": "evidence", "未解問題": "open-questions" };
// `## Heading {#id}` → <h2 id="id">; plain h2s get an auto id
const renderer = {
  heading({ tokens, depth }) {
    let text = this.parser.parseInline(tokens);
    let id = "";
    const m = text.match(/\s*\{#([\w-]+)\}\s*$/);
    if (m) { id = m[1]; text = text.slice(0, m.index); }
    else if (depth === 2) {
      const plain = text.replace(/<[^>]+>/g, "").trim();
      id = H2_IDS[plain] || plain.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-|-$/g, "");
    }
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
    if (i > 0) {
      let v = line.slice(i + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      meta[line.slice(0, i).trim()] = v;
    }
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
  const zh = lang === "zh";
  const art = meta.hero ? `        <img class="hero-img" src="${esc(meta.hero)}" srcset="${esc(meta.hero)} 2400w, ${esc(meta.hero).replace("2400", "1400")} 1400w" sizes="(min-width: 1400px) 1400px, 100vw" alt="${esc(meta.heroAlt || "")}" fetchpriority="high" />\n` : "";
  let html = `      <section class="hero${meta.hero ? " hero-art" : ""}">
${art}        <div class="hero-text">
        <p class="kicker">${esc(meta.kicker || "")}</p>
        <h1>${esc(meta.title)}</h1>
        <p class="lede">${esc(meta.lede || "")}</p>
        <p class="question">${esc(meta.question || "")}</p>
        </div>
      </section>\n`;
  // two quiet lines under the question: a starting point, and proof of life
  const first = SEQUENCE[lang][0];
  const latest = [...readPosts(lang), ...latestEntries(lang).filter((e) => e.kind === "concepts")].sort((a, b) => b.date.localeCompare(a.date))[0];
  let lines = "";
  if (first && META[lang][first]) lines += `<p><span>${zh ? "從第一篇開始讀" : "Start with the first entry"}</span> → <a href="/${lang}/${first}">${esc(META[lang][first].title)}</a></p>\n`;
  if (latest) lines += `<p><span>${zh ? "最近更新" : "Latest"}</span> · ${fmtDate(lang, latest.date)} · <a href="${latest.url}">${esc(latest.title)}</a></p>\n`;
  if (lines) html += `      <section class="next">\n${lines}      </section>\n`;
  // any remaining hand-written sections in index.md still render below
  for (const s of body.split(/^## /m).filter((x) => x.trim())) {
    const nl = s.indexOf("\n"); const heading = s.slice(0, nl).trim(); const rest = s.slice(nl + 1);
    html += `      <section><h2>${esc(heading)}</h2>${marked.parse(rest)}</section>\n`;
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
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Inter:wght@400;500;600&family=Noto+Serif+TC:wght@500;600&family=Noto+Sans+TC:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="stylesheet" href="/styles.css?v=${CSS_HASH}" />
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

// ---- entity graph -------------------------------------------------------
// One Person node and one WebSite node, referenced by @id from every page, so search
// engines and AI systems can connect all pages to the same entity.
const PERSON_ID = `${SITE}/#person`;
const SITE_ID = `${SITE}/#website`;
const ORG_ID = `${SITE}/#affiliation`;
const WD = (q) => `https://www.wikidata.org/wiki/${q}`;
const ENTITIES = {
  Q5186699: "critical closing pressure", Q596579: "cardiac output", Q1759415: "pulse pressure",
  Q275419: "hypotension", Q488128: "Windkessel effect", Q3506185: "venous return curve",
  Q1642137: "hemodynamics", Q615057: "anesthesiology", Q126945: "medical education",
};
const personNode = () => ({
  "@type": "Person", "@id": PERSON_ID,
  name: "Tsung-Ta Wu", alternateName: "吳宗達", honorificSuffix: "MD",
  jobTitle: ["Attending anesthesiologist", "Intensivist", "Course director for undergraduate medical students"],
  worksFor: { "@id": ORG_ID }, affiliation: { "@id": ORG_ID },
  url: `${SITE}/en/about/`,
  sameAs: ["https://scholar.google.com/citations?user=6eNYe2QAAAAJ"],
  knowsAbout: ["Q1642137", "Q615057", "Q596579", "Q275419", "Q126945"].map((q) => ({ "@type": "Thing", name: ENTITIES[q], sameAs: WD(q) })),
});
const orgNode = () => ({
  "@type": "Hospital", "@id": ORG_ID,
  name: "National Taiwan University Hospital Hsinchu Branch", alternateName: "新竹台大分院",
  url: "https://www.hch.gov.tw/", sameAs: WD("Q123584454"),
  parentOrganization: { "@type": "Hospital", name: "National Taiwan University Hospital", sameAs: WD("Q1418766") },
});
const siteNode = () => ({
  "@type": "WebSite", "@id": SITE_ID, name: "Tsung-Ta Wu, MD", alternateName: "吳宗達 Tsung-Ta Wu, MD",
  url: `${SITE}/`, inLanguage: ["en", "zh-Hant"], author: { "@id": PERSON_ID }, publisher: { "@id": PERSON_ID },
});
function breadcrumb(lang, path, meta) {
  const L = LANGS[lang];
  const items = [{ name: L.nav.length ? (lang === "zh" ? "首頁" : "Home") : "Home", url: `${SITE}/${lang}/` }];
  const seg = path.split("/")[0];
  const section = L.nav.find(([href]) => href === `/${lang}/${seg}/`);
  if (section && path !== `${seg}/`) items.push({ name: section[1], url: `${SITE}${section[0]}` });
  if (path) items.push({ name: meta.title, url: `${SITE}/${lang}/${path}` });
  return { "@type": "BreadcrumbList", itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })) };
}
function jsonLd(lang, meta, path, kind) {
  const url = `${SITE}/${lang}/${path}`;
  const graph = [siteNode(), personNode(), orgNode()];
  const page = { "@id": url, url, name: meta.title, description: meta.description || "", inLanguage: LANGS[lang].htmlLang, isPartOf: { "@id": SITE_ID } };
  if (kind === "Article" || kind === "BlogPosting") {
    Object.assign(page, { "@type": kind, headline: meta.title, author: { "@id": PERSON_ID }, publisher: { "@id": PERSON_ID }, mainEntityOfPage: url });
    if (meta.date) page.datePublished = meta.date;
    if (meta.updated) page.dateModified = meta.updated;
    if (meta.cover) page.image = `${SITE}${meta.cover}`;
    if (meta.tags) page.keywords = meta.tags.split(/[,，]\s*/).map((t) => t.trim()).filter(Boolean);
    if (meta.about) page.about = meta.about.split(/[,\s]+/).filter(Boolean).map((q) => ({ "@type": "Thing", name: ENTITIES[q] || q, sameAs: WD(q) }));
  } else if (kind === "ProfilePage") {
    Object.assign(page, { "@type": "ProfilePage", mainEntity: { "@id": PERSON_ID } });
  } else if (kind === "CollectionPage") {
    Object.assign(page, { "@type": "CollectionPage" });
  } else {
    Object.assign(page, { "@type": "WebPage", about: { "@id": PERSON_ID } });
  }
  graph.push(page);
  if (path) graph.push(breadcrumb(lang, path, meta));
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>`;
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
  const isArticle = /^(concepts|blog)\/.+/.test(path);
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
    const band = meta.band ? `      <img class="band" src="${esc(meta.band)}" srcset="${esc(meta.band)} 2400w, ${esc(meta.band).replace("2400", "1400")} 1400w" sizes="(min-width: 800px) 760px, 100vw" alt="" />\n` : "";
    // strip the hand-written "Last revised" footer line — the date is now automatic
    const cleaned = body.replace(/\n---\n\n\*(Entries on this site are revised|本站條目會隨證據更新)[^\n]*\*\n?$/, "\n");
    let html = marked.parse(cleaned);
    let nav = "", pager = "";
    if (path.startsWith("concepts/") && isArticle) {
      // section links: Mechanism · Evidence · Open questions
      const h2s = [...html.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)].map((m) => `<a href="#${m[1]}">${m[2].replace(/<[^>]+>/g, "")}</a>`);
      if (h2s.length) nav = `      <nav class="sections" aria-label="${lang === "zh" ? "本頁章節" : "On this page"}">${h2s.join('<span aria-hidden="true">·</span>')}</nav>\n`;
      // previous / next entry in the track order
      const seq = SEQUENCE[lang], i = seq.indexOf(path);
      const link = (p, cls, label) => p ? `<a class="${cls}" href="/${lang}/${p}"><span>${label}</span>${esc(META[lang][p]?.title || p)}</a>` : "<span></span>";
      if (i >= 0) pager = `      <nav class="pager">${link(seq[i - 1], "prev", lang === "zh" ? "上一篇" : "Previous")}${link(seq[i + 1], "next", lang === "zh" ? "下一篇" : "Next")}</nav>\n`;
    }
    if (path === "concepts/") {
      // index: add each entry's one-line description under its link
      html = html.replace(new RegExp(`<li><a href="(/${lang}/concepts/[^"]+/)">(.*?)</a></li>`, "g"), (m, href, t) => {
        const d = META[lang][href.replace(`/${lang}/`, "")]?.description;
        return `<li><a href="${href}">${t}</a>${d ? `<span class="desc">${esc(d)}</span>` : ""}</li>`;
      });
    }
    main = `${kicker}${nav}      <article>\n${html}\n      </article>\n${pager}`;
    if (band) main = main.replace(/(<h1>.*?<\/h1>\n)/, `$1${band}`);
  }
  if (isArticle && path.startsWith("blog/") && !meta.tags) console.warn(`⚠ no tags: ${file}  (add "tags: a, b" to the frontmatter)`);
  const kind = isArticle ? (path.startsWith("blog/") ? "BlogPosting" : "Article")
    : path === "about/" ? "ProfilePage"
    : /^(concepts|blog|research)\/$/.test(path) ? "CollectionPage" : "WebPage";
  let head = jsonLd(lang, meta, path, kind);
  // Open Graph image: generated PNG per page (FB/LINE/X need a raster image)
  const ogName = `${lang}-${(path || "home").replace(/\/$/, "").replaceAll("/", "-")}.png`;
  const kicker = meta.track || (path.startsWith("blog/") ? "Blog" : path === "" ? (lang === "zh" ? "概念筆記" : "Concept notebook") : "");
  mkdirSync(join(OUT, "og"), { recursive: true });
  writeFileSync(join(OUT, "og", ogName), ogPng({ title: meta.title, kicker, lang, home: path === "" }));
  head += `\n    <meta property="og:image" content="${SITE}/og/${ogName}" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta name="twitter:image" content="${SITE}/og/${ogName}" />`;
  const html = layout({ lang, path, meta, main, head });
  const dir = join(OUT, lang, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  return { lang, path, url: `/${lang}/${path}`, updated: meta.updated || meta.date };
}

// ---- build ----
const CSS_HASH = createHash("md5").update(readFileSync("src/styles.css")).digest("hex").slice(0, 8);
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
copyFileSync("src/styles.css", join(OUT, "styles.css"));
// favicon: monogram, rendered from one SVG
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0f6e63"/><text x="32" y="45" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="40" fill="#fbfaf7">W</text></svg>`;
writeFileSync(join(OUT, "favicon.svg"), FAVICON_SVG);
writeFileSync(join(OUT, "favicon-32.png"), new Resvg(FAVICON_SVG, { fitTo: { mode: "width", value: 32 }, font: { loadSystemFonts: true } }).render().asPng());
writeFileSync(join(OUT, "apple-touch-icon.png"), new Resvg(FAVICON_SVG, { fitTo: { mode: "width", value: 180 }, font: { loadSystemFonts: true } }).render().asPng());
if (existsSync("src/img")) {
  mkdirSync(join(OUT, "img"), { recursive: true });
  for (const f of readdirSync("src/img")) copyFileSync(join("src/img", f), join(OUT, "img", f));
}

const EXISTS = {}, META = {};
for (const lang of Object.keys(LANGS)) {
  EXISTS[lang] = new Set(); META[lang] = {};
  const dir = join("content", lang);
  if (!existsSync(dir)) continue;
  for (const f of walk(dir)) {
    const p = pathOf(lang, f);
    EXISTS[lang].add(p);
    META[lang][p] = parseFrontmatter(readFileSync(f, "utf8")).meta;
  }
}
// ordered list of concept entries per language, taken from the hand-written index (content/<lang>/concepts.md)
const SEQUENCE = {};
for (const lang of Object.keys(LANGS)) {
  const f = join("content", lang, "concepts.md");
  SEQUENCE[lang] = existsSync(f) ? [...readFileSync(f, "utf8").matchAll(new RegExp(`\\]\\(/${lang}/(concepts/[^)]+/)\\)`, "g"))].map((m) => m[1]) : [];
}

const pages = [];
for (const lang of Object.keys(LANGS)) {
  const dir = join("content", lang);
  if (!existsSync(dir)) continue;
  for (const f of walk(dir)) pages.push(buildPage(lang, f));
}

// "/" is handled by the Pages Function in functions/index.js (language-aware 302); _redirects kept for future rules
writeFileSync(join(OUT, "_redirects"), "");
mkdirSync(join(OUT, "functions"), { recursive: true });
for (const f of readdirSync("src/functions")) copyFileSync(join("src/functions", f), join(OUT, "functions", f));
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

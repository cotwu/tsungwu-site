// Static site generator for tsungwu.tw — zero framework.
// content/{en,zh}/*.md  →  personal-site/{en,zh}/<slug>/index.html
// Every page is fully rendered HTML at build time so crawlers and AI see real content.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, copyFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { marked } from "marked";

const SITE = "https://tsungwu.tw";
const OUT = "personal-site";
const LANGS = {
  en: { htmlLang: "en", hreflang: "en", label: "EN", nav: { home: "Home", about: "About", concepts: "Concepts" }, name: "Tsung-Ta Wu, MD" },
  zh: { htmlLang: "zh-Hant", hreflang: "zh-Hant", label: "中文", nav: { home: "首頁", about: "關於", concepts: "概念" }, name: "吳宗達 Tsung-Ta Wu, MD" },
};

marked.use({ gfm: true });

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

const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

// "- Title | description" bullets → card grid (same convention as the old focus.md)
function renderHome(body) {
  const lines = body.split("\n");
  const introLines = [], cards = [];
  let heading = "";
  let inCards = false;
  for (const line of lines) {
    if (line.startsWith("## ")) { heading = line.slice(3).trim(); inCards = true; continue; }
    if (inCards && line.startsWith("- ")) {
      const [t, d = ""] = line.slice(2).split("|").map((x) => x.trim());
      cards.push(`<article class="project"><h3>${marked.parseInline(t)}</h3><p>${marked.parseInline(d)}</p></article>`);
      continue;
    }
    if (!inCards) introLines.push(line);
  }
  return { intro: marked.parse(introLines.join("\n")), heading, cards: cards.join("") };
}

function pageUrl(lang, slug) {
  return slug === "index" ? `/${lang}/` : `/${lang}/${slug}/`;
}

function layout({ lang, slug, meta, main }) {
  const L = LANGS[lang];
  const url = pageUrl(lang, slug);
  const alternates = Object.keys(LANGS)
    .map((l) => `    <link rel="alternate" hreflang="${LANGS[l].hreflang}" href="${SITE}${pageUrl(l, slug)}" />`)
    .join("\n");
  const switcher = Object.keys(LANGS)
    .map((l) => `<a class="lang-btn${l === lang ? " active" : ""}" href="${pageUrl(l, slug)}" hreflang="${LANGS[l].hreflang}" lang="${LANGS[l].htmlLang}">${LANGS[l].label}</a>`)
    .join("");
  const title = slug === "index" ? meta.title : `${meta.title} · ${L.name}`;
  return `<!doctype html>
<html lang="${L.htmlLang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(meta.description || "")}" />
    <link rel="canonical" href="${SITE}${url}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${SITE}${pageUrl("en", slug)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Tsung-Ta Wu, MD" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(meta.description || "")}" />
    <meta property="og:url" content="${SITE}${url}" />
    <meta property="og:locale" content="${lang === "zh" ? "zh_TW" : "en_US"}" />
    <meta name="twitter:card" content="summary" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <div class="bg-grid" aria-hidden="true"></div>

    <header class="site-header">
      <a class="logo" href="/${lang}/">${L.name}</a>
      <nav>
        <a href="/${lang}/">${L.nav.home}</a>
        <a href="/${lang}/about/">${L.nav.about}</a>
      </nav>
      <div class="language-switch" role="group" aria-label="Language">${switcher}</div>
    </header>

    <main>
${main}
    </main>

    <footer>
      <p>© ${new Date().getFullYear()} ${L.name}</p>
    </footer>
  </body>
</html>
`;
}

function buildPage(lang, file) {
  const slug = basename(file, ".md");
  const { meta, body } = parseFrontmatter(readFileSync(file, "utf8"));
  let main;
  if (meta.layout === "home") {
    const { intro, heading, cards } = renderHome(body);
    main = `      <section class="hero">
        <p class="tag">${esc(meta.tag || "")}</p>
        <div class="markdown">
${intro}
        <p class="subtitle">${esc(meta.subtitle || "")}</p>
        </div>
      </section>
      <section class="card">
        <div class="markdown"><h2>${esc(heading)}</h2></div>
        <div class="project-grid">${cards}</div>
      </section>`;
  } else {
    main = `      <article class="card markdown">
${marked.parse(body)}
      </article>`;
  }
  const html = layout({ lang, slug, meta, main });
  const dir = join(OUT, lang, slug === "index" ? "" : slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  return { lang, slug, url: pageUrl(lang, slug) };
}

// ---- build ----
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
copyFileSync("src/styles.css", join(OUT, "styles.css"));

const pages = [];
for (const lang of Object.keys(LANGS)) {
  const dir = join("content", lang);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) pages.push(buildPage(lang, join(dir, f)));
}

// Root → English (301); Cloudflare Pages reads _redirects natively
writeFileSync(join(OUT, "_redirects"), `/  /en/  301\n`);
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    pages.map((p) => {
      const alts = Object.keys(LANGS).map((l) => `    <xhtml:link rel="alternate" hreflang="${LANGS[l].hreflang}" href="${SITE}${pageUrl(l, p.slug)}"/>`).join("\n");
      return `  <url>\n    <loc>${SITE}${p.url}</loc>\n${alts}\n  </url>`;
    }).join("\n") +
    `\n</urlset>\n`
);

console.log(`Built ${pages.length} pages → ${OUT}/`);
for (const p of pages) console.log("  " + p.url);

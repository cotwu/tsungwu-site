# tsungwu.tw

Static, bilingual (EN / 繁中) academic concept site. Every page is pre-rendered at build
time so search engines and AI crawlers see real content — no client-side fetching.

```
content/en/*.md   ← English source (single source of truth)
content/zh/*.md   ← Traditional Chinese translations
src/styles.css    ← stylesheet
build.mjs         ← generator: content → personal-site/{en,zh}/<slug>/index.html
personal-site/    ← build output, committed; Cloudflare Pages serves this folder as-is
```

## Commands

```bash
npm install        # once
npm run build      # regenerate personal-site/
npm run dev        # build + serve at http://localhost:8080
```

## Conventions

- File name = URL slug (`about.md` → `/en/about/`); `index.md` → `/en/`.
- Frontmatter: `title`, `description`; `layout: home` for the landing page.
- `/` redirects (301) to `/en/`; every page carries `hreflang` en / zh-Hant / x-default.
- Deploy: push `main` → Cloudflare Pages (root directory `personal-site`, no build command).

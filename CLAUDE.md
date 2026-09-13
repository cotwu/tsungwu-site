# CLAUDE.md — tsungwu.tw

Static bilingual (EN / zh-Hant) academic concept site. Technical layout and commands are in
`README.md`; this file records how the site owner wants content written and published.

## Start of every session

1. Read the newest handoff note (交班單) first:
   Dropbox `!!!!anesthesia/2. 個人網站/_交班單_<YYYY-MM-DD>.md`.
2. Before ending a session that changed anything, write a new 交班單 with the same naming.

## Build & deploy

- Content: `content/{en,zh}/**/*.md` → `node build.mjs` → `personal-site/` (committed).
- Push `main` = Cloudflare Pages deploy (~20 s, no build step on CF). Verify live with `curl`.
- Local preview: `.claude/launch.json` config `site` (port 8080).
- Blog posts need a `tags:` line in frontmatter; ask which tags to use before drafting.
  Existing tags: 麻醉安全, 衛教, 課後記錄, 個人品牌, 臺灣史, 臺北.

## Concept entries (EN is the source of truth, ZH is the translation)

- Fixed three-part structure: **Mechanism / Evidence / Open questions**. No other sections.
- Every citation carries a DOI, verified via Crossref or PubMed *before* publishing.
- Never publish a "my position" section, and do not volunteer the owner's unpublished
  arguments or interpretations.
- If the site owner is an author of a cited paper, add an author disclosure at the top.
- Workflow: propose outline + open decisions → owner rules → write EN and ZH → verify DOIs →
  build, commit, push → ask the owner to proofread every number.

## Blog posts the owner drafts (fact-check workflow)

- Fact-check every checkable claim and **report findings first** (table: error / verified /
  memoir-only). Never silently edit their prose; apply corrections only after they rule.
- Source lists pasted from other tools: open every link and confirm it supports the sentence.
- Source tiers: memoirs, gazetteers, government archives → historians' articles → Wikipedia as
  entry point only. Inline links prefer 國家文化記憶庫, 中研院 臺灣史研究所 年表, 總統府,
  二二八紀念館. End with a 資料來源 list of books; flag claims resting only on memoirs.
- Paragraphs the owner says were AI-drafted are the high-risk zone (dates, minor figures).
- When prose was changed, build and commit, then **ask before pushing**.
- Titles in question form; the `description` answers the question.
- Offer an EN version after the ZH post is live.

## Illustrations

- Owner supplies AI-generated images in Dropbox `!!!!anesthesia/2. 個人網站/Image/<MMDD 題目>/`
  (4:3, 1:1, 3:2; README inside). Do not crop. Resize with `sips -Z 1600` into `src/img/`;
  use the 3:2 as `cover` (becomes og:image).
- Caption every generated image: 「AI 生成的想像畫面，非史料照片」.
- Hero / site graphics: line illustration, off-white `#fbfaf7`, ink `#1c1f24`, teal `#0f6e63`,
  no text inside images, no medical-equipment clichés.

## Tone and wording

- Plain and modest. No boastful phrasing; no absolutes such as "as it must / 必然如此".
- No double em-dash ("——" / " — ") in prose: use a colon, comma, or a new sentence.
- Never criticise peers; write "evidence remains inconclusive", not "flawed".
- Do not name device manufacturers.
- Teaching is described as an interest, not a title.

## Working style

- Discuss before writing; the owner decides wording, structure and what goes public.
- Correctness over speed: a wrong date is worse than a late post.

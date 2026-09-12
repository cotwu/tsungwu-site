// Open Graph image generator: 1200×630 PNG per page (title + kicker + site name).
// Rendered from SVG with @resvg/resvg-js using system fonts (Georgia / Songti TC / PingFang TC).
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, existsSync } from "node:fs";

// hero artwork embedded as a data URI (resvg renders embedded raster images)
const HERO = existsSync("src/img/hero-2400.jpg") ? "data:image/jpeg;base64," + readFileSync("src/img/hero-2400.jpg").toString("base64") : null;
const HERO_RATIO = 2400 / 937;

const W = 1200, H = 630;
const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const cjk = (ch) => /[　-鿿＀-￯]/.test(ch);
const width = (s, size) => [...s].reduce((w, ch) => w + (cjk(ch) ? size : size * 0.52), 0);

// greedy wrap: break at spaces for Latin, anywhere for CJK
function wrap(text, size, max) {
  const lines = []; let line = "";
  const tokens = text.match(/[　-鿿＀-￯]|[^\s　-鿿＀-￯]+\s*|\s+/g) || [];
  for (const t of tokens) {
    if (width(line + t, size) > max && line) { lines.push(line.trimEnd()); line = t.trimStart(); } else line += t;
  }
  if (line.trim()) lines.push(line.trimEnd());
  return lines;
}

export function ogPng({ title, subtitle = "", kicker = "", site = "tsungwu.tw", lang = "en", home = false }) {
  const serif = lang === "zh" ? "Songti TC, PingFang TC, Georgia, serif" : "Georgia, Songti TC, serif";
  const sans = "PingFang TC, Helvetica Neue, Arial, sans-serif";
  let art = "";
  let textTop = 0, textBottom = H;  // vertical band available for text
  if (HERO && home) {
    // the whole card is the artwork, cropped to keep the waterfall and the child
    const ih = H, iw = Math.round(ih * HERO_RATIO); const ix = -Math.round(iw * 0.62 - 760);
    art = `<image href="${HERO}" x="${ix}" y="0" width="${iw}" height="${ih}"/>`;
  } else if (HERO) {
    // bottom band showing the artwork from ~40% to ~95% of its height (waterfall → shore → child → sea)
    const bandH = 300, ih = Math.round(bandH / 0.55), iw = Math.round(ih * HERO_RATIO);
    const ix = -(iw - W), iy = Math.round((H - bandH) - ih * 0.45);
    art = `<clipPath id="b"><rect x="0" y="${H - bandH}" width="${W}" height="${bandH}"/></clipPath><image clip-path="url(#b)" href="${HERO}" x="${ix}" y="${iy}" width="${iw}" height="${ih}"/>`;
    textBottom = H - bandH - 10;
  }
  if (home) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#fbfaf7"/>${art}</svg>`;
    return new Resvg(svg, { fitTo: { mode: "width", value: W }, font: { loadSystemFonts: true, defaultFontFamily: "Georgia" } }).render().asPng();
  }
  let size = 56, lines = wrap(title, size, W - 160);
  while (lines.length > 3 && size > 36) { size -= 6; lines = wrap(title, size, W - 160); }
  lines = lines.slice(0, 3);
  const lh = size * 1.25;
  const block = lines.length * lh;
  const startY = Math.round(textTop + 150 + (textBottom - textTop - 150 - block) / 2 + size * 0.8);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#fbfaf7"/>
  ${art}
  <rect x="0" y="0" width="14" height="${H}" fill="#0f6e63"/>
  <text x="80" y="110" font-family="${sans}" font-size="22" letter-spacing="4" fill="#0f6e63" font-weight="600">${esc(kicker.toUpperCase())}</text>
  ${lines.map((l, i) => `<text x="80" y="${startY + i * lh}" font-family="${serif}" font-size="${size}" font-weight="600" fill="#1c1f24">${esc(l)}</text>`).join("\n  ")}
  <text x="${W - 80}" y="110" text-anchor="end" font-family="${sans}" font-size="22" fill="#5d6470">${esc(lang === "zh" ? "吳宗達 Tsung-Ta Wu, MD · " : "Tsung-Ta Wu, MD · ")}${esc(site)}</text>
</svg>`;
  return new Resvg(svg, { fitTo: { mode: "width", value: W }, font: { loadSystemFonts: true, defaultFontFamily: "Georgia" } }).render().asPng();
}

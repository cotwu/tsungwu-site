// Open Graph image generator: 1200×630 PNG per page (title + kicker + site name).
// Rendered from SVG with @resvg/resvg-js using system fonts (Georgia / Songti TC / PingFang TC).
import { Resvg } from "@resvg/resvg-js";

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

export function ogPng({ title, subtitle = "", kicker = "", site = "tsungwu.tw", lang = "en" }) {
  const serif = lang === "zh" ? "Songti TC, PingFang TC, Georgia, serif" : "Georgia, Songti TC, serif";
  const sans = "PingFang TC, Helvetica Neue, Arial, sans-serif";
  let size = 64, lines = wrap(title, size, W - 160);
  while (lines.length > 3 && size > 40) { size -= 6; lines = wrap(title, size, W - 160); }
  lines = lines.slice(0, 4);
  const lh = size * 1.25;
  const subLines = subtitle ? wrap(subtitle, 30, W - 160).slice(0, 3) : [];
  const block = lines.length * lh + (subLines.length ? 24 + subLines.length * 44 : 0);
  const startY = Math.max(200, (H - block) / 2 + size * 0.8 - 20);
  const subY = startY + (lines.length - 1) * lh + 24 + 44;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#fbfaf7"/>
  <rect x="0" y="0" width="14" height="${H}" fill="#0f6e63"/>
  <text x="80" y="140" font-family="${sans}" font-size="24" letter-spacing="4" fill="#0f6e63" font-weight="600">${esc(kicker.toUpperCase())}</text>
  ${lines.map((l, i) => `<text x="80" y="${startY + i * lh}" font-family="${serif}" font-size="${size}" font-weight="600" fill="#1c1f24">${esc(l)}</text>`).join("\n  ")}
  ${subLines.map((l, i) => `<text x="80" y="${subY + i * 44}" font-family="${serif}" font-style="italic" font-size="30" fill="#5d6470">${esc(l)}</text>`).join("\n  ")}
  <text x="80" y="${H - 70}" font-family="${serif}" font-size="30" font-weight="600" fill="#1c1f24">${esc(lang === "zh" ? "吳宗達 Tsung-Ta Wu, MD" : "Tsung-Ta Wu, MD")}</text>
  <text x="${W - 80}" y="${H - 70}" text-anchor="end" font-family="${sans}" font-size="26" fill="#5d6470">${esc(site)}</text>
</svg>`;
  return new Resvg(svg, { fitTo: { mode: "width", value: W }, font: { loadSystemFonts: true, defaultFontFamily: "Georgia" } }).render().asPng();
}

// Google Search Console API helper (zero dependencies).
// Auth: service-account JSON at ~/.config/gsc/sa.json (never in the repo).
// Usage:
//   node scripts/gsc.mjs sites
//   node scripts/gsc.mjs sitemaps [siteUrl]
//   node scripts/gsc.mjs submit-sitemap [siteUrl]
//   node scripts/gsc.mjs inspect <pageUrl> [siteUrl]
//   node scripts/gsc.mjs query [days] [siteUrl]        (search analytics by page)
//   node scripts/gsc.mjs query-queries [days] [siteUrl] (search analytics by query)
import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";
import { homedir } from "node:os";

const SA = JSON.parse(readFileSync(`${homedir()}/.config/gsc/sa.json`, "utf8"));
const SITE = process.env.GSC_SITE || "sc-domain:tsungwu.tw"; // domain property; use "https://tsungwu.tw/" for a URL-prefix property
const SCOPE = "https://www.googleapis.com/auth/webmasters";
const b64 = (o) => Buffer.from(typeof o === "string" ? o : JSON.stringify(o)).toString("base64url");

async function token() {
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: SA.client_email, scope: SCOPE, aud: SA.token_uri, iat: now, exp: now + 3600 })}`;
  const sig = createSign("RSA-SHA256").update(unsigned).sign(SA.private_key, "base64url");
  const r = await fetch(SA.token_uri, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` }) });
  const j = await r.json();
  if (!j.access_token) throw new Error("token error: " + JSON.stringify(j));
  return j.access_token;
}

async function api(method, url, body) {
  const r = await fetch(url, { method, headers: { authorization: `Bearer ${await token()}`, "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const text = await r.text();
  let j; try { j = JSON.parse(text); } catch { j = { raw: text }; }
  if (!r.ok) throw new Error(`${r.status} ${method} ${url}\n${JSON.stringify(j, null, 2)}`);
  return j;
}

const enc = encodeURIComponent;
const [cmd, a1, a2] = process.argv.slice(2);
const out = (o) => console.log(JSON.stringify(o, null, 2));

switch (cmd) {
  case "sites": out(await api("GET", "https://www.googleapis.com/webmasters/v3/sites")); break;
  case "sitemaps": out(await api("GET", `https://www.googleapis.com/webmasters/v3/sites/${enc(a1 || SITE)}/sitemaps`)); break;
  case "submit-sitemap": {
    const site = a1 || SITE;
    await api("PUT", `https://www.googleapis.com/webmasters/v3/sites/${enc(site)}/sitemaps/${enc("https://tsungwu.tw/sitemap.xml")}`);
    console.log("submitted https://tsungwu.tw/sitemap.xml to", site); break;
  }
  case "inspect": {
    if (!a1) throw new Error("usage: inspect <pageUrl>");
    out(await api("POST", "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", { inspectionUrl: a1, siteUrl: a2 || SITE, languageCode: "zh-TW" })); break;
  }
  case "query": case "query-queries": {
    const days = Number(a1 || 28); const site = a2 || SITE;
    const d = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
    const dim = cmd === "query" ? "page" : "query";
    const r = await api("POST", `https://www.googleapis.com/webmasters/v3/sites/${enc(site)}/searchAnalytics/query`,
      { startDate: d(days + 2), endDate: d(2), dimensions: [dim], rowLimit: 50 });
    const rows = r.rows || [];
    if (!rows.length) { console.log(`no search data for the last ${days} days (normal for a new property)`); break; }
    console.log(`${dim.padEnd(60)} clicks  impr  ctr    pos`);
    for (const x of rows) console.log(`${x.keys[0].slice(0, 60).padEnd(60)} ${String(x.clicks).padStart(6)} ${String(x.impressions).padStart(5)} ${(x.ctr * 100).toFixed(1).padStart(5)}% ${x.position.toFixed(1).padStart(5)}`);
    break;
  }
  default: console.log("commands: sites | sitemaps | submit-sitemap | inspect <url> | query [days] | query-queries [days]");
}

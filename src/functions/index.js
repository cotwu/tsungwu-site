// Cloudflare Pages Function for "/" only: send the visitor to /zh/ or /en/.
// Signal 1: the browser's Accept-Language (what the person reads), highest-ranked zh vs en.
// Signal 2 (fallback when no header): request country TW / HK / MO → zh.
// 302 + no-store so the choice is re-evaluated every time; deep links are untouched.
export const onRequest = ({ request }) => {
  const header = request.headers.get("accept-language") || "";
  let zh = 0, en = 0;
  for (const part of header.split(",")) {
    const [tag, ...params] = part.trim().split(";");
    const q = Number((params.find((p) => p.trim().startsWith("q=")) || "q=1").split("=")[1]) || 0;
    if (/^zh/i.test(tag)) zh = Math.max(zh, q);
    else if (/^en/i.test(tag)) en = Math.max(en, q);
  }
  let target;
  if (zh || en) target = zh > en ? "/zh/" : "/en/";
  else target = ["TW", "HK", "MO"].includes(request.cf?.country) ? "/zh/" : "/en/";
  return new Response(null, { status: 302, headers: { Location: target, Vary: "Accept-Language", "Cache-Control": "no-store" } });
};

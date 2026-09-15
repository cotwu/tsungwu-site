// Host-based routing for self-contained sub-sites.
// <name>.tsungwu.tw is a Custom domain on the same Pages project; requests arriving with that
// host are served from /_sub/<name>/ (built from src/subsites/<name>/). Every other host passes through.
const SUBSITES = new Set(["qcdebriefing2606bjae"]);

export const onRequest = ({ request, env, next }) => {
  const url = new URL(request.url);
  const m = url.hostname.match(/^([a-z0-9-]+)\.tsungwu\.tw$/);
  if (!m || !SUBSITES.has(m[1])) return next();
  url.pathname = `/_sub/${m[1]}${url.pathname}`;
  return env.ASSETS.fetch(new Request(url.toString(), request));
};

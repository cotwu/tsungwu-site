const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const DEFAULT_LANG = "en";
const SUPPORTED_LANGS = new Set(["en", "zh"]);
const CURRENT_SCRIPT = document.currentScript;
const SCRIPT_SRC = CURRENT_SCRIPT ? CURRENT_SCRIPT.getAttribute("src") || "" : "";
const BASE_PATH = SCRIPT_SRC.startsWith("/")
  ? SCRIPT_SRC.replace(/\/[^/]*$/, "")
  : "";
const PATH_PREFIX =
  window.location.pathname.startsWith("/personal-site/") ||
  window.location.pathname === "/personal-site"
    ? "/personal-site"
    : "";

const UI_TEXT = {
  en: {
    htmlLang: "en",
    title: "Tsung-Ta Wu, MD | Anesthesiologist",
    description:
      "Anesthesiologist, Medical Educator, and Clinical Researcher at National Taiwan University Hospital, Hsinchu Branch.",
    logoName: "Tsung-Ta Wu, MD",
    navAbout: "About",
    navFocus: "Focus",
    navPublications: "Publications",
    navContact: "Contact",
    heroTag: "PERSONAL SITE",
    heroBtnAbout: "About Me",
    heroBtnContact: "Contact",
    loadError:
      "Content failed to load. Please run with a local server (not file://).",
  },
  zh: {
    htmlLang: "zh-Hant",
    title: "Tsung-Ta Wu, MD | 麻醉科醫師",
    description: "麻醉科醫師、醫學教育者與臨床研究者。",
    logoName: "吳宗達 Tsung-Ta Wu, MD",
    navAbout: "關於",
    navFocus: "專業重點",
    navPublications: "發表著作",
    navContact: "聯絡",
    heroTag: "個人網站",
    heroBtnAbout: "關於我",
    heroBtnContact: "聯絡",
    loadError: "內容載入失敗，請使用本機伺服器開啟（不要直接使用 file://）。",
  },
};

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function parseInline(text) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  const html = [];
  let paragraph = [];
  let listItems = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    html.push(`<p>${parseInline(escapeHtml(paragraph.join(" ")))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    html.push(`<ul>${listItems.join("")}</ul>`);
    listItems = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      html.push(`<h3>${parseInline(escapeHtml(line.slice(4)))}</h3>`);
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      html.push(`<h2>${parseInline(escapeHtml(line.slice(3)))}</h2>`);
      return;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      html.push(`<h1>${parseInline(escapeHtml(line.slice(2)))}</h1>`);
      return;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      listItems.push(`<li>${parseInline(escapeHtml(line.slice(2)))}</li>`);
      return;
    }

    paragraph.push(line);
  });

  flushParagraph();
  flushList();
  return html.join("\n");
}

function focusMarkdownToHtml(markdown) {
  const lines = markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const headingLine = lines.find((line) => line.startsWith("## "));
  const heading = headingLine ? headingLine.slice(3) : "Focus";

  const cards = lines
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2))
    .map((line) => {
      const [titleRaw, descRaw] = line.split("|").map((part) => part.trim());
      const title = titleRaw || "Focus";
      const description = descRaw || "";
      return `<article class="project"><h3>${parseInline(escapeHtml(title))}</h3><p>${parseInline(
        escapeHtml(description)
      )}</p></article>`;
    });

  return `<div class="markdown"><h2>${parseInline(
    escapeHtml(heading)
  )}</h2></div><div class="project-grid">${cards.join("")}</div>`;
}

function getStoredLang() {
  const value = localStorage.getItem("siteLanguage");
  return SUPPORTED_LANGS.has(value) ? value : DEFAULT_LANG;
}

function setStoredLang(lang) {
  localStorage.setItem("siteLanguage", lang);
}

function setLanguageButtonState(lang) {
  const enBtn = document.getElementById("lang-en");
  const zhBtn = document.getElementById("lang-zh");
  if (enBtn) enBtn.classList.toggle("active", lang === "en");
  if (zhBtn) zhBtn.classList.toggle("active", lang === "zh");
}

function applyUiText(lang) {
  const copy = UI_TEXT[lang] || UI_TEXT[DEFAULT_LANG];

  document.documentElement.lang = copy.htmlLang;
  document.title = copy.title;

  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.setAttribute("content", copy.description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", copy.title);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", copy.description);

  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute("content", copy.title);

  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) twitterDescription.setAttribute("content", copy.description);

  const navAbout = document.getElementById("nav-about");
  const navFocus = document.getElementById("nav-focus");
  const navPublications = document.getElementById("nav-publications");
  const navContact = document.getElementById("nav-contact");
  const heroTag = document.getElementById("hero-tag");
  const heroBtnAbout = document.getElementById("hero-btn-about");
  const heroBtnContact = document.getElementById("hero-btn-contact");
  const logo = document.getElementById("site-logo");
  const footerName = document.getElementById("footer-name");

  if (navAbout) navAbout.textContent = copy.navAbout;
  if (navFocus) navFocus.textContent = copy.navFocus;
  if (navPublications) navPublications.textContent = copy.navPublications;
  if (navContact) navContact.textContent = copy.navContact;
  if (heroTag) heroTag.textContent = copy.heroTag;
  if (heroBtnAbout) heroBtnAbout.textContent = copy.heroBtnAbout;
  if (heroBtnContact) heroBtnContact.textContent = copy.heroBtnContact;
  if (logo) logo.textContent = copy.logoName;
  if (footerName) footerName.textContent = copy.logoName;
}

async function loadSection(path, targetId, loadErrorText, formatter = markdownToHtml) {
  const target = document.getElementById(targetId);
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    const markdown = await response.text();
    if (target) target.innerHTML = formatter(markdown);
    return markdown;
  } catch (error) {
    if (target) {
      target.innerHTML = `<p><strong>${escapeHtml(
        loadErrorText
      )}</strong><br /><code>${escapeHtml(path)}</code></p>`;
    }
    console.error(error);
    return "";
  }
}

async function loadSectionWithFallback(paths, targetId, loadErrorText, formatter = markdownToHtml) {
  const uniquePaths = [...new Set(paths)];
  for (const path of uniquePaths) {
    try {
      const response = await fetch(path);
      if (!response.ok) continue;
      const markdown = await response.text();
      const target = document.getElementById(targetId);
      if (target) target.innerHTML = formatter(markdown);
      return markdown;
    } catch (error) {
      console.error(error);
    }
  }

  return loadSection(uniquePaths[0], targetId, loadErrorText, formatter);
}

async function loadLanguageContent(lang) {
  const copy = UI_TEXT[lang] || UI_TEXT[DEFAULT_LANG];
  const baseCandidates = [BASE_PATH, PATH_PREFIX, "", "/personal-site"];
  const filePaths = (name) => {
    if (lang === "en") {
      return baseCandidates.flatMap((base) => [
        `${base}/content/${lang}/${name}.md`,
        `${base}/content/${name}.md`,
      ]);
    }
    return baseCandidates.map((base) => `${base}/content/${lang}/${name}.md`);
  };

  await loadSectionWithFallback(filePaths("hero"), "hero-content", copy.loadError);
  await Promise.all([
    loadSectionWithFallback(filePaths("about"), "about-content", copy.loadError),
    loadSectionWithFallback(
      filePaths("focus"),
      "focus-content",
      copy.loadError,
      focusMarkdownToHtml
    ),
    loadSectionWithFallback(
      filePaths("publications"),
      "publications-content",
      copy.loadError
    ),
    loadSectionWithFallback(filePaths("contact"), "contact-content", copy.loadError),
  ]);

}

function setupRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function forceShowAllSections() {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("show"));
}

async function setLanguage(lang) {
  const normalizedLang = SUPPORTED_LANGS.has(lang) ? lang : DEFAULT_LANG;
  applyUiText(normalizedLang);
  setLanguageButtonState(normalizedLang);
  setStoredLang(normalizedLang);
  await loadLanguageContent(normalizedLang);
}

function bindLanguageSwitcher() {
  const enBtn = document.getElementById("lang-en");
  const zhBtn = document.getElementById("lang-zh");

  if (enBtn) enBtn.addEventListener("click", () => setLanguage("en"));
  if (zhBtn) zhBtn.addEventListener("click", () => setLanguage("zh"));
}

async function initContent() {
  setupRevealAnimation();
  bindLanguageSwitcher();

  const lang = getStoredLang();
  await setLanguage(lang);
}

initContent().catch((error) => {
  console.error(error);
  forceShowAllSections();
});

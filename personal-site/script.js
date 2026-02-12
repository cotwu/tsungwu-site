const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
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
  const heading = headingLine ? headingLine.slice(3) : "Professional Focus";

  const cards = lines
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2))
    .map((line) => {
      const [titleRaw, descRaw] = line.split("|").map((part) => part.trim());
      const title = titleRaw || "Focus";
      const description = descRaw || "";
      return `<article class="project"><h3>${parseInline(
        escapeHtml(title)
      )}</h3><p>${parseInline(escapeHtml(description))}</p></article>`;
    });

  return `<div class="markdown"><h2>${parseInline(
    escapeHtml(heading)
  )}</h2></div><div class="project-grid">${cards.join("")}</div>`;
}

function findFirstH1(markdown) {
  const line = markdown
    .split("\n")
    .map((item) => item.trim())
    .find((item) => item.startsWith("# "));
  return line ? line.slice(2).trim() : "";
}

async function loadSection(path, targetId, formatter = markdownToHtml) {
  const target = document.getElementById(targetId);
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    const markdown = await response.text();
    if (target) target.innerHTML = formatter(markdown);
    return markdown;
  } catch (error) {
    if (target) {
      target.innerHTML =
        '<p><strong>Content failed to load.</strong> Please run with a local server (not file://).</p>';
    }
    console.error(error);
    return "";
  }
}

function setupRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function forceShowAllSections() {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("show"));
}

async function initContent() {
  setupRevealAnimation();

  const heroMarkdown = await loadSection("content/hero.md", "hero-content");
  await Promise.all([
    loadSection("content/about.md", "about-content"),
    loadSection("content/focus.md", "focus-content", focusMarkdownToHtml),
    loadSection("content/publications.md", "publications-content"),
    loadSection("content/contact.md", "contact-content"),
  ]);

  const displayName = findFirstH1(heroMarkdown);
  if (displayName) {
    const logo = document.getElementById("site-logo");
    const footerName = document.getElementById("footer-name");
    if (logo) logo.textContent = displayName;
    if (footerName) footerName.textContent = displayName;
  }
}

initContent().catch((error) => {
  console.error(error);
  forceShowAllSections();
});

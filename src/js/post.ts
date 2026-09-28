/**
 * whitespace 留白主题 - 文章页脚本
 * 代码块复制 + 阅读进度条
 */

// ========================================
// 代码块复制
// ========================================

function initCodeCopy(): void {
  const codeBlocks = document.querySelectorAll<HTMLElement>(
    ".article-content pre",
  );

  codeBlocks.forEach((pre) => {
    const copyBtn = document.createElement("button");
    copyBtn.className = "code-copy-btn";
    copyBtn.type = "button";
    copyBtn.textContent = "复制";

    pre.style.position = "relative";
    pre.appendChild(copyBtn);

    copyBtn.addEventListener("click", async () => {
      const code = pre.querySelector("code");
      const text = code ? (code.textContent ?? "") : (pre.textContent ?? "");
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "已复制";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = "复制";
          copyBtn.classList.remove("copied");
        }, 2000);
      } catch {
        console.error("复制失败");
      }
    });
  });
}

// ========================================
// 阅读进度条
// ========================================

function initReadingProgress(): void {
  const article = document.querySelector<HTMLElement>(".article-content");
  if (!article) return;

  const progressBar = document.createElement("div");
  progressBar.className = "reading-progress";
  document.body.appendChild(progressBar);

  const updateProgress = () => {
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    const start = articleTop - windowHeight;
    const end = articleTop + articleHeight;
    const current = scrollY;

    let progress = ((current - start) / (end - start)) * 100;
    progress = Math.max(0, Math.min(100, progress));
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

function init(): void {
  initCodeCopy();
  initReadingProgress();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

import "../css/main.css";

/**
 * whitespace 留白主题 - 全站脚本
 * 移植自 Typecho 主题 whitespace 的 main.js
 */

// ========================================
// 主题切换
// ========================================

function currentTheme(): string {
  return document.documentElement.getAttribute("data-theme") || "light";
}

function toggleTheme(): void {
  const newTheme = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  try {
    localStorage.setItem("theme", newTheme);
  } catch {
    /* ignore */
  }
}

function watchSystemTheme(): void {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {
      /* ignore */
    }
    if (!stored) {
      document.documentElement.setAttribute(
        "data-theme",
        e.matches ? "dark" : "light",
      );
    }
  });
}

// ========================================
// 搜索（plugin-search-widget）
// ========================================

function initSearch(): void {
  const searchToggle = document.getElementById("search-toggle");
  if (!searchToggle) return;
  searchToggle.addEventListener("click", () => {
    const widget = (window as unknown as Record<string, unknown>).SearchWidget as
      | { open?: () => void }
      | undefined;
    if (widget && typeof widget.open === "function") {
      widget.open();
    }
  });
}

// ========================================
// 移动端导航
// ========================================

function initMobileNav(): void {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (!mobileMenuToggle || !mobileNav) return;

  const menuIcon = `
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  `;
  const closeIcon = `
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  `;

  const icon = mobileMenuToggle.querySelector(".icon");
  const closeMobileNav = () => {
    if (mobileNav.classList.contains("active")) {
      mobileNav.classList.remove("active");
      if (icon) icon.innerHTML = menuIcon;
    }
  };

  mobileMenuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    if (icon) icon.innerHTML = mobileNav.classList.contains("active") ? closeIcon : menuIcon;
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMobileNav();
  });

  document.addEventListener("click", (e) => {
    const target = e.target as Node;
    if (!mobileNav.contains(target) && !mobileMenuToggle.contains(target)) {
      closeMobileNav();
    }
  });

  // 点击移动端菜单内的任意链接后自动收起
  mobileNav.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });
}

// ========================================
// 回到顶部
// ========================================

function initBackToTop(): void {
  const backToTop = document.getElementById("back-to-top");
  if (!backToTop) return;

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const handleScroll = () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// ========================================
// 相对时间
// ========================================

function initRelativeTime(): void {
  const formatter = new Intl.RelativeTimeFormat(navigator.language, {
    numeric: "always",
  });
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  document.querySelectorAll<HTMLElement>("[data-relative-time]").forEach((el) => {
    const datetime = el.getAttribute("datetime");
    if (!datetime) return;
    const time = Date.parse(datetime);
    if (Number.isNaN(time)) return;

    const diffSeconds = Math.floor((Date.now() - time) / 1000);
    // 仅对 24 小时内的内容显示相对时间，其余保留日期显示
    if (diffSeconds < 0 || diffSeconds >= 86400) return;

    if (diffSeconds < 60) {
      el.textContent = formatter.format(-diffSeconds, "second");
      return;
    }
    for (const [unit, seconds] of units) {
      if (diffSeconds >= seconds) {
        el.textContent = formatter.format(-Math.floor(diffSeconds / seconds), unit);
        break;
      }
    }
  });
}

// ========================================
// 图片懒加载
// ========================================

function initLazyImages(): void {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if (!("IntersectionObserver" in window)) return;

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: "50px 0px" },
  );

  images.forEach((img) => imageObserver.observe(img));
}

// ========================================
// 平滑滚动
// ========================================

function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const header = document.querySelector(".header");
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
}

// ========================================
// 外部链接处理
// ========================================

function initExternalLinks(): void {
  document.querySelectorAll<HTMLAnchorElement>(".article-content a").forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href &&
      href.startsWith("http") &&
      !href.includes(window.location.hostname)
    ) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
}

// ========================================
// 键盘快捷键
// ========================================

function initKeyboardShortcuts(): void {
  document.addEventListener("keydown", (e) => {
    const searchToggle = document.getElementById("search-toggle");
    if ((e.ctrlKey || e.metaKey) && e.key === "k" && searchToggle) {
      e.preventDefault();
      searchToggle.click();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "d") {
      e.preventDefault();
      toggleTheme();
    }
  });
}

// ========================================
// 初始化
// ========================================

function init(): void {
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  watchSystemTheme();
  initSearch();
  initMobileNav();
  initBackToTop();
  initRelativeTime();
  initLazyImages();
  initSmoothScroll();
  initExternalLinks();
  initKeyboardShortcuts();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

/**
 * whitespace 留白主题 - lightgallery 灯箱
 * 动态模式：扫描带 data-lightbox 属性的容器内的图片，点击放大预览。
 */
import lightGallery from "lightgallery";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

export function initLightbox(): void {
  const containers = document.querySelectorAll<HTMLElement>("[data-lightbox]");
  if (!containers.length) return;

  containers.forEach((container) => {
    const images = Array.from(container.querySelectorAll("img"));
    if (!images.length) return;

    const items = images
      .map((img) => {
        const src = img.getAttribute("data-full") || img.currentSrc || img.src;
        if (!src) return null;
        return { src, thumb: src, alt: img.alt || "" };
      })
      .filter((item): item is { src: string; thumb: string; alt: string } =>
        Boolean(item),
      );
    if (!items.length) return;

    // 挂载到 body，避免父级 stacking context 遮挡灯箱
    const gallery = lightGallery(document.body, {
      dynamic: true,
      dynamicEl: items,
      plugins: [lgZoom],
      speed: 400,
    });

    images.forEach((img, index) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        gallery.openGallery(index);
      });
    });
  });
}

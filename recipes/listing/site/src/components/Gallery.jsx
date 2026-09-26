import { useEffect, useState, useCallback } from "react";
import { gallery } from "../data.js";

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const show = useCallback((i) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(
    () => setIndex((i) => (i + 1) % gallery.length),
    []
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + gallery.length) % gallery.length),
    []
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  const active = gallery[index];

  return (
    <section id="gallery" className="section" aria-labelledby="gallery-h">
      <div className="section-head">
        <p className="eyebrow">Gallery</p>
        <h2 id="gallery-h">Step inside</h2>
        <p className="lede">
          Eight of {gallery.length + 26} photographs. Tap any image to open the
          full-screen viewer — use the arrow keys to move through the home.
        </p>
      </div>

      <div className="gallery-grid">
        {gallery.map((img, i) => (
          <button
            key={img.src}
            className={`gallery-tile${i === 0 ? " gallery-tile--lead" : ""}`}
            onClick={() => show(i)}
            aria-label={`Open photo ${i + 1}: ${img.caption}`}
          >
            <img src={img.thumb} alt={img.alt} loading="lazy" />
            <span className="gallery-tile__caption">{img.caption}</span>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
        >
          <button
            className="lightbox__close"
            onClick={close}
            aria-label="Close gallery"
          >
            &times;
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
          >
            &#8249;
          </button>
          <figure
            className="lightbox__figure"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={active.src} alt={active.alt} />
            <figcaption>
              <span>{active.caption}</span>
              <span className="lightbox__count">
                {index + 1} / {gallery.length}
              </span>
            </figcaption>
          </figure>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
}

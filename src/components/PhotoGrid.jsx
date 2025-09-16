import { useEffect, useState, useCallback, useRef } from "react";
import "./PhotoGrid.css";

/** items: [{ src, alt, text, href? }] */
export default function PhotoGrid({ items = [] }) {
  const [active, setActive] = useState(null); // number | null
  const hasItems = items && items.length > 0;

  // 背景スクロール抑止
  useEffect(() => {
    if (active !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [active]);

  // キーボード操作（←/→/Esc）
  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, items.length]);

  const open = (i) => setActive(i);
  const close = () => setActive(null);
  const next = useCallback(() => setActive((i) => (i + 1) % items.length), [items.length]);
  const prev = useCallback(() => setActive((i) => (i - 1 + items.length) % items.length), [items.length]);

  // スワイプ（モバイル）
  const touchStartX = useRef(null);
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <>
      <div className="photoGrid">
        {hasItems &&
          items.map((it, i) => {
            const CardInner = (
              <>
                <div className="pg-imgWrap">
                  <img
                    src={it.src}
                    alt={it.alt || ""}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="pg-caption">{it.text}</div>
              </>
            );

            // モーダルを使うので、カード自体はリンクではなくボタン風divに
            return (
              <button
                key={i}
                type="button"
                className="pg-card pg-cardButton"
                onClick={() => open(i)}
                aria-label={(it.alt || `photo ${i + 1}`) + " を拡大表示"}
              >
                {CardInner}
              </button>
            );
          })}
      </div>

      {/* モーダル */}
      {active !== null && (
        <div
          className="pg-modalOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="拡大画像"
          onClick={close}
        >
          <div
            className="pg-modalBody"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* ↩ 戻る */}
            <button
              type="button"
              className="pg-backBtn"
              onClick={close}
              aria-label="一覧に戻る"
              title="一覧に戻る"
            >
              {"\u21A9\uFE0E"}
            </button>

            {/* 画像 */}
            <figure className="pg-figure">
              <img
                src={items[active].src}
                alt={items[active].alt || ""}
                className="pg-modalImg"
                decoding="async"
              />
              {items[active].text && (
                <figcaption className="pg-modalCaption">
                  {items[active].text}
                </figcaption>
              )}
            </figure>

            {/* ナビゲーション 〈 / 〉 */}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  className="pg-navBtn left"
                  onClick={prev}
                  aria-label="前の画像へ"
                  title="前へ"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="pg-navBtn right"
                  onClick={next}
                  aria-label="次の画像へ"
                  title="次へ"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

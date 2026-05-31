import { useState, useCallback, useEffect } from 'react';
import useSWR from 'swr';
import './Gallery.css';

const SHEET_ID = import.meta.env.VITE_SHEET_ID ?? '1PmoyxBgJjLUjbgjEKyUrpJ3xEdVXugq9tLbxRYzYwPw';
const API_URL = `https://opensheet.elk.sh/${SHEET_ID}/T_%E3%82%AE%E3%83%A3%E3%83%A9%E3%83%AA%E3%83%BC`;


function driveThumb(url) {
  if (!url) return null;
  if (url.includes('thumbnail')) return url;
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return m ? `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1280` : url;
}

function Lightbox({ items, index, onClose, onNav }) {
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNav]);

  const it = items[index];
  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label="閉じる">×</button>
      <button className="lb-nav prev" onClick={e => { e.stopPropagation(); onNav(-1); }} aria-label="前へ">‹</button>
      <button className="lb-nav next" onClick={e => { e.stopPropagation(); onNav(1); }} aria-label="次へ">›</button>
      <img src={it.src} alt={it.alt} onClick={e => e.stopPropagation()} />
      {it.text && <div className="lb-cap">{it.text}</div>}
    </div>
  );
}

export default function Gallery() {
  const [lbIdx, setLbIdx] = useState(null);
  const { data, error } = useSWR(API_URL);

  const items = Array.isArray(data)
    ? data
        .filter(r => r['削除'] !== 'TRUE')
        .sort((a, b) => Number(a['並び替え'] || 999) - Number(b['並び替え'] || 999))
        .map((r, i) => ({
          src: driveThumb(r['画像 URL']),
          alt: r['画像'] || 'ギャラリー',
          text: r['本文'] || '',
          key: r['ID'] || r['画像 URL'] || i,
        }))
        .filter(r => r.src)
    : [];

  const open = useCallback(i => setLbIdx(i), []);
  const close = useCallback(() => setLbIdx(null), []);
  const nav = useCallback(d => setLbIdx(i => (i + d + items.length) % items.length), [items.length]);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-text">
          <div className="eyebrow">Gallery · 04</div>
          <h1>ギャラリー</h1>
          <div className="en-name">Spaces · Plates · Moments</div>
        </div>
        <div className="page-hero-meta">{items.length > 0 ? `${items.length} photographs` : ''}</div>
      </div>

      <div className="shell" style={{ paddingTop: 40, paddingBottom: 100 }}>
        {!data && !error && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-muted)' }}>読み込み中…</div>
        )}
        {items.length > 0 && (
          <div className="gallery-grid reveal">
            {items.map((g, i) => (
              <div
                className="g-tile"
                key={g.key}
                onClick={() => open(i)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && open(i)}
              >
                <img src={g.src} alt={g.alt} loading="lazy" />
                {g.text && <div className="gcap">{g.text}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {lbIdx !== null && <Lightbox items={items} index={lbIdx} onClose={close} onNav={nav} />}
    </>
  );
}

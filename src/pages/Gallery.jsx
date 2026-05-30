import { useState, useCallback, useEffect } from 'react';
import './Gallery.css';

import exterior from '../assets/Gallery/exterior.webp';
import outlook from '../assets/Gallery/outlook.webp';
import humberger from '../assets/humberger.webp';
import instore from '../assets/Gallery/instore.webp';
import humberger2 from '../assets/Gallery/humberger2.webp';
import curry from '../assets/Gallery/curry.webp';
import roll from '../assets/Gallery/dojimaroll.webp';
import pan from '../assets/Gallery/pan.webp';

const items = [
  { src: humberger,  alt: 'ICHISARA ハンバーグ',  text: 'イチサラといえばハンバーグ。元ファーストクラスシェフが仕上げる、肉汁あふれる一皿。' },
  { src: instore,    alt: '店内',                  text: '大きな窓から光が差し込む、開放的なダイニング。' },
  { src: outlook,    alt: 'テラス席',              text: '緑にかこまれたテラス席。ペットとご一緒に。' },
  { src: curry,      alt: '秘伝のカレー',           text: 'ファーストクラスラウンジで提供されていた秘伝のカレー。' },
  { src: humberger2, alt: 'ハンバーグ別アングル',  text: '断面まで、ふわふわの食感。' },
  { src: roll,       alt: '堂島ロール',            text: '千葉県でここだけ。卵の風味豊かな堂島ロール。' },
  { src: exterior,   alt: '外観',                  text: '倉庫のような外観。駐車場は14台ご用意。' },
  { src: pan,        alt: 'パンとごちそう',        text: 'ワンちゃんも猫ちゃんも、家族と一緒に。' },
];

const spans = ['span-6', 'span-3-tall', 'span-3-tall', 'span-4', 'span-4', 'span-4', 'span-6', 'span-3'];

function Lightbox({ index, onClose, onNav }) {
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
      <div className="lb-cap">{it.text}</div>
    </div>
  );
}

export default function Gallery() {
  const [lbIdx, setLbIdx] = useState(null);
  const open = useCallback(i => setLbIdx(i), []);
  const close = useCallback(() => setLbIdx(null), []);
  const nav = useCallback(d => setLbIdx(i => (i + d + items.length) % items.length), []);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-text">
          <div className="eyebrow">Gallery · 04</div>
          <h1>ギャラリー</h1>
          <div className="en-name">Spaces · Plates · Moments</div>
        </div>
        <div className="page-hero-meta">{items.length} photographs</div>
      </div>

      <div className="shell" style={{ paddingTop: 40, paddingBottom: 100 }}>
        <div className="gallery-grid reveal">
          {items.map((g, i) => (
            <div
              className={`g-tile ${spans[i % spans.length]}`}
              key={i}
              onClick={() => open(i)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && open(i)}
            >
              <img src={g.src} alt={g.alt} loading="lazy" />
              <div className="gcap">{g.text}</div>
            </div>
          ))}
        </div>
      </div>

      {lbIdx !== null && <Lightbox index={lbIdx} onClose={close} onNav={nav} />}
    </>
  );
}

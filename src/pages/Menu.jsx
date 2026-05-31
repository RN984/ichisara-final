import { useState } from 'react';
import useSWR from 'swr';
import './Menu.css';

import humberger2 from '../assets/Gallery/humberger2.webp';
import roll from '../assets/Gallery/dojimaroll.webp';
import curry from '../assets/Gallery/curry.webp';
import pan from '../assets/Gallery/pan.webp';

const SHEET_ID = import.meta.env.VITE_SHEET_ID ?? '1nqLq1P4rfE-I7E4J8QBZGA-to1lXBmBHDmx5Fx9Bdjg';

const fallbackImages = { 'ランチ': humberger2, 'カフェ': roll, 'ディナー': curry, 'その他': pan };

// シート由来の公開URLをそのまま使用（APIキー不要）。https のみ許可。
const httpsUrl = u => (u && /^https:\/\//.test(u) ? u : null);

export default function Menu() {
  const { data: menuTable } = useSWR(
    `https://opensheet.elk.sh/${SHEET_ID}/M_%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E8%A1%A8`
  );
  const { data: menuItems } = useSWR(
    `https://opensheet.elk.sh/${SHEET_ID}/T_%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0`
  );

  const [tab, setTab] = useState('');

  // 重い埋め込みビューア(Googleドライブ)はモバイルでフリーズの原因になるため、
  // PDFはブラウザ標準ビューア(別タブ)で開く。
  const openPdf = url => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const tabs = Array.isArray(menuTable) ? menuTable : [];
  const activeId = tab || (tabs[0]?.ID ?? '');
  const activeTab = tabs.find(t => t.ID === activeId);

  const items = Array.isArray(menuItems)
    ? menuItems
        .filter(r => r['削除'] !== 'TRUE' && r['種別'] === activeId)
        .sort((a, b) => Number(a['並び替え']) - Number(b['並び替え']))
    : [];

  const imgSrc = httpsUrl(activeTab?.['サムネイル URL'])
    ?? fallbackImages[activeTab?.['種別']]
    ?? humberger2;
  const pdfUrl = httpsUrl(activeTab?.['PDF URL']);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-text">
          <div className="eyebrow">Menu · 02</div>
          <h1>メニュー</h1>
          <div className="en-name">Lunch · Cafe · Dinner · Takeout</div>
        </div>
        <div className="page-hero-meta">価格はすべて税込</div>
      </div>

      <div className="shell" style={{ paddingTop: 32, paddingBottom: 100 }}>
        {tabs.length === 0 ? (
          <div className="menu-loading">読み込み中…</div>
        ) : (
          <>
            <div className="menu-tabs">
              {tabs.map(t => (
                <button
                  key={t.ID}
                  className={`menu-tab${activeId === t.ID ? ' active' : ''}`}
                  onClick={() => setTab(t.ID)}
                >
                  {t['種別']}
                </button>
              ))}
            </div>

            <div className="menu-display reveal">
              <div className="menu-image-col">
                <div
                  className="menu-image"
                  onClick={() => openPdf(pdfUrl)}
                  style={{ cursor: pdfUrl ? 'pointer' : 'default' }}
                >
                  <img src={imgSrc} alt={activeTab?.['種別']} loading="lazy" decoding="async" />
                  {pdfUrl && (
                    <span className="menu-pdf-overlay">
                      <span className="menu-pdf-hint">
                        <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.7"/>
                        </svg>
                        {activeTab?.['種別']}メニューを見る
                      </span>
                    </span>
                  )}
                </div>
                {pdfUrl && (
                  <button className="menu-pdf-link" onClick={() => openPdf(pdfUrl)}>
                    <span className="menu-pdf-link-label">
                      <svg viewBox="0 0 24 24" aria-hidden="true" width="15" height="15">
                        <path d="M6 2h8l4 4v16H6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                        <path d="M14 2v4h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                      </svg>
                      {activeTab?.['種別']}メニュー（PDF）を見る
                    </span>
                    <span className="menu-pdf-link-arrow">→</span>
                  </button>
                )}
              </div>
              <div className="menu-list">
                <h3>{activeTab?.['種別']}</h3>
                {items.length === 0 ? (
                  <div className="menu-loading">読み込み中…</div>
                ) : (
                  items.map((item, i) => (
                    <div className="menu-item" key={i}>
                      <div>
                        <h4>{item['商品名']}</h4>
                        {item['備考'] && <p>{item['備考']}</p>}
                      </div>
                      {item['値段'] && (
                        <div className="menu-price">¥ {Number(item['値段']).toLocaleString()}</div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

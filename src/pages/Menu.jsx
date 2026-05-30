import { useState } from 'react';
import useSWR from 'swr';
import './Menu.css';

import humberger2 from '../assets/Gallery/humberger2.webp';
import roll from '../assets/Gallery/dojimaroll.webp';
import curry from '../assets/Gallery/curry.webp';
import pan from '../assets/Gallery/pan.webp';

import { useDriveFolder, resolveUrl } from '../hooks/useDriveFolder';

const SHEET_ID = import.meta.env.VITE_SHEET_ID ?? '1PmoyxBgJjLUjbgjEKyUrpJ3xEdVXugq9tLbxRYzYwPw';
const fetcher = url => fetch(url).then(r => r.json());

const fallbackImages = { 'ランチ': humberger2, 'カフェ': roll, 'ディナー': curry, 'その他': pan };

export default function Menu() {
  const { data: menuTable } = useSWR(
    `https://opensheet.elk.sh/${SHEET_ID}/M_%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E8%A1%A8`,
    fetcher
  );
  const { data: menuItems } = useSWR(
    `https://opensheet.elk.sh/${SHEET_ID}/T_%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0`,
    fetcher
  );

  const thumbMap = useDriveFolder(import.meta.env.VITE_DRIVE_THUMB_FOLDER, 'image');
  const pdfMap   = useDriveFolder(import.meta.env.VITE_DRIVE_PDF_FOLDER,   'pdf');

  const [tab, setTab] = useState('');

  const tabs = Array.isArray(menuTable) ? menuTable : [];
  const activeId = tab || (tabs[0]?.ID ?? '');
  const activeTab = tabs.find(t => t.ID === activeId);

  const items = Array.isArray(menuItems)
    ? menuItems
        .filter(r => r['削除'] !== 'TRUE' && r['種別'] === activeId)
        .sort((a, b) => Number(a['並び替え']) - Number(b['並び替え']))
    : [];

  const imgSrc = resolveUrl(activeTab?.['サムネイル'], thumbMap)
    ?? fallbackImages[activeTab?.['種別']]
    ?? humberger2;
  const pdfUrl = resolveUrl(activeTab?.['PDF'], pdfMap);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-text">
          <div className="eyebrow">Menu · 01</div>
          <h1>メニュー</h1>
          <div className="en-name">Lunch · Cafe · Dinner · Goods</div>
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
              <div className="menu-image">
                {pdfUrl ? (
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <img src={imgSrc} alt={activeTab?.['種別']} />
                  </a>
                ) : (
                  <img src={imgSrc} alt={activeTab?.['種別']} />
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

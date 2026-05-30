import { useState } from 'react';
import './Menu.css';

import humberger2 from '../assets/Gallery/humberger2.webp';
import roll from '../assets/Gallery/dojimaroll.webp';
import curry from '../assets/Gallery/curry.webp';
import pan from '../assets/Gallery/pan.webp';

const tabs = [
  { id: 'lunch',  jp: 'ランチ',   en: 'Lunch' },
  { id: 'cafe',   jp: 'カフェ',   en: 'Cafe & Sweets' },
  { id: 'dinner', jp: 'ディナー', en: 'Dinner' },
  { id: 'other',  jp: 'その他',   en: 'Goods' },
];

const tabImages = { lunch: humberger2, cafe: roll, dinner: curry, other: pan };

const menuData = {
  lunch: [
    { name: 'ICHISARA ハンバーグ', en: 'Signature Hamburg Steak', desc: '20食限定 / 元ファーストクラスシェフの真骨頂。デミグラスソースとホワイトソースの二重奏。', price: '¥ 2,200' },
    { name: 'ICHISARA 和風ハンバーグ', en: 'Wafu Hamburg', desc: '20食限定 / 大根おろしとポン酢、和の出汁が香るもうひとつの主役。', price: '¥ 2,200' },
    { name: '秘伝のカレー', en: 'First-Class Lounge Curry', desc: '空港のファーストラウンジで提供されていた一皿を、そのままに。', price: '¥ 1,800' },
    { name: 'シェフの気まぐれランチ', en: "Chef's Whim", desc: '数量限定・先着順。内容は日替わり。', price: '¥ 1,650〜' },
  ],
  cafe: [
    { name: '堂島ロール', en: 'Dojima Roll', desc: '千葉でここだけ。卵の風味豊かな生地と軽やかなクリーム。', price: '¥ 500' },
    { name: 'メッセージプレート', en: 'Message Plate', desc: '堂島ロールにメッセージ。お祝いに。', price: '+¥ 300' },
    { name: 'オレンジカップ', en: 'Orange Cup', desc: 'オレンジの皮を細工し、フルーツとアイスを。', price: '+¥ 1,100' },
    { name: 'コーヒー / 紅茶', en: 'Coffee / Tea', desc: 'ハンドドリップ / セレクション。', price: '¥ 550' },
  ],
  dinner: [
    { name: 'ICHISARA コース A', en: 'Course A · 5 dishes', desc: '前菜・スープ・魚または肉・デザート・ドリンク。前日までの予約制。', price: '¥ 5,500' },
    { name: 'ICHISARA コース B', en: 'Course B · 7 dishes', desc: 'シェフのおまかせコース。お祝い・記念日に。', price: '¥ 8,800' },
    { name: 'ペアリングワイン', en: 'Wine Pairing', desc: 'ソムリエセレクト 3 種。', price: '+¥ 3,300' },
  ],
  other: [
    { name: 'KURIBO ピクルス', en: 'Kuribo Pickles', desc: '店頭・テイクアウト販売。3 種より選べます。', price: '¥ 900' },
    { name: '自家製ドレッシング', en: 'House Dressing', desc: '和風 / 玉ねぎ / バルサミコ。お土産にも。', price: '¥ 1,200' },
  ],
};

export default function Menu() {
  const [tab, setTab] = useState('lunch');
  const cur = tabs.find(t => t.id === tab);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-text">
          <div className="eyebrow">Menu · 01</div>
          <h1>メニュー</h1>
          <div className="en-name">Lunch · Cafe · Dinner · Goods</div>
        </div>
        <div className="page-hero-meta">
          価格はすべて税込
        </div>
      </div>

      <div className="shell" style={{ paddingTop: 32, paddingBottom: 100 }}>
        <div className="menu-tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`menu-tab${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span className="en">{t.en}</span>
              {t.jp}
            </button>
          ))}
        </div>

        <div className="menu-display reveal">
          <div className="menu-image">
            <img src={tabImages[tab]} alt={cur.jp} />
          </div>
          <div className="menu-list">
            <h3>{cur.jp}</h3>
            <div className="en-caps">{cur.en}</div>
            {menuData[tab].map((item, i) => (
              <div className="menu-item" key={i}>
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginTop: 4 }}>{item.en}</p>
                </div>
                <div className="menu-price">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

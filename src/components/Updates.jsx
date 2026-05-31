import useSWR from 'swr';
import { cleanDate } from '../utils/sheet';
import './Updates.css';

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// VITE_SHEET_ID を .env.development / .env.production に設定してください
const SHEET_ID = import.meta.env.VITE_SHEET_ID ?? '1PmoyxBgJjLUjbgjEKyUrpJ3xEdVXugq9tLbxRYzYwPw';
const API_URL = `https://opensheet.elk.sh/${SHEET_ID}/T_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B`;

const formatDate = dateStr => {
  const d = cleanDate(dateStr);
  if (!d) return dateStr ?? '';
  return new Date(d).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }) + '日';
};

const tagLabel = type => {
  if (type === 'シェフの気まぐれランチ') return 'Lunch';
  if (type === '営業日の変更') return 'Change';
  return 'Info';
};

// 本文に含まれる日付文字列を「本日」に置換（当日の行のみ）
const replaceWithToday = (text, dateStr) => {
  if (!text || !dateStr) return text;
  const clean = cleanDate(dateStr);
  // dateStr（元の形式）と clean（YYYY/M/D形式）の両方を試みる
  let result = text;
  for (const pattern of [dateStr, clean].filter(Boolean)) {
    result = result.replace(pattern, '本日');
  }
  return result;
};

export default function Updates() {
  const { data, error } = useSWR(API_URL);

  const today = new Date();
  const todayStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
  const isTuesday = today.getDay() === 2;

  if (error) return null;

  // 新列名: 種別, 日付, 本文, URL
  const rows = Array.isArray(data) ? data.filter(r => r['削除'] !== 'TRUE') : [];

  const grouped = {
    'シェフの気まぐれランチ': rows.filter(r => r['種別'] === 'シェフの気まぐれランチ'),
    '営業日の変更': rows.filter(r => r['種別'] === '営業日の変更'),
    'その他': rows.filter(r => r['種別'] !== 'シェフの気まぐれランチ' && r['種別'] !== '営業日の変更'),
  };

  const todaysChanges = grouped['営業日の変更']
    .filter(r => cleanDate(r['日付']) === todayStr);

  let todayBanner = '';
  let isClosed = false;
  if (todaysChanges.length > 0) {
    todayBanner = todaysChanges
      .map(r => replaceWithToday(r['本文'], r['日付']))
      .join('・');
    isClosed = todaysChanges.some(r => r['本文'] && r['本文'].includes('休'));
  } else if (isTuesday) {
    todayBanner = '毎週火曜は定休日です。';
    isClosed = true;
  } else {
    todayBanner = '本日　通常営業';
  }

  const catOrder = r => {
    if (r['種別'] === 'シェフの気まぐれランチ') return 0;
    if (r['種別'] === '営業日の変更') return 1;
    return 2;
  };

  const displayRows = rows
    .filter(r => {
      const d = cleanDate(r['日付']);
      if (!d) return r['種別'] !== 'シェフの気まぐれランチ' && r['種別'] !== '営業日の変更';
      return new Date(d) >= new Date(todayStr);
    })
    .sort((a, b) => {
      const catDiff = catOrder(a) - catOrder(b);
      if (catDiff !== 0) return catDiff;
      const da = cleanDate(a['日付']);
      const db = cleanDate(b['日付']);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return new Date(da) - new Date(db);
    });

  if (!data) {
    return (
      <div className="news-schedule">
        <div className="updates-today loading">読み込み中…</div>
      </div>
    );
  }

  return (
    <div className="news-schedule">
      {todayBanner && (
        <div className={`updates-today${isClosed ? ' closed' : ''}`}>{todayBanner}</div>
      )}

      {displayRows.map((r, i) => {
        const text = r['本文'];
        const rawUrl = r['URL'];
        const hasLink = rawUrl && /^https?:\/\/.+/.test(rawUrl);
        const isLunch = r['種別'] === 'シェフの気まぐれランチ';
        return (
          <div className={`updates-row${isLunch ? ' lunch' : ''}`} key={i}>
            <div className="updates-date">
              {formatDate(r['日付'])}
              <span className="tag">{tagLabel(r['種別'])}</span>
            </div>
            <div className="updates-title">
              {hasLink ? (
                <a href={rawUrl} target="_blank" rel="noopener noreferrer" className="ut-link">
                  <span className="ut-text">{text}</span>
                  <span className="ut-link-icon"><ExternalLinkIcon /></span>
                </a>
              ) : text}
            </div>
          </div>
        );
      })}
    </div>
  );
}

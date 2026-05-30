import useSWR from 'swr';
import './Updates.css';

// VITE_SHEET_ID を .env.development / .env.production に設定してください
const SHEET_ID = import.meta.env.VITE_SHEET_ID ?? '1PmoyxBgJjLUjbgjEKyUrpJ3xEdVXugq9tLbxRYzYwPw';
const API_URL = `https://opensheet.elk.sh/${SHEET_ID}/T_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B`;

const fetcher = url => fetch(url).then(r => r.json());

const cleanDate = dateStr => {
  if (!dateStr) return null;
  const parts = dateStr.split(/[\/\-]/);
  if (parts.length !== 3) return null;
  return `${parts[0]}/${Number(parts[1])}/${Number(parts[2])}`;
};

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
  const { data, error } = useSWR(API_URL, fetcher);

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

  const allLunches = grouped['シェフの気まぐれランチ']
    .filter(r => cleanDate(r['日付']))
    .sort((a, b) => new Date(cleanDate(b['日付'])) - new Date(cleanDate(a['日付'])));

  const latestLunch = allLunches[0] ?? null;

  const todaysChanges = grouped['営業日の変更']
    .filter(r => cleanDate(r['日付']) === todayStr);

  let todayBanner = '';
  if (todaysChanges.length > 0) {
    // 本文中の日付を「本日」に置換してから結合
    todayBanner = todaysChanges
      .map(r => replaceWithToday(r['本文'], r['日付']))
      .join('・');
  } else if (isTuesday) {
    todayBanner = '本日は定休日です。';
  } else if (latestLunch) {
    todayBanner = '本日　通常営業 / 気まぐれランチあり';
  }

  const displayRows = rows
    .filter(r => cleanDate(r['日付']))
    .sort((a, b) => new Date(cleanDate(b['日付'])) - new Date(cleanDate(a['日付'])));

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
        <div className="updates-today">{todayBanner}</div>
      )}

      {displayRows.map((r, i) => (
        <div className={`updates-row${r['種別'] === 'シェフの気まぐれランチ' ? ' lunch' : ''}`} key={i}>
          <div className="updates-date">
            {formatDate(r['日付'])}
            <span className="tag">{tagLabel(r['種別'])}</span>
          </div>
          <div className="updates-title">
            {(() => {
              const isToday = cleanDate(r['日付']) === todayStr;
              const text = isToday ? replaceWithToday(r['本文'], r['日付']) : r['本文'];
              const hasLink = r['URL'] && r['URL'] !== 'http://' && r['URL'] !== 'https://';
              return hasLink
                ? <a href={r['URL']} target="_blank" rel="noopener noreferrer">{text}</a>
                : text;
            })()}
          </div>
        </div>
      ))}
    </div>
  );
}

export { cleanDate, allLunchesFromData };

function allLunchesFromData(data) {
  if (!Array.isArray(data)) return null;
  const lunches = data
    .filter(r => r['種別'] === 'シェフの気まぐれランチ' && r['削除'] !== 'TRUE' && cleanDate(r['日付']))
    .sort((a, b) => new Date(cleanDate(b['日付'])) - new Date(cleanDate(a['日付'])));
  return lunches[0] ?? null;
}

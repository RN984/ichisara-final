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
    todayBanner = todaysChanges.map(r => r['本文']).join('・');
  } else if (isTuesday) {
    todayBanner = '本日は定休日です。';
  } else if (latestLunch) {
    todayBanner = `通常営業 / 気まぐれランチあり`;
  }

  const displayRows = [
    ...grouped['シェフの気まぐれランチ'].slice(0, 3),
    ...grouped['営業日の変更'].slice(0, 3),
    ...grouped['その他'].slice(0, 2),
  ].sort((a, b) => new Date(cleanDate(b['日付'])) - new Date(cleanDate(a['日付']))).slice(0, 6);

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
        <div className="updates-today">
          <strong>本日</strong>　{todayBanner}
        </div>
      )}

      {displayRows.map((r, i) => (
        <div className={`updates-row${r['種別'] === 'シェフの気まぐれランチ' ? ' lunch' : ''}`} key={i}>
          <div className="updates-date">
            {formatDate(r['日付'])}
            <span className="tag">{tagLabel(r['種別'])}</span>
          </div>
          <div className="updates-title">
            {r['URL'] && r['URL'] !== 'http://' && r['URL'] !== 'https://'
              ? <a href={r['URL']} target="_blank" rel="noopener noreferrer">{r['本文']}</a>
              : r['本文']}
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

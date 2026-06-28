// スプレッドシート（お知らせ）共通ユーティリティ

// "2026/05/31" や "2026-5-31" → "2026/5/31" に正規化。不正な値は null。
export function cleanDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split(/[/-]/);
  if (parts.length !== 3) return null;
  return `${parts[0]}/${Number(parts[1])}/${Number(parts[2])}`;
}

// お知らせ行から最新の「シェフの気まぐれランチ」を 1 件返す（無ければ null）。
export function allLunchesFromData(data) {
  if (!Array.isArray(data)) return null;
  const lunches = data
    .filter(r => r['ID'] && r['種別'] === 'シェフの気まぐれランチ' && cleanDate(r['日付']))
    .sort((a, b) => new Date(cleanDate(b['日付'])) - new Date(cleanDate(a['日付'])));
  return lunches[0] ?? null;
}

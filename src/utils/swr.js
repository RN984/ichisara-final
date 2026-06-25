// opensheet.elk.sh は無料の共有プロキシで、同時アクセスやレート制限で
// 一部リクエストだけ失敗することがある。失敗を確実に検知してリトライさせ、
// さらに前回成功データを localStorage に保持して空白表示を防ぐ。

import { preload } from 'swr';

// HTTP エラー（429 等）でも fetch は resolve するため、!ok を明示的に throw して
// SWR のリトライ対象にする。
export const sheetFetcher = async url => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
};

const CACHE_KEY = 'ichisara-swr-cache';

// SWR のキャッシュを localStorage に永続化するプロバイダ。
// リロード時に前回データで即描画 → 裏で再取得。再取得が失敗しても前回データが残る。
export const localStorageProvider = () => {
  let map = new Map();
  try {
    map = new Map(JSON.parse(localStorage.getItem(CACHE_KEY) || '[]'));
  } catch {
    // 破損・無効時は空キャッシュで開始
  }

  const persist = () => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(map.entries())));
    } catch {
      // 容量超過・プライベートモード等は無視（次回再取得で復帰）
    }
  };

  if (typeof window !== 'undefined') {
    // モバイルでは beforeunload が発火しないことがあるため複数イベントで保存
    window.addEventListener('pagehide', persist);
    window.addEventListener('beforeunload', persist);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') persist();
    });
  }

  return map;
};

const SHEET_ID = import.meta.env.VITE_SHEET_ID ?? '1PmoyxBgJjLUjbgjEKyUrpJ3xEdVXugq9tLbxRYzYwPw';
const sheetUrl = name => `https://opensheet.elk.sh/${SHEET_ID}/${name}`;

// 遷移先ページで使うシートを「初回描画後のアイドル時に1本ずつ順番に」温める。
// Home/Insta は描画済みで既に取得されるため対象外。Chef はシート未使用。
// キーは各ページの useSWR と完全一致させること（=キャッシュ命中の条件）。
// 遷移されやすい順: Menu → Gallery → FAQ。
const PREFETCH_SHEETS = [
  'M_%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E8%A1%A8',                            // Menu: メニュー表
  'T_%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0', // Menu: メニューアイテム
  'T_%E3%82%AE%E3%83%A3%E3%83%A9%E3%83%AA%E3%83%BC',                            // Gallery: ギャラリー
  'M_FAQ%20%E3%82%AB%E3%83%86%E3%82%B4%E3%83%AA',                              // FAQ: カテゴリ
  'T_FAQ',                                                                      // FAQ: 本体
];

// opensheet は無料共有プロキシでレート制限があるため一斉取得を避け、
// 間隔を空けて逐次プリフェッチする。失敗してもページ側 useSWR が再取得するので無視。
export const warmSheetCache = () => {
  if (typeof window === 'undefined') return;
  const schedule = window.requestIdleCallback || (cb => setTimeout(cb, 1));
  let i = 0;
  const next = () => {
    if (i >= PREFETCH_SHEETS.length) return;
    preload(sheetUrl(PREFETCH_SHEETS[i++]), sheetFetcher).catch(() => {});
    setTimeout(() => schedule(next), 600); // 次の1本まで間隔を空ける
  };
  schedule(next);
};

// opensheet.elk.sh は無料の共有プロキシで、同時アクセスやレート制限で
// 一部リクエストだけ失敗することがある。失敗を確実に検知してリトライさせ、
// さらに前回成功データを localStorage に保持して空白表示を防ぐ。

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

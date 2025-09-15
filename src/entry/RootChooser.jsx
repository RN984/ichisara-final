import { useEffect, useState } from "react";

export default function RootChooser() {
  const [Comp, setComp] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const isWifiLike = () => {
      const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (!c) return true; // 取れない環境はWi-Fi相当扱い
      if (typeof c.type === "string" && c.type.toLowerCase() === "wifi") return true;
      if (c.effectiveType === "4g" && !c.saveData) return true;
      return false;
    };

    // measure 全体に 1s の締切（1s超えたら Infinity）
    const measureWithTimeout = async (timeoutMs = 1000) => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), timeoutMs);
      const start = performance.now();
      try {
        await fetch(`/favicon.ico?cb=${Date.now()}`, { cache: "no-store", signal: ctrl.signal });
        return performance.now() - start;
      } catch {
        return Infinity;
      } finally {
        clearTimeout(timer);
      }
    };

    (async () => {
      const q = new URLSearchParams(window.location.search);
      const forced = q.get("variant");

      // どのみち必要になる Home(App.jsx) は並行で“読み込みだけ”開始（描画はまだしない）
      const normalPromise = import("../App.jsx");

      // クエリ強制
      if (forced === "heavy" || forced === "normal") {
        const mod = await (forced === "heavy" ? import("../App2.jsx") : normalPromise);
        if (!cancelled) setComp(() => mod.default);
        return;
      }

      // 計測開始（描画は判定まで保留）
      const online = navigator.onLine;
      let heavyOk = false;

      if (online && isWifiLike()) {
        const ms = await measureWithTimeout(1000);
        heavyOk = ms <= 1000;
      }

      // heavy なら heavy を import、だめなら 先に読み込み済みの normal を使う
      if (heavyOk) {
        // ここで重い方の import を開始（この間はまだスピナー）
        const mod = await import("../App2.jsx");
        if (!cancelled) setComp(() => mod.default);
      } else {
        const mod = await normalPromise; // すでに読み込みは進んでいるので表示が速い
        if (!cancelled) setComp(() => mod.default);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  if (!Comp) {
    return <div style={{ textAlign: "center", marginTop: 100 }}>環境を判定中…</div>;
  }
  const Chosen = Comp;
  return <Chosen />;
}

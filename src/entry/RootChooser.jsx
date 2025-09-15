import { useEffect, useState } from "react";

export default function RootChooser() {
  const [Comp, setComp] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const isWifiLike = () => {
      const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (!c) return true; // 取得不可はWi-Fi相当扱い
      if (typeof c.type === "string" && c.type.toLowerCase() === "wifi") return true;
      if (c.effectiveType === "4g" && !c.saveData) return true;
      return false;
    };

    // ★ 1秒で fetch を中断し、1秒を超えたら Infinity を返す
    const measureWithTimeout = async (timeoutMs = 1000) => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), timeoutMs);
      const start = performance.now();
      try {
        await fetch(`/favicon.ico?cb=${Date.now()}`, { cache: "no-store", signal: ctrl.signal });
        return performance.now() - start; // 実計測時間
      } catch {
        // タイムアウト(AbortError) or ネットワークエラー → 遅い扱い
        return Infinity;
      } finally {
        clearTimeout(timer);
      }
    };

    (async () => {
      // クエリ強制: /?variant=heavy or normal
      const q = new URLSearchParams(window.location.search);
      const forced = q.get("variant");
      if (forced === "heavy" || forced === "normal") {
        const mod = await import(forced === "heavy" ? "../App2.jsx" : "../App.jsx");
        if (!cancelled) setComp(() => mod.default);
        return;
      }

      const online = navigator.onLine;
      let chooseHeavy = false;

      if (online && isWifiLike()) {
        const ms = await measureWithTimeout(1000); // ★ measure 全体に1秒の締切
        // 1秒以内に完了した場合のみ heavy（App2）
        chooseHeavy = ms <= 1000;
      }

      const mod = await import(chooseHeavy ? "../App2.jsx" : "../App.jsx"); // 1秒超なら App.jsx
      if (!cancelled) setComp(() => mod.default);
    })();

    return () => { cancelled = true; };
  }, []);

  if (!Comp) {
    return <div style={{ textAlign: "center", marginTop: 100 }}>環境を判定中…</div>;
  }
  const Chosen = Comp;
  return <Chosen />;
}

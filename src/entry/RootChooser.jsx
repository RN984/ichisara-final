import { useEffect, useState } from "react";

export default function RootChooser() {
  const [Comp, setComp] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const isWifiLike = () => {
      const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      // ★ デスクトップやSafariは情報が取れない→Wi-Fi相当として扱う
      if (!c) return true;

      // 一部環境で存在
      if (typeof c.type === "string" && c.type.toLowerCase() === "wifi") return true;

      // effectiveType が "4g"（=十分高速）かつ省データOFFならWi-Fi相当とみなす
      if (c.effectiveType === "4g" && !c.saveData) return true;

      return false;
    };

    const measure = async () => {
      const ctrl = new AbortController();
      const start = performance.now();
      try {
        // ★ キャッシュバスターを付ける
        await fetch(`/favicon.ico?cb=${Date.now()}`, { cache: "no-store", signal: ctrl.signal });
        return performance.now() - start;
      } catch {
        return Infinity;
      } finally {
        ctrl.abort();
      }
    };

    (async () => {
      // ★ クエリで強制切替（例: /?variant=heavy）
      const q = new URLSearchParams(window.location.search);
      const forced = q.get("variant"); // "heavy" | "normal" | null
      if (forced === "heavy" || forced === "normal") {
        const mod = await import(forced === "heavy" ? "../App2.jsx" : "../App.jsx");
        if (!cancelled) setComp(() => mod.default);
        return;
      }

      // ※ 最初はキャッシュしない（動作確認が済んだら sessionStorage を復活推奨）
      // const cached = sessionStorage.getItem("app_variant");
      // if (cached) {
      //   const mod = await import(cached === "heavy" ? "../App2.jsx" : "../App.jsx");
      //   if (!cancelled) setComp(() => mod.default);
      //   return;
      // }

      const online = navigator.onLine;
      let chooseHeavy = false;

      if (online && isWifiLike()) {
        const ms = await measure();
        // 閾値はお好みで（800〜1500ms 目安）
        chooseHeavy = ms < 1200;
        // デバッグ出力（必要なら）
        // console.log({ online, ms, chooseHeavy });
      }

      const mod = await import(chooseHeavy ? "../App2.jsx" : "../App.jsx");
      if (!cancelled) {
        setComp(() => mod.default);
        // sessionStorage.setItem("app_variant", chooseHeavy ? "heavy" : "normal");
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

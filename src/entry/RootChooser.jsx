import { useEffect, useState } from "react";

// sessionStorage はプライベートモードやストレージ無効時に throw するため、安全に読み書きする
const readVariant = () => {
  try { return sessionStorage.getItem("app-variant"); } catch { return null; }
};
const writeVariant = value => {
  try { sessionStorage.setItem("app-variant", value); } catch { /* 保存失敗は無視（次回再計測） */ }
};

export default function RootChooser() {
  const [Comp, setComp] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const measureWithTimeout = async (timeoutMs = 1000) => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), timeoutMs);
      const start = performance.now();
      try {
        await fetch(`/ping.txt?cb=${Date.now()}`, { cache: "reload", signal: ctrl.signal, credentials: "omit" });
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

      const normalPromise = import("../App.jsx");

      if (forced === "heavy" || forced === "normal") {
        const mod = await (forced === "heavy" ? import("../App2.jsx") : normalPromise);
        if (!cancelled) setComp(() => mod.default);
        return;
      }

      // セッション内で計測結果をキャッシュして初回のみ速度計測を行う
      const cached = readVariant();
      if (cached) {
        const mod = await (cached === "heavy" ? import("../App2.jsx") : normalPromise);
        if (!cancelled) setComp(() => mod.default);
        return;
      }

      const ms = await measureWithTimeout(1000);
      const heavyOk = ms <= 1200;
      writeVariant(heavyOk ? "heavy" : "normal");

      if (heavyOk) {
        const mod = await import("../App2.jsx");
        if (!cancelled) setComp(() => mod.default);
      } else {
        const mod = await normalPromise;
        if (!cancelled) setComp(() => mod.default);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  if (!Comp) {
    return <div style={{ textAlign: "center", marginTop: 100 }}>少々お待ちください…</div>;
  }
  const Chosen = Comp;
  return <Chosen />;
}

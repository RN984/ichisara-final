import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import Layout from './components/Layout.jsx';
import Home2 from './pages/Home2.jsx';
import Menu from './pages/Menu.jsx';
import Chef from './pages/Chef.jsx';
import Faq from './pages/Faq.jsx';
import Gallery from './pages/Gallery.jsx';
import { warmSheetCache } from './utils/swr.js';
import hamburgerImg from "./assets/gallery/hamburger-hero.webp";

/* ===== Intro splash — "Focus" =====
   ぼかした皿が焦点に合いながらワードマークが立ち上がり、リフトアウト。
   1セッション1回 / reduced-motion 尊重 */
function Splash({ onDone }) {
  const [on, setOn] = useState(false);
  const [exit, setExit] = useState(false);
  useEffect(() => {
    const r1 = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    const tExit = setTimeout(() => setExit(true), 2900);
    const tDone = setTimeout(() => onDone(), 2900 + 1150);
    return () => { cancelAnimationFrame(r1); clearTimeout(tExit); clearTimeout(tDone); };
  }, [onDone]);
  const letters = "ICHISARA".split("");
  return (
    <div className={`splash ${on ? "is-on" : ""} ${exit ? "is-exit" : ""}`} aria-hidden="true">
      <div className="splash-photo"><img src={hamburgerImg} alt="" /></div>
      <div className="splash-grad"></div>
      <div className="splash-mark">
        <div className="splash-eyebrow">Dining Hills Cafe</div>
        <h1 className="splash-name">
          {letters.map((c, i) => (
            <span className="ch" key={i} style={{ animationDelay: (0.45 + i * 0.08) + "s" }}>{c}</span>
          ))}
        </h1>
        <div className="splash-rule"></div>
        <div className="splash-sub">Shisui · Chiba · Japan</div>
      </div>
    </div>
  );
}

export default function App2() {
  const [splash, setSplash] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const endSplash = useCallback(() => setSplash(false), []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    // 初回描画後、遷移先ページのシートをアイドル時に1本ずつ温める（初期表示は阻害しない）
    warmSheetCache();
  }, []);

  return (
    <>
      {splash && <Splash onDone={endSplash} />}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route index element={<Home2 />} />
          <Route path="/" element={<Layout />}>
            <Route path="menu" element={<Menu />} />
            <Route path="chef" element={<Chef />} />
            <Route path="faq" element={<Faq />} />
            <Route path="gallery" element={<Gallery />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

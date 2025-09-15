// src/components/ScrollToTop.jsx 常に先頭に
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // #hash があるリンク（アンカー遷移）はスクロール維持
    if (hash) return;

    // 先頭へ（描画前に実行してチラつき防止）
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // iOS等の保険
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname, hash]);

  return null;
}

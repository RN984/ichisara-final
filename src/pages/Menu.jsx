import "./Menu.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import lunchmenu from "../assets/menu/lunchmenu.webp";
import menu3 from "../assets/menu/menu3.webp";
import menu4 from "../assets/menu/menu4.webp";
import menu5 from "../assets/menu/menu5.webp";

import PageTitle from "../components/PageTitle";
import titleMenu from "../assets/titles/titleMenu.webp";

// 折りたたみコンポーネント（このファイル内で完結）
function CollapsibleImage({ src, alt, collapsedHeight = 250 }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="collapsible">
      <div
        className={`panel ${open ? "open" : ""}`}
        style={{
          maxHeight: open ? "1000vh" : `${collapsedHeight}px`,
        }}
      >
        <img src={src} alt={alt} className="menuImg" loading="lazy" />
        {!open && (
          <div className="fadeOverlay">
            <button className="overlayBtn" onClick={() => setOpen(true)}>
               さらに表示
            </button>
          </div>
        )}
      </div>
      {open && (
        <button className="toggleBtn" onClick={() => setOpen(false)}>
          閉じる
        </button>
      )}
    </div>
  );
}


export default function Menu() {


  return (
    <div className="mainContent">
      <div className="pageTitleWrapper">
        <PageTitle src={titleMenu} alt="メニューページのタイトル" />
      </div>


      <div className="menuGrid">
        <section id="lunch" className="menuWrapper">
          <CollapsibleImage src={lunchmenu} alt="イチサラ ランチメニュー" />
        </section>

        <section id="cafe" className="menuWrapper">
          <CollapsibleImage src={menu3} alt="イチサラ カフェメニュー" />
        </section>

        <section id="dinner" className="menuWrapper">
          <CollapsibleImage src={menu4} alt="イチサラ ディナーメニュー" />
        </section>

        <section id="other" className="menuWrapper">
          <CollapsibleImage
            src={menu5}
            alt="KURIBO ピクルス 自家製ドレッシング販売"
          />
        </section>
      </div>
    </div>
  );
}


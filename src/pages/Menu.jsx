
import "./Menu.css";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import menu1 from "../assets/menu/menu1.webp";
import menu2 from "../assets/menu/menu2.webp";
import menu3 from "../assets/menu/menu3.webp";
import menu4 from '../assets/menu/menu4.webp';
import menu5 from '../assets/menu/menu5.webp';

import PageTitle from "../components/PageTitle";
import titleMenu from '../assets/titles/titleMenu.webp';

export default function Menu() {

  const location = useLocation();
      
        useEffect(() => {
          const id = location.hash?.replace('#', '');
          if (id) {
            // 遅延してスクロールすることで「描画が終わってから動作」させる
            setTimeout(() => {
              const el = document.getElementById(id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 50); // 50ms 遅延（ここが超重要！！）
          }
        }, [location]);

  return (     
     <div className="mainContent">
        <div className="pageTitleWrapper">
          <PageTitle src={titleMenu} alt='メニューページのタイトル'/>
        </div>
{/* カテゴリ一覧（アンカーリンク） */}
<div className="faqNav">
          <a href="#lunch">ランチメニュー</a> 
          <a href="#cafe">カフェ</a> 
          <a href="#dinner">ディナー</a>
          <a href="#other">その他</a>
        </div>


        <div className="menuGrid">

          <section id="lunch" className="menuWrapper">
          <img src={menu1} alt="イチサラ ランチメニュー" className="menuImg" loading="lazy" />
          </section>
          <div className="menuWrapper">
          <img src={menu2} alt="イチサラ 気まぐれランチ" className="menuImg" loading="lazy" />
          </div>
          <section id="cafe" className="menuWrapper">
          <img src={menu3} alt="イチサラ カフェメニュー" className="menuImg" loading="lazy" />
          </section>
          <section id="dinner" className="menuWrapper">
          <img src={menu4} alt="イチサラ ディナーメニュー" className="menuImg" loading="lazy" />
          </section>
          <section id="other" className="menuWrapper">
          <img src={menu5} alt="KURIBO ピクルス 自家製ドレッシング販売" className="menuImg" loading="lazy" />
          </section>
        </div>
      </div>

  );
}

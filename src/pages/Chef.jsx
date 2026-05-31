import './Chef.css';

import nishioMain from '../assets/chef/nishio-main.webp';
import nishioSub from '../assets/chef/nishio-sub.webp';
import omiMain from '../assets/chef/omi-main.webp';
import omiSub from '../assets/chef/omi-sub.webp';
import humberger2 from '../assets/Gallery/humberger2.webp';
import curry from '../assets/Gallery/curry.webp';

export default function Chef() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-text">
          <div className="eyebrow">Chef · 03</div>
          <h1>2人のシェフ</h1>
          <div className="en-name">Our Chefs · 64 years in the air</div>
        </div>
        <div className="page-hero-meta">ICHISARA Owner Chefs</div>
      </div>

      <div className="shell" style={{ paddingTop: 32, paddingBottom: 60 }}>
        <section className="chef-feature reveal">
          <div className="chef-feature-inner">
            <div className="chef-feature-images">
              <div className="main"><img src={nishioMain} alt="西尾シェフ" /></div>
              <div className="chef-feature-subs">
                <div className="sub"><img src={nishioSub} alt="西尾シェフ 調理風景" /></div>
                <div className="sub"><img src={humberger2} alt="シグネチャーハンバーグ" /></div>
              </div>
            </div>
            <div className="chef-feature-text">
              <h2>西尾 義光</h2>
              <div className="en-name">Yoshimitsu Nishio</div>
              <p>機内食調理とホテルレストランにて 32 年の経歴を持ち、2008 年にはシンガポールで行われた世界機内食コンクールで日本人として初の優勝。その後、日本航空 (JAL) のコーポレートシェフとして、ファーストクラスや、世界各国の機内食をはじめ、政府専用機のメニュー開発に携わり、皇族への提供も担う。現在は (株) NK フーズコネクション代表取締役 兼 ICHISARA のオーナーシェフとして心を込めた一皿をお届けしております。</p>
              <div className="chef-stats">
                <div className="chef-stat"><div className="n">32</div><div className="l">Years In-flight Cuisine</div></div>
                <div className="chef-stat"><div className="n">2008</div><div className="l">World Inflight 1st Place</div></div>
              </div>
            </div>
          </div>
        </section>

        <div className="deco-rule" aria-hidden="true"></div>

        <section className="chef-feature right reveal">
          <div className="chef-feature-inner">
            <div className="chef-feature-text">
              <h2>尾身 雅志</h2>
              <div className="en-name">Masashi Omi</div>
              <p>東京都内有名洋食レストランでキャリアをスタートしその後、関西料理を経て和食の道へ。ユナイテッド航空 (United Airlines) の和食メニュー開発責任者として就任。和食料理長に。アメリカ及びアジア主要都市すべての日本発着路線で開発・提供した和食メニューは在職 32 年の間において 1,000 種類をゆうに超えます。現在は (株) NK フーズコネクション、ICHISARA で心をこめた一皿をお届けしております。</p>
              <div className="chef-stats">
                <div className="chef-stat"><div className="n">32</div><div className="l">Years Japanese Cuisine</div></div>
                <div className="chef-stat"><div className="n">1,000+</div><div className="l">Menus Developed</div></div>
              </div>
            </div>
            <div className="chef-feature-images">
              <div className="main"><img src={omiMain} alt="尾身シェフ" /></div>
              <div className="chef-feature-subs">
                <div className="sub"><img src={omiSub} alt="尾身シェフ 調理風景" /></div>
                <div className="sub"><img src={curry} alt="秘伝のカレー" /></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

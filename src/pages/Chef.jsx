import ChefProfile from "../components/ChefProfile";

import nishioMain from "../assets/chef/nishio-main.webp";
import nishioSub from "../assets/chef/nishio-sub.webp";
import omiMain from "../assets/chef/omi-main.webp";
import omiSub from "../assets/chef/omi-sub.webp";

import PageTitle from "../components/PageTitle";
import titleChef from '../assets/titles/titleChef.webp';

export default function Chef() {
  return (
   
      <div className="mainContent">
        <div className="pageTitleWrapper">
        <PageTitle src={titleChef} alt='シェフページのタイトル'/>
        </div>

        <ChefProfile
          name="西尾シェフ"
          altName='西尾義光'
          images={[nishioMain, nishioSub]}
          intro="機内食調理とホテルレストランにて32年の経歴を持ち、2008年にはシンガポールで行われた世界機内食コンクールで日本人として初の優勝。その後、日本航空（JAL）のコーポレートシェフとして、ファーストクラスや、世界各国の機内食をはじめ、政府専用機のメニュー開発に携わり、皇族への提供も担う。現在は(株)NKフーズコネクション代表取締役兼ICHISARAのオーナーシェフとして心を込めた一皿をお届けしております。"
        />

        <ChefProfile
          name="尾身シェフ"
          altName='尾身雅志'
          images={[omiMain, omiSub]}
          intro="東京都内有名洋食レストランでキャリアをスタートしその後、関西料理を経て和食の道へ。ユナイテッド航空（United Airlines）の和食メニュー開発責任者として就任。和食料理長に。アメリカ及びアジア主要都市すべての日本発着路線で開発・提供した和食メニューは在職3 2 年の間において1 , 0 0 0 種類をゆうに超えます。現在は(株)NKフーズコネクション、ICHISARAで心をこめた一皿をお届けしております。"
        />
      </div>
  
  );
}

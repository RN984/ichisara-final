// 画像は import でも public/ でもOK
import titleGallery from "../assets/titles/titleGallery.webp";
import exterior from "../assets/Gallery/exterior.webp";
import outlook from "../assets/Gallery/outlook.webp";
import humberger from "../assets/Gallery/humberger2.webp";
import curry from "../assets/Gallery/curry.webp";
import roll from "../assets/Gallery/dojimaroll.webp";
import pan from "../assets/Gallery/pan.webp";
import instore from "../assets/Gallery/instore.webp";
import PhotoGrid from "../components/PhotoGrid.jsx";
import PageTitle from "../components/PageTitle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Gallery.css";

const items = [
    { src: exterior, alt: "外観", text: "倉庫のような外観ですが、営業してます！駐車場も広いのでご安心を。" },
    { src: outlook, alt: "テラス席", text: "テラス席の眺めは最高！ここではペットといっしょにお食事を楽しめますよ☺️" },
    { src: instore, alt: "店内", text: "大きな窓にかこまれた開放的な空間！オフホワイトの壁に落ち着くインテリアで贅沢な時間を♪" },
    { src: humberger, alt: "ハンバーグ", text: "イチサラといえばハンバーグ！肉汁があふれ、ふわふわな食感です...!!"},
    { src: curry, alt: "カレー", text: "空港のファーストラウンジで提供されていた秘伝のカレー。牛肉がほろほろに溶け込んだ濃厚な味わいがたまらない🤤" },
     { src: roll, alt: "堂島ロール", text: "千葉県で堂島ロールが食べられるのはここだけ！卵の風味豊かな生地と、軽い味わいのクリームで食後にもぺろり♪" },
     { src: pan, alt: "パン", text: "ワンちゃんだけでなく、猫ちゃんもぜひ！" },
];


export default function Gallery() {

      const navigate = useNavigate();     // ← これが必須
    const location = useLocation(); 

    const handleBack = () => {
    // 1) まず履歴があれば戻る
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    // 2) 直リンクで来た等の場合はフォールバック
    //    好きな戻り先に変更OK（"/" や "/menu" など）
    navigate("/menu");
  };

  return (
    <section className="mainContent">

            <div className='pageTitleWrapper'>
              <PageTitle src={titleGallery} alt='イチサラギャラリー'/>
            </div>
      <nav className="galleryNav">
        <button type="button" onClick={handleBack} className="buck">
          戻る
        </button>
        <Link to="/menu" className="menu">
          メニュー
        </Link>
      </nav>

      <PhotoGrid items={items} />
    </section>
  );
}

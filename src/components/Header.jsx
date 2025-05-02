import heroHeader from '../assets/header-hero.webp'; // 比率2.5:1の画像推奨
import './Header.css'

export default function Header() {
  return (
    <div className="heroHeader">
      <img src={heroHeader} alt="ICHISARA ヘッダー画像" loading="lazy" />
    </div>
  );
}
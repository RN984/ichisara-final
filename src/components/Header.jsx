import Headerimg from '../assets/header.webp'; 
import './Header.css'

export default function Header() {
  return (
    <div className="heroHeader">
      <img src={Headerimg} alt="ICHISARA DINING HILLS CAFE ヘッダー画像" loading="lazy" />
    </div>
  );
}
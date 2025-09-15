import Headerimg from '../assets/header.webp'; 
import './Header.css'
import { Link } from 'react-router-dom';  //

export default function Header() {
  return (
      <Link to="/gallery" aria-label="ギャラリーへ移動">
        <img src={Headerimg} alt="イチサラ ヘッダー画像" loading="lazy" />
      </Link>
  );
}
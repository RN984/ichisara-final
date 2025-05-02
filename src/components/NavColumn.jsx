import { Link } from 'react-router-dom';
import './NavColumn.css';

export default function NavColumn() {
  return (
    <nav className="navCol" aria-label="サイトメニュー">
      <ul>
        <br /><br />
        <li><Link to="/">トップ</Link></li>
        <li><Link to="/chef">シェフ</Link></li>
        <li><Link to="/menu">メニュー</Link></li>
        <li><Link to="/faq">質問</Link></li>
      </ul>
    </nav>
  );
}

import { Link } from 'react-router-dom';
import './NavColumn.css';     // 使わなければ import 行を削除して OK

export default function NavColumn() {          // ← ★ ここを “export default” に
  return (
    <nav className="navCol" aria-label="サイトメニュー">
      <ul>
        <br/><br/>
        <li><Link to="/">トップ</Link></li>
        <a href='/pages/Menu.html'>メニュー</a><br/><br/>
        <a href='/pages/Chef.html'>シェフ</a><br/><br/>
        <a href='/pages/Faq.html'>質問</a>
      </ul>
    </nav>
  );
}
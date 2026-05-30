import { Link } from 'react-router-dom';
import './NavColumn.css';

export default function NavColumn() {
  return (
    <aside className="rail">
      <div className="rail-num">No. 001</div>
      <Link to="/" className="rail-mark" aria-label="トップへ">
        ICHISARA
      </Link>
      <div className="rail-soc">
        <a href="https://www.instagram.com/ichisara240" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="tel:0434973630">043 · 497 · 3630</a>
      </div>
    </aside>
  );
}

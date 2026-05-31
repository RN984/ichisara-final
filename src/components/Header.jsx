import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const navItems = [
  { path: '/', jp: 'トップ', en: 'Top', end: true },
  { path: '/menu', jp: 'メニュー', en: 'Menu' },
  { path: '/chef', jp: 'シェフ', en: 'Chefs' },
  { path: '/gallery', jp: 'ギャラリー', en: 'Gallery' },
  { path: '/faq', jp: '質問', en: 'FAQ' },
];

const pageEnNames = {
  '/': 'Top', '/menu': 'Menu', '/chef': 'Chefs', '/gallery': 'Gallery', '/faq': 'FAQ',
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const close = () => setOpen(false);
  const goHome = () => { navigate('/'); close(); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <header className="siteHeader">
      <div className="siteHeaderInner">
        <div className="crumbs" onClick={goHome} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && goHome()}>
          <span>ICHISARA</span>
          <span className="sep">·</span>
          <strong>{pageEnNames[pathname] ?? 'Top'}</strong>
          <span className="sep">·</span>
          <span>Shisui, Chiba</span>
        </div>

        <nav className="nav" aria-label="サイトナビゲーション">
          {navItems.map(it => (
            <NavLink
              key={it.path}
              to={it.path}
              end={it.end}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {it.jp}
            </NavLink>
          ))}
        </nav>

        <div className="headRight">
          <a href="tel:0434973630" className="headPhone">043-497-3630</a>
          <a
            href="https://www.instagram.com/ichisara240"
            className="ctaWrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="cta">ご予約</span>
            <span className="ctaNote">Instagram DMで</span>
          </a>
          <button
            className={`navToggle ${open ? 'open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={open}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div className={`mobileNav ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="mobileNav-inner">
          {navItems.map(it => (
            <NavLink
              key={it.path}
              to={it.path}
              end={it.end}
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => { close(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <span className="jp">{it.jp}</span>
              <span className="en">{it.en}</span>
            </NavLink>
          ))}
          <a href="tel:0434973630" className="mobileNav-phone">📞 043-497-3630</a>
        </div>
      </div>
      <div className={`mobileNavBackdrop ${open ? 'open' : ''}`} onClick={close}></div>
    </header>
  );
}

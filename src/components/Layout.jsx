import Header from './Header';
import NavColumn from './NavColumn';
import { Outlet } from 'react-router-dom';
import '../index.css';

// ★ children を受け取れるようにする
export default function Layout({ children }) {
  return (
    <>
      <header className="header">
        <Header />
      </header>

      <div className="mainGrid">
        <nav className="navColumn">
          <NavColumn />
        </nav>

        <div className="mainContent">
          {/* ★ children があればそれを、なければ Outlet を表示 */}
          {children ?? <Outlet />}
        </div>
      </div>
    </>
  );
}

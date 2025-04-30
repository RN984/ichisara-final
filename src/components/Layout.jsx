import Header from './Header';
import NavColumn from './NavColumn';
import { Outlet } from 'react-router-dom';
import '../index.css';


export default function Layout() {
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
          <Outlet /> {/* ✅ ここを children → Outlet に修正！！ */}
        </div>
      </div>
    </>
  );
}

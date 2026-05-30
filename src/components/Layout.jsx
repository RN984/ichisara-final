import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavColumn from './NavColumn';
import Header from './Header';
import Footer from './Footer';
import '../index.css';

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.remove('in'));
    window.scrollTo({ top: 0, behavior: 'instant' });

    const root = document.documentElement;
    root.classList.add('js-reveal');
    root.classList.remove('reveal-failsafe');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      return;
    }

    const revealInView = () => {
      const vh = window.innerHeight;
      document.querySelectorAll('.reveal:not(.in)').forEach(el => {
        if (el.getBoundingClientRect().top < vh * 0.88) el.classList.add('in');
      });
    };

    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; revealInView(); });
    };

    const startRaf = requestAnimationFrame(() => requestAnimationFrame(revealInView));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    const failsafe = setTimeout(() => root.classList.add('reveal-failsafe'), 1600);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(startRaf);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [pathname]);

  return (
    <div className="layout">
      <NavColumn />
      <div className="content">
        <Header />
        {children ?? <Outlet />}
        <Footer />
      </div>
    </div>
  );
}

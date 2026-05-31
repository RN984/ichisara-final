import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.webp';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerInner">
        <div className="footer-brand">
          <img src={heroImg} alt="ICHISARA DINING HILLS CAFE" className="footer-logo" />
          <div className="brand-mark">ICHISARA</div>
          <div className="brand-sub">Dining Hills Cafe</div>
          <p>光が差し込む開放的な空間で、<br/>元ファーストクラスシェフの<br/>絶品グルメを。</p>
        </div>
        <div className="footer-col">
          <h4>Hours</h4>
          <ul>
            <li>Lunch  11:00 – 17:00</li>
            <li>Dinner 18:00 – 21:00</li>
            <li>L.O. (Lunch) 14:30</li>
            <li className="muted">Closed Tuesdays</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>Tel  043-497-3630</li>
            <li>Instagram  @ichisara240</li>
            <li>Dinner – 前日までの予約制</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Access</h4>
          <ul>
            <li>〒285-0911</li>
            <li>千葉県印旛郡酒々井町</li>
            <li>尾上 77-3</li>
            <li className="muted">酒々井 IC から 5 分</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© ICHISARA Dining Hills Cafe</span>
        <span>Shisui, Chiba · Japan</span>
      </div>
    </footer>
  );
}

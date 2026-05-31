import { Link } from 'react-router-dom';
import useSWR from 'swr';
import Updates from '../components/Updates';
import { allLunchesFromData } from '../utils/sheet';
import InstaFeed from '../components/InstaFeed';
import './Home.css';

import headerImg from '../assets/header.webp';
import humberger from '../assets/humberger.webp';
import instore from '../assets/Gallery/instore.webp';

const SHEET_ID = import.meta.env.VITE_SHEET_ID ?? '1PmoyxBgJjLUjbgjEKyUrpJ3xEdVXugq9tLbxRYzYwPw';
const fetcher = url => fetch(url).then(r => r.json());


function TodayCard({ data }) {
  const latest = allLunchesFromData(data);

  return (
    <article className="today-card">
      <div className="today-ribbon">Today</div>
      <div className="today-eyebrow"><span>Chef's Whim</span> · <span>気まぐれランチ</span></div>
      <h3 className="today-dish jp">{latest ? latest['本文'] : '本日の気まぐれランチ\nをご用意しています。'}</h3>
      <div className="today-foot">
        <span className="today-note">{latest ? '数量限定・先着順' : '店頭でご確認ください。'}</span>
      </div>
    </article>
  );
}

export default function Home({ hideCover = false }) {
  const { data } = useSWR(
    `https://opensheet.elk.sh/${SHEET_ID}/T_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B`,
    fetcher
  );

  const today = new Date();
  const todayLabel = today.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' });

  return (
    <>
      {/* Cover — fullscreen ICHISARA DINING HILLS image (App2/Home2内では非表示) */}
      {!hideCover && <section className="site-cover">
        <img src={headerImg} alt="ICHISARA DINING HILLS CAFE" />
        <div className="cover-scroll" aria-hidden="true">
          <span>scroll</span>
          <div className="cover-scroll-bar"></div>
        </div>
      </section>}

      {/* Hero */}
      <section className="hero">
        <div className="hero-frame">
          <img src={humberger} alt="ICHISARA ハンバーグ" />
          <div className="hero-overlay"></div>
          <div className="hero-text">
            <div>
              <div className="hero-tag">Signature · Hamburg Steak</div>
              <h1 className="hero-title jp">光が差し込む空間で、<em>元ファーストクラスシェフ</em>の一皿を。</h1>
            </div>
            <div className="hero-meta en">Est. 2024 · Shisui, Chiba</div>
          </div>
        </div>
      </section>

      {/* News & Today */}
      <div className="shell">
        <section className="sec-news reveal">
          <div className="section-tag">
            <span className="st-num">01</span>
            <span className="st-label">News &amp; Today</span>
            <span className="st-rule"></span>
            <span className="st-date">{todayLabel}</span>
          </div>
          <div className="news-layout">
            <TodayCard data={data} />
            <Updates />
          </div>
        </section>
      </div>

      {/* Feature quote */}
      <div className="shell">
        <section className="sec-quote reveal">
          <div className="feature-quote">
            <div className="fq-image">
              <img src={instore} alt="光が差し込む店内" />
            </div>
            <blockquote className="fq-text jp">
              <span className="fq-quote" aria-hidden="true">"</span>
              光が差し込む、<br/>
              <span style={{ color: 'var(--green)' }}>温かなテーブル</span>。<br/>
              ファーストクラスで磨いた一皿を、<br/>
              ふらりと普段着で。
              <cite>— From the Chef</cite>
            </blockquote>
          </div>
        </section>
      </div>

      {/* Info + Instagram */}
      <div className="shell">
        <div className="home-split">
          <aside className="reveal">
            <div className="info-block">
              <div className="info-label">Reservation</div>
              <div className="info-body">
                <strong>ご予約方法</strong><br/>
                <a href="tel:0434973630">📞 043-497-3630</a><br/>
                <a href="https://www.instagram.com/ichisara240" target="_blank" rel="noopener noreferrer">💬 Instagram DM</a><br/>
                <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>※ ディナーは前日までのご予約制</span>
              </div>
            </div>
            <div className="info-block">
              <div className="info-label">Hours</div>
              <dl className="info-hours">
                <dt>Lunch</dt>  <dd>11:00 – 17:00<br/><span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>L.O. 14:30</span></dd>
                <dt>Dinner</dt> <dd>18:00 – 21:00</dd>
                <dt>Closed</dt> <dd>火曜日</dd>
              </dl>
            </div>
            <div className="info-block">
              <div className="info-label">Access</div>
              <div className="info-body">
                〒285-0911<br/>
                <a href="https://maps.app.goo.gl/1xjnVfYvYMPf9WFR8" target="_blank" rel="noopener noreferrer">千葉県印旛郡酒々井町尾上 77-3</a><br/>
                <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>酒々井 IC から 5 分 / 成田空港 NRT から 20 分</span>
              </div>
            </div>
          </aside>
          <InstaFeed />
        </div>
      </div>

    </>
  );
}


import hero from '../assets/hero.webp';
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="heroSection">
      
       {/*イチサラ紹介*/}
      <div className="heroItem">
        <img src={hero} alt="ICHISARA 看板" width='100%'/>
        <p>
  <span>酒々井町　ICHISARA DINING HILLS CAFE</span><br /><br/>
  伝説のファーストクラスシェフによる美食の饗宴<br/><br/>
  ひとさらひとさらに想いを込めて、皆様に笑顔と感動をお届けします。
</p>

      </div>

      {/*予約方法*/}
      <div className="heroItem contact">
        <h1><br/>ご予約方法</h1>
        <a href="tel:04734973630" className="phoneResevation">📞電話で予約する<br/></a>
        <a href="https://www.instagram.com/ichisara240" className="instagramResevation">💬DMで予約する</a>
      </div>
      {/*アクセス　住所、電話番号など*/}
      <div className="heroItem-map">
        <h1><br/>アクセス</h1>
        <span>住所：
        </span>
        <a href = 'https://maps.app.goo.gl/1xjnVfYvYMPf9WFR8' 
        className='mapLink'><br/>〒285-0911<br/>千葉県印旛郡酒々井町尾上77-3<br/></a>
        <span>
         TEL：<br/>
        </span>
        <a href="tel:04734973630" className="phoneNb">043-497-3630</a>
        <span>
        <br/> 営業時間：<br/>11:00-17:00<br/>L.O. 14:30（フードのみ）<br/>
         定休日：火曜日<br/></span>
      </div>
    </section>
  );
}
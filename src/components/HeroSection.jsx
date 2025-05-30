{/*ホームページ左カラム */}


import hero from '../assets/hero.webp';
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="heroSection">
      
       {/*イチサラ紹介*/}
      <div className="heroItem">
        <img src={hero} alt="ICHISARA 看板" width='100%'/>
        <p>
  <span>光が差し込む開放的な空間で、<strong>元ファーストクラスシェフ</strong>の絶品グルメを。</span><br /><br/>
  <strong>千葉県酒々井町</strong>の話題のカフェで心ほどける贅沢なひとときをお過ごしください。
</p>

      </div>

      {/*予約方法*/}
      <div className="reservation">
        <h1><br/>ご予約方法</h1>
        <a href="tel:04734973630" className="phoneResevation">📞電話で予約する<br/></a>
        <a href="https://www.instagram.com/ichisara240" className="instagramResevation">💬DMで予約する</a>
      </div>
      {/*アクセス　住所、電話番号など*/}
      <div className="address">
        <h1><br/>アクセス</h1>
        <span>住所：
        <a href = 'https://maps.app.goo.gl/1xjnVfYvYMPf9WFR8' 
        className='mapLink'><br/>〒285-0911<br/>千葉県印旛郡酒々井町尾上77-3<br/></a>
      
         TEL：<br/>
        
        <a href="tel:04734973630" className="phoneNb">043-497-3630</a><br/><br/>
        定休日：火曜日<br/>
        <br/> 営業時間：<br/>11:00-17:00<br/>
        18:00-21:00<br/><br/>
        ※ランチのラストオーダーは14:30です<br/>※ディナーは前日までの予約制です<br/>
         <br/></span>
      </div>
    </section>
  );
}
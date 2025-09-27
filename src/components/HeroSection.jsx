{/*ホームページ左カラム */}


import hero from '../assets/hero.webp';
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="heroSection">
      
       {/*イチサラ紹介*/}
      <div className="heroItem">
        <img src={hero} alt="イチサラ 看板" width='100%'/>
        <p>
  <span>光が差し込む開放的な空間で、<strong>元ファーストクラスシェフ</strong>の絶品グルメを。</span>
</p>
      </div>
      <p className='herodetail'>
<br/>定休日：火曜日<br/>
        <br/> 営業時間：<br/>11:00-17:00<br/>
        18:00-21:00<br/>
        
        ※ランチのラストオーダーは14:30です<br/>※ディナーは前日までの予約制です
         </p>
      
      {/*予約方法*/}
      <div className="reservation">
        <h3>ご予約方法</h3>
        <a href="tel:0434973630" className="phoneResevaßtion">📞電話で予約する<br/></a>
        <a href="https://www.instagram.com/ichisara240" className="instagramResevation">💬DMで予約する</a>
      </div>
      {/*アクセス　住所、電話番号など*/}
      <div className="address">
        <h3>アクセス</h3>
        
        <span>
          TEL：<br/>     
        <a href="tel:0434973630" className="phoneNb">043-497-3630</a><br/><br/>住所：
        <a href = 'https://maps.app.goo.gl/1xjnVfYvYMPf9WFR8' 
        className='mapLink'><br/>〒285-0911<br/>千葉県印旛郡酒々井町尾上77-3<br/></a>
        </span>

      <span>
         <br/>

        <p className='herodetail'>
         酒々井インターチェンジを降りて車で 5 分<br/>
         酒々井プレミアム・アウトレットから車で 6 分<br/>
         成田国際空港 (NRT) から車で約 20 分<br/><br/>
         最寄り駅 :<br/> JR成田線「酒々井駅」<br/>京成本線「京成酒々井駅」<br/>JR総武本線「南酒々井駅」
</p>
        </span>
      </div>
    </section>
  );
}
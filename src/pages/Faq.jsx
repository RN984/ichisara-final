
import "./Faq.css";

import PageTitle from "../components/PageTitle";
import titleFaq from '../assets/titles/titleFaq.webp';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Faq() {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash?.replace('#', '');
    if (id) {
      // 遅延してスクロールすることで「描画が終わってから動作」させる
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50); // 50ms 遅延（ここが超重要！！）
    }
  }, [location]);

  return (

<div className="mainContent">

              <div className="pageTitleWrapper">
                <PageTitle src={titleFaq} alt='FAQページのタイトル'/>
                </div>

        {/* カテゴリ一覧（アンカーリンク） */}
        <div className="faqNav">
          <a href="#reservation">予約</a> 
          <a href="#pet">ペット同伴</a> 
          <a href="#payment">お支払いについて</a>
          <a href="#others">その他</a>
        </div>

        {/* 各カテゴリごとのFAQセクション */}
        <section id="reservation" className="faqSection">

          <div className="faqItem">
            <h3>◉ランチの予約</h3>
            <p>混雑しますと長時間待っていただくことになりますので、お時間と人数が決まっていましたら
              ご予約をお勧めしております。
              <a href="https://www.instagram.com/ichisara240" className="instagramResevation">インスタグラム</a>
              のDM、お急ぎの方は
              <a href="tel:04734973630" className="phoneNb">お電話</a>
              からご予約お待ちしております。
              また、混雑具合は日によりますので、ご予約されていないお客様もお気軽にお越しください。
            </p>
          </div>


          <div className="faqItem">
            <h3>◉ディナーの予約</h3>
            <p>ディナーは前日までのご予約が必須です。忘れずにご予約お願いします。</p>
          </div>


              <div className="faqItem">
            <h3>◉限定メニューの予約</h3>
            <p>イチサラでは、限定メニューとして２０食限定の「ICHISARAハンバーグ」、「ICHISARA和風ハンバーグ」、
              数量限定の「シェフの気まぐれランチ」がございますが、
              気まぐれランチのみ先着順となっております。
              ハンバーグはご予約可能なので、お席ご予約の際にスタッフにお伝えください。
            </p>
          </div>

          </section>
              

          <section id='pet' className="faqSection">
            <div className="faqItem">
            <h3>◉ペットの同伴</h3>
                <p>ランチタイムはテラス席でしたら可能です。ディナータイムの場合は初めにご予約されたお客様が
                  わんちゃん同伴希望でしたら、店内でも同伴可能に致します。ディナータイム、わんちゃん同伴希望
                  の方はお早めのご予約をお勧めいたします。また↓の注意点に目を通していただけますと幸いです。</p>
            
            <h3>※わんちゃんと店内ご利用際の注意</h3>  
                <p>・ペットカート、キャリーバッグ、スリングのご利用をお願いします。<br/>
                ・食品衛生上、人間用の食器やカトラリーをわんちゃんに使わないようお願いします。<br/>
                ・衛生の問題上、椅子やテーブルの上に乗せないようお願いします。<br/>
                ・おトイレはご来店前に済ませてからご利用ください。<br/>
                ・ノミ、ダニ予防は済ませてからお越しください。<br/>
                ・予防接種（狂犬病など）１年以内にワクチンを接種していない場合はご来店できません。</p>  
            </div>
            </section>


        <section id="payment" className="faqSection">
          <div className="faqItem">
          <h3>◉お支払い</h3>
          <p>現金、各種カード、PayPayがご利用できます。</p>
          </div>
        </section>

          
        <section id="others" className="faqSection">
          <div className="faqItem">
            <h3>◉誕生日のお祝いなどメッセージプレートについて</h3>
            <p>２種類ございます。<br/><br/>食後に堂島ロール(&nbsp;400&nbsp;円)を注文していただき、<br/>
            ①そのお皿にメッセージを入れる（&nbsp;+300&nbsp;円）<br/>
            ②メッセージ＋オレンジカップ（オレンジの皮を切り細工し、中をくり抜き、フルーツやアイスなどをトッピング）
            （&nbsp;+1100&nbsp;円）<br/><br/>
            ご希望の方をご予約時にスタッフにお伝えください。
            名前（平仮名）をメッセージに入れることも可能です。
            </p>
          </div>
          
          <div className="faqItem">
            <h3>◉車椅子、ベビーカー</h3>
            <p>店内、テラス席どちらも歓迎しております。
            </p>
            </div>


          <div className="faqItem">
          <h3>◉駐車場</h3>
          <p>店舗前の駐車場はn台駐車可能です。店舗前の駐車場が満車の場合、スタッフまでご連絡ください。
          </p>
          </div>

          <div className="faqItem">
            <h3>◉混雑時のお願い</h3>
            <p>混雑時はお料理提供に時間がかかる場合がございます。あらかじめご了承くださいませ。
              大変心苦しいですが、他のお客様が待っていらっしゃる場合は、２時間程度の滞在時間にご協力を
              お願い致しております。
            </p>
          </div>

        

          </section>
        </div>
        );
      };
  
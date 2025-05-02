import useSWR from 'swr';
import titleN from '../assets/titleN.webp';
import './Updates.css';

const SHEET_API = import.meta.env.VITE_SHEET_API;
const fetcher = url => fetch(url).then(r => r.json());

//データ取得
export default function Updates() {
  const { data, error } = useSWR(SHEET_API, fetcher);

//改行処理 
  const renderMultiline = (text) => {
    if (!text) return null;
    return text.split(/\r?\n/).map((line, idx) => (
      <span key={idx}>{line}<br /></span>
    ));
  };

  //カテゴリ分け
  const grouped = {
    'シェフの気まぐれランチ': [],
    '臨時休業': [],
    '営業日の変更': [],
    'その他': [],
  };

  //今日の日付と火曜（定休日）かどうか
  const today = new Date().toISOString().slice(0, 10); 
  const isTuesday = new Date().getDay() === 2;

  let todaysNotice = null;
  let todaysLunch = null;

    if (data) {
      data.forEach(item => {
        const type = item.type || 'その他';
        if (grouped[type]) grouped[type].push(item);
      });

      //今日が休みか
      const matched = grouped['営業日の変更'].find(item => item.date === today);
    if (matched) {
      todaysNotice = `今日は ${matched.title} です。`;
    }
  }
    if (isTuesday) {
      todaysNotice = '今日は 定休日です。';
    }

    // 今日以前のランチから最新1件だけ取得
    if(data){
    const pastLunches = grouped['シェフの気まぐれランチ']
      .filter(item => item.date && new Date(item.date) <= new Date(today))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    todaysLunch = pastLunches[0] || null;
    }

    return (
    
      <div className="updatesSection"> 
      {/*今日のお知らせ 営業日について　*/}
      {todaysNotice && (
        <p className="todayNotice">{todaysNotice}</p>
      )}

        {/*見出し画像 */}
        <div className="updatesHeadingWrapper">
          <img src={titleN} alt="最新投稿" loading="lazy" className="updatesHeadingImg" />
        </div>
  
        {/*  気まぐれランチ */}
        {todaysLunch?.title && (
          <section>
            <h2 className="updatesCategoryTitle">
              {new Date().toLocaleDateString('ja-JP', {
                month: 'long',
                day: 'numeric',
              })} の気まぐれランチ 
          </h2>
          <ul className="updatesList">
            <p className="lunchText">
              {todaysLunch.link
                ? <a href={todaysLunch.link}>{todaysLunch.title}</a>
                : todaysLunch.title}
            </p>
          </ul>
        </section>
      )}

      {/* 営業日の変更 */}
      {grouped['営業日の変更'].some(it => it.title || it.link) && (
        <section>
          <h2 className="updatesCategoryTitle">営業日の変更</h2>
          <ul className="updatesList">
            {grouped['営業日の変更'].map((it, idx) => (
              <li key={`change-${idx}`} className="dayoffText">
                <strong>{new Date(it.date).toLocaleDateString('ja-JP', {
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short',
                })}</strong>：{renderMultiline(it.title)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* その他 */}
      {grouped['その他'].some(it => it.title || it.link) && (
        <section>
          <h2 className="updatesCategoryTitle">その他</h2>
          <ul className="othersList">
            {grouped['その他']
            .filter(it => it.title || it.link)
            .map((it, idx)=> (
              <li key={`other-${idx}`} className="othersText">
                {it.link
                  ? <a href={it.link}>{renderMultiline(it.title)}</a>
                  : renderMultiline(it.title)}
              </li>
            ))} 
          </ul>
         
        </section>
      )}
    </div>
    );
  }
//SHEET_API　str Google SheetsのAPI（url)
//fetcher func フェッチ関数
//renderMultiline func 改行レンタリング

//todayStr　Str [today]→YYYY/M/D形式の今日の日付 
//isTuesday boolean [today]→今日が火曜か
  //today　Date 今日の日付

//cleanDate func　[dateStr]→item.dateをYYYY/M/D形式に統一
  //dateStr str 呼び出し元(item.date)から渡される日付文字列
  //parts arr [dateStr]の/または-で分割した配列

//grouped obj データをカテゴリ(type)別に仕分け
//todaysNotice str 今日のお知らせのメッセージテキスト
//todaysLunch　obj　最新の気まぐれランチデータ
//todaysChanges Arr　今日の営業日の変更のタイトルリスト
//todaysOthers　Arr　今日のその他カテゴリのタイトルリスト
//allLunches　Arr ランチデータの日付降順

import useSWR from 'swr';
import titleNews from '../assets/titles/titleNews.webp';
import './Updates.css';

const SHEET_API = import.meta.env.VITE_SHEET_API;
const fetcher = url => fetch(url).then(r => r.json());

export default function Updates() {
  const { data, error } = useSWR(SHEET_API, fetcher);

  const renderMultiline = (text) => {
    if (!text) return null;
    return text.split(/\r?\n/).map((line, idx) => (
      <span key={idx}>{line}<br /></span>
    ));
  };
 
  const today = new Date();
  const todayStr = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;
  const isTuesday = today.getDay() === 2;

  const cleanDate = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split(/[\/\-]/);
    if (parts.length !== 3) return null;
    return `${parts[0]}/${Number(parts[1])}/${Number(parts[2])}`;
  }

  const grouped = {
    'シェフの気まぐれランチ': [],
    '営業日の変更': [],
    'その他': [],
  };

  let todaysNotice = '';
  let todaysLunch = null;

  if (data) {
    data.forEach(item => {
      const type = item.type || 'その他';
      if (grouped[type]) {
        grouped[type].push(item);
      }
    });

    const todaysChanges = grouped['営業日の変更']
      .filter(item => cleanDate(item.date) === todayStr)
      .map(item => item.title)
      .filter(Boolean);

    const todaysOthers = grouped['その他']
      .filter(item => cleanDate(item.date) === todayStr)
      .map(item => item.title)
      .filter(Boolean);

    if (todaysChanges.length > 0) {
      todaysNotice += `【営業日の変更】本日は ${todaysChanges.join('、')} です。\n`;
    }

    if (todaysOthers.length > 0) {
      todaysNotice += `【本日】${todaysOthers.join('、')}`;
    }

    if (!todaysNotice && isTuesday) {
      todaysNotice = '本日は 定休日です。';
    }

    if (!isTuesday && data) {
      const allLunches = grouped['シェフの気まぐれランチ']
    .filter(item => cleanDate(item.date))
    .sort((a, b) => new Date(cleanDate(b.date)) - new Date(cleanDate(a.date)));

  todaysLunch = allLunches[0] || null;
}
    
  }

  return (
    <div className="updatesSection">
      <div className="updatesHeadingWrapper">
        <img src={titleNews} alt="最新投稿" loading="lazy" className="updatesHeadingImg" />
      </div>

      {/* 今日のお知らせ */}
      {todaysNotice && (
        <p className="todaysNotice">{renderMultiline(todaysNotice)}</p>
      )}

      {/* 気まぐれランチ */}
      {todaysLunch?.title && (
  <section>
    <h2 className="updatesCategoryTitle">
      {new Date(cleanDate(todaysLunch.date)).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })} の気まぐれランチ
    </h2>

    <ul className="updatesList">
  <li className="lunchText">
    {todaysLunch.link
      ? <a href={todaysLunch.link}>{todaysLunch.title}</a>
      : todaysLunch.title}
  </li>
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
                <strong>{new Date(cleanDate(it.date)).toLocaleDateString('ja-JP', {
                  month: 'long', day: 'numeric', weekday: 'short',
                })}</strong>：{renderMultiline(it.title)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* その他 */}
      {grouped['その他'].some(it => it.title || it.link) && (
        <section>
          <h2 className="updatesCategoryTitle">お知らせ</h2>
          <ul className="othersList">
            {grouped['その他']
              .filter(it => it.title || it.link)
              .map((it, idx) => (
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
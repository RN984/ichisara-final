import useSWR from 'swr';
import titleN from '../assets/titleN.webp';
import './Updates.css';

const SHEET_API = import.meta.env.VITE_SHEET_API;
const fetcher = url => fetch(url).then(r => r.json());

export default function Updates() {
  const { data, error } = useSWR(SHEET_API, fetcher);

  if (error) return <p>読み込み失敗</p>;

  // ここから↓↓
  const grouped = {};

  if (data) {
    data.forEach(item => {
      const type = item.type || 'その他'; // 種類がなければ「その他」
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push(item);
    });
  }

  return (
    <div className="updatesSection">
      <div className="updatesHeadingWrapper">
        <img src={titleN} alt="最新投稿" loading="lazy" className="updatesHeadingImg" />
      </div>

      {data ? (
        Object.entries(grouped).map(([type, items]) => (
          <section key={type}>
            <h2 className="updatesCategoryTitle">{type}</h2> {/* ← カテゴリ名 */}
            <ul className="updatesList">
              {items.map(it => (
                <li key={it.date + it.title}>
                  {it.img && (
                    <img src={it.img} alt={it.title} width="72" height="72" />
                  )}
                  <span>
                    {new Date(it.date).toLocaleDateString('ja-JP', {
                      month: 'numeric',
                      day: 'numeric',
                    })}
                    &nbsp;–&nbsp;
                  </span>
                  {it.link ? <a href={it.link}>{it.title}</a> : it.title}
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <p>ただいま準備中です</p>
      )}
    </div>
  );
}


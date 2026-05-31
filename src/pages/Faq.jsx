import useSWR from 'swr';
import './Faq.css';

const SHEET_ID = import.meta.env.VITE_SHEET_ID ?? '1nqLq1P4rfE-I7E4J8QBZGA-to1lXBmBHDmx5Fx9Bdjg';
const CAT_URL = `https://opensheet.elk.sh/${SHEET_ID}/M_FAQ%E3%82%AB%E3%83%86%E3%82%B4%E3%83%AA`;
const FAQ_URL = `https://opensheet.elk.sh/${SHEET_ID}/T_FAQ`;

// スプシ取得前 / 取得失敗時に表示する静的フォールバック
const fallbackSections = [
  {
    id: 'reservation', jp: '予約について', en: 'Reservation',
    items: [
      { q: 'ランチの予約はできますか?', a: '混雑時は長時間お待ちいただく場合がございます。お時間と人数が決まっていましたら、Instagram の DM またはお急ぎの方はお電話よりご予約をお勧めしております。ご予約なしでのご来店も大歓迎です。' },
      { q: 'ディナーは予約必須ですか?', a: 'ディナーは前日までのご予約が必須です。お忘れなく。' },
      { q: '限定メニューは予約できますか?', a: 'ICHISARA ハンバーグ・和風ハンバーグ（各 20 食）はご予約可能です。シェフの気まぐれランチは先着順となります。' },
    ],
  },
  {
    id: 'pet', jp: 'ペット同伴', en: 'With Pets',
    items: [
      { q: 'ワンちゃんと一緒に入れますか?', a: 'ランチタイムはテラス席なら可能です。ディナータイムは、初めにご予約されたお客様がワンちゃん同伴希望の場合、店内可となります。お早めのご予約をお勧めいたします。' },
      { q: 'ご利用の際のお願い', a: 'ペットカート / キャリーバッグ / スリングのご利用、椅子やテーブルの上に乗せない、トイレは事前に、ノミダニ予防 / 1 年以内の予防接種をお願いいたします。' },
    ],
  },
  {
    id: 'payment', jp: 'お支払い', en: 'Payment',
    items: [
      { q: '使えるお支払い方法は?', a: '現金 / 各種カード / PayPay がご利用いただけます。' },
    ],
  },
  {
    id: 'others', jp: 'その他', en: 'Other',
    items: [
      { q: 'メッセージプレートはありますか?', a: '2 種類あります。堂島ロール（¥500）＋メッセージ（¥300）または ＋オレンジカップ（¥1,100）。名前（ひらがな）も可能です。' },
      { q: '車椅子・ベビーカーで入れますか?', a: '店内・テラス席どちらも歓迎しております。' },
      { q: '駐車場はありますか?', a: '店舗前に 14 台駐車可能です。満車の場合はスタッフまで。' },
      { q: '混雑時はどうすれば?', a: '事前ご予約がおすすめです。当日・お急ぎの方はお電話でご連絡ください。ご予約なしの来店も大歓迎です。' },
    ],
  },
];

// スプシの2シート（カテゴリ・項目）から表示用 sections を組み立てる。
// 取得できない / 空のときは null を返し、呼び出し側でフォールバックする。
function buildSections(cats, faqs) {
  if (!Array.isArray(cats) || !Array.isArray(faqs)) return null;

  const liveCats = cats
    .filter(c => c['削除'] !== 'TRUE' && c['ID'])
    .sort((a, b) => (Number(a['並び替え']) || 0) - (Number(b['並び替え']) || 0));

  const liveFaqs = faqs.filter(f => f['削除'] !== 'TRUE');

  const sections = liveCats
    .map(c => ({
      id: c['ID'],
      jp: c['カテゴリ'] || '',
      en: c['英語表記'] || '',
      items: liveFaqs
        .filter(f => f['カテゴリ'] === c['ID'])
        .map(f => ({ q: f['タイトル'] || '', a: f['本文'] || '' })),
    }))
    .filter(s => s.items.length > 0);

  return sections.length > 0 ? sections : null;
}

function FaqItem({ q, a }) {
  return (
    <details className="faq-item">
      <summary>
        <span className="faq-q">{q}</span>
        <span className="faq-toggle">+</span>
      </summary>
      <p>{a}</p>
    </details>
  );
}

export default function Faq() {
  const { data: cats } = useSWR(CAT_URL);
  const { data: faqs } = useSWR(FAQ_URL);

  const sections = buildSections(cats, faqs) ?? fallbackSections;

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-text">
          <div className="eyebrow">FAQ · 05</div>
          <h1>よくあるご質問</h1>
          <div className="en-name">Frequently Asked Questions</div>
        </div>
      </div>

      <div className="shell" style={{ paddingTop: 24, paddingBottom: 100 }}>
        <nav className="faq-nav" aria-label="FAQ カテゴリ">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
              {s.jp}
            </a>
          ))}
        </nav>

        {sections.map((s, si) => (
          <section className="faq-section" id={s.id} key={s.id}>
            <h2>
              <span className="en-caps">{`0${si + 1} · ${s.en}`}</span>
              {s.jp}
            </h2>
            <div style={{ marginTop: 24 }}>
              {s.items.map((it, i) => <FaqItem key={i} {...it} />)}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

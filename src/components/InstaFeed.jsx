import useSWR from 'swr';
import './InstaFeed.css';

const SHEET_ID = import.meta.env.VITE_SHEET_ID ?? '1PmoyxBgJjLUjbgjEKyUrpJ3xEdVXugq9tLbxRYzYwPw';
const fetcher = url => fetch(url).then(r => r.json());

export default function InstaFeed() {
  const { data } = useSWR(
    `https://opensheet.elk.sh/${SHEET_ID}/T_%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0`,
    fetcher
  );

  const loading = data === undefined;
  const posts = Array.isArray(data)
    ? data.filter(r => r['削除'] !== 'TRUE')
    : [];

  return (
    <div className="insta-col reveal">
      <div className="insta-head">
        <div>
          <div className="section-eyebrow">@ichisara240</div>
          <h3 className="section-title" style={{ marginTop: 4, fontSize: 24 }}>Instagram</h3>
        </div>
        <a
          href="https://www.instagram.com/ichisara240"
          target="_blank"
          rel="noopener noreferrer"
          className="en-caps"
          style={{ fontSize: 11, color: 'var(--green)', textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          View Feed →
        </a>
      </div>
      <div className="insta">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="insta-skeleton" />
            ))
          : posts.map((p, i) => {
              const src = p['サムネイル URL'];
              const href = p['URL'];
              if (!src) return null;
              if (href && !/^https?:\/\//.test(href)) return null;
              return (
                <a key={p['ID'] ?? i} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Instagram post ${i + 1}`}>
                  <img src={src} alt={`イチサラ Instagram ${i + 1}`} loading="lazy" decoding="async" />
                </a>
              );
            })
        }
      </div>
    </div>
  );
}

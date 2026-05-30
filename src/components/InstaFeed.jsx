import './InstaFeed.css';

const posts = [
  { url: 'https://www.instagram.com/ichisara240/p/DITR3bBp6L-/', thumb: '/insta/insta1.webp' },
  { url: 'https://www.instagram.com/ichisara240/p/C4FPs0CvB-B/', thumb: '/insta/insta2.webp' },
  { url: 'https://www.instagram.com/ichisara240/reel/DIwLSphPBEr/', thumb: '/insta/insta3.webp' },
];

export default function InstaFeed() {
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
        {posts.map((p, i) => (
          <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram post ${i + 1}`}>
            <img src={p.thumb} alt={`イチサラ Instagram ${i + 1}`} loading="lazy" decoding="async" />
          </a>
        ))}
      </div>
      <div className="insta-foot">最新の一皿とテラスの様子は Instagram で。</div>
    </div>
  );
}

import './InstaFeed.css';
import titleI from '../assets/titleI.webp';


const posts = [
  {
    url: 'https://www.instagram.com/ichisara240/p/DITR3bBp6L-/',
    thumb: '/insta/insta1.webp',
  },
  {
    url: 'https://www.instagram.com/ichisara240/p/C4FPs0CvB-B/',
    thumb: '/insta/insta2.webp',
  },
  {
    url: 'https://www.instagram.com/ichisara240/reel/DIwLSphPBEr/',
    thumb: '/insta/insta3.webp',
  },
];

export default function InstaFeed() {
  return (
    <section className="instaSection">
      <div className="instaHeadingWrapper">
        <img
          src={titleI}
          alt="Instagram見出し"
          className="instaHeadingImg"
          loading="lazy"
        />
      </div>
      <div className="instaGrid">
        {posts.map((post, i) => (
          <a
            key={i}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram post ${i + 1}`}
          >
            <img
              src={post.thumb}
              alt={`Instagram thumbnail ${i + 1}`}
              loading="lazy"
              decoding="async"
              fetchpriority="low"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
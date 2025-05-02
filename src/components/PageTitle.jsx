import '../components/PageTitle.css';

export default function PageTitle({ src, alt }) {
    return (
      <div className="pageTitle">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    );
  }
import HeroSection from '../components/HeroSection';
import Updates from '../components/Updates';
import InstaFeed from '../components/InstaFeed';
import './Home.css'
import PageTitle from '../components/PageTitle';
import titleHp from '../assets/titles/titleHp.webp';
import { Link } from "react-router-dom";

  export default function Home () {

  return (
    <>
      <div className='pageTitleWrapper'>
        <PageTitle src={titleHp} alt='ICHISARA DINING HILLS CAFE イチサラ'/>
      </div>

      <div className='contentGrid'>
        <div className='heroColumn'>
          <HeroSection />
        </div>
        <div className="updatesColumn">
          <Updates />
          <InstaFeed />
          <div className="galleryLinkBtn">
          <Link to="/gallery"   aria-label="ギャラリーを見る">
            ▷ フォトギャラリーを見る
          </Link>
          </div>
        </div>
      </div>
    </>
  );
}

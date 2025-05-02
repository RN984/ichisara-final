import HeroSection from '../components/HeroSection';
import Updates from '../components/Updates';
import InstaFeed from '../components/InstaFeed';
import './Home.css'
import PageTitle from '../components/PageTitle';
import titleHp from '../assets/titles/titleHp.webp';

  export default function Home () {

  return (
    <>
      <div className='pageTitleWrapper'>
        <PageTitle src={titleHp} alt='ホームページタイトル'/>
      </div>

      <div className='contentGrid'>
        <div className='heroColumn'>
          <HeroSection />
        </div>
        <div className="updatesColumn">
          <Updates />
          <InstaFeed />
        </div>
      </div>
    </>
  );
}

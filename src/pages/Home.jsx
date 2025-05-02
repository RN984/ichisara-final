import HeroSection from '../components/HeroSection';
import Updates from '../components/Updates';
import InstaFeed from '../components/InstaFeed';
import './Home.css'

  export default function Home () {

  return (
    <>
      <div className='pageTitleWrapper'>
        <h1 className="pageTitleText">トップページ</h1>
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

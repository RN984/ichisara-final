import Home from '/pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Chef from './pages/Chef.jsx';
import Faq from './pages/Faq.jsx';
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom'; // ✅ npmインストール済であること！

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/chef" element={<Chef />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </HashRouter>
  );
}
import Home from '/pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Chef from './pages/Chef.jsx';
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom'; 

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/chef" element={<Chef />} />
      </Routes>
    </HashRouter>
  );
}
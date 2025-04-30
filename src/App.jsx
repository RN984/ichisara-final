import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Chef from './pages/Chef.jsx';
import Faq from './pages/Faq.jsx';

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="chef" element={<Chef />} />
            <Route path="faq" element={<Faq />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
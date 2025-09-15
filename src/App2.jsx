import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import Layout from './components/Layout.jsx';
import Home2 from './pages/Home2.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Chef from './pages/Chef.jsx';
import Faq from './pages/Faq.jsx';
import Gallery from './pages/Gallery.jsx';


export default function App2() {
      useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  return (
    
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route index element={<Home2 />} /> 
        <Route path="gallery" element={<Gallery />} />     
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

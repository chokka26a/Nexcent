import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Product from './pages/Product';
import Feature from './pages/Feature';
import Service from './pages/Service';
import FAQ from './pages/FAQ';
import Testimonial from './pages/Testimonial';

import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PageUnderConstruction from './pages/PageUnderConstruction';

export default function App() {
  return(
    <BrowserRouter>
     <Header />
      <Routes>

            {/* Default root page */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />

            <Route path="/service" element={<PageUnderConstruction pageTitle="Service" />} />
            <Route path="/feature" element={<PageUnderConstruction pageTitle="Feature" />} />
            <Route path="/product" element={<PageUnderConstruction pageTitle="Product" />} />
            <Route to="/testimonial" element={<Testimonial />}/>
            <Route path="/faq" element={<FAQ />} />

            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            
      </Routes>
     <Footer />
   </BrowserRouter>
  );

}
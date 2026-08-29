
// src/components/Footer.jsx

import { useState } from 'react';
import '../App.css';
import './Footer2.css';

import logoImg from '../assets/Iconimg.png';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';



// Import AuthContext hook
import AuthModal from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';
import { Link, Routes, Route } from 'react-router-dom';



// Import FAQ component

export default function Footer() {
  return (
    <div>
    {/* Footer Page Routes */}
       <footer className="footer">
        <nav className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </footer>
    </div>

  );
}







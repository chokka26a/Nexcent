import React from 'react';
import './App.css';
import logoImg from './assets/Iconimg.png';
import footerImg from './assets/Footer.png';
import { useAuth } from './context/AuthContext';

export default function FAQ({ onNavigateHome }) {
  const { user, logout } = useAuth() || {};

  // Extract userId/name from query string if available
  const queryParams = new URLSearchParams(window.location.search);
  const activeUserId = queryParams.get('userId') || user?.id;
  const activeUserName = user?.name || (activeUserId ? `User (${activeUserId})` : null);



  return (
    <div className="landing-container">
      {/* 1. Navbar Layout (Matching Home Page) */}
      <header className="navbar">
        <div className="logo" onClick={onNavigateHome} style={{ cursor: 'pointer' }}>
          <img src={logoImg} alt="Nexcent Logo" className="logo-img" />
          <span>Nexcent</span>
        </div>

        <nav className="nav-links">
          <span onClick={onNavigateHome}>Home</span>
          <span onClick={onNavigateHome}>Service</span>
          <span onClick={onNavigateHome}>Feature</span>
          <span onClick={onNavigateHome}>Product</span>
          <span onClick={onNavigateHome}>Testimonial</span>
          <span className="active-link">FAQ</span>
        </nav>

        <div className="nav-actions">
          {activeUserName ? (
            <div className="user-profile">
              <span className="welcome-text">Hi, {activeUserName}</span>
              {logout && <button className="btn-secondary" onClick={logout}>Logout</button>}
            </div>
          ) : (
            <span className="link-text" onClick={onNavigateHome}>
              Sign In / Register
            </span>
          )}
        </div>
      </header>

      {/* 2. Main FAQ Content */}
      <main>
        <section className="section-container bg-light faq-hero-section">
          <div className="faq-wrapper">
            <h1 className="hero-title">
              Client <span className="text-primary">Testimonials</span>
            </h1>
            <p className="hero-subtitle">
              Page under construction.
            </p>
          
          </div>
        </section>

        {/* Footer layout matching Home */}
        <section className="section-container">
          <img src={footerImg} alt="Footer Layout" className="full-width-img" />
        </section>
      </main>
    </div>
  );
}
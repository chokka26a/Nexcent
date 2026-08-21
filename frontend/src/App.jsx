import React, { useState } from 'react';
import './App.css';

// Import local Figma section assets
import logoImg from './assets/Iconimg.png';
import clientsImg from './assets/Clients.png';
import communityImg from './assets/Community.png';
import achievementsImg from './assets/Achievements.png';
import calendarImg from './assets/Calender.png';
import customersImg from './assets/Customers.png';
import communityUpdatesImg from './assets/CommunityUpdates.png';

// Import AuthContext hook
import { useAuth } from './context/AuthContext'; 

export default function App() {
  const { user, logout } = useAuth() || {}; 
  const [authMode, setAuthMode] = useState(null); 

  return (
    <div className="landing-container">

      {/* 1. Interactive Header Navigation */}
      <header className="navbar">
        <div className="logo">
          <img 
            src={logoImg} 
            alt="Nexcent Logo" 
            className="logo-img"
            onError={(e) => console.error("Logo failed to load from path:", logoImg)}
          />
          <span>Nexcent</span>  
        </div>

        <nav className="nav-links">
          <span>Home</span>
          <span>Service</span>
          <span>Feature</span>
          <span>Product</span>
          <span>Testimonial</span>
          <span>FAQ</span>
        </nav>
        
        <div className="nav-actions">
          {user ? (
            <div className="user-profile">
              <span className="welcome-text">Hi, {user.name}</span>
              <button className="btn-secondary" onClick={logout}>Logout</button>
            </div>
          ) : (
            <>
              <span 
                className="link-text" 
                onClick={() => { console.log('login clicked'); setAuthMode('login'); }}
              >
                Login
              </span>
              <button 
                className="btn-primary" 
                onClick={() => { console.log('signup clicked'); setAuthMode('signup'); }}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </header>

      {/* 2. Page Content Layout */}
      <main>
        <section className="section-container bg-light">
          <img src={achievementsImg} alt="Local Business Achievements" className="full-width-img" />
        </section>

        <section className="section-container">
          <img src={clientsImg} alt="Our Clients" className="full-width-img" />
        </section>

        <section className="section-container">
          <img src={communityImg} alt="Manage Community" className="full-width-img" />
        </section>

        <section className="section-container">
          <img src={calendarImg} alt="Site Footer Design" className="full-width-img" />
        </section>

        <section className="section-container bg-light">
          <img src={customersImg} alt="Customer Testimonial" className="full-width-img" />
        </section>

        <section className="section-container">
          <img src={communityUpdatesImg} alt="Caring is the new marketing" className="full-width-img" />
        </section>
      </main>

      {/* 3. Footer Call to Action */}
      <footer className="footer-cta">
        <h2>Pellentesque suscipit fringilla libero eu.</h2>
        <button className="btn-primary" onClick={() => setAuthMode('signup')}>Get a Demo →</button>
      </footer> 
    
      {/* 4. Active Auth Modal Overlay */}
      {authMode && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999
        }}>
          <div style={{ 
            background: '#ffffff', 
            padding: '40px', 
            borderRadius: '8px', 
            textAlign: 'center',
            minWidth: '320px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)' 
          }}>
            <h2 style={{ color: '#263238', marginBottom: '15px' }}>
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={{ color: '#717171', marginBottom: '25px' }}>
              {authMode === 'login' ? 'Sign in to access your dashboard' : 'Join Nexcent today'}
            </p>
            <button 
              onClick={() => setAuthMode(null)} 
              style={{ 
                padding: '10px 24px', 
                background: '#4CAF4F', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
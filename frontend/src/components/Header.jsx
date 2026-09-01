import { useState } from 'react';
import '../App.css';

// Import local Figma section assets
import logoImg from '../assets/Iconimg.png';

// Import AuthContext hook
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

// Import FAQ component

export default function Header() {
  const { user, logout } = useAuth() || {}; 
  const [authMode, setAuthMode] = useState(null); 

  console.log("log entry inside Header.jsx");


  return (
    <div className="landing-container">

      {/* Header Navigation */}
      <header className="navbar">
        <div className="logo" style={{ cursor: 'pointer' }}>
          <img 
            src={logoImg} 
            alt="Nexcent Logo" 
            className="logo-img"
            onError={(e) => console.error("Logo failed to load from path:", logoImg)}
          />
          <span>Nexcent</span>  
        </div>

        <nav className="nav-links">
          <Link to="/home" className="home">Home</Link>   
          <Link to="/service" className="service">Service</Link>
          <Link to="/feature" className="feature">Feature</Link>
          <Link to="/product" className="product">Product</Link>
          <Link to="/testimonial" className="testimonial">Testimonial</Link>
          <Link to="/faq" className="faq">FAQ</Link>
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
                onClick={() => setAuthMode('login')}
              >
                Login
              </span>
              <button 
                className="btn-primary" 
                onClick={() => setAuthMode('signup')}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </header>

      
    
      {/* Auth Modal Overlay */}
      {authMode && (
        <AuthModal 
          isOpen={Boolean(authMode)} 
          initialMode={authMode} 
          onClose={() => setAuthMode(null)}
        />
      )}

    </div>
  );
}
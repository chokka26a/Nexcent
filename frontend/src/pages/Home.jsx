import React, { useState } from 'react';
import '../App.css';

// Import local Figma section assets
import logoImg from '../assets/Iconimg.png';
import illustrationImg from '../assets/Illustration.png';
import clientsImg from '../assets/Clients.png';
import communityImg from '../assets/Community.png';
import bodyImg from '../assets/Body.png';
import footerImg from '../assets/Footer.png';

// Import AuthContext hook
import { useAuth } from '../context/AuthContext'; 
import AuthModal from '../components/AuthModal';

// Import FAQ component
import FAQ from '../pages/FAQ';


export default function Home() {

  console.log("error log home page");

  const { user, logout } = useAuth() || {}; 
  const [authMode, setAuthMode] = useState(null); 
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // 1. Declare state to control active page view
  const [currentPage, setCurrentPage] = useState('home');

  // 2. Define handler function inside component scope
  const handleFAQClick = () => {
    const queryString = user?.id ? `?userId=${encodeURIComponent(user.id)}` : '';
    window.history.pushState({}, '', `/faq.html${queryString}`);
    setCurrentPage('faq');
  };

  const handleServiceClick = () => {
    window.history.pushState({}, '', '/service.html');
    console.log('hiting..S')
    setCurrentPage('service');
  };

  const handleHomeClick = () => {
    window.history.pushState({}, '', '/');
    setCurrentPage('home');
  };

  // Carousel slides data
  const heroSlides = [
    {
      id: 0,
      titleLine1: "Lessons and insights",
      titleLine2: "from 8 years",
      subtitle: "Where to grow your business as a photographer: site or social media?",
      buttonText: "Register",
      image: illustrationImg,
      alt: "Development Illustration"
    },
    {
      id: 1,
      titleLine1: "Designed for teams",
      titleLine2: "built for growth",
      subtitle: "Scale your reach effortlessly with integrated digital assets and client tools.",
      buttonText: "Register",
      image: illustrationImg,
      alt: "Team Growth Illustration"
    },
    {
      id: 2,
      titleLine1: "Streamline workflow",
      titleLine2: "in one place",
      subtitle: "Manage communities, clients, and technical integrations seamlessly.",
      buttonText: "Register",
      image: illustrationImg,
      alt: "Workflow Illustration"
    }
  ];

  // 3. Render FAQ page conditionally
  if (currentPage === 'faq') {
    return <FAQ onNavigateHome={handleHomeClick} />;
  }

  return (
    <div className="landing-container">

     
      {/* Hero & Main Layout */}
      <main>
        <section className="section-container bg-light hero-section">
          <div className="hero-slider-wrapper">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                  {heroSlides[currentSlide].titleLine1}<br />
                  <span className="text-primary">{heroSlides[currentSlide].titleLine2}</span>
                </h1>
                <p className="hero-subtitle">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <button 
                  className="btn-primary hero-btn"
                  onClick={() => setAuthMode('signup')}
                >
                  {heroSlides[currentSlide].buttonText}
                </button>
              </div>
              <div className="hero-image-wrapper">
                <img 
                  src={heroSlides[currentSlide].image} 
                  alt={heroSlides[currentSlide].alt} 
                  className="illustration-img" 
                />
              </div>
            </div>

            <div className="carousel-dots">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>  

        <section className="section-container">
          <img src={clientsImg} alt="Our Clients" className="full-width-img" />
        </section>

        <section className="section-container">
          <img src={communityImg} alt="Manage Community" className="full-width-img" />
        </section>

        <section className="section-container">
          <img src={bodyImg} alt="Main Body Layout" className="full-width-img" />
        </section>

        <section className="section-container">
          <img src={footerImg} alt="Footer Layout" className="full-width-img" />
        </section>
      </main>
    
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
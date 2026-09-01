import React from 'react';
import '../App.css';
import logoImg from '../assets/Iconimg.png';
import footerImg from '../assets/Footer.png';
import { useAuth } from '../context/AuthContext';

export default function FAQ({ onNavigateHome }) {
  const { user, logout } = useAuth() || {};

  console.log('FAQ page')

  // Extract userId/name from query string if available
  const queryParams = new URLSearchParams(window.location.search);
  const activeUserId = queryParams.get('userId') || user?.id;
  const activeUserName = user?.name || (activeUserId ? `User (${activeUserId})` : null);

  const faqData = [
    {
      question: "What is Nexcent and how does it integrate with third-party sites?",
      answer: "Nexcent provides modern management and integration tools allowing seamless connections to external platforms, automated APIs, and third-party data services."
    },
    {
      question: "Is my personal data secure when using third-party services?",
      answer: "Yes. All communications with third-party web services are encrypted using TLS/SSL, adhering to strict data security standards."
    },
    {
      question: "Can I access the FAQ without an active account?",
      answer: "Absolutely. The FAQ page is fully accessible to all visitors. Creating an account simply enables personalized features across the platform."
    },
    {
      question: "How does user session tracking work across pages?",
      answer: "When logged in, your session state or user identifier is preserved in the route parameters, ensuring your active session remains continuous."
    }
  ];

  return (
    <div className="landing-container">
      {/* 2. Main FAQ Content */}
      <main>
        <section className="section-container bg-light faq-hero-section">
          <div className="faq-wrapper">
            <h1 className="hero-title">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="hero-subtitle">
              Everything you need to know about using third-party websites and integration tools with Nexcent.
            </p>

            <div className="faq-list">
              {faqData.map((item, index) => (
                <div className="faq-item" key={index}>
                  <h3 className="faq-question">{item.question}</h3>
                  <p className="faq-answer">{item.answer}</p>
                </div>
              ))}
            </div>
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
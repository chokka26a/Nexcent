import React from 'react';
import footerImg from '../assets/Footer.png';

export default function AboutUs() {
    const faqData = [
    {
      question: "About Us",
      answer: "About Us"
    }
  ];

  return (
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

      <section className="section-container">
        <img src={footerImg} alt="Footer Layout" className="full-width-img" />
      </section>
    </main>
  );
}
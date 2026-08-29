// PageUnderConstruction.jsx
import React from 'react';

const PageUnderConstruction = ({ pageTitle = "Page" }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>{pageTitle} - Under Construction</h1>
      <p>This page is currently being developed. Please check back later.</p>
    </div>
  );
};

export default PageUnderConstruction;
// src/apiConfig.js

// Set true to target NoSQL (nosqlserver.js on port 5001) or false for MySQL (server.js on port 5000)

/* Chokka decided to use single server for demo*/
/* const USE_NOSQL = true; 
// apiConfig is to connect db
// nosql port 5001
// mysql port 5000

export const API_BASE_URL = USE_NOSQL 
  ? 'http://localhost:5001'  // nosqlserver.js
  : 'http://localhost:5000'; // server.js (MySQL) */


  const USE_NOSQL = true; 

export const API_BASE_URL = window.location.hostname === 'localhost'
  ? (USE_NOSQL ? 'http://localhost:5001' : 'http://localhost:5000')
  : ''; // Empty string uses relative path (e.g. /api/auth/signup on same domain)


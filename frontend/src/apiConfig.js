// src/apiConfig.js

// Set true to target NoSQL (nosqlserver.js on port 5001) or false for MySQL (server.js on port 5000)
const USE_NOSQL = true; 

export const API_BASE_URL = USE_NOSQL 
  ? 'http://localhost:5001'  // nosqlserver.js
  : 'http://localhost:5000'; // server.js (MySQL)
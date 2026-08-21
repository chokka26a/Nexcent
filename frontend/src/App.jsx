import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1>ICANIO<span style={{ color: '#4CAF50' }}>Nexcent</span></h1>
        <p style={{ margin: '20px 0' }}>Proof of Concept Project</p>
      </main>
    </AuthProvider>
  );
}
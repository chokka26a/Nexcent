import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: '#F5F7FA', alignItems: 'center' }}>
      <h2 style={{ color: '#263238', margin: 0 }}>Nexcent</h2>
      <div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Welcome, <strong>{user.name}</strong>!</span>
            <button onClick={logout} style={{ padding: '8px 16px', cursor: 'pointer' }}>Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => openAuth('login')} style={{ padding: '8px 16px', cursor: 'pointer' }}>Login</button>
            <button onClick={() => openAuth('signup')} style={{ padding: '8px 16px', background: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>Sign up</button>
          </div>
        )}
      </div>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialMode={authMode} />
    </header>
  );
}
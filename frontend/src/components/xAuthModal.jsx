import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../apiConfig'; // Import central API configuration


// Chokka added - Virtual DOM is created
//React runs Authmodal()'s return statement. 
// It constructs a fresh JavaScript object tree (the New Virtual DOM) representing what Authmodal's UI 
// should look like with the new JSON data.

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  // Sync mode state when initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Dynamic endpoint target using imported API_BASE_URL
    const endpoint = mode === 'signup' 
      ? `${API_BASE_URL}/api/auth/signup` 
      : `${API_BASE_URL}/api/auth/login`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle NoSQL threshold limit specifically
        if (data.limitExceeded) {
          throw new Error(data.message);
        }
        throw new Error(data.message || 'Something went wrong');
      }

      login(data.user, data.token);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
        <h2>{mode === 'login' ? 'Login to Nexcent' : 'Create an Account'}</h2>
        {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
          {mode === 'signup' && (
            <div style={{ marginBottom: '12px' }}>
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
            </div>
          )}
          <div style={{ marginBottom: '12px' }}>
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          {mode === 'login' ? (
            <p>Don't have an account? <span onClick={() => setMode('signup')} style={{ color: '#4CAF50', cursor: 'pointer', fontWeight: 'bold' }}>Sign Up</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setMode('login')} style={{ color: '#4CAF50', cursor: 'pointer', fontWeight: 'bold' }}>Login</span></p>
          )}
        </div>
        <button onClick={onClose} style={{ marginTop: '12px', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  );
}
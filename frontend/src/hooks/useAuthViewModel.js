import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../apiConfig'; // Import central API configuration


// Chokka added - Virtual DOM is created
//React runs Authmodal()'s return statement. 
// It constructs a fresh JavaScript object tree (the New Virtual DOM) representing what Authmodal's UI 
// should look like with the new JSON data.

export default function useAuthViewModel({ isOpen, onClose, initialMode }) {
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
      console.error(err.message);
      setError(err.message);
    }
  };

  return { mode, setMode, formData, error, handleChange, handleSubmit };

}
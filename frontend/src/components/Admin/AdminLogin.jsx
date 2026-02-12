import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { X, Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';

// Get API URL based on environment
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend.onrender.com/api'  // Replace with your actual Render backend URL
  : '/api';  // Development uses proxy

const AdminLogin = ({ onClose, onLoginSuccess, dark }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/admin/login`, formData);
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminData', JSON.stringify(response.data.admin));
        toast.success('Login successful! 🎉');
        onLoginSuccess(response.data.admin);
        onClose(); // Close modal after successful login
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          style={{
            background: dark ? '#1a1a38' : '#ffffff',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: 24,
            padding: 40,
            maxWidth: 450,
            width: '100%',
            position: 'relative',
            boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: dark ? '#e8e8ff' : '#0f0f2d',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
              e.currentTarget.style.transform = 'rotate(90deg)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
              e.currentTarget.style.transform = 'rotate(0deg)';
            }}
          >
            <X size={18} />
          </button>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 24,
                background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 14px 30px rgba(124,111,255,0.4)'
              }}
            >
              <Shield size={44} color="#fff" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: '1.8rem',
                background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 8
              }}
            >
              Admin Portal
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ 
                color: dark ? '#6868a0' : '#7070a0', 
                fontSize: '.95rem',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              Enter your credentials to access the dashboard
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label style={{ 
                display: 'block', 
                fontSize: '.75rem', 
                fontWeight: 700, 
                color: dark ? '#6868a0' : '#7070a0', 
                marginBottom: 8, 
                letterSpacing: '.06em',
                textTransform: 'uppercase'
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: dark ? '#6868a0' : '#7070a0'
                }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@example.com"
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 48px',
                    background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                    borderRadius: 12,
                    color: dark ? '#e8e8ff' : '#0f0f2d',
                    fontSize: '.95rem',
                    fontFamily: "'Outfit', sans-serif",
                    outline: 'none',
                    transition: 'all .3s'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#7c6fff';
                    e.target.style.boxShadow = '0 0 0 4px rgba(124,111,255,0.12)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label style={{ 
                display: 'block', 
                fontSize: '.75rem', 
                fontWeight: 700, 
                color: dark ? '#6868a0' : '#7070a0', 
                marginBottom: 8, 
                letterSpacing: '.06em',
                textTransform: 'uppercase'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: dark ? '#6868a0' : '#7070a0'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 48px',
                    background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                    borderRadius: 12,
                    color: dark ? '#e8e8ff' : '#0f0f2d',
                    fontSize: '.95rem',
                    fontFamily: "'Outfit', sans-serif",
                    outline: 'none',
                    transition: 'all .3s'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#7c6fff';
                    e.target.style.boxShadow = '0 0 0 4px rgba(124,111,255,0.12)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: dark ? '#6868a0' : '#7070a0',
                    padding: 4,
                    transition: 'color .3s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#7c6fff'}
                  onMouseLeave={e => e.currentTarget.style.color = dark ? '#6868a0' : '#7070a0'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{
                padding: '16px',
                background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontSize: '.95rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all .3s',
                opacity: loading ? 0.7 : 1,
                marginTop: 8,
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: '.04em'
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(124,111,255,0.4)';
                }
              }}
              onMouseLeave={e => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <div style={{
                    width: 16,
                    height: 16,
                    border: '2px solid #fff',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                marginTop: 16,
                padding: '20px',
                background: dark ? 'rgba(0,212,170,0.05)' : 'rgba(0,212,170,0.03)',
                border: '1px solid rgba(0,212,170,0.2)',
                borderRadius: 12,
                textAlign: 'center'
              }}
            >
              <p style={{ 
                fontSize: '.7rem', 
                color: '#00d4aa', 
                fontWeight: 800, 
                marginBottom: 12, 
                letterSpacing: '.1em',
                textTransform: 'uppercase'
              }}>
                Demo Credentials
              </p>
              <div style={{ 
                fontFamily: "'JetBrains Mono', monospace", 
                fontSize: '.85rem', 
                color: dark ? '#e8e8ff' : '#0f0f2d',
                background: dark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
                padding: '8px 12px',
                borderRadius: 8,
                marginBottom: 8
              }}>
                admin@portfolio.com
              </div>
              <div style={{ 
                fontFamily: "'JetBrains Mono', monospace", 
                fontSize: '.85rem', 
                color: dark ? '#e8e8ff' : '#0f0f2d',
                background: dark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
                padding: '8px 12px',
                borderRadius: 8
              }}>
                admin123
              </div>
            </motion.div>
          </form>

          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminLogin;

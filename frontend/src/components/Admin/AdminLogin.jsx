import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { X, Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';

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
      const response = await axios.post('/api/admin/login', formData);
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminData', JSON.stringify(response.data.admin));
        toast.success('Login successful!');
        onLoginSuccess(response.data.admin);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
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
              color: dark ? '#e8e8ff' : '#0f0f2d'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 14px 30px rgba(124,111,255,0.4)'
            }}>
              <Shield size={36} color="#fff" />
            </div>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: '1.8rem',
              background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 8
            }}>Admin Portal</h2>
            <p style={{ color: dark ? '#6868a0' : '#7070a0', fontSize: '.9rem' }}>
              Enter your credentials to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                EMAIL ADDRESS
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
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                PASSWORD
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
                    padding: 4
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
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
                marginTop: 8
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
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            <div style={{
              marginTop: 16,
              padding: '16px',
              background: dark ? 'rgba(0,212,170,0.05)' : 'rgba(0,212,170,0.03)',
              border: `1px solid rgba(0,212,170,0.2)`,
              borderRadius: 12,
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '.75rem', color: '#00d4aa', fontWeight: 700, marginBottom: 8, letterSpacing: '.06em' }}>
                DEMO CREDENTIALS
              </p>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '.8rem', color: dark ? '#e8e8ff' : '#0f0f2d' }}>
                admin@portfolio.com
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '.8rem', color: dark ? '#e8e8ff' : '#0f0f2d' }}>
                admin123
              </div>
            </div>
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
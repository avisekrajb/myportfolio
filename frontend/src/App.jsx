import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Shield } from 'lucide-react';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VerticalSidebar from './components/VerticalSidebar';
import Tour from './components/Tour/Tour'; // Import Tour component

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });
  
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return !!localStorage.getItem('adminToken');
  });
  const [adminData, setAdminData] = useState(() => {
    const saved = localStorage.getItem('adminData');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(dark));
    
    if (dark) {
      document.documentElement.classList.add('dark');
      document.body.style.background = '#070714';
      document.body.style.color = '#e8e8ff';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.background = '#f4f4fb';
      document.body.style.color = '#0f0f2d';
    }
  }, [dark]);

  useEffect(() => {
    // Check if token is still valid
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleAdminLoginSuccess = (admin) => {
    setIsAdminLoggedIn(true);
    setAdminData(admin);
    setShowAdminLogin(false);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setIsAdminLoggedIn(false);
    setAdminData(null);
  };

  if (isAdminLoggedIn) {
    return (
      <>
        <style>
          {`
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            body {
              background: ${dark ? '#070714' : '#f4f4fb'};
              color: ${dark ? '#e8e8ff' : '#0f0f2d'};
              font-family: 'Outfit', sans-serif;
              overflow-x: hidden;
              transition: background 0.4s, color 0.4s;
            }
          `}
        </style>
        <Toaster position="top-right" />
        <AdminDashboard onLogout={handleAdminLogout} adminData={adminData} dark={dark} />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <style>
        {`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            background: ${dark ? '#070714' : '#f4f4fb'};
            color: ${dark ? '#e8e8ff' : '#0f0f2d'};
            font-family: 'Outfit', sans-serif;
            overflow-x: hidden;
            transition: background 0.4s, color 0.4s;
          }
        `}
      </style>
      
      <Navbar dark={dark} setDark={setDark} />
      
      <main>
        <Hero dark={dark} />
        <About dark={dark} />
        <Skills dark={dark} />
        <Projects dark={dark} />
        <Certificates dark={dark} />
        <Contact dark={dark} />
      </main>
      
      <Footer dark={dark} onAdminClick={() => setShowAdminLogin(true)} />
      
      {/* Sidebar Component */}
      <VerticalSidebar dark={dark} />
      
      {/* Tour Component - Auto shows on first visit only */}
      <Tour dark={dark} />
      
      {showAdminLogin && (
        <AdminLogin
          onClose={() => setShowAdminLogin(false)}
          onLoginSuccess={handleAdminLoginSuccess}
          dark={dark}
        />
      )}
    </>
  );
}

export default App;
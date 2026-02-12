import React, { useState } from 'react';
import { Shield, Mail, MapPin, Globe, Briefcase } from 'lucide-react';
import AdminLogin from './Admin/AdminLogin';

const Footer = ({ dark, onAdminClick }) => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);

  const handleAdminLoginSuccess = (admin) => {
    setIsAdminLoggedIn(true);
    setAdminData(admin);
    setShowAdminLogin(false);
  };

  return (
    <>
      <footer style={{
        borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        padding: "32px 5%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 14,
        background: dark ? "#070714" : "#f4f4fb"
      }}>
        {/* Left - Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: "linear-gradient(135deg,#7c6fff,#ff6b9d)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 14,
            color: "#fff",
            fontFamily: "'Outfit', sans-serif"
          }}>A</div>
          <div>
            <div style={{
              fontWeight: 800,
              fontSize: ".88rem",
              color: dark ? "#e8e8ff" : "#0f0f2d",
              fontFamily: "'Outfit', sans-serif"
            }}>Abhishek Rajbanshi</div>
            <div style={{
              fontSize: ".62rem",
              color: dark ? "#6868a0" : "#7070a0"
            }}>B.Tech CSE · Software Engineer · Nepal 🇳🇵</div>
          </div>
        </div>

        {/* Center - Copyright */}
        <p style={{
          fontSize: ".8rem",
          color: dark ? "#6868a0" : "#7070a0"
        }}>© 2026 Abhishek Rajbanshi · Built with ❤️ from Nepal 🇳🇵</p>

        {/* Right - Links & Admin Button */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", gap: 20 }}>
            {["GitHub", "LinkedIn", "Resume"].map(l => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: ".8rem",
                  color: dark ? "#6868a0" : "#7070a0",
                  textDecoration: "none",
                  transition: "color .2s"
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#7c6fff"}
                onMouseLeave={e => e.currentTarget.style.color = dark ? "#6868a0" : "#7070a0"}
              >
                {l}
              </a>
            ))}
          </div>
          
          <button
            onClick={() => setShowAdminLogin(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg,#7c6fff,#ff6b9d)",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: ".75rem",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: ".04em",
              transition: "all .3s",
              fontFamily: "'Outfit', sans-serif"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 14px 30px rgba(124,111,255,.4)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Shield size={14} />
            Admin Panel
          </button>
        </div>
      </footer>

      {showAdminLogin && (
        <AdminLogin
          onClose={() => setShowAdminLogin(false)}
          onLoginSuccess={handleAdminLoginSuccess}
          dark={dark}
        />
      )}
    </>
  );
};

export default Footer;
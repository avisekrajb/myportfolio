import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Shield } from 'lucide-react';

const Navbar = ({ dark, setDark, onAdminClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && window.scrollY >= section.offsetTop - 130) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Contact'];

  // SVG Icons
  const Github = ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );

  const Linkedin = ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const Twitter = ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  const Download = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 5%",
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled 
          ? `rgba(${dark ? "7,7,20" : "244,244,251"},.9)` 
          : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(2)" : "none",
        borderBottom: scrolled ? `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` : "none",
        transition: "all .4s"
      }}>
        {/* Logo */}
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            background: "linear-gradient(135deg,#7c6fff,#ff6b9d)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 18,
            color: "#fff",
            boxShadow: "0 6px 16px rgba(124,111,255,.4)",
            fontFamily: "'Outfit', sans-serif"
          }}>A</div>
          <div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: ".98rem",
              lineHeight: 1.1,
              color: dark ? "#e8e8ff" : "#0f0f2d"
            }}>Abhishek</div>
            <div style={{
              fontSize: ".62rem",
              color: dark ? "#6868a0" : "#7070a0",
              fontWeight: 700,
              letterSpacing: ".07em"
            }}>RAJBANSHI</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hnav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map(link => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  color: isActive ? (dark ? "#e8e8ff" : "#0f0f2d") : (dark ? "#6868a0" : "#7070a0"),
                  textDecoration: "none",
                  fontSize: ".85rem",
                  fontWeight: 600,
                  letterSpacing: ".05em",
                  transition: "color .3s",
                  position: "relative",
                  padding: "4px 0"
                }}
                onMouseEnter={e => e.currentTarget.style.color = dark ? "#e8e8ff" : "#0f0f2d"}
                onMouseLeave={e => e.currentTarget.style.color = isActive ? (dark ? "#e8e8ff" : "#0f0f2d") : (dark ? "#6868a0" : "#7070a0")}
              >
                {link}
                <span style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  width: isActive ? "100%" : "0%",
                  height: 2,
                  background: "linear-gradient(90deg,#7c6fff,#ff6b9d)",
                  transition: "width .3s",
                  borderRadius: 2
                }} />
              </a>
            );
          })}
          
          {/* Admin Button */}
          <button
            onClick={onAdminClick}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: dark ? "#e8e8ff" : "#0f0f2d",
              padding: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            title="Admin Dashboard"
          >
            <Shield size={18} />
          </button>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setDark(!dark)}
            style={{
              width: 48,
              height: 27,
              borderRadius: 14,
              position: "relative",
              cursor: "pointer",
              background: dark ? "linear-gradient(135deg,#7c6fff,#ff6b9d)" : "linear-gradient(135deg,#ffb547,#ff6b9d)",
              border: "none",
              transition: "background .4s",
              flexShrink: 0
            }}
            title={dark ? "Light Mode" : "Dark Mode"}
          >
            <div style={{
              position: "absolute",
              top: 3.5,
              left: dark ? "calc(100% - 23px)" : "3.5px",
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#fff",
              transition: "left .3s cubic-bezier(.68,-.55,.27,1.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,.3)"
            }}>
              {dark ? <Moon size={11} color="#7c6fff" /> : <Sun size={11} color="#ff8c00" />}
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="mbtn" style={{ display: "none", alignItems: "center", gap: 10 }}>
          <button
            onClick={onAdminClick}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: dark ? "#e8e8ff" : "#0f0f2d",
              display: "flex",
              padding: 6
            }}
          >
            <Shield size={18} />
          </button>
          
          <button
            onClick={() => setDark(!dark)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: dark ? "#e8e8ff" : "#0f0f2d",
              display: "flex",
              padding: 6
            }}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: dark ? "#e8e8ff" : "#0f0f2d",
              display: "flex",
              padding: 6
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 1000,
              animation: "fadeIn 0.3s ease"
            }}
            onClick={() => setMobileMenuOpen(false)}
          />
          
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "85%",
              maxWidth: 320,
              background: dark 
                ? "linear-gradient(180deg, #0e0e22 0%, #070714 100%)" 
                : "linear-gradient(180deg, #ffffff 0%, #f4f4fb 100%)",
              zIndex: 1001,
              display: "flex",
              flexDirection: "column",
              boxShadow: `4px 0 40px ${dark ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.2)"}`,
              borderRight: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              animation: "slideInLeft 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)"
            }}
          >
            {/* Header */}
            <div style={{ padding: "24px 24px 20px", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: "linear-gradient(135deg,#7c6fff,#ff6b9d)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: 18,
                    color: "#fff",
                    fontFamily: "'Outfit', sans-serif",
                    boxShadow: "0 4px 12px rgba(124,111,255,.4)"
                  }}>A</div>
                  <div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: "1rem",
                      lineHeight: 1.1,
                      color: dark ? "#e8e8ff" : "#0f0f2d"
                    }}>Abhishek</div>
                    <div style={{
                      fontSize: ".64rem",
                      color: dark ? "#6868a0" : "#7070a0",
                      fontWeight: 700,
                      letterSpacing: ".06em"
                    }}>RAJBANSHI</div>
                  </div>
                </div>
              </div>
              
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(0,212,170,.1)",
                border: "1px solid rgba(0,212,170,.3)",
                borderRadius: 50,
                padding: "4px 12px"
              }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#00d4aa",
                  display: "inline-block",
                  animation: "pulseRing 2.5s infinite"
                }} />
                <span style={{
                  fontSize: ".68rem",
                  color: "#00d4aa",
                  fontWeight: 800,
                  letterSpacing: ".08em"
                }}>AVAILABLE</span>
              </div>
            </div>

            {/* Links */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px" }}>
              {links.map((link, i) => {
                const isActive = activeSection === link.toLowerCase();
                return (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "16px 14px",
                      marginBottom: 4,
                      borderRadius: 14,
                      background: isActive 
                        ? "linear-gradient(135deg, rgba(124,111,255,.15), rgba(255,107,157,.15))" 
                        : "transparent",
                      border: isActive 
                        ? "1px solid rgba(124,111,255,.3)" 
                        : "1px solid transparent",
                      color: isActive 
                        ? (dark ? "#e8e8ff" : "#0f0f2d") 
                        : (dark ? "#6868a0" : "#7070a0"),
                      textDecoration: "none",
                      fontSize: "1.05rem",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      transition: "all .3s",
                      animation: `slideUp .4s ease ${i * 0.05}s both`,
                      position: "relative"
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = "rgba(124,111,255,.08)";
                        e.currentTarget.style.transform = "translateX(6px)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.transform = "translateX(0)";
                      }
                    }}
                  >
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: isActive 
                        ? "linear-gradient(135deg,#7c6fff,#ff6b9d)" 
                        : (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"),
                      transition: "all .3s"
                    }} />
                    {link}
                  </a>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{ padding: "20px 24px 24px", borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                {[
                  { icon: Github, label: "GitHub", color: "#333" },
                  { icon: Linkedin, label: "LinkedIn", color: "#0077b5" },
                  { icon: Twitter, label: "Twitter", color: "#1da1f2" }
                ].map(social => (
                  <a
                    key={social.label}
                    href="#"
                    style={{
                      padding: "12px 8px",
                      borderRadius: 12,
                      background: dark ? "rgba(124,111,255,.08)" : "rgba(0,0,0,.04)",
                      border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      color: dark ? "#6868a0" : "#7070a0",
                      textDecoration: "none",
                      transition: "all .3s",
                      fontSize: ".68rem",
                      fontWeight: 700
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = social.color;
                      e.currentTarget.style.color = social.color;
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
                      e.currentTarget.style.color = dark ? "#6868a0" : "#7070a0";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <social.icon size={20} color="currentColor" />
                    {social.label}
                  </a>
                ))}
              </div>
              
              <button style={{
                background: "linear-gradient(135deg,#7c6fff,#ff6b9d)",
                color: "#fff",
                border: "none",
                padding: "13px 28px",
                borderRadius: "50px",
                fontSize: ".9rem",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: ".04em",
                transition: "all .3s",
                fontFamily: "'Outfit', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                justifyContent: "center",
                fontSize: ".88rem"
              }}>
                <Download size={16} /> Download CV
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,111,255,.5); }
          70% { box-shadow: 0 0 0 10px rgba(124,111,255,0); }
        }
        
        @media (max-width: 820px) {
          .hnav { display: none !important; }
          .mbtn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Download, ArrowRight, MapPin, Briefcase, Code } from 'lucide-react';
import axios from 'axios';

const Hero = ({ dark }) => {
  const [typed, setTyped] = useState('');
  const roles = ["B.Tech CSE Student 🎓", "Software Engineer 💻", "Full-Stack Developer 🚀", "Open Source Contributor 🌐", "Problem Solver ⚡"];
  const [ri, setRi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = roles[ri];
    const id = setTimeout(() => {
      if (!del && ci < cur.length) {
        setTyped(cur.slice(0, ci + 1));
        setCi(ci + 1);
      } else if (!del) {
        setTimeout(() => setDel(true), 2000);
      } else if (del && ci > 0) {
        setTyped(cur.slice(0, ci - 1));
        setCi(ci - 1);
      } else {
        setDel(false);
        setRi((ri + 1) % roles.length);
      }
    }, del ? 45 : 90);
    return () => clearTimeout(id);
  }, [ci, del, ri]);

  const stats = [
    { v: "3rd", l: "Year B.Tech", c: "#7c6fff" },
    { v: "15+", l: "Projects", c: "#ff6b9d" },
    { v: "8+", l: "Certificates", c: "#00d4aa" },
    { v: "🇳🇵", l: "Nepal", c: "#ffb547" },
  ];

  // Function to handle CV download
  const handleDownloadCV = () => {
    // Create a link element
    const link = document.createElement('a');
    
    // Path to your CV file in the public folder
    // Place your CV file at: public/cv/Abhishek_Rajbanshi_CV.pdf
    link.href = '/cv/abhishekresume.pdf';
    
    // Set download attribute with filename
    link.download = 'Abhishek_Rajbanshi_CV.pdf';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Alternative: If you want to fetch from backend API
  const handleDownloadCVFromAPI = async () => {
    try {
      const response = await axios.get('/api/cv/download', {
        responseType: 'blob'
      });
      
      // Create blob URL
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Abhishek_Rajbanshi_CV.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CV:', error);
      
      // Fallback to local file
      const link = document.createElement('a');
      link.href = '/cv/Abhishek_Rajbanshi_CV.pdf';
      link.download = 'Abhishek_Rajbanshi_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section id="home" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "0 5%",
      position: "relative",
      overflow: "hidden",
      background: dark ? "#070714" : "#f4f4fb",
    }}>
      {/* Background Elements */}
      <div style={{
        position: "absolute",
        width: 700,
        height: 700,
        borderRadius: "50%",
        background: dark ? "radial-gradient(circle, rgba(124,111,255,.18) 0%, transparent 70%)" : "radial-gradient(circle, rgba(124,111,255,.1) 0%, transparent 70%)",
        top: -200,
        right: -200,
        pointerEvents: "none"
      }} />
      
      <div style={{
        position: "absolute",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: dark ? "radial-gradient(circle, rgba(255,107,157,.12) 0%, transparent 70%)" : "radial-gradient(circle, rgba(255,107,157,.07) 0%, transparent 70%)",
        bottom: -100,
        left: "5%",
        pointerEvents: "none",
        animation: "floatY 9s ease-in-out infinite 2s"
      }} />

      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: dark 
          ? "linear-gradient(rgba(124,111,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,111,255,.04) 1px, transparent 1px)"
          : "linear-gradient(rgba(124,111,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,111,255,.05) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none"
      }} />

      <div className="hgrid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60,
        alignItems: "center",
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        paddingTop: 80
      }}>
        {/* Left Column - Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,212,170,.1)",
            border: "1px solid rgba(0,212,170,.3)",
            borderRadius: 50,
            padding: "6px 16px",
            marginBottom: 22
          }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00d4aa",
              display: "inline-block",
              animation: "pulseRing 2.5s infinite"
            }} />
            <span style={{
              fontSize: ".75rem",
              color: "#00d4aa",
              fontWeight: 800,
              letterSpacing: ".1em"
            }}>OPEN TO OPPORTUNITIES</span>
          </div>

          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.3rem, 5.5vw, 4.5rem)",
            lineHeight: 1.04,
            letterSpacing: "-.04em",
            marginBottom: 8,
            color: dark ? "#e8e8ff" : "#0f0f2d"
          }}>
            Hi, I'm<br/>
            <span style={{
              background: "linear-gradient(135deg, #7c6fff, #ff6b9d, #00d4aa)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradShift 5s ease infinite"
            }}>Abhishek</span><br/>
            <span>Rajbanshi</span>
          </h1>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            margin: "16px 0 20px",
            minHeight: 38
          }}>
            <span style={{
              background: "rgba(124,111,255,.15)",
              border: "1px solid rgba(124,111,255,.3)",
              borderRadius: 8,
              padding: "3px 9px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: ".78rem",
              color: "#7c6fff"
            }}>&lt;/&gt;</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(.88rem, 2vw, 1.1rem)",
              color: dark ? "#6868a0" : "#7070a0",
              fontWeight: 500
            }}>
              {typed}
              <span style={{
                animation: "blink 1s step-end infinite",
                color: "#7c6fff"
              }}>|</span>
            </span>
          </div>

          <p style={{
            fontSize: ".98rem",
            color: dark ? "#6868a0" : "#7070a0",
            lineHeight: 1.85,
            maxWidth: 460,
            marginBottom: 34
          }}>
            Passionate B.Tech CSE student from Dharan, Nepal 🇳🇵, crafting modern web applications with clean code and creative design. Seeking internships and collaborations to grow and contribute.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            <a href="#projects" style={{ textDecoration: "none" }}>
              <button style={{
                background: "linear-gradient(135deg, #7c6fff, #ff6b9d)",
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
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}>
                View Projects <ArrowRight size={15} />
              </button>
            </a>
            
            {/* Download CV Button */}
            <button 
              onClick={handleDownloadCV}
              style={{
                background: "transparent",
                color: dark ? "#e8e8ff" : "#0f0f2d",
                border: "1.5px solid " + (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"),
                padding: "12px 26px",
                borderRadius: "50px",
                fontSize: ".9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all .3s",
                fontFamily: "'Outfit', sans-serif",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#7c6fff";
                e.currentTarget.style.color = "#7c6fff";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
                e.currentTarget.style.color = dark ? "#e8e8ff" : "#0f0f2d";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Download size={15} /> Download CV
            </button>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {[
              { icon: Github, label: "GitHub", color: dark ? "#e8e8ff" : "#0f0f2d", hover: dark ? "#fff" : "#000" },
              { icon: Linkedin, label: "LinkedIn", color: dark ? "#e8e8ff" : "#0f0f2d", hover: "#0077b5" },
              { icon: Twitter, label: "Twitter", color: dark ? "#e8e8ff" : "#0f0f2d", hover: "#1da1f2" },
              { icon: Mail, label: "Email", color: dark ? "#e8e8ff" : "#0f0f2d", hover: "#ff6b9d" }
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.label === "Email" ? "mailto:abhishek.rajbanshi@email.com" : "#"} 
                target={social.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: dark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)",
                  border: "1px solid " + (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: social.color,
                  transition: "all .3s",
                  textDecoration: "none"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = social.hover;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = social.hover;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = social.color;
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
                }}
                title={social.label}
              >
                <social.icon size={17} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Photo with YOUR actual photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}
        >
          <div style={{ position: "relative", width: 280, height: 280 }}>
            {/* Animated gradient ring */}
            <div style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "50%",
              background: "conic-gradient(from 0deg, #7c6fff, #ff6b9d, #00d4aa, #ffb547, #7c6fff)",
              animation: "rotateFull 4s linear infinite",
              padding: "3px"
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: dark ? "#070714" : "#f4f4fb"
              }} />
            </div>
            
            {/* YOUR ACTUAL PHOTO - Replace with your image */}
            <div style={{
              position: "absolute",
              inset: "6px",
              borderRadius: "50%",
              overflow: "hidden",
              background: dark ? "linear-gradient(135deg, #1a1a38, #0e0e22)" : "linear-gradient(135deg, #dde0ff, #c8ccf8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: dark ? "0 10px 30px rgba(0,0,0,0.5)" : "0 10px 30px rgba(124,111,255,0.2)"
            }}>
              {/* 
                IMPORTANT: Add your photo to the public folder and reference it here
                Place your photo at: public/images/abhishek-photo.jpg
              */}
              <img 

                src="/images/abhishek.jpg" 
                alt="Abhishek Rajbanshi"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease"
                }}
                onError={(e) => {
                  // Fallback if image doesn't load - shows initials
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div style="
                      width: 100%;
                      height: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 4rem;
                      font-weight: 900;
                      background: linear-gradient(135deg, #7c6fff, #ff6b9d);
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: transparent;
                    ">AR</div>
                  `;
                }}
              />
            </div>

            {/* Floating badges */}
            {[
              { icon: Briefcase, text: "B.Tech CSE", color: "#7c6fff", top: -16, left: -20 },
              { icon: MapPin, text: "Biratnagar, Nepal 🇳🇵", color: "#00d4aa", top: 90, right: -32, left: "auto" },
              { icon: Code, text: "Hire Me", color: "#ff6b9d", bottom: -16, left: 10 }
            ].map((badge, i) => (
              <div key={i} style={{
                position: "absolute",
                top: badge.top,
                bottom: badge.bottom,
                left: badge.left,
                right: badge.right,
                background: dark ? "rgba(10,10,30,.9)" : "rgba(255,255,255,.92)",
                border: `1.5px solid ${badge.color}30`,
                borderRadius: 12,
                padding: "8px 13px",
                display: "flex",
                alignItems: "center",
                gap: 7,
                backdropFilter: "blur(12px)",
                boxShadow: `0 8px 20px ${badge.color}20`,
                animation: `floatY ${5 + i}s ease-in-out infinite ${i * 1.5}s`,
                whiteSpace: "nowrap",
                zIndex: 10
              }}>
                <badge.icon size={13} color={badge.color} />
                <span style={{ fontSize: ".74rem", fontWeight: 700, color: dark ? "#e8e8ff" : "#0f0f2d" }}>{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Stats Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            width: "100%",
            maxWidth: 340
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                background: dark ? "#1a1a38" : "#ffffff",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                borderRadius: 14,
                padding: "13px 8px",
                textAlign: "center",
                transition: "transform 0.35s cubic-bezier(.175,.885,.32,1.275), box-shadow 0.35s"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.01)";
                  e.currentTarget.style.boxShadow = `0 24px 48px ${dark ? "rgba(0,0,0,0.5)" : "rgba(100,100,200,0.15)"}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: "1.35rem",
                  color: stat.c,
                  lineHeight: 1
                }}>{stat.v}</div>
                <div style={{
                  fontSize: ".6rem",
                  color: dark ? "#6868a0" : "#7070a0",
                  marginTop: 4,
                  fontWeight: 700,
                  letterSpacing: ".04em"
                }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        animation: "floatY 2s ease-in-out infinite"
      }}>
        <div style={{
          width: 22,
          height: 36,
          border: "1.5px solid " + (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"),
          borderRadius: 12,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 4
        }}>
          <div style={{
            width: 3,
            height: 8,
            borderRadius: 3,
            background: "#7c6fff",
            animation: "floatY 1.4s ease-in-out infinite"
          }} />
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,111,255,.5); }
          70% { box-shadow: 0 0 0 10px rgba(124,111,255,0); }
        }
        
        @keyframes gradShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes rotateFull {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 820px) {
          .hgrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
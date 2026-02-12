import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Mail, Zap, Award, Code, Globe } from 'lucide-react';

const About = ({ dark }) => {
  const infoItems = [
    { ic: "map-pin", l: "Location", v: "Dharan, Koshi, Nepal 🇳🇵" },
    { ic: "briefcase", l: "Degree", v: "B.Tech — Computer Science (3rd Year)" },
    { ic: "mail", l: "Email", v: "abhishek.rajbanshi@email.com" },
    { ic: "zap", l: "Status", v: "Seeking Internship / Full-time Role" },
  ];

  const timeline = [
    { 
      yr: "2022–Present", 
      ti: "B.Tech Computer Science", 
      or: "University (Dharan, Nepal)", 
      c: "#7c6fff", 
      ic: "briefcase" 
    },
    { 
      yr: "2020–2022", 
      ti: "Higher Secondary (PCM + CS)", 
      or: "Higher Secondary School, Dharan", 
      c: "#ff6b9d", 
      ic: "award" 
    },
    { 
      yr: "2021–Present", 
      ti: "Open Source Contributor", 
      or: "GitHub · Various Projects", 
      c: "#00d4aa", 
      ic: "code" 
    },
    { 
      yr: "2023–Present", 
      ti: "Freelance Developer", 
      or: "Remote Clients", 
      c: "#ffb547", 
      ic: "globe" 
    },
  ];

  const getIcon = (name) => {
    switch(name) {
      case 'map-pin': return <MapPin size={16} color="#7c6fff" />;
      case 'briefcase': return <Briefcase size={16} color="#7c6fff" />;
      case 'mail': return <Mail size={16} color="#7c6fff" />;
      case 'zap': return <Zap size={16} color="#7c6fff" />;
      case 'award': return <Award size={16} color="#ff6b9d" />;
      case 'code': return <Code size={16} color="#00d4aa" />;
      case 'globe': return <Globe size={16} color="#ffb547" />;
      default: return null;
    }
  };

  return (
    <section id="about" style={{ 
      padding: "120px 5%", 
      background: dark ? "#070714" : "#f4f4fb"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "rgba(124,111,255,.12)",
            border: "1px solid rgba(124,111,255,.3)",
            borderRadius: 50,
            padding: "5px 16px",
            marginBottom: 14
          }}>
            <Code size={13} color="#7c6fff" />
            <span style={{ fontSize: ".7rem", fontWeight: 800, color: "#7c6fff", letterSpacing: ".1em" }}>ABOUT ME</span>
          </div>
          
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            letterSpacing: "-.03em",
            color: dark ? "#e8e8ff" : "#0f0f2d"
          }}>
            Who is <span className="gtext">Abhishek?</span>
          </h2>
        </div>

        <div className="agrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "start" }}>
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p style={{
              fontSize: "1rem",
              color: dark ? "#6868a0" : "#7070a0",
              lineHeight: 1.9,
              marginBottom: 20
            }}>
              I'm <strong style={{ color: dark ? "#e8e8ff" : "#0f0f2d" }}>Abhishek Rajbanshi</strong>, a passionate 3rd-year B.Tech Computer Science student from the beautiful city of Dharan, Nepal. I love building software that solves real problems and creates meaningful impact.
            </p>
            
            <p style={{
              fontSize: "1rem",
              color: dark ? "#6868a0" : "#7070a0",
              lineHeight: 1.9,
              marginBottom: 32
            }}>
              My journey in tech started with curiosity and has grown into a deep passion for full-stack development, competitive programming, and open-source contribution. I believe in writing clean, efficient code and learning something new every day.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {infoItems.map((item, index) => (
                <div key={item.l} style={{
                  background: dark ? "#1a1a38" : "#ffffff",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                  borderRadius: 16,
                  padding: "15px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
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
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    background: "rgba(124,111,255,.1)",
                    border: "1px solid rgba(124,111,255,.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    {getIcon(item.ic)}
                  </div>
                  <div>
                    <div style={{
                      fontSize: ".7rem",
                      color: dark ? "#6868a0" : "#7070a0",
                      letterSpacing: ".06em",
                      marginBottom: 2
                    }}>{item.l}</div>
                    <div style={{
                      fontWeight: 700,
                      color: dark ? "#e8e8ff" : "#0f0f2d",
                      fontSize: ".9rem"
                    }}>{item.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "1.1rem",
              marginBottom: 26,
              color: dark ? "#e8e8ff" : "#0f0f2d"
            }}>Education & Journey</h3>
            
            <div style={{ position: "relative", paddingLeft: 26 }}>
              <div style={{
                position: "absolute",
                left: 9,
                top: 0,
                bottom: 0,
                width: 2,
                background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
              }} />
              
              {timeline.map((t, i) => (
                <div key={i} style={{ position: "relative", marginBottom: 24 }}>
                  <div style={{
                    position: "absolute",
                    left: -23,
                    top: 5,
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    background: t.c,
                    border: `3px solid ${dark ? "#070714" : "#f4f4fb"}`,
                    boxShadow: `0 0 10px ${t.c}`
                  }} />
                  
                  <div style={{
                    background: dark ? "#1a1a38" : "#ffffff",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                    borderRadius: 16,
                    padding: "18px 20px",
                    borderLeft: `3px solid ${t.c}`,
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
                      fontSize: ".68rem",
                      color: t.c,
                      fontWeight: 800,
                      letterSpacing: ".07em",
                      marginBottom: 4
                    }}>{t.yr}</div>
                    <div style={{
                      fontWeight: 800,
                      fontSize: ".9rem",
                      color: dark ? "#e8e8ff" : "#0f0f2d",
                      marginBottom: 3
                    }}>{t.ti}</div>
                    <div style={{
                      fontSize: ".8rem",
                      color: dark ? "#6868a0" : "#7070a0"
                    }}>{t.or}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Globe, Github, Play, Layers } from 'lucide-react';

const Projects = ({ dark }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      ti: "EduNepal Platform",
      desc: "Full-stack e-learning platform for Nepali students with video courses, quizzes, progress tracking & bilingual UI.",
      tags: ["React", "Node.js", "MongoDB", "JWT"],
      c: "#7c6fff",
      grad: "linear-gradient(135deg,#667eea,#764ba2)",
      stars: 142,
      img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
      live: true,
      category: "fullstack"
    },
    {
      ti: "CodeTrack CLI",
      desc: "Open-source CLI tool for tracking daily coding streaks, syncing with GitHub activity, and sending motivational alerts.",
      tags: ["Python", "CLI", "GitHub API", "SQLite"],
      c: "#00d4aa",
      grad: "linear-gradient(135deg,#00d4aa,#0096c7)",
      stars: 387,
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      live: false,
      category: "tools"
    },
    {
      ti: "NepalWeather PWA",
      desc: "Beautiful weather PWA with hyper-local Nepali city data, 7-day forecasts, dynamic animations & offline support.",
      tags: ["React", "PWA", "OpenWeather", "Workbox"],
      c: "#ff6b9d",
      grad: "linear-gradient(135deg,#f093fb,#f5576c)",
      stars: 98,
      img: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&q=80",
      live: true,
      category: "frontend"
    },
    {
      ti: "Kanban Pro",
      desc: "Real-time collaborative kanban board with drag-and-drop, team assignments, priority labels & live cursor tracking.",
      tags: ["Next.js", "WebSockets", "Prisma", "Redis"],
      c: "#ffb547",
      grad: "linear-gradient(135deg,#f9ca24,#f0932b)",
      stars: 215,
      img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
      live: true,
      category: "fullstack"
    },
    {
      ti: "Bhasa Translator",
      desc: "AI-powered Nepali ↔ English translator with custom fine-tuned model & idiomatic expression handling.",
      tags: ["Python", "FastAPI", "ML", "React"],
      c: "#7c6fff",
      grad: "linear-gradient(135deg,#4facfe,#00f2fe)",
      stars: 174,
      img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
      live: false,
      category: "ai"
    },
    {
      ti: "FinTrack Mobile",
      desc: "Cross-platform mobile finance tracker with expense categorization, budget alerts & beautiful insight visualizations.",
      tags: ["React Native", "Firebase", "Charts", "AI"],
      c: "#ff6b9d",
      grad: "linear-gradient(135deg,#a18cd1,#fbc2eb)",
      stars: 203,
      img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
      live: false,
      category: "mobile"
    },
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'tools', label: 'Tools' },
    { id: 'ai', label: 'AI/ML' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" style={{ 
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
            background: "rgba(0,212,170,.12)",
            border: "1px solid rgba(0,212,170,.3)",
            borderRadius: 50,
            padding: "5px 16px",
            marginBottom: 14
          }}>
            <Layers size={13} color="#00d4aa" />
            <span style={{ fontSize: ".7rem", fontWeight: 800, color: "#00d4aa", letterSpacing: ".1em" }}>PORTFOLIO</span>
          </div>
          
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            letterSpacing: "-.03em",
            color: dark ? "#e8e8ff" : "#0f0f2d"
          }}>
            Featured <span className="gtext">Projects</span>
          </h2>
          
          <p style={{
            color: dark ? "#6868a0" : "#7070a0",
            marginTop: 10,
            fontSize: ".92rem",
            maxWidth: 600,
            margin: "10px auto 0"
          }}>
            Showcasing innovative solutions built with modern technologies and creative problem-solving
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              style={{
                padding: "8px 20px",
                borderRadius: 50,
                fontSize: ".8rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all .3s",
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: ".04em",
                border: activeFilter === filter.id 
                  ? "none"
                  : `1.5px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                background: activeFilter === filter.id
                  ? "linear-gradient(135deg,#7c6fff,#ff6b9d)"
                  : "transparent",
                color: activeFilter === filter.id
                  ? "#fff"
                  : dark ? "#e8e8ff" : "#0f0f2d"
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="pgrid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: 24 
        }}>
          {filteredProjects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "default",
                background: dark ? "#1a1a38" : "#ffffff",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
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
              {/* Image Container */}
              <div className="project-card-img" style={{
                position: "relative",
                width: "100%",
                height: 220,
                overflow: "hidden",
                borderRadius: "20px 20px 0 0"
              }}>
                <img 
                  src={p.img} 
                  alt={p.ti} 
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                />
                
                <div className="project-card-overlay" style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
                  opacity: 0,
                  transition: "opacity 0.4s"
                }} />
                
                {/* Top Badges */}
                <div style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  right: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  zIndex: 2
                }}>
                  {p.live && (
                    <span style={{
                      background: "rgba(0,212,170,.85)",
                      backdropFilter: "blur(12px)",
                      color: "#fff",
                      padding: "5px 12px",
                      borderRadius: 20,
                      fontSize: ".66rem",
                      fontWeight: 800,
                      letterSpacing: ".06em",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      border: "1px solid rgba(255,255,255,.3)"
                    }}>
                      <span style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#fff",
                        animation: "pulseRing 2s infinite"
                      }} />
                      LIVE
                    </span>
                  )}
                  
                  <div style={{
                    background: "rgba(0,0,0,.6)",
                    backdropFilter: "blur(12px)",
                    padding: "5px 11px",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    border: "1px solid rgba(255,255,255,.2)"
                  }}>
                    <Star size={12} color="#ffb547" fill="#ffb547" />
                    <span style={{ fontSize: ".74rem", fontWeight: 800, color: "#fff" }}>{p.stars}</span>
                  </div>
                </div>

                {/* Hover Play Button */}
                <div className="play-overlay" style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity .3s",
                  zIndex: 3
                }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(0,0,0,.4)"
                  }}>
                    <Play size={24} color={p.c} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "22px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.08rem",
                  color: dark ? "#e8e8ff" : "#0f0f2d",
                  marginBottom: 10,
                  lineHeight: 1.3
                }}>{p.ti}</h3>
                
                <p style={{
                  fontSize: ".86rem",
                  color: dark ? "#6868a0" : "#7070a0",
                  lineHeight: 1.7,
                  marginBottom: 16,
                  flex: 1
                }}>{p.desc}</p>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                  {p.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        background: `${p.c}12`,
                        color: p.c,
                        border: `1px solid ${p.c}30`,
                        padding: "4px 10px",
                        borderRadius: 16,
                        fontSize: ".68rem",
                        fontWeight: 700,
                        letterSpacing: ".04em"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: 12,
                    background: `linear-gradient(135deg,${p.c},${p.c}dd)`,
                    border: "none",
                    color: "#fff",
                    fontSize: ".82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    fontFamily: "'Outfit', sans-serif",
                    transition: "all .3s"
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <Globe size={13} /> Demo
                  </button>
                  
                  <button style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    background: dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.04)",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                    color: dark ? "#6868a0" : "#7070a0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all .3s"
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = p.c;
                      e.currentTarget.style.color = p.c;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
                      e.currentTarget.style.color = dark ? "#6868a0" : "#7070a0";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Github size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <style>{`
          .project-card:hover .project-card-img img {
            transform: scale(1.1) rotate(2deg);
          }
          .project-card:hover .project-card-overlay {
            opacity: 1;
          }
          .project-card:hover .play-overlay {
            opacity: 1;
          }
          @media (max-width: 820px) {
            .pgrid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Projects;
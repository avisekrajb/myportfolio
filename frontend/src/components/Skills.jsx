import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Cloud, Smartphone, Shield, Layout, Code, Database, Server, GitBranch, Terminal, Palette } from 'lucide-react';

const Skills = ({ dark }) => {
  const [progress, setProgress] = useState({});

  const skills = [
    { name: "React.js / Next.js", pct: 88, color: "#61dafb", icon: Layout },
    { name: "JavaScript / TypeScript", pct: 85, color: "#f9ca24", icon: Code },
    { name: "Python", pct: 82, color: "#4584b6", icon: Terminal },
    { name: "Node.js / Express", pct: 76, color: "#68a063", icon: Server },
    { name: "SQL / MongoDB", pct: 73, color: "#ff6b9d", icon: Database },
    { name: "Git / Linux / DevOps", pct: 78, color: "#f05133", icon: GitBranch },
  ];

  const techs = [
    { n: "React", e: "⚛️", c: "#61dafb" },
    { n: "TypeScript", e: "🔷", c: "#3178c6" },
    { n: "Python", e: "🐍", c: "#4584b6" },
    { n: "Node.js", e: "🟢", c: "#68a063" },
    { n: "MongoDB", e: "🍃", c: "#47a248" },
    { n: "PostgreSQL", e: "🐘", c: "#336791" },
    { n: "Docker", e: "🐳", c: "#2496ed" },
    { n: "Git", e: "🔁", c: "#f05033" },
    { n: "Tailwind", e: "💨", c: "#06b6d4" },
    { n: "Figma", e: "🎨", c: "#f24e1e" },
    { n: "Firebase", e: "🔥", c: "#ffca28" },
    { n: "C/C++", e: "⚙️", c: "#00599c" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const newProgress = {};
      skills.forEach(skill => {
        newProgress[skill.name] = skill.pct;
      });
      setProgress(newProgress);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const SBar = ({ name, pct, color, icon: Icon, delay = 0 }) => {
    const [ref, v] = useState(false);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              v(true);
            }, delay * 1000);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );

      const element = document.getElementById(`skill-${name}`);
      if (element) observer.observe(element);

      return () => observer.disconnect();
    }, [name, delay]);

    return (
      <div id={`skill-${name}`} style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
          <span style={{ fontSize: ".88rem", fontWeight: 600, color: dark ? "#e8e8ff" : "#0f0f2d", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={12} color={color} />
            </div>
            {name}
          </span>
          <span style={{ fontSize: ".8rem", color: dark ? "#6868a0" : "#7070a0" }}>{pct}%</span>
        </div>
        <div className="skill-track" style={{ 
          height: 7, 
          background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)", 
          borderRadius: 10, 
          overflow: "hidden" 
        }}>
          <div className="skill-fill" style={{ 
            height: "100%", 
            borderRadius: 10, 
            transition: `width 1.6s cubic-bezier(.65,0,.35,1) ${delay}s`,
            width: v ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}88)` 
          }} />
        </div>
      </div>
    );
  };

  return (
    <section id="skills" style={{ 
      padding: "120px 5%", 
      background: dark 
        ? "linear-gradient(180deg, #070714 0%, #0e0e22 50%, #070714 100%)" 
        : "linear-gradient(180deg, #f4f4fb 0%, #eaeaf7 50%, #f4f4fb 100%)" 
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "rgba(255,107,157,.12)",
            border: "1px solid rgba(255,107,157,.3)",
            borderRadius: 50,
            padding: "5px 16px",
            marginBottom: 14
          }}>
            <Cpu size={13} color="#ff6b9d" />
            <span style={{ fontSize: ".7rem", fontWeight: 800, color: "#ff6b9d", letterSpacing: ".1em" }}>TECH STACK</span>
          </div>
          
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            letterSpacing: "-.03em",
            color: dark ? "#e8e8ff" : "#0f0f2d"
          }}>
            Skills & <span style={{
              background: "linear-gradient(135deg, #7c6fff, #ff6b9d, #00d4aa)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradShift 5s ease infinite"
            }}>Technologies</span>
          </h2>
        </div>
        
        <div className="scols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52 }}>
          {/* Left Column */}
          <div>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "1.05rem",
              marginBottom: 26,
              color: dark ? "#e8e8ff" : "#0f0f2d",
              display: "flex",
              alignItems: "center",
              gap: 10
            }}>
              <Zap size={20} color="#ffb547" />
              Proficiency
            </h3>
            {skills.map((skill, i) => (
              <SBar key={skill.name} {...skill} delay={i * 0.12} />
            ))}
          </div>
          
          {/* Right Column */}
          <div>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "1.05rem",
              marginBottom: 26,
              color: dark ? "#e8e8ff" : "#0f0f2d",
              display: "flex",
              alignItems: "center",
              gap: 10
            }}>
              <Cloud size={20} color="#7c6fff" />
              Tools & Frameworks
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {techs.map((t, i) => (
                <div key={i} style={{
                  background: dark ? "#1a1a38" : "#ffffff",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                  borderRadius: 14,
                  padding: "13px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 5,
                  cursor: "default",
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
                  <span style={{ fontSize: "1.4rem" }}>{t.e}</span>
                  <span style={{ 
                    fontSize: ".62rem", 
                    fontWeight: 700, 
                    color: dark ? "#6868a0" : "#7070a0",
                    textAlign: "center" 
                  }}>{t.n}</span>
                </div>
              ))}
            </div>
            
            {/* Additional Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginTop: 32 }}
            >
              <div style={{
                background: dark ? "#1a1a38" : "#ffffff",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                borderRadius: 20,
                padding: 20,
                marginTop: 20
              }}>
                <h4 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: ".9rem",
                  marginBottom: 16,
                  color: dark ? "#e8e8ff" : "#0f0f2d",
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}>
                  <Shield size={16} color="#00d4aa" />
                  Additional Expertise
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {['REST APIs', 'GraphQL', 'WebSockets', 'JWT Auth', 'OAuth', 'Redis', 'AWS', 'CI/CD', 'Testing', 'Agile'].map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: "6px 12px",
                        background: dark ? "rgba(124,111,255,.1)" : "rgba(124,111,255,.08)",
                        color: "#7c6fff",
                        border: "1px solid rgba(124,111,255,.3)",
                        borderRadius: 20,
                        fontSize: ".7rem",
                        fontWeight: 700,
                        letterSpacing: ".04em"
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Currently Learning */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: 48 }}
        >
          <div style={{
            background: dark ? "rgba(0,212,170,.08)" : "rgba(0,212,170,.05)",
            border: "1px solid rgba(0,212,170,.3)",
            borderRadius: 20,
            padding: 24,
            display: "flex",
            alignItems: "center",
            gap: 16
          }}>
            <Smartphone size={24} color="#00d4aa" />
            <div style={{ flex: 1 }}>
              <h4 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                marginBottom: 4,
                color: dark ? "#e8e8ff" : "#0f0f2d"
              }}>Currently Learning</h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {['React Native', 'GraphQL', 'Microservices', 'Web3', 'Machine Learning'].map(tech => (
                  <span
                    key={tech}
                    style={{
                      padding: "6px 14px",
                      background: dark ? "rgba(0,212,170,.15)" : "rgba(0,212,170,.1)",
                      color: "#00d4aa",
                      border: "1px solid rgba(0,212,170,.3)",
                      borderRadius: 20,
                      fontSize: ".75rem",
                      fontWeight: 700
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <style jsx>{`
        @keyframes gradShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @media (max-width: 820px) {
          .scols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
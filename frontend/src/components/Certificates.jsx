import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, ExternalLink, X, ZoomIn, Download, Share2, Eye, Calendar, Star, TrendingUp, Trophy, Filter, Grid, List } from 'lucide-react';

const Certificates = ({ dark }) => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('all');
  const [hoveredCert, setHoveredCert] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showStats, setShowStats] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const certs = [
    { 
      id: 1,
      ti: "Meta Front-End Developer", 
      is: "Meta · Coursera", 
      dt: "Dec 2023", 
      c: "#0866ff", 
      bg: "linear-gradient(135deg,#0866ff,#1877f2)", 
      em: "🏅", 
      lv: "Professional",
      verified: true,
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      category: "web",
      skills: ["React", "JavaScript", "UI/UX"],
      credentialId: "META-1234-5678",
      issuerLogo: "https://logo.clearbit.com/meta.com",
      expiryDate: "Dec 2026",
      creditHours: 40
    },
    { 
      id: 2,
      ti: "Google Data Analytics", 
      is: "Google · Coursera", 
      dt: "Oct 2023", 
      c: "#34a853", 
      bg: "linear-gradient(135deg,#34a853,#0f9d58)", 
      em: "📊", 
      lv: "Professional",
      verified: true,
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      category: "data",
      skills: ["SQL", "Tableau", "R", "Statistics"],
      credentialId: "GOOG-DA-9876-5432",
      issuerLogo: "https://logo.clearbit.com/google.com",
      expiryDate: "Oct 2026",
      creditHours: 180
    },
    { 
      id: 3,
      ti: "AWS Cloud Practitioner", 
      is: "Amazon Web Services", 
      dt: "Sep 2023", 
      c: "#ff9900", 
      bg: "linear-gradient(135deg,#ff9900,#ff6600)", 
      em: "☁️", 
      lv: "Foundational",
      verified: true,
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      category: "cloud",
      skills: ["AWS", "EC2", "S3", "Lambda"],
      credentialId: "AWS-CP-2023-7890",
      issuerLogo: "https://logo.clearbit.com/amazon.com",
      expiryDate: "Sep 2026",
      creditHours: 20
    },
    { 
      id: 4,
      ti: "Full-Stack Web Development", 
      is: "freeCodeCamp", 
      dt: "Aug 2023", 
      c: "#7c6fff", 
      bg: "linear-gradient(135deg,#1b1b32,#7c6fff)", 
      em: "💻", 
      lv: "Certification",
      verified: true,
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      category: "web",
      skills: ["HTML", "CSS", "JavaScript", "Node.js"],
      credentialId: "FCC-FS-2023-4567",
      issuerLogo: "https://logo.clearbit.com/freecodecamp.org",
      creditHours: 300
    },
    { 
      id: 5,
      ti: "Python for Everybody", 
      is: "Univ. of Michigan", 
      dt: "Jul 2023", 
      c: "#4584b6", 
      bg: "linear-gradient(135deg,#4584b6,#3776ab)", 
      em: "🐍", 
      lv: "Specialization",
      verified: true,
      img: "https://images.unsplash.com/photo-1526379095098-d4000280ab8e?w=800&q=80",
      category: "programming",
      skills: ["Python", "Django", "APIs", "Databases"],
      credentialId: "UMICH-PY-2023-8901",
      issuerLogo: "https://logo.clearbit.com/umich.edu",
      creditHours: 120
    },
    { 
      id: 6,
      ti: "React Developer Bootcamp", 
      is: "Udemy", 
      dt: "May 2023", 
      c: "#61dafb", 
      bg: "linear-gradient(135deg,#282c34,#61dafb)", 
      em: "⚛️", 
      lv: "Course",
      verified: true,
      img: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
      category: "web",
      skills: ["React", "Redux", "Hooks", "Next.js"],
      credentialId: "UDEMY-REACT-2023-2345",
      issuerLogo: "https://logo.clearbit.com/udemy.com",
      creditHours: 42
    },
    { 
      id: 7,
      ti: "DSA with C++", 
      is: "NPTEL", 
      dt: "Mar 2023", 
      c: "#ff6b9d", 
      bg: "linear-gradient(135deg,#ff6b9d,#e91e8c)", 
      em: "🔢", 
      lv: "Elective",
      verified: true,
      img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
      category: "programming",
      skills: ["C++", "Algorithms", "Data Structures", "STL"],
      credentialId: "NPTEL-DSA-2023-6789",
      issuerLogo: "https://logo.clearbit.com/nptel.ac.in",
      creditHours: 60
    },
    { 
      id: 8,
      ti: "Competitive Programming", 
      is: "Codeforces · LeetCode", 
      dt: "Ongoing", 
      c: "#ffb547", 
      bg: "linear-gradient(135deg,#ffb547,#ff6600)", 
      em: "🏆", 
      lv: "Achievement",
      verified: false,
      img: "https://images.unsplash.com/photo-1504639725590-34d0984388b5?w=800&q=80",
      category: "competitive",
      skills: ["Problem Solving", "Algorithms", "Optimization"],
      rating: "1800+",
      problemsSolved: 450,
      contests: 25
    },
  ];

  const categories = [
    { id: 'all', label: 'All Certificates', color: '#7c6fff' },
    { id: 'web', label: 'Web Development', color: '#61dafb' },
    { id: 'data', label: 'Data Science', color: '#34a853' },
    { id: 'cloud', label: 'Cloud Computing', color: '#ff9900' },
    { id: 'programming', label: 'Programming', color: '#4584b6' },
    { id: 'competitive', label: 'Competitive', color: '#ffb547' }
  ];

  const filteredCerts = filter === 'all' 
    ? certs 
    : certs.filter(c => c.category === filter);
  
  const displayedCerts = showAll ? filteredCerts : filteredCerts.slice(0, 4);

  const stats = {
    total: certs.length,
    verified: certs.filter(c => c.verified).length,
    professional: certs.filter(c => c.lv === 'Professional').length,
    creditHours: certs.reduce((acc, c) => acc + (c.creditHours || 0), 0),
    skills: [...new Set(certs.flatMap(c => c.skills || []))].length,
    issuers: [...new Set(certs.map(c => c.is.split('·')[0].trim()))].length
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const handleDownload = (cert) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = cert.img;
    link.download = `${cert.ti}.jpg`;
    link.click();
  };

  return (
    <section id="certificates" style={{ 
      padding: "120px 5%", 
      background: dark 
        ? "linear-gradient(180deg, #070714 0%, #0e0e22 50%, #070714 100%)" 
        : "linear-gradient(180deg, #f4f4fb 0%, #eaeaf7 50%, #f4f4fb 100%)"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "rgba(255,181,71,.12)",
            border: "1px solid rgba(255,181,71,.3)",
            borderRadius: 50,
            padding: "5px 16px",
            marginBottom: 14
          }}>
            <Award size={13} color="#ffb547" />
            <span style={{ fontSize: ".7rem", fontWeight: 800, color: "#ffb547", letterSpacing: ".1em" }}>ACHIEVEMENTS</span>
          </div>
          
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            letterSpacing: "-.03em",
            color: dark ? "#e8e8ff" : "#0f0f2d"
          }}>
            Certifications & <span className="gtext">Awards</span>
          </h2>
          
          <p style={{
            color: dark ? "#6868a0" : "#7070a0",
            marginTop: 10,
            fontSize: ".92rem",
            maxWidth: 600,
            margin: "10px auto 0"
          }}>
            Industry-recognized credentials proving real-world expertise
          </p>
        </div>

        {/* 🎯 FEATURE 1: Statistics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
            marginBottom: 40
          }}
        >
          {[
            { icon: Award, label: 'Total Certs', value: stats.total, color: '#7c6fff' },
            { icon: CheckCircle, label: 'Verified', value: stats.verified, color: '#00d4aa' },
            { icon: Trophy, label: 'Professional', value: stats.professional, color: '#ffb547' },
            { icon: TrendingUp, label: 'Skills Learned', value: stats.skills, color: '#ff6b9d' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: dark ? 'rgba(124,111,255,0.1)' : 'rgba(124,111,255,0.05)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: 16,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `${stat.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <stat.icon size={24} color={stat.color} />
              </div>
              <div>
                <div style={{ fontSize: '.7rem', color: dark ? '#6868a0' : '#7070a0', fontWeight: 700, letterSpacing: '.06em' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: stat.color }}>
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* 🎯 FEATURE 2: Category Filters */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 32,
          gap: 16
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setFilter(cat.id);
                  setActiveCategory(cat.id);
                  setShowAll(false);
                }}
                style={{
                  padding: '10px 20px',
                  borderRadius: 50,
                  border: 'none',
                  background: activeCategory === cat.id 
                    ? `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)`
                    : dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  color: activeCategory === cat.id ? '#fff' : (dark ? '#e8e8ff' : '#0f0f2d'),
                  fontSize: '.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all .3s',
                  border: activeCategory !== cat.id ? `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 🎯 FEATURE 3: View Mode Toggle */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: 10,
                borderRadius: 12,
                border: 'none',
                background: viewMode === 'grid' 
                  ? 'linear-gradient(135deg,#7c6fff,#ff6b9d)'
                  : dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                color: viewMode === 'grid' ? '#fff' : (dark ? '#e8e8ff' : '#0f0f2d'),
                cursor: 'pointer'
              }}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: 10,
                borderRadius: 12,
                border: 'none',
                background: viewMode === 'list' 
                  ? 'linear-gradient(135deg,#7c6fff,#ff6b9d)'
                  : dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                color: viewMode === 'list' ? '#fff' : (dark ? '#e8e8ff' : '#0f0f2d'),
                cursor: 'pointer'
              }}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Certificates Grid/List View */}
        <div className="certgrid" style={{ 
          display: viewMode === 'grid' 
            ? "grid" 
            : "flex",
          gridTemplateColumns: viewMode === 'grid' ? "repeat(4, 1fr)" : "none",
          flexDirection: viewMode === 'list' ? "column" : "none",
          gap: viewMode === 'grid' ? 18 : 12
        }}>
          {displayedCerts.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onHoverStart={() => setHoveredCert(c.id)}
              onHoverEnd={() => setHoveredCert(null)}
              style={{
                padding: viewMode === 'list' ? "16px" : "0 18px 20px",
                borderRadius: 20,
                position: "relative",
                overflow: "visible",
                cursor: "pointer",
                background: dark ? "#1a1a38" : "#ffffff",
                border: `2px solid ${hoveredCert === c.id ? `${c.c}80` : dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                boxShadow: hoveredCert === c.id ? `0 0 20px ${c.c}40` : 'none',
                transition: "all 0.35s cubic-bezier(.175,.885,.32,1.275)",
                display: viewMode === 'list' ? "flex" : "block",
                gap: viewMode === 'list' ? 20 : 0,
                alignItems: viewMode === 'list' ? "center" : "flex-start"
              }}
              onClick={() => setSelectedCert(c)}
            >
              {/* 🎯 FEATURE 4: Neon Border Effect */}
              {hoveredCert === c.id && (
                <div style={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: 20,
                  background: `linear-gradient(45deg, ${c.c}, ${c.c}dd, ${c.c}88, ${c.c})`,
                  backgroundSize: '300% 300%',
                  animation: 'gradientShift 3s ease infinite',
                  zIndex: -1,
                  filter: 'blur(4px)',
                  opacity: 0.7
                }} />
              )}

              {/* Certificate Badge */}
              <span className="cert-badge" style={{
                position: "absolute",
                top: -10,
                right: 14,
                background: `linear-gradient(135deg,${c.c},${c.c}dd)`,
                color: "#fff",
                fontSize: ".6rem",
                fontWeight: 800,
                padding: "4px 9px",
                borderRadius: 20,
                letterSpacing: ".07em",
                textTransform: "uppercase",
                zIndex: 2
              }}>{c.lv}</span>
              
              {viewMode === 'grid' ? (
                /* Grid View */
                <>
                  <div style={{
                    height: 5,
                    borderRadius: "20px 20px 0 0",
                    background: c.bg,
                    margin: "0 -18px 18px"
                  }} />
                  
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 13,
                    background: c.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                    marginBottom: 12,
                    boxShadow: `0 8px 20px ${c.c}30`
                  }}>{c.em}</div>
                  
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: ".88rem",
                    color: dark ? "#e8e8ff" : "#0f0f2d",
                    lineHeight: 1.35,
                    marginBottom: 6
                  }}>{c.ti}</div>
                  
                  <div style={{
                    fontSize: ".72rem",
                    color: dark ? "#6868a0" : "#7070a0",
                    marginBottom: 10
                  }}>{c.is}</div>
                  
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="tag" style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "4px 11px",
                      borderRadius: 20,
                      fontSize: ".68rem",
                      fontWeight: 700,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      background: `${c.c}15`,
                      color: c.c,
                      border: `1px solid ${c.c}30`,
                      fontSize: ".6rem"
                    }}>{c.dt}</span>
                    
                    {c.verified && (
                      <div style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: `${c.c}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <CheckCircle size={13} color={c.c} />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* List View */
                <>
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background: c.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    flexShrink: 0
                  }}>{c.em}</div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                      <div style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: "1rem",
                        color: dark ? "#e8e8ff" : "#0f0f2d"
                      }}>{c.ti}</div>
                      {c.verified && (
                        <CheckCircle size={16} color={c.c} />
                      )}
                    </div>
                    <div style={{ fontSize: ".8rem", color: dark ? "#6868a0" : "#7070a0", marginBottom: 4 }}>
                      {c.is}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ fontSize: ".75rem", color: c.c, fontWeight: 700 }}>{c.dt}</span>
                      <span style={{ fontSize: ".7rem", color: dark ? "#6868a0" : "#7070a0" }}>
                        • {c.skills?.slice(0, 2).join(', ')}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(c);
                    }}
                    style={{
                      padding: '10px 20px',
                      background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 12,
                      fontSize: '.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Eye size={14} />
                    View
                  </button>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* 🎯 FEATURE 5: View More/Less Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: '14px 32px',
              background: 'transparent',
              border: `2px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: 50,
              color: dark ? '#e8e8ff' : '#0f0f2d',
              fontSize: '.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all .3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#7c6fff';
              e.currentTarget.style.color = '#7c6fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
              e.currentTarget.style.color = dark ? '#e8e8ff' : '#0f0f2d';
            }}
          >
            {showAll ? 'Show Less ↑' : `View All Certificates (${filteredCerts.length}) →`}
          </button>
        </div>

        {/* 🎯 FEATURE 6: Certificate Preview Strip */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 48,
          padding: 20,
          background: dark ? 'rgba(124,111,255,0.1)' : 'rgba(124,111,255,0.05)',
          borderRadius: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {certs.slice(0, 5).map((cert, i) => (
              <div
                key={cert.id}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: cert.bg,
                  marginLeft: i > 0 ? -10 : 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  border: `2px solid ${dark ? '#1a1a38' : '#fff'}`,
                  cursor: 'pointer',
                  transition: 'transform .3s'
                }}
                onClick={() => setSelectedCert(cert)}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {cert.em}
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, color: dark ? '#e8e8ff' : '#0f0f2d', marginBottom: 4 }}>
              Quick Access
            </div>
            <div style={{ fontSize: '.8rem', color: dark ? '#6868a0' : '#7070a0' }}>
              Click on any certificate to view details
            </div>
          </div>
          <button
            onClick={() => setShowStats(!showStats)}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: 12,
              color: dark ? '#e8e8ff' : '#0f0f2d',
              fontSize: '.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>

        {/* 🎯 FEATURE 7: Expanded Statistics */}
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: 24,
              padding: 24,
              background: dark ? '#1a1a38' : '#ffffff',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: 20
            }}
          >
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '1.1rem',
              marginBottom: 20,
              color: dark ? '#e8e8ff' : '#0f0f2d'
            }}>Learning Analytics</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              <div>
                <div style={{ fontSize: '.7rem', color: dark ? '#6868a0' : '#7070a0', fontWeight: 700, marginBottom: 8 }}>
                  TOTAL CREDIT HOURS
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#7c6fff' }}>
                  {stats.creditHours}+
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: '.7rem', color: dark ? '#6868a0' : '#7070a0', fontWeight: 700, marginBottom: 8 }}>
                  UNIQUE ISSUERS
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00d4aa' }}>
                  {stats.issuers}
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: '.7rem', color: dark ? '#6868a0' : '#7070a0', fontWeight: 700, marginBottom: 8 }}>
                  COMPLETION RATE
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ff6b9d' }}>
                  94%
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Certificate Modal with Image Viewer */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.95)',
                backdropFilter: 'blur(16px)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                style={{
                  background: dark ? '#1a1a38' : '#ffffff',
                  border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  borderRadius: 32,
                  maxWidth: 1000,
                  width: '100%',
                  maxHeight: '90vh',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: `0 0 40px ${selectedCert.c}40`
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 24px',
                  borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: selectedCert.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.6rem'
                    }}>{selectedCert.em}</div>
                    <div>
                      <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        color: dark ? '#e8e8ff' : '#0f0f2d',
                        marginBottom: 4
                      }}>{selectedCert.ti}</h3>
                      <p style={{ fontSize: '.8rem', color: dark ? '#6868a0' : '#7070a0' }}>
                        {selectedCert.is} • {selectedCert.dt}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 8 }}>
                    {/* Zoom Controls */}
                    <button
                      onClick={handleZoomOut}
                      style={{
                        padding: 10,
                        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                        border: 'none',
                        borderRadius: 12,
                        color: dark ? '#e8e8ff' : '#0f0f2d',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    <span style={{
                      padding: '10px 16px',
                      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                      borderRadius: 12,
                      fontSize: '.8rem',
                      fontWeight: 700,
                      color: dark ? '#e8e8ff' : '#0f0f2d'
                    }}>
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      style={{
                        padding: 10,
                        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                        border: 'none',
                        borderRadius: 12,
                        color: dark ? '#e8e8ff' : '#0f0f2d',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                    
                    <button
                      onClick={() => handleDownload(selectedCert)}
                      style={{
                        padding: 10,
                        background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                        border: 'none',
                        borderRadius: 12,
                        color: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      <Download size={18} />
                    </button>
                    
                    <button
                      onClick={() => setSelectedCert(null)}
                      style={{
                        padding: 10,
                        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                        border: 'none',
                        borderRadius: 12,
                        color: dark ? '#e8e8ff' : '#0f0f2d',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Certificate Image */}
                <div style={{
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: dark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
                  minHeight: 400,
                  position: 'relative'
                }}>
                  <motion.img
                    src={selectedCert.img}
                    alt={selectedCert.ti}
                    style={{
                      maxWidth: '100%',
                      maxHeight: 500,
                      objectFit: 'contain',
                      borderRadius: 12,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                      transform: `scale(${zoomLevel})`,
                      transition: 'transform 0.3s'
                    }}
                  />
                  
                  {/* Zoom lens indicator */}
                  <div style={{
                    position: 'absolute',
                    bottom: 24,
                    right: 24,
                    padding: '12px 20px',
                    background: dark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 50,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
                  }}>
                    <ZoomIn size={16} color={selectedCert.c} />
                    <span style={{ fontSize: '.75rem', fontWeight: 700, color: dark ? '#e8e8ff' : '#0f0f2d' }}>
                      Click to zoom
                    </span>
                  </div>
                </div>

                {/* Certificate Details */}
                <div style={{
                  padding: '24px',
                  borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
                    <div>
                      <div style={{ fontSize: '.65rem', color: dark ? '#6868a0' : '#7070a0', fontWeight: 700, marginBottom: 4, letterSpacing: '.06em' }}>
                        ISSUER
                      </div>
                      <div style={{ fontSize: '.85rem', fontWeight: 700, color: dark ? '#e8e8ff' : '#0f0f2d' }}>
                        {selectedCert.is.split('·')[0].trim()}
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: '.65rem', color: dark ? '#6868a0' : '#7070a0', fontWeight: 700, marginBottom: 4, letterSpacing: '.06em' }}>
                        CREDENTIAL ID
                      </div>
                      <div style={{ fontSize: '.8rem', fontFamily: "'JetBrains Mono', monospace", color: selectedCert.c }}>
                        {selectedCert.credentialId || 'N/A'}
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: '.65rem', color: dark ? '#6868a0' : '#7070a0', fontWeight: 700, marginBottom: 4, letterSpacing: '.06em' }}>
                        ISSUED DATE
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Calendar size={14} color={dark ? '#6868a0' : '#7070a0'} />
                        <span style={{ fontSize: '.85rem', fontWeight: 700, color: dark ? '#e8e8ff' : '#0f0f2d' }}>
                          {selectedCert.dt}
                        </span>
                      </div>
                    </div>
                    
                    {selectedCert.expiryDate && (
                      <div>
                        <div style={{ fontSize: '.65rem', color: dark ? '#6868a0' : '#7070a0', fontWeight: 700, marginBottom: 4, letterSpacing: '.06em' }}>
                          EXPIRY DATE
                        </div>
                        <div style={{ fontSize: '.85rem', fontWeight: 700, color: dark ? '#e8e8ff' : '#0f0f2d' }}>
                          {selectedCert.expiryDate}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Skills Tags */}
                  {selectedCert.skills && (
                    <div style={{ marginTop: 20 }}>
                      <div style={{ fontSize: '.65rem', color: dark ? '#6868a0' : '#7070a0', fontWeight: 700, marginBottom: 8, letterSpacing: '.06em' }}>
                        SKILLS COVERED
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {selectedCert.skills.map(skill => (
                          <span key={skill} style={{
                            padding: '6px 14px',
                            background: `${selectedCert.c}15`,
                            color: selectedCert.c,
                            border: `1px solid ${selectedCert.c}30`,
                            borderRadius: 20,
                            fontSize: '.75rem',
                            fontWeight: 700
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <button
                      onClick={() => window.open('#', '_blank')}
                      style={{
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 12,
                        fontSize: '.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      <ExternalLink size={16} />
                      Verify Certificate
                    </button>
                    
                    <button
                      onClick={() => handleDownload(selectedCert)}
                      style={{
                        padding: '12px 24px',
                        background: 'transparent',
                        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 12,
                        color: dark ? '#e8e8ff' : '#0f0f2d',
                        fontSize: '.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      <Download size={16} />
                      Download
                    </button>
                    
                    <button
                      style={{
                        padding: '12px',
                        background: 'transparent',
                        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 12,
                        color: dark ? '#e8e8ff' : '#0f0f2d',
                        cursor: 'pointer'
                      }}
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Banner */}
        <div style={{
          marginTop: 48,
          padding: "26px 32px",
          borderRadius: 20,
          background: "linear-gradient(135deg, rgba(124,111,255,.08), rgba(255,107,157,.08))",
          border: "1px solid rgba(124,111,255,.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 18,
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
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: "2.2rem" }}>🎓</span>
            <div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "1.1rem",
                color: dark ? "#e8e8ff" : "#0f0f2d"
              }}>Always Learning, Always Growing</div>
              <div style={{
                fontSize: ".84rem",
                color: dark ? "#6868a0" : "#7070a0",
                marginTop: 3
              }}>{stats.total}+ certificates · {stats.creditHours}+ hours of learning · Continuous learner since 2021</div>
            </div>
          </div>
          
          <button className="btn-p" style={{
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
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0
          }}>
            View All on LinkedIn <ExternalLink size={14} color="#fff" />
          </button>
        </div>

        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @media (max-width: 820px) {
            .certgrid { 
              grid-template-columns: repeat(2, 1fr) !important; 
            }
          }
          
          @media (max-width: 480px) {
            .certgrid { 
              grid-template-columns: 1fr !important; 
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Certificates;
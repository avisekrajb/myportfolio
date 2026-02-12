import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Globe, Briefcase, CheckCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = ({ dark }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    msg: ""
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/contact', {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.msg
      });
      
      toast.success('Message sent successfully!');
      setSent(true);
      setForm({ name: "", email: "", subject: "", msg: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { ic: "mail", l: "Email", v: "abhishek.rajbanshi@email.com", c: "#7c6fff" },
    { ic: "map-pin", l: "Location", v: "Dharan, Koshi, Nepal 🇳🇵", c: "#ff6b9d" },
    { ic: "globe", l: "Portfolio", v: "abhishekrajbanshi.dev", c: "#00d4aa" },
    { ic: "briefcase", l: "LinkedIn", v: "/in/abhishek-rajbanshi", c: "#0077b5" },
  ];

  const getIcon = (name, color) => {
    switch(name) {
      case 'mail': return <Mail size={17} color={color} />;
      case 'map-pin': return <MapPin size={17} color={color} />;
      case 'globe': return <Globe size={17} color={color} />;
      case 'briefcase': return <Briefcase size={17} color={color} />;
      default: return null;
    }
  };

  return (
    <section id="contact" style={{ 
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
            background: "rgba(255,107,157,.12)",
            border: "1px solid rgba(255,107,157,.3)",
            borderRadius: 50,
            padding: "5px 16px",
            marginBottom: 14
          }}>
            <Send size={13} color="#ff6b9d" />
            <span style={{ fontSize: ".7rem", fontWeight: 800, color: "#ff6b9d", letterSpacing: ".1em" }}>CONTACT</span>
          </div>
          
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            letterSpacing: "-.03em",
            color: dark ? "#e8e8ff" : "#0f0f2d"
          }}>
            Let's <span className="gtext">Connect</span>
          </h2>
          
          <p style={{
            color: dark ? "#6868a0" : "#7070a0",
            marginTop: 10,
            fontSize: ".92rem"
          }}>
            Have a project, internship offer, or just want to say hi? I'd love to hear from you!
          </p>
        </div>

        <div className="cgrid" style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1.5fr", 
          gap: 36, 
          alignItems: "start" 
        }}>
          {/* Left Column - Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {contactInfo.map((item, index) => (
              <div
                key={item.l}
                style={{
                  background: dark ? "#1a1a38" : "#ffffff",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                  borderRadius: 16,
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
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
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `${item.c}15`,
                  border: `1.5px solid ${item.c}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  {getIcon(item.ic, item.c)}
                </div>
                <div>
                  <div style={{
                    fontSize: ".68rem",
                    color: dark ? "#6868a0" : "#7070a0",
                    letterSpacing: ".06em",
                    marginBottom: 2
                  }}>{item.l}</div>
                  <div style={{
                    fontWeight: 700,
                    color: dark ? "#e8e8ff" : "#0f0f2d",
                    fontSize: ".84rem"
                  }}>{item.v}</div>
                </div>
              </div>
            ))}

            {/* Social Links Card */}
            <div style={{
              background: dark ? "#1a1a38" : "#ffffff",
              border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              borderRadius: 16,
              padding: "18px",
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
                color: dark ? "#6868a0" : "#7070a0",
                letterSpacing: ".08em",
                marginBottom: 12,
                fontWeight: 700
              }}>FIND ME ON</div>
              
              <div style={{ display: "flex", gap: 9 }}>
                {[
                  { n: "github", c: dark ? "#e8e8ff" : "#0f0f2d", l: "GitHub" },
                  { n: "linkedin", c: "#0077b5", l: "LinkedIn" },
                  { n: "twitter", c: "#1da1f2", l: "Twitter" }
                ].map(s => (
                  <button
                    key={s.n}
                    style={{
                      flex: 1,
                      padding: "9px 5px",
                      borderRadius: 11,
                      background: dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.03)",
                      border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                      color: dark ? "#6868a0" : "#7070a0",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      fontSize: ".62rem",
                      fontWeight: 700,
                      fontFamily: "'Outfit', sans-serif",
                      letterSpacing: ".04em",
                      transition: "all .3s"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = s.c;
                      e.currentTarget.style.borderColor = s.c;
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = dark ? "#6868a0" : "#7070a0";
                      e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      {s.n === 'github' && <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>}
                      {s.n === 'linkedin' && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>}
                      {s.n === 'twitter' && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>}
                    </svg>
                    {s.l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div style={{
            background: dark ? "#1a1a38" : "#ffffff",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            borderRadius: 22,
            padding: "32px",
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
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 20px", animation: "scaleIn .5s ease" }}>
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(0,212,170,.12)",
                  border: "2px solid #00d4aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  animation: "pulseRing 2s infinite"
                }}>
                  <CheckCircle size={32} color="#00d4aa" />
                </div>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  marginBottom: 8,
                  color: dark ? "#e8e8ff" : "#0f0f2d"
                }}>Message Sent! 🎉</h3>
                <p style={{
                  color: dark ? "#6868a0" : "#7070a0",
                  fontSize: ".9rem"
                }}>I'll reply within 24 hours. Looking forward to connecting!</p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-p"
                  style={{
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
                    marginTop: 22
                  }}
                >
                  Send Another →
                </button>
              </div>
            ) : (
              <>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: dark ? "#e8e8ff" : "#0f0f2d",
                  marginBottom: 2
                }}>Send a Message 👋</div>
                
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{
                        fontSize: ".68rem",
                        color: dark ? "#6868a0" : "#7070a0",
                        display: "block",
                        marginBottom: 6,
                        fontWeight: 700,
                        letterSpacing: ".06em"
                      }}>YOUR NAME</label>
                      <input
                        className="inp"
                        style={{
                          width: "100%",
                          background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                          border: `1.5px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                          borderRadius: 12,
                          padding: "13px 16px",
                          color: dark ? "#e8e8ff" : "#0f0f2d",
                          fontSize: ".92rem",
                          fontFamily: "'Outfit', sans-serif",
                          transition: "all .3s",
                          outline: "none",
                          resize: "none"
                        }}
                        placeholder="Your name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label style={{
                        fontSize: ".68rem",
                        color: dark ? "#6868a0" : "#7070a0",
                        display: "block",
                        marginBottom: 6,
                        fontWeight: 700,
                        letterSpacing: ".06em"
                      }}>EMAIL</label>
                      <input
                        className="inp"
                        type="email"
                        style={{
                          width: "100%",
                          background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                          border: `1.5px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                          borderRadius: 12,
                          padding: "13px 16px",
                          color: dark ? "#e8e8ff" : "#0f0f2d",
                          fontSize: ".92rem",
                          fontFamily: "'Outfit', sans-serif",
                          transition: "all .3s",
                          outline: "none"
                        }}
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{
                      fontSize: ".68rem",
                      color: dark ? "#6868a0" : "#7070a0",
                      display: "block",
                      marginBottom: 6,
                      fontWeight: 700,
                      letterSpacing: ".06em"
                    }}>SUBJECT</label>
                    <input
                      className="inp"
                      style={{
                        width: "100%",
                        background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                        border: `1.5px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                        borderRadius: 12,
                        padding: "13px 16px",
                        color: dark ? "#e8e8ff" : "#0f0f2d",
                        fontSize: ".92rem",
                        fontFamily: "'Outfit', sans-serif",
                        transition: "all .3s",
                        outline: "none"
                      }}
                      placeholder="Internship / Project Collaboration"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label style={{
                      fontSize: ".68rem",
                      color: dark ? "#6868a0" : "#7070a0",
                      display: "block",
                      marginBottom: 6,
                      fontWeight: 700,
                      letterSpacing: ".06em"
                    }}>MESSAGE</label>
                    <textarea
                      className="inp"
                      rows={5}
                      style={{
                        width: "100%",
                        background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                        border: `1.5px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                        borderRadius: 12,
                        padding: "13px 16px",
                        color: dark ? "#e8e8ff" : "#0f0f2d",
                        fontSize: ".92rem",
                        fontFamily: "'Outfit', sans-serif",
                        transition: "all .3s",
                        outline: "none",
                        resize: "none"
                      }}
                      placeholder="Tell me about your opportunity or project..."
                      value={form.msg}
                      onChange={e => setForm({ ...form, msg: e.target.value })}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-p"
                    style={{
                      background: "linear-gradient(135deg,#7c6fff,#ff6b9d)",
                      color: "#fff",
                      border: "none",
                      padding: "14px",
                      borderRadius: "50px",
                      fontSize: ".94rem",
                      fontWeight: 700,
                      cursor: loading ? "not-allowed" : "pointer",
                      letterSpacing: ".04em",
                      transition: "all .3s",
                      fontFamily: "'Outfit', sans-serif",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      opacity: loading ? 0.7 : 1
                    }}
                  >
                    {loading ? (
                      <>
                        <div style={{
                          width: 16,
                          height: 16,
                          border: "2px solid #fff",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite"
                        }} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} color="#fff" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulseRing {
            0%, 100% { box-shadow: 0 0 0 0 rgba(124,111,255,.5); }
            70% { box-shadow: 0 0 0 10px rgba(124,111,255,0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.88); }
            to { opacity: 1; transform: scale(1); }
          }
          @media (max-width: 820px) {
            .cgrid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Contact;
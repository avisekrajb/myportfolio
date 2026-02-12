import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, Mail, Phone, MapPin, Linkedin, Github, Twitter, ExternalLink } from 'lucide-react';

const Horizontal = ({ dark }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "👋 Hi there! I'm Abhishek's virtual assistant. How can I help you today?", sender: 'bot', time: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      text: inputMessage,
      sender: 'user',
      time: new Date()
    };
    setChatMessages([...chatMessages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Thanks for your message! I'll get back to you soon.",
        "Great question! You can check out my projects section for more details.",
        "I'm currently available for freelance work and internships!",
        "Feel free to download my CV from the hero section.",
        "You can reach me directly at abhishek.rajbanshi@email.com",
        "I specialize in React, Node.js, and full-stack development.",
        "Yes, I'm open to collaboration opportunities!",
        "Thanks for visiting my portfolio. Have a great day! 🚀"
      ];
      
      const botMessage = {
        id: chatMessages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        time: new Date()
      };
      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = [
    "What are your skills?",
    "Are you available for hire?",
    "View my projects",
    "Contact information"
  ];

  const handleQuickReply = (text) => {
    setInputMessage(text);
  };

  return (
    <>
      {/* Horizontal Floating Icons */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          zIndex: 999,
        }}
      >
        {/* Chat Bot Button */}
        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(true)}
          style={{
            width: 52,
            height: 52,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #7c6fff, #ff6b9d)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(124, 111, 255, 0.3)',
            position: 'relative',
            zIndex: 1000
          }}
        >
          <Bot size={24} color="#fff" />
          <span style={{
            position: 'absolute',
            top: -8,
            right: -8,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#00d4aa',
            border: `2px solid ${dark ? '#070714' : '#fff'}`,
            animation: 'pulseRing 2s infinite'
          }} />
        </motion.button>

        {/* WhatsApp Button */}
        <motion.a
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/9779800000000"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: 52,
            height: 52,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)',
            textDecoration: 'none'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.585 1.45 1.473-.481c.977.707 2.136 1.079 3.361 1.08h.001c3.181 0 5.768-2.587 5.768-5.768 0-3.181-2.586-5.767-5.768-5.767zm-2.482 8.954c-.262-.392-.42-.698-.602-1.014-.158-.274-.277-.533-.277-.86 0-.239.084-.464.245-.654.094-.112.203-.193.326-.258.125-.065.229-.046.324.035.156.143.356.414.488.601.094.136.2.232.353.165.37-.162.734-.428 1.06-.702.298-.251.557-.538.771-.854.057-.083.082-.175.048-.267-.036-.1-.21-.232-.294-.295-.236-.177-.479-.332-.73-.465-.161-.084-.253-.112-.329.043-.052.103-.124.27-.192.406-.05.102-.072.165-.127.219-.113.113-.198.165-.338.111-.578-.22-1.053-.521-1.444-.98-.095-.111-.201-.22-.233-.345-.039-.15.05-.247.118-.322.178-.196.393-.35.634-.455.113-.05.207-.068.29.019.164.175.31.367.45.566.072.103.159.201.285.184.221-.03.467-.088.68-.171.183-.071.252-.149.201-.352-.016-.067-.029-.135-.052-.2-.114-.325-.287-.622-.512-.879-.074-.085-.144-.189-.068-.286.068-.088.189-.065.291-.061.256.009.512.035.763.106.162.046.22.123.256.289.054.243.047.495.008.743-.019.124-.069.234-.142.34-.168.244-.367.464-.584.668-.154.144-.322.273-.501.384-.048.03-.085.072-.111.121-.031.06.001.124.042.163.1.096.203.189.311.276.355.285.752.5 1.185.662.084.032.17.056.259.072.067.013.138.011.199-.031.072-.05.09-.143.116-.222.049-.149.076-.303.08-.458 0-.052.006-.104.027-.152.033-.071.118-.098.191-.117.176-.045.35-.029.522.029.108.037.206.094.301.153.096.06.177.131.228.224.062.111.095.232.107.357.009.095-.001.189-.041.278-.057.123-.145.222-.248.306-.243.198-.522.35-.817.451-.124.043-.251.078-.381.102-.23.043-.466.052-.696.031-.338-.031-.656-.139-.959-.297-.326-.17-.618-.395-.87-.665-.128-.139-.245-.287-.358-.438z"/>
          </svg>
        </motion.a>

        {/* Hire Me Button */}
        <motion.a
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          href="#contact"
          style={{
            padding: '0 24px',
            height: 52,
            borderRadius: '30px',
            background: 'linear-gradient(135deg, #ff6b9d, #ffb547)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow: '0 10px 25px rgba(255, 107, 157, 0.3)',
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '0.5px'
          }}
        >
          <Briefcase size={18} color="#fff" />
          Hire Me
        </motion.a>
      </motion.div>

      {/* Chat Bot Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(5px)',
                zIndex: 1001
              }}
              onClick={() => setIsChatOpen(false)}
            />

            {/* Chat Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50, x: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50, x: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                bottom: 120,
                right: 30,
                width: 380,
                height: 550,
                background: dark ? '#1a1a38' : '#ffffff',
                borderRadius: 24,
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                zIndex: 1002,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              }}
            >
              {/* Chat Header */}
              <div style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, #7c6fff, #ff6b9d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Bot size={24} color="#fff" />
                  </div>
                  <div>
                    <h3 style={{
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '1rem',
                      marginBottom: 4
                    }}>AI Assistant</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#00d4aa',
                        display: 'inline-block',
                        animation: 'pulseRing 2s infinite'
                      }} />
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.7rem' }}>Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Messages */}
              <div style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                background: dark ? '#0e0e22' : '#f8f9ff'
              }}>
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: 'flex',
                      flexDirection: msg.sender === 'bot' ? 'row' : 'row-reverse',
                      alignItems: 'flex-start',
                      gap: 10
                    }}
                  >
                    {msg.sender === 'bot' && (
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, #7c6fff, #ff6b9d)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Bot size={16} color="#fff" />
                      </div>
                    )}
                    <div style={{
                      maxWidth: '70%',
                      padding: '12px 16px',
                      borderRadius: msg.sender === 'bot' 
                        ? '20px 20px 20px 5px' 
                        : '20px 20px 5px 20px',
                      background: msg.sender === 'bot'
                        ? dark ? '#2a2a4a' : '#ffffff'
                        : 'linear-gradient(135deg, #7c6fff, #ff6b9d)',
                      color: msg.sender === 'bot' 
                        ? (dark ? '#e8e8ff' : '#0f0f2d')
                        : '#ffffff',
                      boxShadow: msg.sender === 'bot'
                        ? '0 4px 12px rgba(0,0,0,0.05)'
                        : '0 8px 20px rgba(124,111,255,0.3)',
                      border: msg.sender === 'bot' && dark 
                        ? '1px solid rgba(255,255,255,0.08)' 
                        : 'none'
                    }}>
                      <p style={{ fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                        {msg.text}
                      </p>
                      <span style={{
                        fontSize: '0.6rem',
                        color: msg.sender === 'bot' 
                          ? (dark ? '#6868a0' : '#7070a0')
                          : 'rgba(255,255,255,0.8)',
                        display: 'block',
                        marginTop: 6,
                        textAlign: msg.sender === 'bot' ? 'left' : 'right'
                      }}>
                        {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                  >
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #7c6fff, #ff6b9d)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Bot size={16} color="#fff" />
                    </div>
                    <div style={{
                      padding: '12px 20px',
                      borderRadius: '20px 20px 20px 5px',
                      background: dark ? '#2a2a4a' : '#ffffff',
                      border: dark ? '1px solid rgba(255,255,255,0.08)' : 'none',
                      display: 'flex',
                      gap: 4
                    }}>
                      <span style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: dark ? '#6868a0' : '#7070a0',
                        animation: 'typing 1.4s infinite'
                      }} />
                      <span style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: dark ? '#6868a0' : '#7070a0',
                        animation: 'typing 1.4s infinite 0.2s'
                      }} />
                      <span style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: dark ? '#6868a0' : '#7070a0',
                        animation: 'typing 1.4s infinite 0.4s'
                      }} />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick Replies */}
              <div style={{
                padding: '12px 20px',
                borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                background: dark ? '#0e0e22' : '#ffffff',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8
              }}>
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 20,
                      background: dark ? 'rgba(124,111,255,0.1)' : 'rgba(124,111,255,0.08)',
                      border: `1px solid rgba(124,111,255,0.3)`,
                      color: '#7c6fff',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      letterSpacing: '0.3px'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(124,111,255,0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = dark ? 'rgba(124,111,255,0.1)' : 'rgba(124,111,255,0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} style={{
                padding: '16px 20px',
                borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                background: dark ? '#1a1a38' : '#ffffff',
                display: 'flex',
                gap: 12
              }}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 30,
                    border: `1.5px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                    background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
                    color: dark ? '#e8e8ff' : '#0f0f2d',
                    fontSize: '0.85rem',
                    fontFamily: "'Outfit', sans-serif",
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = '#7c6fff';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(124,111,255,0.12)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7c6fff, #ff6b9d)',
                    border: 'none',
                    cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: inputMessage.trim() ? 1 : 0.5,
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => {
                    if (inputMessage.trim()) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(124,111,255,0.4)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Send size={18} color="#fff" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Styles */}
      <style>{`
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,111,255,.5); }
          70% { box-shadow: 0 0 0 10px rgba(124,111,255,0); }
        }
        
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-8px); opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @media (max-width: 480px) {
          div[style*="position: fixed"][style*="bottom: 120"][style*="right: 30"] {
            width: calc(100% - 40px) !important;
            right: 20px !important;
            left: 20px !important;
            bottom: 100px !important;
          }
        }
      `}</style>
    </>
  );
};

// Import Briefcase icon
const Briefcase = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

export default Horizontal;
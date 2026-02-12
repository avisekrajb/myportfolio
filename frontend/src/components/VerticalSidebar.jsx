import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, Briefcase } from 'lucide-react';

const VerticalSidebar = ({ dark }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 I'm Abhishek's AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 300);

      setScrollTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse = { 
        id: Date.now() + 1, 
        text: getBotResponse(inputText), 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1200);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! Great to meet you! 👋 I'm here to help you learn more about Abhishek's work and experience. What would you like to know?";
    } else if (input.includes('project') || input.includes('work')) {
      return "Abhishek has built 15+ projects including EduNepal (e-learning platform), CodeTrack CLI (GitHub tracking tool), NepalWeather PWA, Kanban Pro, and Bhasa Translator! Which one interests you? 🚀";
    } else if (input.includes('skill') || input.includes('technology') || input.includes('tech')) {
      return "Abhishek is proficient in React.js, Node.js, Python, MongoDB, TypeScript, and has experience with Docker, AWS, and GraphQL. His strongest area is full-stack development! 💻";
    } else if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
      return "You can reach Abhishek directly at abhishek.rajbanshi@email.com or use the contact form in the Contact section. He typically replies within 24 hours! 📧";
    } else if (input.includes('resume') || input.includes('cv')) {
      return "You can download Abhishek's resume/CV from the hero section (the Download CV button) or from the footer! 📄";
    } else if (input.includes('experience') || input.includes('background') || input.includes('education')) {
      return "Abhishek is currently in his 3rd year of B.Tech Computer Science at Dharan, Nepal. He has experience in full-stack development, open source contribution, and freelance work! 🇳🇵";
    } else if (input.includes('hire') || input.includes('job') || input.includes('internship') || input.includes('opportunity')) {
      return "Great news! Abhishek is actively seeking internship and full-time opportunities starting 2025. You can hire him directly through the 'Hire Me' button or contact form! 💼";
    } else if (input.includes('certificate') || input.includes('certification')) {
      return "Abhishek holds 8+ professional certifications including Meta Front-End Developer, Google Data Analytics, AWS Cloud Practitioner, and more! Check out the Certificates section! 🏆";
    } else if (input.includes('github') || input.includes('open source')) {
      return "Abhishek is an active open source contributor with 387+ stars on his CodeTrack CLI project. You can find all his work on GitHub! 🌟";
    } else if (input.includes('thank')) {
      return "You're welcome! 😊 Feel free to ask if you have any other questions about Abhishek's portfolio or experience!";
    } else if (input.includes('price') || input.includes('cost') || input.includes('rate')) {
      return "For project inquiries and rate information, please reach out directly via email or the contact form. Abhishek offers competitive rates for freelance work! 💰";
    } else {
      return "Thanks for your message! I'm here to help with information about Abhishek's skills, projects, experience, and opportunities. What specific area are you interested in? 🤖";
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/9779812345678?text=Hi%20Abhishek%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!', '_blank');
  };

  const handleHireMe = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      if (isChatOpen) setIsChatOpen(false);
    }
  };

  const menuItems = [
    { icon: Bot, label: 'AI Chat', action: () => { setIsChatOpen(true); }, color: '#667eea' },
    { icon: MessageCircle, label: 'WhatsApp', action: handleWhatsApp, color: '#25D366' },
    { icon: Briefcase, label: 'Hire Me', action: handleHireMe, color: '#f093fb' },
  ];

  return (
    <>
      {/* Floating Menu System */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              right: 20,
              bottom: 20,
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 10,
            }}
          >
            {/* Action Buttons */}
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  position: 'relative',
                }}
              >
                {/* Icon Button */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={item.action}
                  className="mini-icon-btn"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    border: `2px solid ${item.color}40`,
                    background: `${item.color}10`,
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: `0 4px 12px ${item.color}20`,
                    position: 'relative',
                  }}
                >
                  <item.icon size={20} strokeWidth={2.5} />
                  
                  {/* Tooltip */}
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="icon-tooltip"
                    style={{
                      position: 'absolute',
                      right: 60,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: dark ? 'rgba(15, 15, 35, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      color: dark ? '#e8e8ff' : '#1a1a2e',
                      padding: '8px 16px',
                      borderRadius: 12,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      border: `1px solid ${dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                      fontFamily: "'Outfit', sans-serif",
                      pointerEvents: 'none',
                      opacity: 0,
                    }}
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(12px)',
                zIndex: 1000,
              }}
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.92 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="chat-container"
              style={{
                position: 'fixed',
                bottom: 100,
                right: 24,
                width: 420,
                maxWidth: 'calc(100vw - 48px)',
                height: 620,
                maxHeight: 'calc(100vh - 140px)',
                zIndex: 1001,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Header with Profile Photo */}
              <div className="chat-header">
                <div className="header-content">
                  <div className="profile-section">
                    {/* Profile Photo */}
                    <div className="profile-photo">
                      <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Abhishek&backgroundColor=b6e3f4" 
                        alt="Abhishek"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <div className="photo-status" />
                    </div>
                    
                    <div>
                      <h3 className="chat-title">Abhishek Rajbanshi</h3>
                      <div className="status-text">
                        <div className="status-dot" />
                        <span>AI Assistant • Online</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsChatOpen(false)}
                  className="close-button"
                >
                  <X size={18} strokeWidth={2.5} />
                </motion.button>
              </div>

              {/* Messages Area */}
              <div className="messages-container">
                <div className="messages-inner">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        delay: index * 0.05,
                        type: "spring",
                        damping: 25,
                        stiffness: 300
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        flexDirection: msg.sender === 'bot' ? 'row' : 'row-reverse',
                        marginBottom: 16,
                      }}
                    >
                      {msg.sender === 'bot' && (
                        <div className="message-avatar-mini">
                          <img 
                            src="https://api.dicebear.com/7.x/bottts/svg?seed=AI&backgroundColor=667eea" 
                            alt="AI"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      )}
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`message-bubble ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}
                      >
                        {msg.text}
                      </motion.div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        marginBottom: 16,
                      }}
                    >
                      <div className="message-avatar-mini">
                        <img 
                          src="https://api.dicebear.com/7.x/bottts/svg?seed=AI&backgroundColor=667eea" 
                          alt="AI"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                {['Projects', 'Skills', 'Resume', 'Contact'].map((action, index) => (
                  <motion.button
                    key={action}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setInputText(`Tell me about ${action}`);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="quick-action-btn"
                  >
                    {action}
                  </motion.button>
                ))}
              </div>

              {/* Input Area */}
              <div className="input-container">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="message-input"
                />
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  className="send-button"
                  disabled={!inputText.trim()}
                >
                  <Send size={18} strokeWidth={2.5} />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        /* Mini Icon Buttons */
        .mini-icon-btn:hover {
          transform: scale(1.15) translateX(-4px);
          box-shadow: 0 8px 24px currentColor;
          background: currentColor !important;
          color: white !important;
        }

        .mini-icon-btn:hover .icon-tooltip {
          opacity: 1 !important;
          visibility: visible;
        }

        .icon-tooltip {
          visibility: hidden;
          transition: all 0.3s ease;
        }

        /* Chat Container */
        .chat-container {
          background: ${dark ? 'rgba(15, 15, 35, 0.98)' : 'rgba(255, 255, 255, 0.98)'};
          backdrop-filter: blur(40px) saturate(180%);
          border-radius: 28px;
          box-shadow: 
            0 30px 70px rgba(0, 0, 0, 0.3),
            0 0 0 1px ${dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
        }

        /* Header */
        .chat-header {
          padding: 20px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .chat-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
        }

        .header-content {
          position: relative;
          z-index: 1;
        }

        .profile-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-photo {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          overflow: hidden;
          border: 3px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          position: relative;
          background: white;
        }

        .photo-status {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #00ff88;
          border: 3px solid #667eea;
          box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7); }
          50% { box-shadow: 0 0 0 8px rgba(0, 255, 136, 0); }
        }

        .chat-title {
          font-family: 'Outfit', -apple-system, sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: white;
          margin: 0 0 4px 0;
          letter-spacing: -0.02em;
        }

        .status-text {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.72rem;
          font-weight: 500;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00ff88;
        }

        .close-button {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s;
          position: relative;
          z-index: 1;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        /* Messages */
        .messages-container {
          flex: 1;
          overflow-y: auto;
          background: ${dark ? '#070714' : '#f8f8fc'};
          position: relative;
        }

        .messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          border-radius: 3px;
        }

        .messages-inner {
          padding: 24px;
        }

        .message-avatar-mini {
          width: 30px;
          height: 30px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          background: white;
        }

        .message-bubble {
          max-width: 75%;
          padding: 12px 16px;
          font-size: 0.88rem;
          line-height: 1.6;
          word-wrap: break-word;
          font-family: 'Outfit', -apple-system, sans-serif;
          transition: all 0.3s;
        }

        .bot-message {
          background: ${dark ? 'rgba(102, 126, 234, 0.12)' : 'white'};
          color: ${dark ? '#e8e8ff' : '#1a1a2e'};
          border-radius: 16px 16px 16px 4px;
          box-shadow: 
            0 4px 12px ${dark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.06)'},
            0 0 0 1px ${dark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(0,0,0,0.04)'};
        }

        .user-message {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 16px 16px 4px 16px;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        /* Typing Indicator */
        .typing-indicator {
          background: ${dark ? 'rgba(102, 126, 234, 0.12)' : 'white'};
          border-radius: 16px 16px 16px 4px;
          padding: 12px 16px;
          display: flex;
          gap: 5px;
          align-items: center;
          box-shadow: 
            0 4px 12px ${dark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.06)'},
            0 0 0 1px ${dark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(0,0,0,0.04)'};
        }

        .typing-indicator span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${dark ? '#667eea' : '#9fa7ea'};
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
          30% { transform: translateY(-8px); opacity: 1; }
        }

        /* Quick Actions */
        .quick-actions {
          padding: 14px 20px;
          background: ${dark ? 'rgba(102, 126, 234, 0.05)' : 'rgba(102, 126, 234, 0.03)'};
          border-top: 1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .quick-action-btn {
          padding: 7px 14px;
          border-radius: 14px;
          background: transparent;
          border: 1.5px solid ${dark ? 'rgba(102, 126, 234, 0.25)' : 'rgba(102, 126, 234, 0.2)'};
          color: ${dark ? '#b8c1ff' : '#667eea'};
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Outfit', -apple-system, sans-serif;
        }

        .quick-action-btn:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
        }

        /* Input Area */
        .input-container {
          padding: 18px 20px;
          background: ${dark ? 'rgba(15, 15, 35, 0.5)' : 'white'};
          border-top: 1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
          display: flex;
          align-items: center;
          gap: 10px;
          backdrop-filter: blur(20px);
        }

        .message-input {
          flex: 1;
          padding: 12px 18px;
          border-radius: 16px;
          border: 2px solid ${dark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'};
          background: ${dark ? 'rgba(102, 126, 234, 0.05)' : 'rgba(102, 126, 234, 0.03)'};
          color: ${dark ? '#e8e8ff' : '#1a1a2e'};
          font-size: 0.9rem;
          font-family: 'Outfit', -apple-system, sans-serif;
          outline: none;
          transition: all 0.3s;
        }

        .message-input::placeholder {
          color: ${dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
        }

        .message-input:focus {
          border-color: #667eea;
          background: ${dark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)'};
          box-shadow: 0 0 0 3px ${dark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.08)'};
        }

        .send-button {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);
          transition: all 0.3s;
        }

        .send-button:hover:not(:disabled) {
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
          transform: translateY(-2px);
        }

        .send-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Mobile Responsive */
        @media (max-width: 480px) {
          .chat-container {
            width: calc(100vw - 32px) !important;
            height: calc(100vh - 100px) !important;
            right: 16px !important;
            bottom: 70px !important;
            border-radius: 24px;
          }

          .mini-icon-btn {
            width: 40px !important;
            height: 40px !important;
          }

          .menu-toggle-btn {
            width: 52px !important;
            height: 52px !important;
          }

          .profile-photo {
            width: 40px;
            height: 40px;
          }

          .chat-title {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
};

export default VerticalSidebar;
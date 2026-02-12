import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Home, 
  User, 
  Code, 
  Briefcase, 
  Award, 
  Mail, 
  Sparkles,
  Zap,
  Shield,
  Eye,
  Star,
  Compass,
  Coffee,
  Gift
} from 'lucide-react';

const Tour = ({ dark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Tour steps configuration
  const tourSteps = [
    {
      icon: Home,
      title: "Welcome to My Portfolio! 👋",
      content: "Hi, I'm Abhishek! Let me show you around my digital space. This tour will take just 2 minutes!",
      color: "#7c6fff",
      highlight: "home",
      fun: "🎯"
    },
    {
      icon: User,
      title: "About Me",
      content: "Get to know my journey, education, and what drives me as a developer from Nepal.",
      color: "#ff6b9d",
      highlight: "about",
      fun: "🚀"
    },
    {
      icon: Code,
      title: "Skills & Tech Stack",
      content: "Check out the technologies I work with - from React to Node.js, and everything in between.",
      color: "#00d4aa",
      highlight: "skills",
      fun: "⚡"
    },
    {
      icon: Briefcase,
      title: "Featured Projects",
      content: "Explore my best work! Real-world applications I've built with modern tech stacks.",
      color: "#ffb547",
      highlight: "projects",
      fun: "✨"
    },
    {
      icon: Award,
      title: "Certifications",
      content: "Industry-recognized credentials from Meta, Google, AWS and more.",
      color: "#7c6fff",
      highlight: "certificates",
      fun: "🏆"
    },
    {
      icon: Mail,
      title: "Let's Connect!",
      content: "Got a project or opportunity? I'd love to hear from you. Let's create something amazing!",
      color: "#ff6b9d",
      highlight: "contact",
      fun: "💌"
    }
  ];

  // Check if first time visit (expires in 100 days)
  useEffect(() => {
    const tourCompleted = localStorage.getItem('portfolioTourCompleted');
    const tourExpiry = localStorage.getItem('portfolioTourExpiry');
    
    if (!tourCompleted && !tourExpiry) {
      // First time ever - show tour
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 100);
      localStorage.setItem('portfolioTourExpiry', expiryDate.toISOString());
      setIsOpen(true);
    } else if (tourExpiry) {
      // Check if expired
      const expiryDate = new Date(tourExpiry);
      const now = new Date();
      
      if (now > expiryDate) {
        // Expired - reset and show tour
        localStorage.removeItem('portfolioTourCompleted');
        localStorage.removeItem('portfolioTourExpiry');
        const newExpiry = new Date();
        newExpiry.setDate(newExpiry.getDate() + 100);
        localStorage.setItem('portfolioTourExpiry', newExpiry.toISOString());
        setIsOpen(true);
      }
    }
  }, []);

  const handleSkipTour = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.setItem('portfolioTourCompleted', 'true');
      setIsOpen(false);
      setIsExiting(false);
    }, 400);
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Last step - complete tour
      handleSkipTour();
    }
  }, [currentStep, tourSteps.length, handleSkipTour]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  if (!isOpen) return null;

  const currentStepData = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <AnimatePresence>
      {isOpen && !isExiting && (
        <>
          {/* Backdrop with subtle blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px"
            }}
          >
            {/* Main Tour Card - Mini & Attractive */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300 
              }}
              style={{
                maxWidth: "420px",
                width: "100%",
                background: dark 
                  ? "linear-gradient(145deg, #1a1a38, #13132e)" 
                  : "linear-gradient(145deg, #ffffff, #f8faff)",
                borderRadius: "32px",
                boxShadow: dark
                  ? "0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(124,111,255,0.3)"
                  : "0 25px 50px -12px rgba(124,111,255,0.25), 0 0 0 1px rgba(124,111,255,0.2)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(124,111,255,0.2)"}`,
                overflow: "hidden",
                position: "relative"
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Decorative gradient orbs */}
              <div style={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${currentStepData.color}40, transparent 70%)`,
                filter: "blur(40px)",
                pointerEvents: "none"
              }} />
              
              <div style={{
                position: "absolute",
                bottom: -50,
                left: -50,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${currentStepData.color}30, transparent 70%)`,
                filter: "blur(40px)",
                pointerEvents: "none"
              }} />

              {/* Header with close button */}
              <div style={{
                padding: "20px 20px 12px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(124,111,255,0.1)"}`
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: "10px",
                    background: `linear-gradient(135deg, ${currentStepData.color}, ${currentStepData.color}cc)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 8px 16px ${currentStepData.color}40`
                  }}>
                    <currentStepData.icon size={16} color="white" />
                  </div>
                  <span style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: dark ? "#e8e8ff" : "#0f0f2d",
                    background: dark ? "rgba(124,111,255,0.2)" : "rgba(124,111,255,0.1)",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    letterSpacing: "0.5px",
                    border: `1px solid ${dark ? "rgba(124,111,255,0.3)" : "rgba(124,111,255,0.2)"}`
                  }}>
                    {currentStep + 1}/{tourSteps.length}
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSkipTour}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(124,111,255,0.08)",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(124,111,255,0.2)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: dark ? "#e8e8ff" : "#7c6fff"
                  }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Content Area */}
              <div style={{
                padding: "24px 24px 20px 24px",
                textAlign: "center",
                position: "relative"
              }}>
                {/* Fun Emoji Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 64,
                    height: 64,
                    borderRadius: "24px",
                    background: `linear-gradient(135deg, ${currentStepData.color}20, ${currentStepData.color}10)`,
                    border: `2px solid ${currentStepData.color}30`,
                    marginBottom: 16,
                    fontSize: "32px"
                  }}
                >
                  {currentStepData.fun}
                </motion.div>

                {/* Title */}
                <motion.h3
                  key={`title-${currentStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    marginBottom: 12,
                    background: `linear-gradient(135deg, ${currentStepData.color}, ${currentStepData.color}dd)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-0.5px"
                  }}
                >
                  {currentStepData.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  key={`desc-${currentStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: dark ? "#e8e8ff" : "#0f0f2d",
                    opacity: dark ? 0.9 : 0.8,
                    marginBottom: 24,
                    maxWidth: "320px",
                    margin: "0 auto 24px auto"
                  }}
                >
                  {currentStepData.content}
                </motion.p>

                {/* Highlight section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 16px",
                    background: dark ? "rgba(124,111,255,0.1)" : "rgba(124,111,255,0.08)",
                    borderRadius: "30px",
                    border: `1px solid ${dark ? "rgba(124,111,255,0.2)" : "rgba(124,111,255,0.15)"}`,
                    marginBottom: 16,
                    fontSize: "13px",
                    color: currentStepData.color,
                    fontWeight: 600
                  }}
                >
                  <Eye size={14} />
                  Section: {currentStepData.highlight.charAt(0).toUpperCase() + currentStepData.highlight.slice(1)}
                </motion.div>

                {/* Progress Bar */}
                <div style={{
                  width: "100%",
                  height: 6,
                  background: dark ? "rgba(255,255,255,0.1)" : "rgba(124,111,255,0.1)",
                  borderRadius: 3,
                  marginTop: 16,
                  overflow: "hidden"
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    style={{
                      height: "100%",
                      background: `linear-gradient(90deg, ${currentStepData.color}, ${currentStepData.color}cc)`,
                      borderRadius: 3
                    }}
                  />
                </div>
              </div>

              {/* Footer with Navigation */}
              <div style={{
                padding: "16px 20px 20px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(124,111,255,0.1)"}`
              }}>
                {/* Previous Button */}
                <motion.button
                  whileHover={{ scale: currentStep > 0 ? 1.05 : 1 }}
                  whileTap={{ scale: currentStep > 0 ? 0.95 : 1 }}
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 16px",
                    borderRadius: "30px",
                    background: currentStep === 0 
                      ? "transparent" 
                      : dark 
                        ? "rgba(255,255,255,0.05)" 
                        : "rgba(124,111,255,0.08)",
                    border: `1px solid ${currentStep === 0 
                      ? "transparent" 
                      : dark 
                        ? "rgba(255,255,255,0.1)" 
                        : "rgba(124,111,255,0.2)"}`,
                    color: currentStep === 0 
                      ? dark ? "#6868a0" : "#7070a0" 
                      : dark ? "#e8e8ff" : "#7c6fff",
                    cursor: currentStep === 0 ? "not-allowed" : "pointer",
                    opacity: currentStep === 0 ? 0.5 : 1,
                    transition: "all 0.2s"
                  }}
                >
                  <ChevronLeft size={16} />
                  <span style={{ fontSize: "14px", fontWeight: 600 }}>Prev</span>
                </motion.button>

                {/* Next/Finish Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    borderRadius: "30px",
                    background: `linear-gradient(135deg, ${currentStepData.color}, ${currentStepData.color}dd)`,
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    boxShadow: `0 8px 16px ${currentStepData.color}40`
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 700 }}>
                    {currentStep === tourSteps.length - 1 ? "Finish Tour 🎉" : "Next"}
                  </span>
                  {currentStep === tourSteps.length - 1 ? (
                    <Gift size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </motion.button>
              </div>

              {/* Skip hint for mobile */}
              <div style={{
                padding: "0 20px 16px 20px",
                textAlign: "center"
              }}>
                <span style={{
                  fontSize: "11px",
                  color: dark ? "#6868a0" : "#7070a0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4
                }}>
                  <Compass size={12} />
                  Swipe left/right to navigate • Skip anytime
                </span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Tour;
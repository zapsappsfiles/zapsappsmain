import React, { ReactNode, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  // Simulating initial page load animation
  useEffect(() => {
    // Start loading animation sequence
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll indicator visibility
  useEffect(() => {
    const handleScroll = () => {
      // Show indicator when scrolled more than 200px
      setShowScrollIndicator(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle page animations using GSAP
  useEffect(() => {
    if (!loading) {
      // Get all sections
      const sections = document.querySelectorAll('section');
  
      // Create GSAP animation for page content
      gsap.fromTo(
        sections,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15, 
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2
        }
      );
    }
  }, [loading]);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <>
      {/* Initial loading screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className={`fixed inset-0 z-[60] flex items-center justify-center ${
              darkMode ? 'bg-black' : 'bg-white'
            }`}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.2, 1],
                opacity: [0, 1, 1],
                transition: { 
                  duration: 1.5,
                  times: [0, 0.5, 1],
                  ease: "easeInOut" 
                }
              }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className={`w-16 h-16 mb-6 relative`}>
                <motion.div 
                  className={`absolute inset-0 ${darkMode ? 'bg-white' : 'bg-black'} rounded-full`}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [0, 1, 0.5, 1],
                    transition: { duration: 1.8, repeat: Infinity, repeatDelay: 0.2 }
                  }}
                />
              </div>
              <motion.p 
                className={`text-lg font-light tracking-widest ${darkMode ? 'text-white' : 'text-black'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.8 } }}
              >
                ZAPSAPPS
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main layout */}
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        {/* Navbar */}
        <Navbar />
        
        {/* Main content */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Back to top button */}
    <AnimatePresence>
          {showScrollIndicator && (
        <motion.button
              onClick={scrollToTop}
              className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center ${
            darkMode 
                  ? 'bg-white text-black hover:bg-white/90' 
                  : 'bg-black text-white hover:bg-black/90'
          }`}
              initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              aria-label="Back to top"
        >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
        </motion.button>
      )}
    </AnimatePresence>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Layout; 
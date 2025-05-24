import React, { ReactNode, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useTheme();
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  // Handle scroll indicator visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <>
      {/* Main layout */}
      <motion.div 
        className={`min-h-screen flex flex-col transition-colors duration-300 ${
          darkMode ? 'bg-black text-white' : 'bg-white text-black'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
              className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-10 h-10 md:w-12 md:h-12 
                        rounded-full flex items-center justify-center shadow-lg ${
                darkMode 
                  ? 'bg-white text-black hover:bg-white/90' 
                  : 'bg-black text-white hover:bg-black/90'
              }`}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Back to top"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 md:w-5 md:h-5"
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
      </motion.div>
    </>
  );
};

export default Layout; 
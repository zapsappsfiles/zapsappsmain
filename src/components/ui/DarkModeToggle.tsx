import React from 'react';
import { motion } from 'framer-motion';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  className?: string;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ 
  isDarkMode, 
  toggleDarkMode,
  className = '' 
}) => {
  return (
    <motion.button
      className={`relative w-10 h-10 rounded-full flex items-center justify-center focus:outline-none ${className}`}
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      initial={false}
    >
      <div className="relative w-5 h-5">
        {/* Sun (visible in dark mode, click to switch to light) */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={isDarkMode ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white w-full h-full"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </motion.div>
        
        {/* Moon (visible in light mode, click to switch to dark) */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={!isDarkMode ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-accent w-full h-full"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </motion.div>
      </div>
      
      {/* Animated background */}
      <motion.div 
        className={`absolute inset-0 rounded-full transition-colors ${isDarkMode ? 'bg-accent/10' : 'bg-accent/5'}`}
        initial={false}
        animate={isDarkMode 
          ? { scale: [0.8, 1], opacity: [0, 1] } 
          : { scale: [0.8, 1], opacity: [0, 0.5] }
        }
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
};

export default DarkModeToggle; 
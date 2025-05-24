import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  const { darkMode } = useTheme();

  return (
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
              scale: [0.8, 1.1, 1],
              opacity: [0, 1, 1],
              transition: { 
                duration: 1.2,
                times: [0, 0.6, 1],
                ease: [0.68, -0.55, 0.265, 1.55]
              }
            }}
            exit={{ scale: 1.3, opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className={`w-16 h-16 mb-6 relative`}>
              <motion.div 
                className={`absolute inset-0 ${darkMode ? 'bg-white' : 'bg-black'} rounded-full`}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1.2, 0.8, 1],
                  rotate: [0, 180, 360],
                  transition: { 
                    duration: 2.5, 
                    repeat: Infinity, 
                    repeatDelay: 0.3,
                    ease: [0.68, -0.55, 0.265, 1.55]
                  }
                }}
              />
            </div>
            <motion.p 
              className={`text-lg font-light tracking-widest ${darkMode ? 'text-white' : 'text-black'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }}
            >
              ZAPSAPPS
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader; 
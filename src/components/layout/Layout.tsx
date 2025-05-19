import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../../contexts/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode, isDarkModePending } = useTheme();
  
  // Update the background color when dark mode changes
  useEffect(() => {
    const bodyClasses = document.body.classList;
    if (darkMode) {
      bodyClasses.add('bg-dark');
      bodyClasses.add('text-white');
      bodyClasses.remove('bg-paper');
      bodyClasses.remove('text-ink');
    } else {
      bodyClasses.add('bg-paper');
      bodyClasses.add('text-ink');
      bodyClasses.remove('bg-dark');
      bodyClasses.remove('text-white');
    }
  }, [darkMode]);

  // Smooth page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      {/* Layout preloader - only shown during initial theme load */}
      {isDarkModePending && (
        <div className="fixed inset-0 bg-paper dark:bg-dark z-[9999] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Main layout */}
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-dark text-white' : 'bg-paper text-ink'}`}>
        <Navbar />
        
        <AnimatePresence mode="wait">
          <motion.main
            key="page-content"
            className="flex-grow"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        
        <Footer />
        
        {/* Custom Toast Container */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? 'dark' : 'light'}
          toastClassName={darkMode 
            ? 'bg-dark-surface text-white border border-dark-border' 
            : 'bg-white text-ink border border-black/5'
          }
        />
        
        {/* Scroll to top button */}
        <ScrollToTopButton />
      </div>
    </>
  );
};

// Scroll to top button component
const ScrollToTopButton: React.FC = () => {
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = React.useState(false);
  
  // Show button when scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`fixed right-6 bottom-6 p-3 rounded-full z-50 shadow-md ${
            darkMode 
              ? 'bg-dark-surface border border-dark-border text-white hover:bg-dark-light' 
              : 'bg-white border border-black/5 text-accent hover:bg-gray-50'
          }`}
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <i className="ri-arrow-up-line text-lg"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Layout; 
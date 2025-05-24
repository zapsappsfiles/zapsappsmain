import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode, isTransitioning } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setScrolled(window.scrollY > scrollThreshold);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle menu toggle
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking on a link
  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      setMenuOpen(false);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <>
      {/* Fixed Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? `py-2 md:py-3 ${darkMode ? 'bg-black/70' : 'bg-white/70'} backdrop-blur-xl` 
            : 'py-4 md:py-6'
        } ${darkMode ? 'text-white' : 'text-black'}`}
      >
        <div className="container-main flex justify-between items-center">
          {/* Logo */}
          <motion.button
            onClick={() => handleLinkClick('#home')}
            className="font-bold text-xl md:text-2xl tracking-tighter z-50"
            whileHover={{ 
              scale: 1.02, 
              y: -1,
              transition: { duration: 0.2, type: "spring", stiffness: 400 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            ZAPSAPPS
          </motion.button>
        
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className={`text-sm font-medium tracking-wide hover:opacity-100 relative ${
                  darkMode ? 'text-white/70' : 'text-black/70'
                } hover:text-current transition-colors`}
                whileHover={{ 
                  scale: 1.02, 
                  y: -1,
                  transition: { duration: 0.2, type: "spring", stiffness: 400 }
                }}
              >
                {link.name}
                <motion.span 
                  className="absolute left-0 right-0 -bottom-1 h-[1px] bg-current origin-right"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1, originX: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.button>
            ))}
          </div>
        
          {/* Right side controls */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Dark Mode Toggle */}
            <motion.button 
              onClick={toggleDarkMode}
              className="relative h-8 w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              aria-label="Toggle dark mode"
              disabled={isTransitioning}
            >
              <motion.span
                className={`absolute inset-0 rounded-full ${
                  darkMode
                    ? 'bg-white/10 hover:bg-white/15'
                    : 'bg-black/5 hover:bg-black/10'
                } transition-colors`}
              />
              <motion.div
                animate={{ 
                  rotate: isTransitioning ? 180 : 0,
                  scale: isTransitioning ? 1.2 : 1
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.svg 
                      key="sun"
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </motion.svg>
                  ) : (
                    <motion.svg 
                      key="moon"
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>

            {/* Let's Talk Button - Desktop */}
            <motion.button
              onClick={() => handleLinkClick('#contact')}
              className={`hidden lg:flex rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium ${
                darkMode
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-black text-white hover:bg-black/90'
              } transition-colors items-center`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              LET'S TALK
              <span className="ml-1">•</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 md:w-9 md:h-9 rounded-full z-50 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              aria-label="Toggle menu"
            >
              <motion.span
                className={`absolute inset-0 rounded-full ${
                  darkMode
                    ? 'bg-white/10 hover:bg-white/15'
                    : 'bg-black/5 hover:bg-black/10'
                } transition-colors`}
              />
              <motion.span
                className={`block w-4 h-0.5 ${
                  darkMode ? 'bg-white' : 'bg-black'
                } mb-1 relative`}
                animate={{
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 3 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={`block w-4 h-0.5 ${
                  darkMode ? 'bg-white' : 'bg-black'
                } relative`}
                animate={{
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? -1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center ${
              darkMode ? 'bg-black/95' : 'bg-white/95'
            } backdrop-blur-xl`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul 
              className="flex flex-col items-center justify-center gap-6 md:gap-8 w-full"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  className="overflow-hidden text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                >
                  <motion.button
                    onClick={() => handleLinkClick(link.href)}
                    className={`text-2xl md:text-3xl font-light ${
                      darkMode ? 'text-white/90' : 'text-black/90'
                    } block tracking-tight`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.05 * navLinks.length, duration: 0.3 }}
              >
                <motion.button
                  onClick={() => handleLinkClick('#contact')}
                  className={`mt-4 md:mt-6 rounded-full px-6 md:px-8 py-2.5 md:py-3 text-sm font-medium ${
                    darkMode
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'bg-black text-white hover:bg-black/90'
                  } transition-colors inline-flex items-center`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  LET'S TALK
                  <span className="ml-1">•</span>
                </motion.button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 
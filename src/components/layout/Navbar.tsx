import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
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
  const { darkMode, toggleDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setScrolled(window.scrollY > scrollThreshold);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle menu animation with GSAP
  useEffect(() => {
    if (!menuRef.current) return;

    if (menuOpen) {
      // Animate menu open
      gsap.to(menuRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
      
      // Animate links
      const links = menuRef.current.querySelectorAll('li');
      gsap.fromTo(
        links,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0.2,
        }
      );
    }
  }, [menuOpen]);

  // Handle menu toggle
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking on a link
  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      setMenuOpen(false);
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Fixed Navigation */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3 backdrop-blur-lg' : 'py-6'
        } ${darkMode ? 'text-white' : 'text-black'}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.a
          href="#home" 
            className="font-bold text-2xl tracking-tighter z-50 mix-blend-difference"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            ZAPSAPPS
          </motion.a>
        
        {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`text-sm font-light tracking-wider hover:opacity-100 relative ${
                  darkMode ? 'text-white/70' : 'text-black/70'
                } hover:text-current transition-colors`}
                whileHover={{ scale: 1.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                  handleLinkClick(link.href);
                  }}
                >
                {link.name}
                  <motion.span 
                  className="absolute left-0 right-0 bottom-0 h-[1px] bg-current origin-right"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1, originX: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
        
          {/* Menu Button and CTA Button */}
          <div className="flex items-center space-x-5">
            {/* Dark Mode Toggle */}
          <button 
              onClick={toggleDarkMode}
              className="relative h-9 w-9 rounded-full flex items-center justify-center overflow-hidden group"
              aria-label="Toggle dark mode"
            >
              <motion.span
                className={`absolute inset-0 rounded-full ${
                  darkMode
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-black/5 hover:bg-black/10'
                } transition-colors`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                animate={{
                  rotate: darkMode ? 180 : 0,
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
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
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </motion.div>
            </button>

            {/* Let's Talk Button */}
            <motion.a
              href="#contact"
              className={`hidden md:flex rounded-full px-6 py-2.5 text-sm font-medium ${
                darkMode
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-black text-white hover:bg-black/90'
              } transition-colors items-center`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contact');
              }}
            >
              LET'S TALK
              <span className="ml-1">•</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full z-50 relative"
            aria-label="Toggle menu"
          >
              <motion.span
                className={`absolute inset-0 rounded-full ${
                  darkMode
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-black/5 hover:bg-black/10'
                } transition-colors`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className={`block w-5 h-0.5 ${
                  darkMode ? 'bg-white' : 'bg-black'
                } mb-1 relative`}
                animate={{
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 4 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={`block w-5 h-0.5 ${
                  darkMode ? 'bg-white' : 'bg-black'
                } relative`}
                animate={{
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? -2 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            </div>
        </div>
      </nav>
      
      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 ${darkMode ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul className="flex flex-col items-center justify-center gap-8 w-full">
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  className="overflow-hidden text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <motion.a
                    href={link.href}
                    className={`text-3xl font-light ${
                      darkMode ? 'text-white/90' : 'text-black/90'
                    } block tracking-tighter relative`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
                ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * navLinks.length }}
              >
                <motion.a
                  href="#contact"
                  className={`mt-6 rounded-full px-8 py-3 text-sm font-medium ${
                    darkMode
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'bg-black text-white hover:bg-black/90'
                  } transition-colors inline-flex items-center`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#contact');
                  }}
                >
                  LET'S TALK
                  <span className="ml-1">•</span>
                </motion.a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 
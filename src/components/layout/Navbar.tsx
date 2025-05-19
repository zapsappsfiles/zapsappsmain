import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import DarkModeToggle from '../ui/DarkModeToggle';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeItem, setActiveItem] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveItem(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    if (isOpen) setIsOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      scrollPosition > 50 
        ? darkMode 
          ? 'bg-black/90 backdrop-blur-md shadow-lg py-2.5 border-b border-white/10' 
          : 'bg-paper/90 backdrop-blur-md shadow-md py-2.5 border-b border-black/5' 
        : 'bg-transparent py-5 border-b border-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a 
          href="#home" 
          className="font-mono text-lg tracking-tight group flex items-center gap-1.5 transition-all duration-300"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
            setActiveItem('home');
          }}
        >
          <span className={`w-2 h-2 bg-accent dark:bg-white transition-transform duration-300 group-hover:rotate-45`}></span>
          <span className="font-bold tracking-wider text-ink dark:text-white">ZapsApps</span>
        </a>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                <a
                  href={item.href}
                  className={`font-mono text-xs tracking-wider uppercase transition-all duration-300 py-2 relative group ${
                    activeItem === item.href.substring(1) 
                      ? 'text-ink font-semibold dark:text-white' 
                      : 'text-accent/70 hover:text-ink dark:text-white/70 dark:hover:text-white'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href.substring(1));
                    setActiveItem(item.href.substring(1));
                  }}
                >
                  {item.name}
                  
                  <motion.span 
                    className={`absolute -bottom-[2px] left-0 w-full h-[2px] ${
                      activeItem === item.href.substring(1)
                        ? 'bg-accent dark:bg-white' 
                        : 'bg-transparent group-hover:bg-current opacity-30'
                    }`}
                    layoutId="navIndicator"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="mx-8 h-8 w-px bg-accent/10 dark:bg-white/20"></div>
          <Button 
            variant="primary"
            size="sm"
            onClick={() => scrollToSection('contact')}
            className="dark:bg-white dark:text-dark"
          >
            Get in Touch
          </Button>
          <div className="ml-6">
            <DarkModeToggle isDarkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <DarkModeToggle isDarkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none focus:ring-2 focus:ring-accent/30 rounded-sm group p-1.5"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between relative">
              <span className={`h-[2px] w-full transform transition-all duration-300 origin-left ${
                isOpen ? 'rotate-45 translate-y-[1px]' : ''
              } bg-ink dark:bg-white`}></span>
              <span className={`h-[2px] transition-all duration-300 ${
                isOpen ? 'w-0 opacity-0' : 'w-3/4 opacity-100 ml-auto'
              } bg-ink dark:bg-white`}></span>
              <span className={`h-[2px] w-full transform transition-all duration-300 origin-left ${
                isOpen ? '-rotate-45 -translate-y-[1px]' : ''
              } bg-ink dark:bg-white`}></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`md:hidden fixed top-[var(--header-height,62px)] left-0 w-full h-[calc(100vh-var(--header-height,62px))] flex flex-col ${
              darkMode 
                ? 'bg-black/95 backdrop-blur-lg border-t border-white/10' 
                : 'bg-paper/98 backdrop-blur-lg border-t border-black/5'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex-1 overflow-auto">
              <nav className="container mx-auto px-6 py-8 flex flex-col">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`font-mono text-sm tracking-wider uppercase py-4 flex justify-between items-center ${
                      activeItem === item.href.substring(1) 
                        ? 'text-accent border-b border-accent/20 font-semibold dark:text-white dark:border-white/20' 
                        : 'text-accent/80 hover:text-accent border-b border-accent/10 dark:text-white/70 dark:hover:text-white dark:border-white/10'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.substring(1));
                      setActiveItem(item.href.substring(1));
                    }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.name}
                    {activeItem === item.href.substring(1) && (
                      <span className="w-1.5 h-1.5 bg-accent rounded-sm dark:bg-white"></span>
                    )}
                  </motion.a>
                ))}
              </nav>
            </div>
            
            <div className="container mx-auto px-6 py-8 border-t border-accent/10 dark:border-white/10">
              <Button
                variant="primary"
                fullWidth
                onClick={() => scrollToSection('contact')}
                className="dark:bg-white dark:text-dark"
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from '../ui/Button';
import { useTheme } from '../../contexts/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

const Hero: React.FC = () => {
  const { darkMode } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  
  // Words to cycle through
  const words = [
    'innovative',
    'powerful',
    'seamless',
    'intuitive',
    'modern'
  ];
  
  // Control the word cycling animation
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex(prevIndex => (prevIndex + 1) % words.length);
    }, 3000);
    
    return () => clearInterval(wordInterval);
  }, [words.length]);

  useEffect(() => {
    if (headlineRef.current && subRef.current && btnsRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' }
      );
      gsap.fromTo(
        btnsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power3.out' }
      );
    }
  }, []);

  // Handle button clicks
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className={`relative min-h-[100vh] flex items-center ${darkMode ? 'bg-dark' : 'bg-paper'} overflow-hidden`}
    >
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className={`absolute inset-0 ${darkMode 
          ? 'bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2740%27 height=%2740%27 viewBox=%270 0 40 40%27%3E%3Cpath d=%27M0 20h40M20 0v40%27 stroke=%27%23222%27 fill=%27none%27 stroke-width=%27.5%27/%3E%3C/svg%3E")]' 
          : 'bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2740%27 height=%2740%27 viewBox=%270 0 40 40%27%3E%3Cpath d=%27M0 20h40M20 0v40%27 stroke=%27%23e5e7eb%27 fill=%27none%27 stroke-width=%27.5%27/%3E%3C/svg%3E")]'
        } opacity-30`} />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 py-12 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text content */}
            <div className="lg:col-span-8 text-left">
              <h1
                ref={headlineRef}
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 font-semibold ${darkMode ? 'text-white' : 'text-ink'}`}
              >
                <div className="leading-tight">
                  Building
                  <span className="relative mx-2">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentWordIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, color: darkMode ? '#fff' : '#222' }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="font-bold"
                      >
                        {words[currentWordIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  digital products
                </div>
              </h1>
              <p ref={subRef} className={`text-lg md:text-xl max-w-xl mb-10 ${darkMode ? 'text-white/70' : 'text-ink/80'} leading-relaxed`}>
                ZapsApps creates powerful, innovative solutions that transform 
                your ideas into exceptional digital experiences.
              </p>
              <div ref={btnsRef} className="flex flex-col sm:flex-row gap-5">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => scrollToSection('projects')}
                  icon={<i className="ri-arrow-right-line" />}
                  iconPosition="right"
                  className="transition-colors duration-300 dark:bg-white dark:text-dark hover:bg-ink hover:text-white dark:hover:bg-accent dark:hover:text-white"
                >
                  View Our Work
                </Button>
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => scrollToSection('contact')}
                >
                  Get In Touch
                </Button>
              </div>
            </div>
            
            {/* Visual element - Abstract design */}
            {/* Removed orbiting/circular visual for minimalism */}
            {/* <div className="lg:col-span-4 hidden lg:block"> ... </div> */}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center z-20"
      >
        <span className={`text-xs font-mono uppercase tracking-widest mb-2 ${darkMode ? 'text-white/70' : 'text-accent/70'}`}>Scroll</span>
        <div 
          className={`w-px h-12 ${darkMode ? 'bg-white/30' : 'bg-accent/30'}`}
        ></div>
      </div>
    </section>
  );
};

export default Hero; 
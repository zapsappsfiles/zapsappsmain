import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useTheme } from '../../contexts/ThemeContext';

const Hero: React.FC = () => {
  const { darkMode } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  
  // Add scroll progress tracking with the hero section as the target
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Transform scrollY into x position and opacity for the background text
  const bgTextX = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  // Add opacity transform to fade out as it moves right, less transparent in dark mode
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.5], [darkMode ? 0.2 : 0.1, 0.01]);
  
  // Array of services that will change with animation
  const services = [
    'web design',
    'branding',
    'graphic design',
    'SEO optimization'
  ];

  // Handle service text cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [services.length]);

  // Create a better infinite scrolling effect for the background text
  useEffect(() => {
    if (!marqueeRef.current) return;
    
    const setupMarquee = () => {
      // Clear any existing animations
      gsap.killTweensOf('.marquee-track');
      
      // Get the track element
      const track = document.querySelector('.marquee-track');
      if (!track) return;
      
      // Calculate the duration based on the content length
      // Longer duration = slower animation
      const duration = 120;
      
      // Create the animation
      gsap.to('.marquee-track', {
        x: '-50%',
        ease: 'none',
        duration: duration,
        repeat: -1,
        overwrite: true
      });
    };
    
    // Run the setup function
    setupMarquee();
    
    // Set up a resize listener to handle viewport changes
    window.addEventListener('resize', setupMarquee);
    
    // Clean up
    return () => {
      gsap.killTweensOf('.marquee-track');
      window.removeEventListener('resize', setupMarquee);
    };
  }, []);

  // Initialize GSAP animations
  useEffect(() => {
    if (!heroRef.current) return;
    
    // Animate hero elements on load
    const timeline = gsap.timeline();
    
    timeline
      .fromTo(
        '.hero-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      )
      .fromTo(
        '.hero-desc',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo(
        '.hero-buttons',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        '.hero-service-tags',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
        '-=0.5'
      );
      
    return () => {
      timeline.kill();
    };
  }, []);

  // Handle scroll down click
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('work');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="home" 
      className={`min-h-screen flex flex-col items-center justify-center relative px-6 md:px-12 lg:px-16 overflow-hidden ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Hero Content */}
      <div className="w-full max-w-7xl mx-auto z-10 pt-16">
        <div className="flex flex-col lg:flex-row items-start">
          {/* Left numbered label */}
          <div className="mb-6 lg:mb-0 lg:mr-10 lg:mt-1">
            <p className="text-lg md:text-xl opacity-50">01</p>
          </div>
          
          {/* Main hero section content */}
          <div className="flex-1">
            <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.95] uppercase max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
              ZapsApps: Web Design & Development
            </h1>
            <p className="text-lg md:text-xl font-medium mb-6 max-w-3xl">
              We are a student-founded web design and development studio. Our team specializes in responsive websites, branding, graphic design, and SEO optimization for businesses and startups. Let us help you grow your digital presence and connect with your audience.
            </p>
            
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 mt-24">
              {/* Service tags */}
              <div className="md:w-1/2 flex-shrink-0">
                <div className="flex flex-wrap gap-3">
                  {['Brand Websites', 'Business Sites', 'Creative Design', 'User Experience'].map((tag, index) => (
                    <motion.div
                      key={tag}
                      className={`hero-service-tags px-4 py-2 rounded-full text-sm ${
                        darkMode 
                          ? 'bg-white/10 hover:bg-white/20' 
                          : 'bg-black/5 hover:bg-black/10'
                      } transition-colors cursor-pointer`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tag}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Description */}
              <div className="md:w-1/2">
                <p className="hero-desc text-base md:text-lg opacity-80 leading-relaxed">
                  We craft stunning websites that captivate your audience and grow your business. 
                  Our designs blend creativity with purpose, making your brand shine on every screen. 
                  Simple to navigate, beautiful to experience, and built to turn visitors into customers. 
                  Let us help tell your story in a way that stands out and brings results.
                </p>
                
                {/* Learn more link */}
                <motion.a
                  href="#work"
                  className="hero-buttons inline-flex items-center text-lg mt-8 group"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToNextSection();
                  }}
                  initial={{ opacity: 1 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Learn more
                  <motion.span 
                    className="ml-2 inline-block"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    whileHover={{ x: 5 }}
                    transition={{ 
                      duration: 1.5, 
                      ease: "easeInOut", 
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </motion.span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* New improved marquee implementation */}
      <div 
        ref={marqueeRef}
        className="absolute bottom-0 left-0 w-full h-[20vw] overflow-hidden -z-10 pointer-events-none"
      >
        <motion.div 
          className="relative w-full h-full"
          style={{ opacity: bgTextOpacity, x: bgTextX }}
        >
          {/* This is a better marquee implementation that uses CSS and JS for smooth performance */}
          <div className="marquee-container w-full h-full relative overflow-hidden">
            <div className="marquee-track flex whitespace-nowrap absolute">
              {/* Create two copies of the content for seamless looping */}
              {[...Array(2)].map((_, outerIndex) => (
                <div key={outerIndex} className="flex whitespace-nowrap">
                  {services.map((service, i) => (
                    <div 
                      key={`${outerIndex}-${i}`} 
                      className="text-[18vw] font-bold uppercase leading-none ml-8 mr-16 tracking-tighter opacity-50 inline-block"
                      style={{ width: 'auto', whiteSpace: 'nowrap' }}
                    >
                      {service}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.button 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity"
        onClick={scrollToNextSection}
        whileHover={{ y: 5 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-xs uppercase tracking-wider mb-2">Scroll</span>
        <motion.div 
          className={`w-px h-10 ${darkMode ? 'bg-white' : 'bg-black'}`}
          animate={{ 
            scaleY: [1, 0.8, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>
    </section>
  );
};

export default Hero; 
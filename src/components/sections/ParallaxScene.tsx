import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Simple debounce function for resize event
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const ParallaxScene: React.FC = () => {
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(0);
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Set background colors based on dark mode
  const bgColor = darkMode ? 'bg-dark' : 'bg-paper';
  const textColor = darkMode ? 'text-white' : 'text-ink';
  
  // Update viewport height on resize with debounce
  useEffect(() => {
    const updateViewportHeight = () => {
      // Use clientHeight of the section if available, otherwise use window.innerHeight
      const height = sectionRef.current ? sectionRef.current.clientHeight : window.innerHeight;
      setViewportHeight(height);
    };
    
    // Create debounced version
    const debouncedUpdateHeight = debounce(updateViewportHeight, 100);
    
    // Set initial height (after a slight delay to ensure DOM is ready)
    setTimeout(updateViewportHeight, 50);
    
    // Add event listener with debounce
    window.addEventListener('resize', debouncedUpdateHeight);
    
    // Add scroll event to check if section is in view
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsInView(isVisible);
      }
    };
    
    // Call once to initialize
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedUpdateHeight);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Parallax transformations for different elements - Removed unsupported ease options to fix TypeScript errors
  const y1 = useTransform(scrollY, [0, viewportHeight], [0, 180]);
  const y2 = useTransform(scrollY, [0, viewportHeight], [0, -160]);
  const y3 = useTransform(scrollY, [0, viewportHeight], [0, 100]);
  const rotate1 = useTransform(scrollY, [0, viewportHeight], [0, 35]);
  const rotate2 = useTransform(scrollY, [0, viewportHeight], [0, -25]);
  const scale1 = useTransform(scrollY, [0, viewportHeight], [1, 1.3]);
  const scale2 = useTransform(scrollY, [0, viewportHeight], [1, 0.7]);
  
  // Prepare variants for text animations to ensure consistency
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.9, 
        delay, 
        ease: [0.04, 0.62, 0.23, 0.98] 
      }
    })
  };

  // Shape variants for staggered entrance
  const shapeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.2,
        delay,
        ease: [0.04, 0.62, 0.23, 0.98] 
      }
    })
  };
  
  return (
    <section 
      ref={sectionRef}
      className={`relative py-32 overflow-hidden ${bgColor}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className={`font-serif text-3xl md:text-5xl mb-6 ${textColor}`}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
            custom={0}
          >
            Innovate. Create. Elevate.
          </motion.h2>
          <motion.p 
            className={`font-sans text-lg max-w-2xl mx-auto ${textColor} opacity-80`}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
            custom={0.2}
          >
            At ZapsApps, we blend design and technology to build digital experiences 
            that resonate with your audience and elevate your brand.
          </motion.p>
        </div>
      </div>
      
      {/* Enhanced Parallax Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Shape 1 */}
        <motion.div 
          className={`absolute w-64 h-64 rounded-full ${darkMode ? 'bg-white/10' : 'bg-ink/10'} blur-md`}
          style={{ 
            top: '10%', 
            left: '5%',
            y: y1,
            rotate: rotate1,
            scale: scale1
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={shapeVariants}
          custom={0.1}
        />
        
        {/* Shape 2 */}
        <motion.div 
          className={`absolute w-48 h-48 rounded-full ${darkMode ? 'bg-white/15' : 'bg-ink/15'} blur-sm`}
          style={{ 
            bottom: '15%', 
            right: '10%',
            y: y2,
            rotate: rotate2
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={shapeVariants}
          custom={0.2}
        />
        
        {/* Shape 3 */}
        <motion.div 
          className={`absolute w-32 h-32 rounded-md ${darkMode ? 'bg-white/5' : 'bg-ink/5'}`}
          style={{ 
            top: '40%', 
            right: '20%',
            y: y3,
            scale: scale2
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={shapeVariants}
          custom={0.3}
        />
        
        {/* Shape 4 */}
        <motion.div 
          className={`absolute w-24 h-24 rounded-md ${darkMode ? 'bg-white/10' : 'bg-ink/10'} blur-sm`}
          style={{ 
            bottom: '30%', 
            left: '15%',
            y: y2,
            rotate: rotate2
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={shapeVariants}
          custom={0.4}
        />
        
        {/* Additional shape for more visual interest */}
        <motion.div 
          className={`absolute w-20 h-20 rounded-full ${darkMode ? 'bg-white/20' : 'bg-ink/20'} blur-md`}
          style={{ 
            top: '60%', 
            left: '40%',
            y: y3,
            rotate: rotate1,
            scale: scale1
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={shapeVariants}
          custom={0.5}
        />
      </div>
    </section>
  );
};

export default ParallaxScene; 
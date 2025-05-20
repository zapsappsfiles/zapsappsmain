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
    
    // Cleanup
    return () => window.removeEventListener('resize', debouncedUpdateHeight);
  }, []);
  
  // Parallax transformations for different elements
  // Using smooth easing for natural transitions
  const y1 = useTransform(scrollY, [0, viewportHeight], [0, 150]);
  const y2 = useTransform(scrollY, [0, viewportHeight], [0, -100]);
  const y3 = useTransform(scrollY, [0, viewportHeight], [0, 80]);
  const rotate1 = useTransform(scrollY, [0, viewportHeight], [0, 25]);
  const rotate2 = useTransform(scrollY, [0, viewportHeight], [0, -15]);
  const scale1 = useTransform(scrollY, [0, viewportHeight], [1, 1.2]);
  const scale2 = useTransform(scrollY, [0, viewportHeight], [1, 0.8]);
  
  // Prepare variants for text animations to ensure consistency
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        delay, 
        ease: "easeOut" 
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
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
            custom={0}
          >
            Innovate. Create. Elevate.
          </motion.h2>
          <motion.p 
            className={`font-sans text-lg max-w-2xl mx-auto ${textColor} opacity-80`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
            custom={0.2}
          >
            At ZapsApps, we blend design and technology to build digital experiences 
            that resonate with your audience and elevate your brand.
          </motion.p>
        </div>
      </div>
      
      {/* Parallax Elements */}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
    </section>
  );
};

export default ParallaxScene; 
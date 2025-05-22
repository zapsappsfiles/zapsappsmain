import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const About: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [clickedCats, setClickedCats] = useState<Record<number, boolean>>({});
  const [messageTimers, setMessageTimers] = useState<Record<number, NodeJS.Timeout>>({});
  const [creativityCount, setCreativityCount] = useState<number>(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const descriptionY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  // Image parallax effects
  const imageOneY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const imageTwoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Increment creativity counter continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setCreativityCount(prev => prev + 1);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      Object.values(messageTimers).forEach(timer => clearTimeout(timer));
    };
  }, [messageTimers]);
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-32 md:py-40 overflow-hidden ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-start">
          {/* Section heading */}
          <div className="flex items-start lg:w-1/3 mb-16 lg:mb-0 lg:sticky lg:top-32 z-10">
            <motion.div style={{ y: titleY }}>
              <div className="flex items-center mb-6">
                <span className="text-xl opacity-50 mr-4">04</span>
                <div className={`w-12 h-px ${darkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
              </div>
              <motion.h2 
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                About
              </motion.h2>
              <motion.p 
                className="text-lg max-w-sm opacity-70"
                style={{ y: descriptionY }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                We're a student-founded startup passionate about creating digital 
                experiences that push boundaries and connect with audiences.
              </motion.p>
            </motion.div>
          </div>
          
          {/* Main content */}
          <div className="lg:w-2/3 lg:pl-12 space-y-32">
            {/* Story & Hero images */}
            <motion.div
              className="border-t border-current/10 pt-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              {/* Hero Images */}
              <div className="grid grid-cols-2 gap-6 mb-16">
                <motion.div 
                  className="aspect-[4/5] h-full w-full overflow-hidden"
                  style={{ y: imageOneY }}
                >
                  <img 
                    src="https://picsum.photos/400/600?random=1" 
                    alt="Workspace placeholder" 
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="aspect-[4/5] h-full w-full overflow-hidden mt-12"
                  style={{ y: imageTwoY }}
                >
                  <img 
                    src="https://picsum.photos/400/600?random=2" 
                    alt="Collaboration placeholder" 
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
            
              <div className="mt-16">
                <p className="text-sm uppercase tracking-wider opacity-50 mb-8">Our Story</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <p className="text-lg opacity-80 leading-relaxed">
                    Founded recently by a group of ambitious students, ZapsApps is our
                    platform to explore design and technology. We believe great design 
                    should be accessible to everyone, and we're excited to bring our fresh 
                    perspective to every project.
                  </p>
                  <p className="text-lg opacity-80 leading-relaxed">
                    As a student startup, we're on a journey of discovery and growth. 
                    We might be new, but we bring enthusiasm, creativity, and a willingness
                    to push boundaries. Every project is an opportunity to learn and 
                    innovate together.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
                  {[
                    { number: '3', label: 'Projects' },
                    { number: '4', label: 'Team Members' },
                    { number: creativityCount.toString(), label: 'Creativity' }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                      <p className="opacity-60">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Values section */}
            <motion.div
              className="border-t border-current/10 pt-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm uppercase tracking-wider opacity-50 mb-12">Our Principles</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
                {['Innovation', 'Collaboration', 'Excellence'].map((value, index) => (
                  <motion.div
                    key={value}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <span className={`text-9xl font-bold absolute -top-10 ${darkMode ? 'text-white/5' : 'text-black/5'}`}>
                      0{index + 1}
                    </span>
                    <h4 className="text-2xl font-medium mb-4 relative">{value}</h4>
                    <div className={`w-12 h-px mb-6 ${darkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
                    <p className="opacity-70 relative">
                      {index === 0 && 'We push boundaries and explore new possibilities in design and technology.'}
                      {index === 1 && 'We believe the best work happens when we bring diverse perspectives together.'}
                      {index === 2 && 'We hold ourselves to the highest standards in everything we create.'}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* CTA */}
            <motion.div 
              className="mt-20 pt-10 border-t border-current/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.a
                href="#contact"
                className={`inline-flex items-center px-8 py-4 rounded-full text-lg group ${
                  darkMode 
                    ? 'bg-white text-black hover:bg-white/90' 
                    : 'bg-black text-white hover:bg-black/90'
                } transition-colors`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get in Touch
                <motion.span
                  className="ml-2 inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 
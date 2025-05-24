import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const About: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [creativityCount, setCreativityCount] = useState<number>(0);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Increment creativity counter continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setCreativityCount(prev => prev + 1);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  // Clean animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`section-padding ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="container-main">
        <div className="grid-2-col items-start">
          {/* Section heading */}
          <div className="lg:sticky lg:top-32 z-10">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center mb-6"
                variants={itemVariants}
              >
                <span className="text-caption opacity-50 mr-4 font-mono">04</span>
                <div className={`w-12 h-px ${darkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
              </motion.div>
              <motion.h2 
                className="text-section font-bold tracking-tighter mb-8 leading-[0.9]"
                variants={itemVariants}
              >
                About
              </motion.h2>
              <motion.p 
                className="text-body max-w-sm opacity-70"
                variants={itemVariants}
              >
                We're a student-founded startup passionate about creating digital 
                experiences that push boundaries and connect with audiences.
              </motion.p>
            </motion.div>
          </div>
          
          {/* Main content */}
          <div className="space-y-32">
            {/* Story & Hero images */}
            <motion.div
              className="border-t border-current/10 pt-10"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Hero Images */}
              <div className="grid-2-col mb-16">
                <motion.div 
                  className="aspect-[4/5] h-full w-full overflow-hidden rounded-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <img 
                    src="https://picsum.photos/500/700?random=1" 
                    alt="Creative workspace" 
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="aspect-[4/5] h-full w-full overflow-hidden rounded-lg mt-8 lg:mt-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <img 
                    src="https://picsum.photos/500/700?random=2" 
                    alt="Team collaboration" 
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
            
              <div className="mt-16">
                <p className="text-caption uppercase tracking-wider opacity-50 mb-8">Our Story</p>
                <div className="grid-2-col">
                  <p className="text-body opacity-80 leading-relaxed">
                    Founded recently by a group of ambitious students, ZapsApps is our
                    platform to explore design and technology. We believe great design 
                    should be accessible to everyone, and we're excited to bring our fresh 
                    perspective to every project.
                  </p>
                  <p className="text-body opacity-80 leading-relaxed">
                    As a student startup, we're on a journey of discovery and growth. 
                    We might be new, but we bring enthusiasm, creativity, and a willingness
                    to push boundaries. Every project is an opportunity to learn and 
                    innovate together.
                  </p>
                </div>
                <div className="grid-3-col mt-20">
                  {[
                    { number: '3', label: 'Projects' },
                    { number: '4', label: 'Team Members' },
                    { number: creativityCount.toString(), label: 'Creativity' }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.6 + 0.1 * index }}
                    >
                      <h3 className="text-section font-bold mb-2">{stat.number}</h3>
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
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-caption uppercase tracking-wider opacity-50 mb-12">Our Principles</p>
              
              <div className="grid-3-col">
                {['Innovation', 'Collaboration', 'Excellence'].map((value, index) => (
                  <motion.div
                    key={value}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <span className={`text-9xl font-bold absolute -top-10 ${darkMode ? 'text-white/5' : 'text-black/5'}`}>
                      0{index + 1}
                    </span>
                    <h4 className="text-body-lg font-medium mb-4 relative">{value}</h4>
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
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.a
                href="#contact"
                className={`btn-primary ${
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
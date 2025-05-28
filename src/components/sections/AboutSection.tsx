import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const About: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [creativityCount, setCreativityCount] = useState<number>(0);
  
  // Separate refs for better animation control
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  
  // Increment creativity counter continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setCreativityCount(prev => prev + 1);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  // Header animation variants
  const headerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const headerItemVariants = {
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

  // Story section variants
  const storyContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const storyItemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Values section variants
  const valuesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const valueItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-content">
          <motion.div
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
            variants={headerContainerVariants}
          >
            <motion.div 
              className="flex items-center mb-6"
              variants={headerItemVariants}
            >
              <span className="text-caption opacity-50 mr-4 font-mono">04</span>
              <div className={`w-12 h-px ${darkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
            </motion.div>
            <motion.h2 
              className="text-display font-bold tracking-tighter mb-8 lg:mb-0 leading-none"
              variants={headerItemVariants}
            >
              ABOUT US
            </motion.h2>
          </motion.div>
          
          <motion.p 
            className="text-body opacity-70 max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 0.7, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            We're a passionate team of students building the future of web design and development.
          </motion.p>
        </div>

        <div className="space-y-32">
          {/* Story & Hero images */}
          <motion.div
            ref={storyRef}
            className="border-t border-current/10 pt-10"
            initial="hidden"
            animate={isStoryInView ? "visible" : "hidden"}
            variants={storyContainerVariants}
          >
            {/* Hero Images */}
            <div className="grid-2-col mb-16">
              <motion.div 
                className="aspect-[4/5] h-full w-full overflow-hidden rounded-lg"
                variants={storyItemVariants}
              >
                <img 
                  src="https://picsum.photos/500/700?random=1" 
                  alt="Creative workspace" 
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="aspect-[4/5] h-full w-full overflow-hidden rounded-lg mt-8 lg:mt-12"
                variants={storyItemVariants}
              >
                <img 
                  src="https://picsum.photos/500/700?random=2" 
                  alt="Team collaboration" 
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          
            <div className="mt-16">
              <motion.p 
                className="text-caption uppercase tracking-wider opacity-50 mb-8"
                variants={storyItemVariants}
              >
                Our Story
              </motion.p>
              <div className="grid-2-col">
                <motion.p 
                  className="text-body opacity-80 leading-relaxed"
                  variants={storyItemVariants}
                >
                  Founded recently by a group of ambitious students, ZapsApps is our
                  platform to explore design and technology. We believe great design 
                  should be accessible to everyone, and we're excited to bring our fresh 
                  perspective to every project.
                </motion.p>
                <motion.p 
                  className="text-body opacity-80 leading-relaxed"
                  variants={storyItemVariants}
                >
                  As a student startup, we're on a journey of discovery and growth. 
                  We might be new, but we bring enthusiasm, creativity, and a willingness
                  to push boundaries. Every project is an opportunity to learn and 
                  innovate together.
                </motion.p>
              </div>
              <motion.div 
                className="grid-3-col mt-20"
                variants={storyItemVariants}
              >
                {[
                  { number: '3', label: 'Projects' },
                  { number: '4', label: 'Team Members' },
                  { number: creativityCount.toString(), label: 'Creativity' }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.6 + 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="text-section font-bold mb-2">{stat.number}</h3>
                    <p className="opacity-60">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Values section */}
          <motion.div
            ref={valuesRef}
            className="border-t border-current/10 pt-10"
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
            variants={valuesContainerVariants}
          >
            <motion.p 
              className="text-caption uppercase tracking-wider opacity-50 mb-12"
              variants={headerItemVariants}
            >
              Our Principles
            </motion.p>
            
            <div className="grid-3-col">
              {['Innovation', 'Collaboration', 'Excellence'].map((value, index) => (
                <motion.div
                  key={value}
                  className="relative"
                  variants={valueItemVariants}
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
            ref={ctaRef}
            className="mt-20 pt-10 border-t border-current/10"
            initial={{ opacity: 0, y: 40 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
    </section>
  );
};

export default About; 
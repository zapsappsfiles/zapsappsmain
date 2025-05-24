import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const Hero: React.FC = () => {
  const { darkMode } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();
  
  // Scroll-based opacity for marquee background
  const marqueeOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Scroll to next section
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('services');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Clean, modern animation variants like other sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const titleSplitVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const upperHalfVariants = {
    hidden: { 
      opacity: 0, 
      y: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const lowerHalfVariants = {
    hidden: { 
      opacity: 0, 
      y: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const tagVariants = {
    hidden: { 
      opacity: 0, 
      y: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      ref={heroRef}
      id="home" 
      className={`min-h-screen h-screen flex flex-col items-center justify-center relative overflow-hidden ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* 3 Non-overlapping scroll-reactive marquee lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Marquee line 1 - Top */}
        <motion.div
          className="absolute top-[15%] whitespace-nowrap will-change-transform"
          style={{ opacity: marqueeOpacity }}
          animate={{ x: ["-100%", "0%"] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          <span className={`text-[4.5rem] md:text-[6.5rem] lg:text-[8.5rem] xl:text-[11rem] font-black tracking-tighter select-none leading-none ${
            darkMode 
              ? 'text-white opacity-[0.25]' 
              : 'text-black opacity-[0.15]'
          }`}>
            DESIGN • DEVELOP • DELIVER • DESIGN • DEVELOP • DELIVER • DESIGN • DEVELOP • DELIVER • DESIGN • DEVELOP • DELIVER • DESIGN • DEVELOP • DELIVER •
          </span>
        </motion.div>
        
        {/* Marquee line 2 - Center */}
        <motion.div
          className="absolute top-[45%] whitespace-nowrap will-change-transform"
          style={{ opacity: marqueeOpacity }}
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 70,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          <span className={`text-[4.5rem] md:text-[6.5rem] lg:text-[8.5rem] xl:text-[11rem] font-black tracking-tighter select-none leading-none ${
            darkMode 
              ? 'text-white opacity-[0.20]' 
              : 'text-black opacity-[0.18]'
          }`}>
            PREMIUM • DIGITAL • AGENCY • PREMIUM • DIGITAL • AGENCY • PREMIUM • DIGITAL • AGENCY • PREMIUM • DIGITAL • AGENCY • PREMIUM • DIGITAL • AGENCY •
          </span>
        </motion.div>
        
        {/* Marquee line 3 - Bottom */}
        <motion.div
          className="absolute top-[75%] whitespace-nowrap will-change-transform"
          style={{ opacity: marqueeOpacity }}
          animate={{ x: ["-100%", "0%"] }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          <span className={`text-[4.5rem] md:text-[6.5rem] lg:text-[8.5rem] xl:text-[11rem] font-black tracking-tighter select-none leading-none ${
            darkMode 
              ? 'text-white opacity-[0.15]' 
              : 'text-black opacity-[0.20]'
          }`}>
            CREATIVE • SOLUTIONS • RESULTS • CREATIVE • SOLUTIONS • RESULTS • CREATIVE • SOLUTIONS • RESULTS • CREATIVE • SOLUTIONS • RESULTS • CREATIVE • SOLUTIONS •
          </span>
        </motion.div>
      </div>

      {/* Main Hero Content */}
      <motion.div 
        className="container-wide z-10 py-16 sm:py-20 md:py-24 lg:py-28 relative"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col lg:flex-row items-start gap-content">
          {/* Section Number */}
          <motion.div 
            className="flex-shrink-0"
            variants={itemVariants}
          >
            <p className="text-caption opacity-50 font-mono">01</p>
          </motion.div>
          
          {/* Main Content */}
          <div className="flex-1 max-w-full">
            {/* Hero Title */}
            <motion.h1 
              className="text-display font-bold tracking-tighter uppercase mb-8 md:mb-12 max-w-full break-words relative z-10"
              variants={titleSplitVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={upperHalfVariants}>
                Custom Web Design &
              </motion.div>
              <motion.div variants={lowerHalfVariants}>
                Development That Converts
              </motion.div>
            </motion.h1>
            
            <div className="flex flex-col lg:flex-row gap-content mt-12 md:mt-16 lg:mt-20">
              {/* Service Tags */}
              <motion.div 
                className="lg:w-1/2 flex-shrink-0"
                variants={itemVariants}
              >
                <div className="flex flex-wrap gap-elements">
                  {['Web Design', 'Development', 'Branding', 'UX Design'].map((tag, index) => (
                    <motion.div
                      key={tag}
                      className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-caption font-medium ${
                        darkMode 
                          ? 'bg-white/10 hover:bg-white/15' 
                          : 'bg-black/5 hover:bg-black/10'
                      } transition-all duration-300 cursor-pointer`}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: { 
                          delay: 0.8 + index * 0.1,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -2,
                        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Description and CTA */}
              <motion.div 
                className="lg:w-1/2"
                variants={itemVariants}
              >
                <p className="text-body opacity-80 leading-relaxed mb-6 md:mb-8">
                  We craft stunning websites that captivate your audience and grow your business. 
                  Our designs blend creativity with purpose, making your brand shine on every screen.
                </p>
                
                {/* Learn More Button */}
                <motion.button
                  onClick={scrollToNextSection}
                  className="inline-flex items-center text-body group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Learn more
                  <motion.span 
                    className="ml-2 inline-block"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ 
                      duration: 2, 
                      ease: "easeInOut", 
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    <svg 
                      className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 12h14m-7-7l7 7-7 7" 
                      />
                    </svg>
                  </motion.span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 
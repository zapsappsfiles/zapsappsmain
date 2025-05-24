import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const Contact: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Animation variants
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
      id="contact" 
      ref={sectionRef}
      className={`section-padding ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="container-main">
        <div className="grid-2-col items-start">
          {/* Left column */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center mb-6"
                variants={itemVariants}
              >
                <span className="text-caption opacity-50 mr-4 font-mono">05</span>
                <div className={`w-12 h-px ${darkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
              </motion.div>
              <motion.h2 
                className="text-section font-bold tracking-tighter mb-8 leading-none"
                variants={itemVariants}
              >
                Let's work
                <br />together!
              </motion.h2>
              
              <motion.p 
                className="text-body opacity-70 max-w-md mt-10 mb-16"
                variants={itemVariants}
              >
                Is your big idea ready to go wild? We're here to help you turn it into 
                something extraordinary.
              </motion.p>
              
              {/* Contact information */}
              <motion.div 
                className="space-y-6"
                variants={itemVariants}
              >
                <div>
                  <p className="text-caption uppercase tracking-wider opacity-50 mb-2">Email</p>
                  <motion.a 
                    href="mailto:zapsapps1@gmail.com"
                    className="text-body block"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    zapsapps1@gmail.com
                  </motion.a>
                </div>
                
                <div>
                  <p className="text-caption uppercase tracking-wider opacity-50 mb-2">Phone</p>
                  <motion.a 
                    href="tel:+17185007647"
                    className="text-body block"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    +1 (718) 500-7647
                  </motion.a>
                </div>
                
                <div>
                  <p className="text-caption uppercase tracking-wider opacity-50 mb-2">Location</p>
                  <p className="text-body opacity-80">Manhattan, New York</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right column - Contact form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <form className="space-y-6">
                <div className="grid-2-col">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="name" className="block text-body-sm font-medium mb-2 opacity-70">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full px-0 py-3 text-body bg-transparent border-0 border-b-2 ${
                        darkMode ? 'border-white/20 focus:border-white' : 'border-black/20 focus:border-black'
                      } outline-none transition-colors`}
                      placeholder="Your name"
                    />
                  </motion.div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="email" className="block text-body-sm font-medium mb-2 opacity-70">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full px-0 py-3 text-body bg-transparent border-0 border-b-2 ${
                        darkMode ? 'border-white/20 focus:border-white' : 'border-black/20 focus:border-black'
                      } outline-none transition-colors`}
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="subject" className="block text-body-sm font-medium mb-2 opacity-70">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={`w-full px-0 py-3 text-body bg-transparent border-0 border-b-2 ${
                      darkMode ? 'border-white/20 focus:border-white' : 'border-black/20 focus:border-black'
                    } outline-none transition-colors`}
                    placeholder="Project inquiry"
                  />
                </motion.div>
                
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="message" className="block text-body-sm font-medium mb-2 opacity-70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className={`w-full px-0 py-3 text-body bg-transparent border-0 border-b-2 ${
                      darkMode ? 'border-white/20 focus:border-white' : 'border-black/20 focus:border-black'
                    } outline-none transition-colors resize-none`}
                    placeholder="Tell us about your project..."
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  className={`btn-primary ${
                    darkMode 
                      ? 'bg-white text-black hover:bg-white/90' 
                      : 'bg-black text-white hover:bg-black/90'
                  } transition-colors mt-8`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Send Message
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ 
                      duration: 2, 
                      ease: "easeInOut", 
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <svg 
                      className="w-5 h-5"
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
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
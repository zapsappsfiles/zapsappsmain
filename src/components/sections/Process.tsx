import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'Discovery',
    description: 'We listen, research, and understand your needs to set a strong foundation.',
    gif: 'https://media.giphy.com/media/3oKIPmJonGimU9bI2s/giphy.gif',
    points: [
      'In-depth consultation',
      'Market research & analysis',
      'User persona development',
      'Project scope definition',
    ],
  },
  {
    title: 'Design',
    description: 'We craft minimal, beautiful, and functional solutions tailored to your goals.',
    gif: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    points: [
      'Wireframing & prototyping',
      'Visual design & branding',
      'Design system creation',
      'Interactive feedback',
    ],
  },
  {
    title: 'Build & Launch',
    description: 'We develop, test, and launch your project with care and precision.',
    gif: 'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif',
    points: [
      'Frontend & backend development',
      'Performance optimization',
      'Quality assurance',
      'Post-launch support',
    ],
  },
];

const Process: React.FC = () => {
  const [active, setActive] = useState<number | null>(0);
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Only use GSAP for the main section animation
  useEffect(() => {
    // Store a reference to DOM elements to use in cleanup
    const processElement = processRef.current;
    
    if (processElement && isInView) {
      // Clear any previous animations to prevent duplicates
      gsap.killTweensOf(processElement.children);
      
      // Animate each step with staggered timing
      gsap.fromTo(
        processElement.children,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.97
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          clearProps: 'all' // Clears the props after animation to allow natural interactions
        }
      );
    }
    
    return () => {
      // Clean up any lingering animations using the stored reference
      if (processElement) {
        gsap.killTweensOf(processElement.children);
      }
    };
  }, [isInView]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`py-24 transition-colors duration-300 ${darkMode ? 'bg-dark' : 'bg-paper'}`}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`section-title mb-12 text-center ${darkMode ? 'text-white' : 'text-ink'}`}>How We Work</h2>
          <div ref={processRef} className="flex flex-col gap-6">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className={`rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                  ${darkMode ? 'border-white/10 bg-dark-surface' : 'border-ink/10 bg-white/80'}
                  ${active === idx ? 'shadow-xl' : 'hover:shadow-lg'}`}
                onClick={() => setActive(active === idx ? null : idx)}
              >
                <div className="flex items-center gap-4 px-6 py-5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base transition-colors duration-300
                    ${active === idx ? (darkMode ? 'bg-white text-dark' : 'bg-ink text-white') : (darkMode ? 'bg-white/10 text-white/70' : 'bg-ink/10 text-ink/70')}`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-ink'}`}>{step.title}</div>
                    <div className={`text-base ${darkMode ? 'text-white/60' : 'text-ink/60'}`}>{step.description}</div>
                  </div>
                  <motion.div
                    animate={{ rotate: active === idx ? 90 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <svg width="24" height="24" fill="none" stroke={darkMode ? '#fff' : '#222'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </motion.div>
                </div>
                <AnimatePresence initial={false}>
                  {active === idx && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.04, 0.62, 0.23, 0.98],
                        opacity: { duration: 0.25 }
                      }}
                      className="px-6 pb-6 flex flex-col md:flex-row gap-6 items-center"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="flex-shrink-0"
                      >
                        <img
                          src={step.gif}
                          alt={step.title + ' illustration'}
                          className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border shadow"
                          style={{ 
                            background: darkMode ? '#222' : '#fff',
                            borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                          }}
                          loading="lazy"
                        />
                      </motion.div>
                      <motion.ul 
                        className="flex-1 grid grid-cols-1 gap-3 mt-4 md:mt-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        {step.points.map((point, i) => (
                          <motion.li 
                            key={i} 
                            className={`flex items-center gap-2 text-base ${darkMode ? 'text-white/90' : 'text-ink/90'}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 + (i * 0.08) }}
                          >
                            <span className={`inline-block w-2 h-2 rounded-full ${darkMode ? 'bg-white/80' : 'bg-ink/80'}`}></span>
                            {point}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process; 
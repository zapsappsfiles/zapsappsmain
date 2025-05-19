import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  const stepperRef = useRef<HTMLDivElement>(null);

  // GSAP parallax/reveal effect on stepper
  useEffect(() => {
    if (stepperRef.current) {
      gsap.fromTo(
        stepperRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepperRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <motion.section
      id="process"
      className={`py-24 transition-colors duration-300 ${darkMode ? 'bg-dark' : 'bg-paper'}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className={`section-title mb-12 text-center ${darkMode ? 'text-white' : 'text-ink'}`}>How We Work</h2>
          <div ref={stepperRef} className="flex flex-col gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                className={`rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                  ${darkMode ? 'border-white/10 bg-dark/80' : 'border-ink/10 bg-white/80'}
                  ${active === idx ? 'shadow-2xl scale-[1.02]' : 'hover:shadow-lg'}`}
                onClick={() => setActive(active === idx ? null : idx)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-4 px-6 py-5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base
                    ${active === idx ? (darkMode ? 'bg-white text-dark' : 'bg-ink text-white') : (darkMode ? 'bg-white/10 text-white/70' : 'bg-ink/10 text-ink/70')}`}>{idx + 1}</div>
                  <div className="flex-1">
                    <div className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-ink'}`}>{step.title}</div>
                    <div className={`text-base ${darkMode ? 'text-white/60' : 'text-ink/60'}`}>{step.description}</div>
                  </div>
                  <div className={`transition-transform duration-300 ${active === idx ? 'rotate-90' : ''}`}>
                    <svg width="24" height="24" fill="none" stroke={darkMode ? '#fff' : '#222'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {active === idx && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="px-6 pb-6 flex flex-col md:flex-row gap-6 items-center"
                    >
                      <img
                        src={step.gif}
                        alt={step.title + ' illustration'}
                        className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border border-ink/10 shadow"
                        style={{ background: darkMode ? '#222' : '#fff' }}
                      />
                      <ul className="flex-1 grid grid-cols-1 gap-2 mt-4 md:mt-0">
                        {step.points.map((point, i) => (
                          <li key={i} className={`flex items-center gap-2 text-base ${darkMode ? 'text-white/90' : 'text-ink/90'}`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${darkMode ? 'bg-white/80' : 'bg-ink/80'}`}></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Process; 
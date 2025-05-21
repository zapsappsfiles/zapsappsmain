import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We start by understanding your goals, audience, and project requirements through in-depth consultation.',
    details: 'This phase involves market research, competitor analysis, user persona development, and establishing project scope to set a strong foundation.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  },
  {
    number: '02',
    title: 'Design',
    description: 'We create beautiful, functional design solutions that align with your brand identity and project goals.',
    details: 'Our design process includes wireframing, prototyping, visual design, user interface development, and iterative feedback to refine the experience.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
  },
  {
    number: '03',
    title: 'Development',
    description: 'We build robust, high-performance solutions with careful attention to quality and technical excellence.',
    details: 'This stage encompasses frontend and backend development, performance optimization, thorough quality assurance, and preparing for a smooth launch.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1]
    } 
  }
};

const Process: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="process" className="py-24 bg-paper dark:bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent/80 dark:text-white/70 inline-block mb-2">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-ink dark:text-white">
            How We Work
          </h2>
          <p className="text-accent/70 dark:text-white/60 max-w-xl mx-auto">
            Our streamlined approach ensures efficient delivery while maintaining the highest quality standards at every stage.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-12 last:mb-0"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                {/* Step number and line */}
                <div className="flex-shrink-0 flex md:flex-col items-center md:items-start">
                  <div className="flex justify-center items-center w-14 h-14 rounded-full bg-white dark:bg-dark-surface border border-accent/20 dark:border-white/10 text-accent dark:text-white font-mono text-lg">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block w-px h-full bg-accent/20 dark:bg-white/10 mt-4 ml-7" />
                  )}
                </div>
                
                {/* Step content */}
                <div className="flex-1">
                  <div 
                    className="p-6 rounded-lg bg-white dark:bg-dark-surface border border-accent/10 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300"
                    style={{ minHeight: '16rem' }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 dark:bg-white/10 text-accent dark:text-white">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-serif text-ink dark:text-white">{step.title}</h3>
                    </div>
                    
                    <p className="text-accent/70 dark:text-white/60 mb-6 min-h-[4rem]">
                      {step.description}
                    </p>
                    
                    <AnimatePresence initial={false}>
                      {expanded === index ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-accent/10 dark:border-white/10">
                            <p className="text-accent/80 dark:text-white/70 text-sm">
                              {step.details}
                            </p>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    
                    <button
                      onClick={() => setExpanded(expanded === index ? null : index)}
                      className="mt-4 inline-flex items-center text-sm text-accent dark:text-white/80 hover:text-accent-dark dark:hover:text-white"
                    >
                      <span>{expanded === index ? 'Show less' : 'Learn more'}</span>
                      <motion.span
                        animate={{ rotate: expanded === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-1"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process; 
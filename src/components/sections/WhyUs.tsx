import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhyUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const reasons = [
    {
      title: "Thoughtful Design",
      description: "We believe in purpose-driven design that solves real problems while maintaining aesthetic integrity.",
      gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzM2YTJiMzQtYjQ4Ny00ZDM3LWE4NTAtYjM4YzY2NzM2YzFhMiZjdD1n/3o7btNa0RUYa5E7iiQ/giphy-grayscale.gif",
    },
    {
      title: "Attention to Detail",
      description: "Every pixel matters. We obsess over the details that others might overlook.",
      gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjk1YzJmMzgtZjQ4Ny00ZDM3LWE4NTAtYjM4YzY2NzM2YzFhMiZjdD1n/d3mlE7uhX8KFgEmY/giphy-grayscale.gif",
    },
    {
      title: "Collaborative Process",
      description: "We work closely with you as partners, ensuring your vision is realized every step of the way.",
      gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzM2YTJiMzQtYjQ4Ny00ZDM3LWE4NTAtYjM4YzY2NzM2YzFhMiZjdD1n/l0IylOPCNkiqOgMyA/giphy-grayscale.gif",
    },
    {
      title: "Technical Excellence",
      description: "Our designs aren't just beautiful, they're built with clean code and optimized performance.",
      gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzM2YTJiMzQtYjQ4Ny00ZDM3LWE4NTAtYjM4YzY2NzM2YzFhMiZjdD1n/LmNwrBhejkK9EFP504/giphy-grayscale.gif",
    }
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.165, 0.84, 0.44, 1] 
      } 
    },
  };

  return (
    <section id="why-us" className="py-24 bg-paper dark:bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent/80 dark:text-white/70 inline-block mb-2">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-ink dark:text-white">We're different in the best ways</h2>
          <p className="text-accent/70 dark:text-white/60 max-w-xl mx-auto">
            Beyond our portfolio, here's why clients continue to choose ZapsApps for their design needs.
          </p>
        </motion.div>

        {/* Interactive Tabs */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center mb-8 border-b border-accent/10 dark:border-white/10">
            {reasons.map((reason, index) => (
              <motion.button
                key={index}
                className={`px-4 py-3 font-mono text-xs uppercase relative ${
                  activeTab === index ? 'text-accent dark:text-white' : 'text-accent/50 dark:text-white/50 hover:text-accent/80 dark:hover:text-white/80'
                }`}
                onClick={() => setActiveTab(index)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {reason.title}
                {activeTab === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-accent dark:bg-white"
                    layoutId="activeTabIndicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <motion.div 
                className="bg-white dark:bg-dark-surface p-8 rounded-md border border-ink/5 dark:border-white/5 shadow-sm"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-serif text-xl mb-4 text-ink dark:text-white">{reasons[activeTab].title}</h3>
                <p className="text-accent/70 dark:text-white/60 mb-6">{reasons[activeTab].description}</p>
                <div className="flex items-center gap-2 text-accent dark:text-white/80 text-sm">
                  <span>Why it matters</span>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </motion.div>
              <motion.div 
                className="overflow-hidden rounded-md border border-ink/5 dark:border-white/5 shadow-sm bg-white dark:bg-dark-surface"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={reasons[activeTab].gif}
                  alt={reasons[activeTab].title}
                  className="w-full h-auto"
                  initial={{ scale: 0.95, opacity: 0.9 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.165, 0.84, 0.44, 1] 
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default WhyUs; 
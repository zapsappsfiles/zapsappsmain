import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const phrases = [
  "Minimalist Design",
  "Creative Solutions",
  "Elegant Experiences",
  "Bold Typography",
  "Clean Interfaces"
];

const TextEffect: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  // Auto-rotate phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="texteffect" className="py-32 bg-accent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-paper via-dark to-paper opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-paper via-dark to-paper opacity-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <motion.p 
              className="text-paper/50 font-mono uppercase tracking-widest text-xs mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Design Philosophy
            </motion.p>
            
            <div className="relative h-32 md:h-40 overflow-hidden mb-12">
              {phrases.map((phrase, index) => (
                <motion.h2
                  key={phrase}
                  className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl lg:text-7xl text-paper font-serif"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ 
                    opacity: currentPhrase === index ? 1 : 0,
                    y: currentPhrase === index ? 0 : 40,
                  }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {phrase.split('').map((char, charIndex) => (
                    <motion.span
                      key={`${phrase}-${charIndex}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: currentPhrase === index ? 1 : 0,
                        y: currentPhrase === index ? 0 : 20,
                      }}
                      transition={{ 
                        duration: 0.3, 
                        delay: currentPhrase === index ? 0.1 + charIndex * 0.03 : 0,
                        ease: "easeOut"
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.h2>
              ))}
            </div>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {['Minimal', 'Elegant', 'Modern', 'Clean', 'Bold', 'Refined', 'Simple', 'Functional'].map((word, index) => (
                <motion.span 
                  key={word}
                  className="px-4 py-2 bg-paper/10 backdrop-blur-sm rounded-full text-xs font-mono uppercase tracking-wider text-paper/80"
                  whileHover={{ 
                    backgroundColor: "rgba(245, 245, 240, 0.2)",
                    scale: 1.05, 
                    transition: { duration: 0.2 } 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <motion.div 
                className="text-paper opacity-60 mb-4 mx-auto"
                whileHover={{ scale: 1.1, opacity: 1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </motion.div>
              <h3 className="text-paper font-serif text-lg mb-2">Creative Thinking</h3>
              <p className="text-paper/60 text-sm">Innovative solutions to design challenges through unconventional approaches.</p>
            </div>
            
            <div className="text-center">
              <motion.div 
                className="text-paper opacity-60 mb-4 mx-auto"
                whileHover={{ scale: 1.1, opacity: 1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </motion.div>
              <h3 className="text-paper font-serif text-lg mb-2">Refined Aesthetics</h3>
              <p className="text-paper/60 text-sm">Carefully crafted visual elements that harmonize form and function.</p>
            </div>
            
            <div className="text-center">
              <motion.div 
                className="text-paper opacity-60 mb-4 mx-auto"
                whileHover={{ scale: 1.1, opacity: 1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </motion.div>
              <h3 className="text-paper font-serif text-lg mb-2">Thoughtful Details</h3>
              <p className="text-paper/60 text-sm">Attention to the small things that create memorable experiences.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TextEffect; 
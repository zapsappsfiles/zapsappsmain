import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import About from './components/sections/AboutSection';
import Contact from './components/sections/Contact';
import Map from './components/sections/Map';
import { ThemeProvider } from './contexts/ThemeContext';
import SEO from './components/SEO';
import FAQ from './components/ui/FAQ';
import Loader from './components/ui/Loader';
import { motion } from 'framer-motion';

// Add Remixicon CSS
import 'remixicon/fonts/remixicon.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Loader loading={loading} />
      
      {!loading && (
        <Layout>
          <SEO
            title="ZapsApps | Modern Web Design & Development Solutions"
            description="ZapsApps creates stunning, responsive websites and digital solutions. Our student-founded startup specializes in web design, development, branding, and SEO optimization."
          />
          <Hero />
          <Services />
          <Projects />
          <About />
          <Contact />
          <Map />
          <section id="faq" className="relative py-24 md:py-32 border-t border-current/10 bg-white dark:bg-black text-black dark:text-white overflow-hidden">
            {/* Subtle plus signs animation background */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute text-2xl font-light opacity-[0.02] ${
                    i % 2 === 0 ? 'text-black dark:text-white' : 'text-black/50 dark:text-white/50'
                  }`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.02, 0.05, 0.02],
                    rotate: [0, 45, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                >
                  +
                </motion.div>
              ))}
            </div>
            
            <div className="container mx-auto px-6 md:px-8 max-w-3xl relative z-10">
              <div className="flex items-center mb-10">
                <span className="text-caption opacity-50 mr-4 font-mono">07</span>
                <div className="w-12 h-px bg-black/30 dark:bg-white/30"></div>
              </div>
              <h2 className="text-section font-bold mb-12 tracking-tighter">Frequently Asked Questions</h2>
              <FAQ />
            </div>
          </section>
        </Layout>
      )}
    </ThemeProvider>
  );
};

export default App;

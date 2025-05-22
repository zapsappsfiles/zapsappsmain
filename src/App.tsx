import React from 'react';
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

// Add Remixicon CSS
import 'remixicon/fonts/remixicon.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
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
        <section id="faq" className="relative py-24 md:py-32 border-t border-current/10 bg-white dark:bg-black text-black dark:text-white">
          <div className="container mx-auto px-6 md:px-8 max-w-3xl">
            <div className="flex items-center mb-10">
              <span className="text-xl opacity-50 mr-4">07</span>
              <div className="w-12 h-px bg-black/30 dark:bg-white/30"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tighter">Frequently Asked Questions</h2>
            <FAQ />
          </div>
        </section>
      </Layout>
    </ThemeProvider>
  );
};

export default App;

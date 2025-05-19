import React from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Gallery from './components/sections/Gallery';
import Projects from './components/sections/Projects';
import Process from './components/sections/Process';
import Contact from './components/sections/Contact';
import SEO from './components/SEO';
import ParallaxScene from './components/sections/ParallaxScene';
import { ThemeProvider } from './contexts/ThemeContext';

// Add Remixicon CSS
import 'remixicon/fonts/remixicon.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SEO />
      <Layout>
        <Hero />
        <Gallery />
        <Services />
        <ParallaxScene />
        <Projects />
        <Process />
        <Contact />
      </Layout>
    </ThemeProvider>
  );
};

export default App;

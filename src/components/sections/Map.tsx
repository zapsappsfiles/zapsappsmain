import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import FAQ from '../ui/FAQ';

const Map: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Inject Product/Service schema for SEO
  useEffect(() => {
    const scriptId = 'service-json-ld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Web Design & Development",
      "name": "Web Design & Development NYC",
      "description": "Modern, responsive web design, branding, SEO, and digital solutions for businesses in Manhattan and New York City.",
      "provider": {
        "@type": "Organization",
        "name": "ZapsApps",
        "url": "https://zapsapps.com"
      },
      "areaServed": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Manhattan",
          "addressRegion": "NY",
          "addressCountry": "US"
        }
      },
      "url": "https://zapsapps.com/#services"
    });
    return () => { if (scriptTag) scriptTag.remove(); };
  }, []);
  
  return (
    <section 
      id="location" 
      ref={sectionRef}
      className={`relative min-h-screen ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* The map - fullscreen */}
      <div className="absolute inset-0 w-full h-full z-0">
        <iframe
          title="ZapsApps Location"
          className="w-full h-full border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193746.35087023854!2d-74.01043972862963!3d40.70531996052708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1621912345678!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
          style={{ 
            filter: darkMode ? 'invert(90%) hue-rotate(180deg)' : 'none',
            opacity: darkMode ? 0.8 : 1,
            pointerEvents: 'auto'
          }}
        ></iframe>
      </div>

      {/* Overlay gradient */}
      <div 
        className={`absolute inset-0 z-10 ${
          darkMode 
            ? 'bg-gradient-to-t from-black via-black/60 to-transparent' 
            : 'bg-gradient-to-t from-white via-white/60 to-transparent'
        }`}
        style={{ pointerEvents: 'none' }}
      ></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-8 h-screen flex flex-col">
        <div className="mt-auto mb-20 md:mb-32 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <span className="text-xl opacity-50 mr-4">06</span>
              <div className={`w-12 h-px ${darkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
            </div>
            
            <motion.h2 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-12 leading-[0.9]"
              style={{ y: textY }}
            >
              New York !
            </motion.h2>
          
            <div className="border-t border-current/10 pt-10 md:flex md:justify-between">
              <div className="mb-10 md:mb-0">
                <p className="text-sm uppercase tracking-wider opacity-50 mb-4">Location</p>
                <p className="text-lg opacity-80">Manhattan</p>
                <p className="text-lg opacity-80">New York, NY 10001</p>
                <p className="text-lg opacity-80">United States</p>
                
                <motion.a
                  href="https://goo.gl/maps/your-map-link-here"
                  className={`inline-flex items-center px-6 py-3 rounded-full text-sm mt-8 ${
                    darkMode 
                      ? 'bg-white text-black hover:bg-white/90' 
                      : 'bg-black text-white hover:bg-black/90'
                  } transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </motion.a>
              </div>
              
              <div>
                <p className="text-sm uppercase tracking-wider opacity-50 mb-4">Contact</p>
                <motion.a 
                  href="mailto:zapsapps1@gmail.com" 
                  className="text-lg block mb-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  zapsapps1@gmail.com
                </motion.a>
                <motion.a 
                  href="tel:+17185007647" 
                  className="text-lg block"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  +1 (718) 500-7647
                </motion.a>
                
                <div className="mt-8 flex space-x-6">
                  {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="opacity-60 hover:opacity-100 transition-opacity"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {social}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Map; 
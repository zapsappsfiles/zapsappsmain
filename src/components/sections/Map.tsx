import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const Map: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
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
      <div className="relative z-20 container-main h-screen flex flex-col">
        <div className="mt-auto mb-20 md:mb-32 w-full max-w-2xl">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div 
              className="flex items-center mb-6"
              variants={itemVariants}
            >
              <span className="text-caption opacity-50 mr-4 font-mono">06</span>
              <div className={`w-12 h-px ${darkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
            </motion.div>
            
            <motion.h2 
              className="text-section font-bold tracking-tighter mb-12 leading-[0.9]"
              variants={itemVariants}
            >
              New York !
            </motion.h2>
          
            {/* Contact Information */}
            <motion.div 
              className="space-y-8"
              variants={itemVariants}
            >
              <div>
                <h3 className="text-section font-bold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                      darkMode ? 'bg-white/10' : 'bg-black/5'
                    }`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body font-medium">Location</p>
                      <p className="text-body-sm opacity-70">Manhattan, New York</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                      darkMode ? 'bg-white/10' : 'bg-black/5'
                    }`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body font-medium">Email</p>
                      <a 
                        href="mailto:zapsapps1@gmail.com" 
                        className="text-body-sm opacity-70 hover:opacity-100 transition-opacity"
                      >
                        zapsapps1@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                      darkMode ? 'bg-white/10' : 'bg-black/5'
                    }`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body font-medium">Phone</p>
                      <a 
                        href="tel:+17185007647"
                        className="text-body-sm opacity-70 hover:opacity-100 transition-opacity"
                      >
                        +1 (718) 500-7647
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-body-sm opacity-70 leading-relaxed">
                  Ready to transform your digital presence? Let's create something amazing together. 
                  Our team is excited to discuss your next project.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Map; 
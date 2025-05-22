import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

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
      "name": "Web Design & Development Solutions",
      "description": "Modern, responsive web design, branding, SEO, and digital solutions for businesses worldwide.",
      "provider": {
        "@type": "Organization",
        "name": "ZapsApps",
        "url": "https://zapsapps.com"
      },
      "areaServed": "Worldwide",
      "url": "https://zapsapps.com/#services"
    });
    return () => { if (scriptTag) scriptTag.remove(); };
  }, []);
  
  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 border-t border-current/10">
      {/* NY Map Background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg
          viewBox="0 0 1000 1000"
          className={`w-full h-full ${darkMode ? 'text-white' : 'text-black'}`}
          style={{ opacity: 0.05 }}
        >
          {/* Simplified Manhattan grid pattern */}
          <pattern id="grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Major avenues */}
          <line x1="200" y1="0" x2="200" y2="1000" stroke="currentColor" strokeWidth="2" />
          <line x1="400" y1="0" x2="400" y2="1000" stroke="currentColor" strokeWidth="2" />
          <line x1="600" y1="0" x2="600" y2="1000" stroke="currentColor" strokeWidth="2" />
          <line x1="800" y1="0" x2="800" y2="1000" stroke="currentColor" strokeWidth="2" />
          
          {/* Major streets */}
          <line x1="0" y1="200" x2="1000" y2="200" stroke="currentColor" strokeWidth="2" />
          <line x1="0" y1="400" x2="1000" y2="400" stroke="currentColor" strokeWidth="2" />
          <line x1="0" y1="600" x2="1000" y2="600" stroke="currentColor" strokeWidth="2" />
          <line x1="0" y1="800" x2="1000" y2="800" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center mb-10">
          <span className="text-xl opacity-50 mr-4">06</span>
          <div className="w-12 h-px bg-black/30 dark:bg-white/30"></div>
        </div>

        <motion.div
          style={{ y: textY }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tighter">Get in Touch</h2>
            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-wider opacity-50 mb-4">Email</p>
                <motion.a 
                  href="mailto:zapsapps1@gmail.com" 
                  className="text-lg block hover:underline"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  zapsapps1@gmail.com
                </motion.a>
              </div>
              
              <div>
                <p className="text-sm uppercase tracking-wider opacity-50 mb-4">Social</p>
                <div className="flex space-x-6">
                  {[
                    { name: 'Twitter', url: 'https://twitter.com/zapsapps', icon: 'ri-twitter-fill' },
                    { name: 'Instagram', url: 'https://instagram.com/zapsapps', icon: 'ri-instagram-line' },
                    { name: 'LinkedIn', url: 'https://linkedin.com/company/zapsapps', icon: 'ri-linkedin-fill' }
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      className="opacity-60 hover:opacity-100 transition-opacity flex items-center"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`${social.icon} text-xl mr-2`}></i>
                      {social.name}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider opacity-50 mb-4">Location</p>
                <p className="text-lg">New York City, NY</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl"></div>
            <div className="relative p-8 rounded-2xl border border-current/10">
              <h3 className="text-2xl font-semibold mb-6">Ready to Start Your Project?</h3>
              <p className="text-lg opacity-70 mb-8">
                Let's discuss your vision and create something amazing together. Reach out to us for a free consultation.
              </p>
              <motion.a
                href="mailto:zapsapps1@gmail.com"
                className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="ri-mail-line mr-2"></i>
                Send us a Message
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Map; 
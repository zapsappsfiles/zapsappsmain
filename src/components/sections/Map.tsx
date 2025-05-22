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
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center mb-10">
          <span className="text-xl opacity-50 mr-4">06</span>
          <div className="w-12 h-px bg-black/30 dark:bg-white/30"></div>
        </div>
        
        <motion.div
          style={{ y: textY }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24"
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
                    { name: 'Twitter', url: 'https://twitter.com/zapsapps' },
                    { name: 'Instagram', url: 'https://instagram.com/zapsapps' },
                    { name: 'LinkedIn', url: 'https://linkedin.com/company/zapsapps' }
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      className="opacity-60 hover:opacity-100 transition-opacity"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Map;
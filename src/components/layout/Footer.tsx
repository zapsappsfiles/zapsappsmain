import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Toast from '../ui/Toast';

const Footer: React.FC = () => {
  const { darkMode } = useTheme();
  const currentYear = new Date().getFullYear();
  const [toast, setToast] = useState<string | null>(null);

  // Social media links
  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/zapsapps' },
    { name: 'Twitter', url: 'https://twitter.com/zapsapps' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/zapsapps' },
    { name: 'GitHub', url: 'https://github.com/zapsapps' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <footer className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} section-padding-sm border-t ${darkMode ? 'border-white/10' : 'border-black/5'}`}>
      <div className="container-main">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Company Info */}
          <div>
            <motion.div variants={itemVariants}>
              <h3 className="font-bold text-body-lg tracking-tighter mb-6">ZAPSAPPS</h3>
              <div className={`${darkMode ? 'text-white/70' : 'text-black/70'} space-y-1`}>
                <p className="text-body-sm">Available Worldwide</p>
                <p className="text-body-sm">Premium Web Solutions</p>
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <div>
            <motion.div variants={itemVariants}>
              <h3 className="text-caption uppercase tracking-wider mb-6 opacity-50">Connect</h3>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-body-sm ${darkMode ? 'text-white hover:text-white/70' : 'text-black hover:text-black/70'} transition-colors relative inline-block`}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <motion.div variants={itemVariants}>
              <h3 className="text-caption uppercase tracking-wider mb-6 opacity-50">Contact</h3>
              <div className="space-y-3">
                <p className="text-body-sm">zapsapps1@gmail.com</p>
                <p className="text-body-sm">+1 (718) 500-7647</p>
                <p className="text-body-sm">Manhattan, New York</p>
              </div>
            </motion.div>
          </div>

          {/* Newsletter */}
          <div>
            <motion.div variants={itemVariants}>
              <h3 className="text-body font-light mb-6">
                Subscribe to updates
              </h3>
              <div className={`flex border-b ${darkMode ? 'border-white/20' : 'border-black/20'} transition-colors focus-within:border-current`}>
                <input
                  type="email"
                  placeholder="Your email"
                  className={`w-full py-3 bg-transparent border-none outline-none text-body-sm ${darkMode ? 'placeholder:text-white/30' : 'placeholder:text-black/30'}`}
                />
                <button 
                  aria-label="Subscribe"
                  className="p-3"
                  onClick={() => setToast('Coming soon! Stay tuned.')}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </motion.svg>
                </button>
              </div>
              <Toast show={!!toast} message={toast || ''} onClose={() => setToast(null)} type="info" />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-12 sm:mt-16 md:mt-20 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-current/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={`text-caption ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
            &copy;{currentYear} ZapsApps. All rights reserved.
          </div>
          
          <div className="flex space-x-8">
            <p className={`text-caption ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
              Crafted with precision & <span className="text-red-500">❤</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 
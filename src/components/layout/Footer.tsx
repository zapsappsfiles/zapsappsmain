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
    { name: 'Twitter / X', url: 'https://twitter.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
  ];

  // Email links with labels
  const contactLinks = [
    { label: 'General enquiries', email: 'zapsapps1@gmail.com' },
    { label: 'New business', email: 'zapsapps1@gmail.com' },
  ];

  return (
    <footer className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} py-16 md:py-24 border-t ${darkMode ? 'border-white/10' : 'border-black/5'}`}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Company Info */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-bold text-2xl tracking-tighter mb-6">ZAPSAPPS</h3>
              <div className={`${darkMode ? 'text-white/70' : 'text-black/70'} space-y-1`}>
                  <p>Available Worldwide</p>
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-sm uppercase tracking-wider mb-6 opacity-50">Connect</h3>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-lg ${darkMode ? 'text-white hover:text-white/70' : 'text-black hover:text-black/70'} transition-colors relative inline-block`}
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

          {/* Contact Links */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-sm uppercase tracking-wider mb-6 opacity-50">Contact</h3>
              <div className="space-y-4">
                <h3 className="font-medium">Contact</h3>
                <p>zapsapps1@gmail.com</p>
                <p>+1 (718) 500-7647</p>
              </div>
            </motion.div>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-light mb-8">
                Subscribe to 
                <br /> 
                our updates
              </h3>
              <div className={`flex border-b ${darkMode ? 'border-white/20' : 'border-black/20'} transition-colors focus-within:border-current`}>
                <input
                  type="email"
                  placeholder="Your email"
                  className={`w-full py-3 bg-transparent border-none outline-none ${darkMode ? 'placeholder:text-white/30' : 'placeholder:text-black/30'}`}
                />
                <button 
                  aria-label="Subscribe"
                  className="p-3"
                  onClick={() => setToast('Oh—no updates yet! Try again soon. (Under construction)')}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    whileHover={{ x: 5 }}
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
        </div>

        {/* Bottom Section with Credits */}
        <div className="mt-24 md:mt-32 flex flex-col md:flex-row md:items-center justify-between space-y-6 md:space-y-0 pt-8 border-t border-current/10">
          <div className={`text-sm ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
            &copy;{currentYear} ZapsApps
          </div>
          
          <div className="flex space-x-8">
            <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
              Built by ZapsApps with <span className="text-red-500">❤</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
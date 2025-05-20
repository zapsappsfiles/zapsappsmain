import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Twitter', icon: 'ri-twitter-x-line', url: '#' },
    { name: 'LinkedIn', icon: 'ri-linkedin-box-line', url: '#' },
    { name: 'Instagram', icon: 'ri-instagram-line', url: '#' },
    { name: 'GitHub', icon: 'ri-github-line', url: '#' },
  ];

  const navLinks = [
    { name: 'Home', url: '#home' },
    { name: 'Gallery', url: '#gallery' },
    { name: 'Services', url: '#services' },
    { name: 'Projects', url: '#projects' },
    { name: 'Process', url: '#process' },
    { name: 'Contact', url: '#contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' },
    { name: 'Cookies', url: '/cookies' },
  ];

  return (
    <footer className={`relative border-t bg-paper border-black/5 dark:bg-dark dark:border-white/10`}>
      {/* Main footer content */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <div className={`h-5 w-5 bg-accent dark:bg-white`}></div>
              <span className="font-mono text-lg uppercase tracking-widest font-bold text-ink dark:text-white">ZapsApps</span>
            </div>
            
            <p className="max-w-md text-sm text-accent/80 dark:text-white/70">
              We create powerful, innovative solutions that transform your ideas into 
              exceptional digital experiences. Let's build something amazing together.
            </p>
            
            {/* Social links */}
            <div className="flex items-center space-x-5 pt-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  aria-label={link.name}
                  className="text-xl text-accent/60 hover:text-accent dark:text-white/60 dark:hover:text-white"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className={link.icon}></i>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div className="md:col-span-3 md:col-start-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-6 dark:text-white">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="block text-sm text-accent/80 hover:text-accent transition-colors duration-200 dark:text-white/70 dark:hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Contact info */}
          <div className="md:col-span-3 md:col-start-9">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-6 dark:text-white">
              Contact
            </h3>
            <div className="space-y-3">
              <p className="flex items-center text-sm text-accent/80 dark:text-white/70">
                <i className="ri-map-pin-line mr-3"></i>
                Manhattan, NYC
              </p>
              <p className="flex items-center text-sm text-accent/80 dark:text-white/70">
                <i className="ri-mail-line mr-3"></i>
                zapsapps1@gmail.com
              </p>
              <p className="flex items-center text-sm text-accent/80 dark:text-white/70">
                <i className="ri-phone-line mr-3"></i>
                718-500-7647
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom footer */}
      <div className="py-6 border-t border-black/5 dark:border-white/10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-accent/60 dark:text-white/50">
            © {currentYear} ZapsApps. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="text-xs text-accent/60 hover:text-accent/80 transition-colors duration-200 dark:text-white/50 dark:hover:text-white/80"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
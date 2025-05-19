import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-paper dark:bg-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto relative">
          {/* Removed decorative elements */}
          
          <motion.div 
            className="text-left mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-accent inline-block mb-4 pb-1 border-b border-accent/30 dark:text-white dark:border-white/20">
              Contact Us
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-ink dark:text-white">Let's create something together</h2>
            <p className="text-ink max-w-xl dark:text-white/80">
              Have a project in mind? We're ready to collaborate and bring your vision to life.
            </p>
          </motion.div>

          <motion.form 
            className="space-y-12"
            action="https://formspree.io/f/xqkrqjzv"
            method="POST"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={e => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const data = new FormData(form);
              fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' },
              })
                .then(res => res.json())
                .then(res => {
                  if (res.ok) {
                    form.reset();
                    alert('Thank you! Your message has been sent.');
                  } else {
                    alert('Sorry, there was an error. Please try again.');
                  }
                })
                .catch(() => alert('Sorry, there was an error. Please try again.'));
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="space-y-2 relative group">
                <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-ink/70 mb-2 dark:text-white/70">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border-b border-dark/10 bg-transparent px-0 py-2 focus:border-dark focus:outline-none focus:ring-0 transition-colors duration-300 dark:border-white/20 dark:text-white"
                  placeholder="Your name"
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ink group-focus-within:w-full transition-all duration-300 dark:bg-white"></span>
              </div>
              
              <div className="space-y-2 relative group">
                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-ink/70 mb-2 dark:text-white/70">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border-b border-dark/10 bg-transparent px-0 py-2 focus:border-dark focus:outline-none focus:ring-0 transition-colors duration-300 dark:border-white/20 dark:text-white"
                  placeholder="Your email"
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ink group-focus-within:w-full transition-all duration-300 dark:bg-white"></span>
              </div>
            </div>

            <div className="space-y-2 relative group">
              <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-ink/70 mb-2 dark:text-white/70">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full border-b border-dark/10 bg-transparent px-0 py-2 focus:border-dark focus:outline-none focus:ring-0 transition-colors duration-300 dark:border-white/20 dark:text-white"
                placeholder="Project inquiry"
              />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ink group-focus-within:w-full transition-all duration-300 dark:bg-white"></span>
            </div>

            <div className="space-y-2 relative group">
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-ink/70 mb-2 dark:text-white/70">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full border-b border-dark/10 bg-transparent px-0 py-2 focus:border-dark focus:outline-none focus:ring-0 transition-colors duration-300 dark:border-white/20 dark:text-white"
                placeholder="Tell us about your project..."
              ></textarea>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ink group-focus-within:w-full transition-all duration-300 dark:bg-white"></span>
            </div>

            <div className="pt-6">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden bg-dark text-paper font-mono text-xs uppercase tracking-wider px-8 py-4 dark:bg-white dark:text-dark"
              >
                <span className="relative z-10">Send Message</span>
                <span className="absolute inset-0 h-full translate-y-full bg-ink transition-transform duration-300 group-hover:translate-y-0 dark:bg-dark"></span>
              </motion.button>
            </div>
          </motion.form>

          {/* Minimal Google Map with better spacing and animation */}
          <motion.div
            className="w-full h-56 md:h-72 rounded-xl overflow-hidden border border-ink/10 shadow-sm my-8 dark:border-white/10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24156.69098293744!2d-74.0060152!3d40.7127281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316c9b1b7b%3A0x8c1b1b1b1b1b1b1b!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          <motion.div 
            className="mt-24 pt-12 border-t border-dark/5 grid grid-cols-1 md:grid-cols-3 gap-8 dark:border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-serif text-lg mb-4 text-ink dark:text-white">Email</h3>
              <a href="mailto:zaosaoos@gmail.com" className="text-ink/80 hover:text-ink hover:border-b border-ink/30 transition-all duration-300 dark:text-white/80 dark:hover:text-white dark:border-white/20">
                zaosaoos@gmail.com
              </a>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-4 text-ink dark:text-white">Phone</h3>
              <p className="text-ink/80 dark:text-white/80">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-4 text-ink dark:text-white">Studio</h3>
              <address className="not-italic text-ink/80 dark:text-white/80">
                123 Design Street<br />
                San Francisco, CA 94103
              </address>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
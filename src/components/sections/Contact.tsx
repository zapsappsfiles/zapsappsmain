import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Toast, { ToastType } from '../ui/Toast';

const Contact: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: ToastType }>({ 
    show: false, 
    message: '', 
    type: 'success' 
  });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSubmitting(true);

    emailjs.sendForm(
      'service_qtp74ol',
      'template_tabtwx2',
      formRef.current,
      'qPJ_GqvkgBMxA2opO'
    )
      .then((result) => {
        console.log('Email successfully sent!', result.text);
        setSubmitting(false);
        setToast({
          show: true,
          message: 'Your message has been sent successfully! We\'ll be in touch soon.',
          type: 'success'
        });
        if (formRef.current) formRef.current.reset();
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setSubmitting(false);
        setToast({
          show: true,
          message: 'Sorry, there was an error sending your message. Please try again.',
          type: 'error'
        });
      });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

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
            ref={formRef}
            className="space-y-8"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label htmlFor="user_name" className="block text-xs font-mono uppercase tracking-wider text-ink/70 mb-2 dark:text-white/70">
                  Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  className="w-full border-b border-dark/10 bg-transparent px-0 py-2 focus:border-accent/50 dark:focus:border-white/50 focus:outline-none focus:ring-0 transition-colors duration-300 dark:border-white/20 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="user_email" className="block text-xs font-mono uppercase tracking-wider text-ink/70 mb-2 dark:text-white/70">
                  Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  className="w-full border-b border-dark/10 bg-transparent px-0 py-2 focus:border-accent/50 dark:focus:border-white/50 focus:outline-none focus:ring-0 transition-colors duration-300 dark:border-white/20 dark:text-white"
                  placeholder="Your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-ink/70 mb-2 dark:text-white/70">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full border-b border-dark/10 bg-transparent px-0 py-2 focus:border-accent/50 dark:focus:border-white/50 focus:outline-none focus:ring-0 transition-colors duration-300 dark:border-white/20 dark:text-white"
                placeholder="Project inquiry"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-ink/70 mb-2 dark:text-white/70">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full border-b border-dark/10 bg-transparent px-0 py-2 focus:border-accent/50 dark:focus:border-white/50 focus:outline-none focus:ring-0 transition-colors duration-300 dark:border-white/20 dark:text-white resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <div className="pt-6">
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden bg-dark text-paper font-mono text-xs uppercase tracking-wider px-8 py-4 dark:bg-white dark:text-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
              >
                <span className="relative z-10">
                  {submitting ? 'Sending...' : 'Send Message'}
                </span>
                <span className="absolute inset-0 h-full w-0 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            </div>
          </motion.form>

          {/* NYC Google Map */}
          <motion.div
            className="w-full h-56 md:h-72 rounded-xl overflow-hidden border border-ink/10 shadow-sm my-12 dark:border-white/10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48373.85425381818!2d-74.0138641751242!3d40.75459248946551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2590099a8e8f9%3A0xb05de5decd9e30db!2sManhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1717607723962!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          <motion.div 
            className="mt-16 pt-12 border-t border-dark/5 grid grid-cols-1 md:grid-cols-3 gap-8 dark:border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-serif text-lg mb-4 text-ink dark:text-white">Email</h3>
              <a href="mailto:zapsapps1@gmail.com" className="text-ink/80 hover:text-ink hover:border-b border-ink/30 transition-all duration-300 dark:text-white/80 dark:hover:text-white dark:border-white/20">
                zapsapps1@gmail.com
              </a>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-4 text-ink dark:text-white">Phone</h3>
              <p className="text-ink/80 dark:text-white/80">718-500-7647</p>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-4 text-ink dark:text-white">Location</h3>
              <address className="not-italic text-ink/80 dark:text-white/80">
                Manhattan<br />
                New York City, NY
              </address>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast notification */}
      <Toast 
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
        duration={6000}
      />
    </section>
  );
};

export default Contact; 
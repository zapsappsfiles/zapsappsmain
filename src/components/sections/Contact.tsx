import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const Contact: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '', 
    goal: '',
    services: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for heading
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const response = await fetch('https://formspree.io/f/xkgraoba', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          goal: formData.goal,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '', goal: '', services: [] });
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 3000);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-32 md:py-40 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-start">
          {/* Left column */}
          <div className="lg:w-1/2 lg:sticky lg:top-32">
            <motion.div style={{ y: titleY }}>
              <div className="flex items-center mb-6">
                <span className="text-xl opacity-50 mr-4">05</span>
                <div className={`w-12 h-px ${darkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
              </div>
              <motion.h2 
                className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-none"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Let's work
                <br />together!
              </motion.h2>
              
              <motion.p 
                className="text-xl opacity-70 max-w-md mt-10 mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Is your big idea ready to go wild? We're here to help you turn it into 
                something extraordinary.
              </motion.p>
              
              {/* Contact information */}
              <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-sm font-light uppercase tracking-wider opacity-50 mb-4">Email us directly</h3>
                  <div className="space-y-3">
                    <p className={`text-base ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
                      New business
                    </p>
                    <motion.a 
                      href="mailto:zapsapps1@gmail.com" 
                      className="text-xl block"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      zapsapps1@gmail.com
                    </motion.a>
                  </div>
          </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-sm font-light uppercase tracking-wider opacity-50 mb-4">Follow us</h3>
                  <div className="flex space-x-6">
                    {['Twitter', 'Instagram', 'LinkedIn'].map((social, index) => (
                      <motion.a 
                        key={social} 
                        href="#" 
                        className="inline-block"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {social}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Contact form */}
          <div className="lg:w-1/2">
          <motion.form 
            onSubmit={handleSubmit}
              className="space-y-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
          >
              {/* Name input */}
              <div className="space-y-2">
                <label 
                  htmlFor="name" 
                  className="text-sm uppercase tracking-wider opacity-50"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full bg-transparent border-b-2 ${
                    darkMode ? 'border-white/20 focus:border-white' : 'border-black/20 focus:border-black'
                  } py-4 outline-none transition-colors`}
                  placeholder="John Doe"
                />
              </div>
              
              {/* Email input */}
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="text-sm uppercase tracking-wider opacity-50"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full bg-transparent border-b-2 ${
                    darkMode ? 'border-white/20 focus:border-white' : 'border-black/20 focus:border-black'
                  } py-4 outline-none transition-colors`}
                  placeholder="john@example.com"
                />
            </div>

              {/* Project Goal input (replacing Budget selection) */}
            <div className="space-y-2">
                <label 
                  htmlFor="goal" 
                  className="text-sm uppercase tracking-wider opacity-50"
                >
                  Project goal
              </label>
              <input
                type="text"
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-b-2 ${
                    darkMode ? 'border-white/20 focus:border-white' : 'border-black/20 focus:border-black'
                  } py-4 outline-none transition-colors`}
                  placeholder="What are you trying to achieve with this project?"
              />
            </div>

              {/* Message textarea */}
            <div className="space-y-2">
                <label 
                  htmlFor="message" 
                  className="text-sm uppercase tracking-wider opacity-50"
                >
                  Tell us about your project
              </label>
              <textarea
                id="message"
                name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                required
                  rows={6}
                  className={`w-full bg-transparent border-b-2 ${
                    darkMode ? 'border-white/20 focus:border-white' : 'border-black/20 focus:border-black'
                  } py-4 outline-none transition-colors`}
                  placeholder="Describe your project and goals..."
                />
            </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                className={`mt-8 px-10 py-4 rounded-full ${
                  darkMode 
                    ? 'bg-white text-black hover:bg-white/90' 
                    : 'bg-black text-white hover:bg-black/90'
                } text-lg flex items-center gap-3 transition-colors`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full"></span>
                    <span>Sending...</span>
                  </>
                ) : submitSuccess ? (
                  <>
                    <span>Message sent!</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </>
                ) : submitError ? (
                  <>
                    <span>Try again</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </>
                )}
              </motion.button>
          </motion.form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
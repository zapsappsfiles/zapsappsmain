import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Static Websites',
    description: "We specialize in building beautiful, responsive static websites tailored to your needs with three service tiers.",
    icon: <i className="ri-code-box-line text-3xl" />,
    color: 'bg-blue-500',
  },
  {
    title: 'Web Design',
    description: 'Creating clean, minimal websites with thoughtful interactions that guide users naturally through your content.',
    icon: <i className="ri-layout-4-line text-3xl" />,
    color: 'bg-pink-500',
  },
  {
    title: 'Brand Identity',
    description: "Crafting distinctive visual systems that communicate your brand's essence through typography, color, and voice.",
    icon: <i className="ri-shape-line text-3xl" />,
    color: 'bg-purple-500',
  },
  {
    title: 'Digital Products',
    description: 'Designing intuitive interfaces and experiences for apps, platforms, and digital tools that solve real problems.',
    icon: <i className="ri-apps-2-line text-3xl" />,
    color: 'bg-red-500',
  },
  {
    title: 'SEO Optimization',
    description: 'Boosting your online visibility with proven SEO strategies that drive traffic and improve rankings.',
    icon: <i className="ri-search-line text-3xl" />,
    color: 'bg-green-500',
  },
  {
    title: 'Custom Development',
    description: 'Building tailor-made solutions from scratch with your unique requirements and business goals in mind.',
    icon: <i className="ri-code-s-slash-line text-3xl" />,
    color: 'bg-yellow-500',
  },
];

// Service tiers for static websites
const serviceTiers = [
  {
    name: 'Regular',
    description: 'Perfect for portfolios and simple showcases',
    features: [
      'Single page design',
      'Responsive layout',
      'Basic SEO setup',
      'Custom branding',
      'Contact form',
    ],
    color: 'bg-blue-500',
    bestFor: 'Ideal for individual portfolios, basic landing pages, and small businesses just getting started online.'
  },
  {
    name: 'Premium',
    description: 'For businesses needing more comprehensive web presence',
    features: [
      'Up to 5 pages',
      'Advanced responsive design',
      'Enhanced SEO optimization',
      'Custom animations',
      'Contact form with validation',
      'Social media integration'
    ],
    color: 'bg-purple-500',
    bestFor: 'Great for small to medium businesses requiring multiple pages to showcase services, team, and more content.'
  },
  {
    name: 'Ultra',
    description: 'Complete web solution for maximum impact',
    features: [
      'Multiple pages (6+)',
      'Advanced animations',
      'Comprehensive SEO strategy',
      'Performance optimization',
      'Enhanced user interactions',
      'Custom illustrations/graphics',
      'Content strategy assistance'
    ],
    color: 'bg-pink-500',
    bestFor: 'Perfect for established businesses and organizations needing a sophisticated web presence with all the bells and whistles.'
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      staggerChildren: 0.13,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-paper dark:bg-dark">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-xl mx-auto text-center mb-16">
          <span className="font-mono text-sm uppercase tracking-widest text-accent block mb-4 dark:text-white/80">Our Services</span>
          <h2 className="heading text-ink dark:text-white">We craft thoughtful design solutions</h2>
          <p className="text-accent max-w-lg mx-auto dark:text-white/70">
            Focused on simplicity and function, we believe in letting the content breathe
            and creating designs that stand the test of time.
          </p>
        </div>
        
        {/* Main Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative bg-white dark:bg-dark/80 border border-ink/10 dark:border-white/10 rounded-xl p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-start gap-4"
              style={{ minHeight: 260 }}
              variants={cardVariants}
            >
              <div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-full shadow-lg ${service.color} text-white group-hover:scale-110 transition-transform`}>{service.icon}</div>
              <h3 className="font-semibold text-lg mb-2 text-ink dark:text-white group-hover:text-accent dark:group-hover:text-white transition-colors">{service.title}</h3>
              <p className="text-ink/70 dark:text-white/70 text-base">{service.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Website Service Tiers */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-semibold mb-6 text-ink dark:text-white">Our Website Packages</h3>
            <p className="text-accent dark:text-white/70 max-w-2xl mx-auto">
              We offer three tiers of static website services to match your needs and budget. 
              Each includes custom design, responsive layouts, and our commitment to quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line between tiers */}
            <div className="absolute top-16 left-0 w-full h-px bg-ink/10 dark:bg-white/10 hidden md:block"></div>
            
            {serviceTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                className={`relative bg-white dark:bg-dark-surface border border-ink/10 dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${index === 1 ? 'md:-mt-4' : ''}`}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-white text-xs uppercase font-mono tracking-widest py-1 px-3 rounded-full">
                    Popular
                  </div>
                )}
                <div className={`${tier.color} py-6 px-6`}>
                  <h4 className="text-2xl font-mono uppercase tracking-wider font-bold text-white mb-2">{tier.name}</h4>
                  <p className="text-white/90 text-sm">{tier.description}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-4 mb-8 min-h-[300px]">
                    {tier.features.map((feature, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-3 text-ink dark:text-white/90"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <span className={`flex-shrink-0 mt-1 text-lg ${tier.color.replace('bg-', 'text-')}`}>
                          <i className="ri-check-line"></i>
                        </span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-ink/10 dark:border-white/10">
                    <p className="text-sm text-ink/70 dark:text-white/70">{tier.bestFor}</p>
                    <motion.a
                      href="#contact"
                      className={`mt-6 inline-block py-3 px-6 rounded-lg text-white ${tier.color} text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg w-full text-center`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-ink/70 dark:text-white/70 text-sm">
              All packages include custom design, branding, and responsive layouts. 
              <br />Contact us to discuss your specific requirements and get a tailored quote.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Services; 
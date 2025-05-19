import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Brand Identity',
    description: "Crafting distinctive visual systems that communicate your brand's essence through typography, color, and voice.",
    icon: <i className="ri-shape-line text-3xl" />,
    color: 'bg-blue-500',
  },
  {
    title: 'Web Design',
    description: 'Creating clean, minimal websites with thoughtful interactions that guide users naturally through your content.',
    icon: <i className="ri-layout-4-line text-3xl" />,
    color: 'bg-pink-500',
  },
  {
    title: 'Print Design',
    description: 'Translating your digital presence to tangible materials with careful attention to paper, texture, and tactile experience.',
    icon: <i className="ri-file-paper-2-line text-3xl" />,
    color: 'bg-green-500',
  },
  {
    title: 'Editorial Design',
    description: 'Designing publications, magazines, and layouts that balance visual hierarchy with readability.',
    icon: <i className="ri-book-open-line text-3xl" />,
    color: 'bg-yellow-500',
  },
  {
    title: 'Art Direction',
    description: 'Guiding creative vision across all touchpoints to ensure consistency in storytelling and visual language.',
    icon: <i className="ri-brush-3-line text-3xl" />,
    color: 'bg-purple-500',
  },
  {
    title: 'Digital Products',
    description: 'Designing intuitive interfaces and experiences for apps, platforms, and digital tools that solve real problems.',
    icon: <i className="ri-apps-2-line text-3xl" />,
    color: 'bg-red-500',
  },
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
      </motion.div>
    </section>
  );
};

export default Services; 
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'What services do you offer?',
    a: 'We specialize in web design, development, branding, SEO, and digital solutions for businesses in New York City and beyond.'
  },
  {
    q: 'How long does it take to build a website?',
    a: 'Most projects take about 2 weeks for a standard website, but can range up to 6 weeks for complex builds or custom features. Timelines depend on project scope and client feedback speed.'
  },
  {
    q: 'How much does a website cost?',
    a: (
      <>
        Pricing depends on your needs. Most projects start at <b>$2,000</b> for a standard business website. Simpler sites can be less, and complex or custom builds may cost more. We provide transparent, fixed quotes after a free consultation.
        <div className="mt-3">
          <span className="inline-block px-3 py-2 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs font-medium">
            <b>Special:</b> 50% discount for our first few clients while we build our portfolio!
          </span>
        </div>
      </>
    )
  },
  {
    q: 'What is your process?',
    a: 'Our process includes discovery, strategy, design, development, testing, and launch. We keep you involved at every step for feedback and approvals.'
  },
  {
    q: 'How many revisions do I get?',
    a: 'We include at least two rounds of revisions at each major stage (design and development) to ensure you love the final result.'
  },
  {
    q: 'What technologies do you use?',
    a: 'We use modern technologies like React, TypeScript, Next.js, Tailwind CSS, and more. We choose the best stack for your project\'s needs.'
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes! We offer ongoing support, maintenance, and updates to keep your website running smoothly.'
  },
  {
    q: 'How do we get started?',
    a: 'Just contact us through the form or email, and we\'ll schedule a free consultation to discuss your project.'
  },
  {
    q: 'Do you provide hosting?',
    a: 'Yes! We can handle hosting, setup, and management for your website, or work with your preferred provider. Our managed hosting means you don\'t have to worry about technical details—just focus on your business.'
  }
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState(false);

  const handleExpandAll = () => {
    setExpandAll((prev) => !prev);
    setOpen(null); // collapse any single open if toggling all
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 rounded-full text-sm font-medium bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
          onClick={handleExpandAll}
        >
          {expandAll ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
      <motion.div
        className="divide-y divide-current/10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08
            }
          }
        }}
      >
        {faqs.map((faq, i) => {
          const isOpen = expandAll || open === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="w-full text-left py-6 focus:outline-none flex items-center justify-between group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
              >
                <span className="text-lg font-medium group-hover:underline transition-all">{faq.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  className="ml-4 text-2xl font-bold select-none"
                  transition={{ duration: 0.2 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="py-2 text-base opacity-80">
                      {typeof faq.a === 'string' ? faq.a : faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default FAQ; 
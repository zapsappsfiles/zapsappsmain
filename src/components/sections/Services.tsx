import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import gsap from 'gsap';

interface Service {
  id: number;
  title: string;
  description: string;
  index: string;
  tags: string[];
  detailedInfo: {
    bulletPoints: string[];
    process: string[];
    imageUrl?: string;
  };
}

const services: Service[] = [
  {
    id: 1,
    title: 'Web Design',
    description: 'We help brands create digital experiences that connect with their audience through thoughtfully crafted, responsive, and engaging web design.',
    index: '01',
    tags: ['UI/UX', 'Frontend', 'Animation', 'Responsive'],
    detailedInfo: {
      bulletPoints: [
        'Custom responsive websites that look great on all devices',
        'User-centered design approach for better engagement',
        'Interactive elements and smooth animations',
        'Fast-loading and performance-optimized sites'
      ],
      process: ['Discovery', 'Wireframing', 'Design', 'Development', 'Testing', 'Launch'],
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
    }
  },
  {
    id: 2,
    title: 'Branding',
    description: 'Build a memorable brand identity with our comprehensive branding services, from logo design and visual identity to brand strategy and guidelines.',
    index: '02',
    tags: ['Strategy', 'Visual Identity', 'Brand Guidelines', 'Market Research'],
    detailedInfo: {
      bulletPoints: [
        'Logo design and visual identity development',
        'Brand voice and messaging strategy',
        'Brand guidelines and style documentation',
        'Market positioning and competitive analysis'
      ],
      process: ['Research', 'Strategy', 'Concept', 'Refinement', 'Applications', 'Guidelines'],
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    }
  },
  {
    id: 3,
    title: 'Graphic Design',
    description: 'From digital illustrations to print materials, our graphic design services bring your ideas to life with creative and impactful visual solutions.',
    index: '03',
    tags: ['Illustration', 'Typography', 'Print', 'Digital'],
    detailedInfo: {
      bulletPoints: [
        'Digital and print illustration',
        'Typography and layout design',
        'Marketing materials and promotional content',
        'Social media graphics and digital assets'
      ],
      process: ['Brief', 'Concepts', 'Design', 'Feedback', 'Refinement', 'Delivery'],
      imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80'
    }
  },
  {
    id: 4,
    title: 'SEO Optimization',
    description: 'Improve your website\'s visibility and ranking on search engines through our comprehensive SEO services, driving more organic traffic to your business.',
    index: '04',
    tags: ['Keyword Research', 'On-Page SEO', 'Content Strategy', 'Analytics'],
    detailedInfo: {
      bulletPoints: [
        'Comprehensive keyword research and analysis',
        'On-page SEO optimization and technical audits',
        'Content strategy development for search visibility',
        'Performance tracking and continuous improvement'
      ],
      process: ['Audit', 'Research', 'Implementation', 'Content', 'Monitoring', 'Reporting'],
      imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'
    }
  }
];

const Services: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Text parallax effect
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const descriptionY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  
  // Initialize GSAP animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const serviceItems = document.querySelectorAll('.service-item');
    gsap.fromTo(
      serviceItems, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        }
      }
    );
  }, []);
  
  // Handle service hover
  const handleServiceHover = (id: number) => {
    setActiveService(id);
  };
  
  // Handle service leave
  const handleServiceLeave = () => {
    setActiveService(null);
  };

  // Handle service click
  const handleServiceClick = (id: number) => {
    if (expandedService === id) {
      setExpandedService(null);
    } else {
      setExpandedService(id);
    }
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className={`min-h-screen py-24 md:py-32 overflow-hidden ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Background glow effect for expanded service */}
      <AnimatePresence>
        {expandedService !== null && (
        <motion.div
            className={`fixed inset-0 z-0 pointer-events-none ${
              darkMode 
                ? 'bg-blue-900/[0.02]' 
                : 'bg-blue-100/[0.08]'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start">
          {/* Section heading */}
          <div className="flex items-start lg:w-1/3 mb-16 lg:mb-0 lg:sticky lg:top-32 z-10">
            <motion.div style={{ y: titleY }}>
              <div className="flex items-center mb-6">
                <span className="text-xl opacity-50 mr-4">02</span>
                <div className={`w-12 h-px ${darkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
              </div>
              <motion.h2 
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Our
                <br />
                Services
              </motion.h2>
              <motion.p 
                className="text-lg max-w-sm opacity-70"
                style={{ y: descriptionY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                We offer a range of design and development services to help your business stand out in the digital landscape.
              </motion.p>
        </motion.div>
          </div>
          
          {/* Services list */}
          <div className="lg:w-2/3 lg:pl-12">
            <div className="space-y-20 mt-6">
          {services.map((service) => (
            <motion.div
                  key={service.id}
                  className={`service-item ${
                    expandedService === service.id 
                      ? darkMode 
                        ? 'relative z-10'
                        : 'relative z-10' 
                      : ''
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  onMouseEnter={() => handleServiceHover(service.id)}
                  onMouseLeave={handleServiceLeave}
                >
                  <motion.div 
                    className={`cursor-pointer border-t ${darkMode ? 'border-white/10' : 'border-black/10'} pt-10 pb-8 relative group`}
                    whileHover={{ x: 20 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleServiceClick(service.id)}
                  >
                    <span className="text-sm opacity-50 mb-2 block">
                      {service.index}
                    </span>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6 md:mb-0">
                        {service.title}
                        <motion.span 
                          className="ml-2 inline-block text-base align-middle opacity-50"
                          animate={{ 
                            rotate: expandedService === service.id ? 180 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {expandedService === service.id ? '−' : '+'}
                        </motion.span>
                      </h3>
                      
                      <motion.span 
                        className={`hidden md:inline-block ${darkMode ? 'text-white/50' : 'text-black/50'}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: activeService === service.id ? 1 : 0,
                          x: activeService === service.id ? 0 : -10
                        }}
              transition={{ duration: 0.3 }}
            >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
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
                      </motion.span>
                </div>
                
                    <div className="mt-6">
                      <p className={`text-lg max-w-xl ${darkMode ? 'text-white/70' : 'text-black/70'}`}>
                        {service.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-6">
                        {service.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className={`inline-block px-3 py-1 text-xs rounded-full ${
                              darkMode 
                                ? 'bg-white/10' 
                                : 'bg-black/5'
                            }`}
                          >
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
        </motion.div>
        
                  {/* Expanded service detail card */}
                  <AnimatePresence>
                    {expandedService === service.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`mt-4 mb-8 rounded-xl overflow-hidden border-t ${
                          darkMode 
                            ? 'bg-transparent border-white/10' 
                            : 'bg-transparent border-black/10'
                        }`}
                      >
                        <div className="pt-8">
                          <div className="flex flex-col md:flex-row gap-8">
                            {/* Left column - Image */}
                            {service.detailedInfo.imageUrl && (
          <motion.div
                                className="md:w-1/2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                              >
                                <div className="rounded-xl overflow-hidden">
                                  <img 
                                    src={`https://picsum.photos/600/400?random=${service.id}`}
                                    alt={`${service.title} service placeholder`}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </div>
          </motion.div>
                            )}
          
                            {/* Right column - Content */}
          <motion.div
                              className="md:w-1/2"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3, duration: 0.4 }}
                            >
                              <h4 className="text-2xl font-medium mb-4 tracking-tight">What we offer</h4>
                              <ul className="space-y-2 mb-8">
                                {service.detailedInfo.bulletPoints.map((point, idx) => (
                                  <motion.li 
                                    key={idx} 
                                    className="flex items-start"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (idx * 0.1), duration: 0.3 }}
                                  >
                                    <span className={`mr-2 mt-1 flex-shrink-0 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </span>
                                    <span className="opacity-80">{point}</span>
                                  </motion.li>
                                ))}
                              </ul>
                              
                              <h4 className="text-2xl font-medium mb-4 tracking-tight">Our Process</h4>
                              <div className="flex flex-wrap gap-3 mb-6">
                                {service.detailedInfo.process.map((step, idx) => (
              <motion.div
                key={idx}
                                    className={`px-4 py-2 ${
                                      darkMode 
                                        ? 'border-b border-white/10' 
                                        : 'border-b border-black/10'
                                    }`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (idx * 0.1), duration: 0.3 }}
                                  >
                                    <span className="text-sm font-medium mr-2 opacity-50">{idx + 1}.</span>
                                    <span>{step}</span>
              </motion.div>
            ))}
                              </div>
                              
                              <motion.button
                                className={`inline-flex items-center px-5 py-2 rounded-full text-sm mt-4 ${
                                  darkMode 
                                    ? 'bg-white text-black hover:bg-white/90' 
                                    : 'bg-black text-white hover:bg-black/90'
                                } transition-colors`}
                                whileHover={{ scale: 1.05 }}
                                transition={{ 
                                  duration: 0.2,
                                  delay: 0.6,
                                  when: "beforeChildren"
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                Request a Quote
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"
                                  className="ml-2"
                                >
                                  <path d="M5 12h14"></path>
                                  <path d="m12 5 7 7-7 7"></path>
                                </svg>
                              </motion.button>
          </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
        </div>
        
            {/* CTA */}
        <motion.div
              className="mt-20 pt-10 border-t border-current/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
              transition={{ duration: 0.8 }}
        >
          <motion.a
            href="#contact"
                className={`inline-flex items-center px-8 py-4 rounded-full text-lg ${
                  darkMode 
                    ? 'bg-white text-black hover:bg-white/90' 
                    : 'bg-black text-white hover:bg-black/90'
                } transition-colors`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Discuss Your Project
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
                  className="ml-2"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
          </motion.a>
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 
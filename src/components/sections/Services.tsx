import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

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
    title: 'Development',
    description: 'Transform designs into high-performance, scalable websites using modern technologies and best practices for optimal user experience.',
    index: '03',
    tags: ['React', 'TypeScript', 'Performance', 'SEO'],
    detailedInfo: {
      bulletPoints: [
        'Modern React and TypeScript development',
        'Performance optimization and SEO best practices',
        'Responsive and accessible code implementation',
        'Content management system integration'
      ],
      process: ['Planning', 'Architecture', 'Development', 'Testing', 'Optimization', 'Deployment'],
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    }
  },
  {
    id: 4,
    title: 'SEO & Analytics',
    description: 'Boost your online visibility and track performance with comprehensive SEO optimization and analytics implementation.',
    index: '04',
    tags: ['SEO', 'Analytics', 'Performance', 'Growth'],
    detailedInfo: {
      bulletPoints: [
        'Technical SEO optimization and site speed improvements',
        'Content strategy and keyword optimization',
        'Analytics setup and performance tracking',
        'Regular reporting and optimization recommendations'
      ],
      process: ['Audit', 'Strategy', 'Implementation', 'Monitoring', 'Reporting', 'Optimization'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    }
  }
];

const Services: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesListRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  
  // Separate refs for better animation control
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });
  const isServicesInView = useInView(servicesListRef, { once: true, margin: "-100px" });
  
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

  // Header animation variants
  const headerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const headerItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Services list animation variants
  const servicesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const serviceItemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className={`section-padding ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="container-main">
        <div className="grid-2-col items-start">
          {/* Section heading */}
          <div className="lg:sticky lg:top-32 z-10">
            <motion.div 
              ref={headerRef}
              initial="hidden"
              animate={isHeaderInView ? "visible" : "hidden"}
              variants={headerContainerVariants}
            >
              <motion.div 
                className="flex items-center mb-6"
                variants={headerItemVariants}
              >
                <span className="text-caption opacity-50 font-mono mr-4">02</span>
                <div className={`w-8 md:w-12 h-px ${darkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
              </motion.div>
              <motion.h2 
                className="text-section font-bold tracking-tighter mb-6 md:mb-8 leading-[0.9] break-words"
                variants={headerItemVariants}
              >
                Our
                <br />
                Services
              </motion.h2>
              <motion.p 
                className="text-body max-w-sm opacity-70 leading-relaxed"
                variants={headerItemVariants}
              >
                We offer a range of design and development services to help your business stand out in the digital landscape.
              </motion.p>
            </motion.div>
          </div>
          
          {/* Services list */}
          <div>
            <motion.div 
              ref={servicesListRef}
              className="space-y-4 md:space-y-6"
              initial="hidden"
              animate={isServicesInView ? "visible" : "hidden"}
              variants={servicesContainerVariants}
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  activeService={activeService}
                  expandedService={expandedService}
                  onHover={handleServiceHover}
                  onLeave={handleServiceLeave}
                  onClick={handleServiceClick}
                  darkMode={darkMode}
                  isInView={isServicesInView}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Separate ServiceCard component for better organization
interface ServiceCardProps {
  service: Service;
  index: number;
  activeService: number | null;
  expandedService: number | null;
  onHover: (id: number) => void;
  onLeave: () => void;
  onClick: (id: number) => void;
  darkMode: boolean;
  isInView: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  activeService,
  expandedService,
  onHover,
  onLeave,
  onClick,
  darkMode,
  isInView
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-50px" });

  const serviceItemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative border-b transition-all duration-300 ${
        darkMode ? 'border-white/10 hover:border-white/30' : 'border-black/10 hover:border-black/30'
      }`}
      initial="hidden"
      animate={isCardInView ? "visible" : "hidden"}
      variants={serviceItemVariants}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={onLeave}
      onClick={() => onClick(service.id)}
    >
      <motion.div
        className="py-6 md:py-8 cursor-pointer"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start justify-between gap-4 md:gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 md:mb-4">
              <span className="text-caption opacity-50 font-mono flex-shrink-0">
                {service.index}
              </span>
              <h3 className="text-section font-bold tracking-tight break-words">
                {service.title}
              </h3>
            </div>
            
            <p className="text-body-sm opacity-70 leading-relaxed mb-4 pr-4">
              {service.description}
            </p>
            
            {/* Tags */}
            <motion.div 
              className="flex flex-wrap gap-elements"
              initial={{ opacity: 0 }}
              animate={isCardInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              {service.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tagIndex}
                  className={`px-3 py-1 rounded-full text-caption font-medium ${
                    darkMode 
                      ? 'bg-white/10 text-white/80' 
                      : 'bg-black/5 text-black/80'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isCardInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.4 + index * 0.1 + tagIndex * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
          
          {/* Arrow indicator */}
          <motion.div 
            className="flex-shrink-0 mt-2"
            animate={{ 
              rotate: expandedService === service.id ? 45 : 0,
              scale: activeService === service.id ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <svg 
              className="w-5 h-5 md:w-6 md:h-6 opacity-50"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Expanded content */}
      <AnimatePresence>
        {expandedService === service.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 md:pb-8 pt-2 border-t border-current/10">
              <div className="grid-2-col mt-4 md:mt-6">
                {/* Bullet points */}
                <div>
                  <h4 className="text-body-sm font-semibold mb-3 md:mb-4 opacity-90">
                    What we deliver:
                  </h4>
                  <ul className="space-y-2">
                    {service.detailedInfo.bulletPoints.map((point, pointIndex) => (
                      <motion.li
                        key={pointIndex}
                        className="text-caption opacity-70 flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: pointIndex * 0.1, duration: 0.3 }}
                      >
                        <span className="w-1 h-1 rounded-full bg-current opacity-50 mt-2 flex-shrink-0"></span>
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                {/* Process */}
                <div>
                  <h4 className="text-body-sm font-semibold mb-3 md:mb-4 opacity-90">
                    Our process:
                  </h4>
                  <div className="flex flex-wrap gap-elements">
                    {service.detailedInfo.process.map((step, stepIndex) => (
                      <motion.span
                        key={stepIndex}
                        className={`px-3 py-1.5 rounded-full text-caption font-medium ${
                          darkMode 
                            ? 'bg-white/15 text-white/90' 
                            : 'bg-black/10 text-black/90'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: stepIndex * 0.05, duration: 0.3 }}
                      >
                        {stepIndex + 1}. {step}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Services; 
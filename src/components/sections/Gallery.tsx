import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Gallery items with improved metadata and colorful real project examples
const galleryItems = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'Web Development',
    description: 'A modern e-commerce solution with seamless checkout and inventory management.',
    image: 'https://picsum.photos/seed/ecommerce/1200/800',
    technologies: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'UI/UX',
    description: 'Intuitive mobile banking application focused on user experience and security.',
    image: 'https://picsum.photos/seed/banking/1200/800',
    technologies: ['React Native', 'TypeScript', 'Firebase'],
    link: '#',
    color: 'bg-purple-500'
  },
  {
    id: 3,
    title: 'AI-Powered Analytics',
    category: 'Data Science',
    description: 'Advanced analytics platform leveraging machine learning for business insights.',
    image: 'https://picsum.photos/seed/analytics/1200/800',
    technologies: ['Python', 'TensorFlow', 'AWS'],
    link: '#',
    color: 'bg-green-500'
  },
  {
    id: 4,
    title: 'Healthcare Portal',
    category: 'Web Development',
    description: 'Comprehensive healthcare management system for patients and providers.',
    image: 'https://picsum.photos/seed/healthcare/1200/800',
    technologies: ['Vue.js', 'Django', 'PostgreSQL'],
    link: '#',
    color: 'bg-red-500'
  },
  {
    id: 5,
    title: 'Smart Home Dashboard',
    category: 'IoT',
    description: 'Centralized dashboard for managing connected home devices and automation.',
    image: 'https://picsum.photos/seed/smarthome/1200/800',
    technologies: ['React', 'Node.js', 'MQTT'],
    link: '#',
    color: 'bg-yellow-500'
  },
  {
    id: 6,
    title: 'Social Learning Platform',
    category: 'Education',
    description: 'Interactive platform connecting students and educators worldwide.',
    image: 'https://picsum.photos/seed/education/1200/800',
    technologies: ['Next.js', 'GraphQL', 'MongoDB'],
    link: '#',
    color: 'bg-indigo-500'
  }
];

const categories = ['All', 'Web Development', 'UI/UX', 'Data Science', 'IoT', 'Education'];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoverState, setHoverState] = useState<{[key: number]: boolean}>({});
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredProjects = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  // Handle escape key for modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle hover state
  const handleHover = (id: number, isHovering: boolean) => {
    setHoverState(prev => ({...prev, [id]: isHovering}));
  };

  useEffect(() => {
    if (cardsRef.current) {
      gsap.utils.toArray<HTMLElement>(cardsRef.current.querySelectorAll('.gallery-card')).forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [filteredProjects]);

  return (
    <motion.section
      id="gallery"
      className="py-24 bg-paper dark:bg-dark relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
      ref={galleryRef}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent/80 dark:text-white/70">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6 text-ink dark:text-white">
            Featured Projects
          </h2>
          <p className="text-accent/70 dark:text-white/60 text-lg">
            Explore our latest work and see how we help businesses transform their digital presence.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent text-white shadow-md dark:bg-white dark:text-dark'
                  : 'bg-accent/5 text-accent hover:bg-accent/10 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/20'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={cardsRef}>
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                className="gallery-card relative group cursor-pointer overflow-hidden rounded-md shadow-md bg-white dark:bg-dark/80"
                onMouseEnter={() => handleHover(project.id, true)}
                onMouseLeave={() => handleHover(project.id, false)}
                onClick={() => setSelectedProject(project.id)}
                style={{
                  // Using staggered height for visual interest
                  height: index % 3 === 0 ? '380px' : index % 3 === 1 ? '340px' : '360px'
                }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{ 
                      scale: hoverState[project.id] ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <motion.div 
                  className={`absolute inset-0 ${project.color}/80 dark:bg-white/10`}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoverState[project.id] ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white dark:text-white">
                    <h3 className="text-xl font-serif mb-2">{project.title}</h3>
                    <p className="text-white mb-3 text-sm line-clamp-2 dark:text-white/90">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-white/20 text-white rounded-sm dark:bg-white/30 dark:text-dark"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 dark:bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="relative max-w-4xl w-full bg-paper dark:bg-dark rounded-md overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-accent/70 bg-white/80 hover:opacity-80 z-10 w-8 h-8 flex items-center justify-center rounded-full dark:bg-dark dark:text-white"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                {(() => {
                  const project = galleryItems.find(p => p.id === selectedProject);
                  if (!project) return null;

                  return (
                    <motion.div 
                      className="grid md:grid-cols-5 h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="md:col-span-2 h-full overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.05 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="p-6 md:p-8 md:col-span-3">
                        <div>
                          <span className="font-mono text-xs uppercase tracking-wider text-accent/80 bg-accent/5 px-3 py-1 inline-block dark:text-white dark:bg-white/10">
                            {project.category}
                          </span>
                          <h3 className="text-2xl font-serif mt-4 mb-2 text-ink dark:text-white">
                            {project.title}
                          </h3>
                          <p className="text-accent/80 dark:text-white/80 mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, i) => (
                              <span 
                                key={i}
                                className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-accent/10 text-accent rounded-sm dark:bg-white/20 dark:text-white"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <a href={project.link} className="inline-block mt-2 text-xs font-mono uppercase tracking-wider text-accent hover:underline dark:text-white/80">
                            View Project
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Gallery; 
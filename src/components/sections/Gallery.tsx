import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Gallery items with improved metadata and colorful real project examples
const galleryItems = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'Web Development',
    description: 'A modern e-commerce solution with seamless checkout and inventory management.',
    image: `https://picsum.photos/600/400?random=${1}`,
    technologies: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'UI/UX',
    description: 'Intuitive mobile banking application focused on user experience and security.',
    image: `https://picsum.photos/600/400?random=${2}`,
    technologies: ['React Native', 'TypeScript', 'Firebase'],
    link: '#',
    color: 'bg-purple-500'
  },
  {
    id: 3,
    title: 'AI-Powered Analytics',
    category: 'Data Science',
    description: 'Advanced analytics platform leveraging machine learning for business insights.',
    image: `https://picsum.photos/600/400?random=${3}`,
    technologies: ['Python', 'TensorFlow', 'AWS'],
    link: '#',
    color: 'bg-green-500'
  },
  {
    id: 4,
    title: 'Healthcare Portal',
    category: 'Web Development',
    description: 'Comprehensive healthcare management system for patients and providers.',
    image: `https://picsum.photos/600/400?random=${4}`,
    technologies: ['Vue.js', 'Django', 'PostgreSQL'],
    link: '#',
    color: 'bg-red-500'
  },
  {
    id: 5,
    title: 'Smart Home Dashboard',
    category: 'IoT',
    description: 'Centralized dashboard for managing connected home devices and automation.',
    image: `https://picsum.photos/600/400?random=${5}`,
    technologies: ['React', 'Node.js', 'MQTT'],
    link: '#',
    color: 'bg-yellow-500'
  },
  {
    id: 6,
    title: 'Social Learning Platform',
    category: 'Education',
    description: 'Interactive platform connecting students and educators worldwide.',
    image: `https://picsum.photos/600/400?random=${6}`,
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
  const [isAnimating, setIsAnimating] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  
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

  // Handle category change with animation lock
  const handleCategoryChange = (category: string) => {
    if (isAnimating || category === selectedCategory) return;
    
    setIsAnimating(true);
    setSelectedCategory(category);
    
    // Release animation lock after transition completes
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.4
      } 
    },
    exit: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.3,
        when: "afterChildren"
      } 
    }
  };

  // Fade up animation for gallery items
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.165, 0.84, 0.44, 1]
      }
    },
    exit: { 
      opacity: 0,
      y: 20,
      transition: { 
        duration: 0.4
      } 
    }
  };

  return (
    <section
      id="gallery"
      className="py-24 bg-paper dark:bg-dark relative overflow-hidden"
      ref={galleryRef}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent/80 dark:text-white/70 inline-block mb-2">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-ink dark:text-white">
            Featured Projects
          </h2>
          <p className="text-accent/70 dark:text-white/60 max-w-xl mx-auto">
            Explore our latest work and see how we help businesses transform their digital presence.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 rounded-md ${
                selectedCategory === category
                  ? 'bg-accent text-white dark:bg-white dark:text-dark'
                  : 'bg-accent/5 text-accent hover:bg-accent/10 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/20'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="overflow-hidden rounded-md bg-white dark:bg-dark-surface border border-ink/5 dark:border-white/5 shadow-sm hover:shadow-md"
              onMouseEnter={() => handleHover(project.id, true)}
              onMouseLeave={() => handleHover(project.id, false)}
              onClick={() => setSelectedProject(project.id)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-video overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: hoverState[project.id] ? 1.05 : 1
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.165, 0.84, 0.44, 1]
                  }}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/600x400?text=Image+Unavailable';
                  }}
                />
                
                <motion.div 
                  className="absolute inset-0 bg-ink/50 flex flex-col justify-end p-6 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoverState[project.id] ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs uppercase tracking-wider font-mono mb-2">{project.category}</span>
                  <h3 className="text-xl font-serif mb-2">{project.title}</h3>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-xs py-1 px-2 bg-white/20 rounded-sm">{tech}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 dark:bg-black/90 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 40, opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.165, 0.84, 0.44, 1]
                }}
                className="relative max-w-5xl w-full bg-white dark:bg-dark-surface border border-ink/5 dark:border-white/5 rounded-xl overflow-hidden shadow-xl"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-accent/70 bg-white/80 hover:bg-white hover:text-accent z-10 w-10 h-10 flex items-center justify-center rounded-full dark:bg-dark-surface dark:text-white dark:hover:bg-white/20 transition-all duration-300"
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
                    <div className="grid md:grid-cols-5 h-full">
                      <div className="md:col-span-2 h-full overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.2, filter: 'brightness(0.8)' }}
                          animate={{ 
                            scale: 1, 
                            filter: 'brightness(1)',
                          }}
                          transition={{ 
                            duration: 0.6, 
                            ease: [0.165, 0.84, 0.44, 1]
                          }}
                          onError={e => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://placehold.co/600x400?text=Image+Unavailable';
                          }}
                        />
                      </div>
                      <div className="p-6 md:p-10 md:col-span-3">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.span 
                            className="font-mono text-xs uppercase tracking-wider text-accent/80 bg-accent/5 px-3 py-1 inline-block dark:text-white dark:bg-white/10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          >
                            {project.category}
                          </motion.span>
                          <motion.h3 
                            className="text-3xl font-serif mt-4 mb-4 text-ink dark:text-white"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          >
                            {project.title}
                          </motion.h3>
                          <motion.p 
                            className="text-accent/70 dark:text-white/60 mb-6 leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            {project.description}
                          </motion.p>
                          <motion.div 
                            className="flex flex-wrap gap-2 mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                          >
                            {project.technologies.map((tech, i) => (
                              <motion.span 
                                key={i}
                                className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 bg-accent/10 text-accent rounded-md dark:bg-white/20 dark:text-white"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 + (i * 0.05) }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                          >
                            <a 
                              href={project.link} 
                              className="inline-block px-5 py-3 bg-accent text-white font-mono text-xs uppercase tracking-wider rounded-md hover:bg-accent/90 transition-all duration-300 dark:bg-white dark:text-dark dark:hover:bg-white/90"
                            >
                              View Project
                            </a>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery; 
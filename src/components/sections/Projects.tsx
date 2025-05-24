import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface Project {
  id: number;
  title: string;
  category: string;
  tags: string[];
  image: string;
  hoverImage?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'FN GEO DRILLING',
    category: 'Web • Design • Development • 3D',
    tags: ['UI/UX', 'Frontend', 'React', 'Enterprise'],
    image: `https://picsum.photos/600/400?random=${1}`,
    hoverImage: `https://picsum.photos/600/400?random=${11}`
  },
  {
    id: 2,
    title: 'NEXUS ARCH',
    category: 'Concept • 3D Illustration • Mograph • Video',
    tags: ['Animation', 'Art Direction', 'Three.js', 'Framer Motion', 'Frontend', 'React'],
    image: `https://picsum.photos/600/400?random=${2}`,
    hoverImage: `https://picsum.photos/600/400?random=${12}`
  },
  {
    id: 3,
    title: 'FLOWER GIRL',
    category: 'Web • Design • Development • 3D',
    tags: ['Character Design', 'WebGL', '3D Animation', 'Portfolio', 'Framer Motion', 'React'],
    image: `https://picsum.photos/600/400?random=${3}`,
    hoverImage: `https://picsum.photos/600/400?random=${13}`
  },
  {
    id: 4,
    title: 'PORTFOLIO',
    category: 'Web • Design • Development • 3D',
    tags: ['VR/AR', 'Interactive', 'Spatial Computing', 'Portfolio', 'WebGL', '3D', 'Framer Motion', 'Photography', 'React'],
    image: `https://picsum.photos/600/400?random=${4}`,
    hoverImage: `https://picsum.photos/600/400?random=${14}`
  }
];

const Projects: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Handle project hover
  const handleProjectHover = (id: number) => {
    setActiveProject(id);
  };

  // Handle project leave
  const handleProjectLeave = () => {
    setActiveProject(null);
  };

  // Smooth animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Image animation variants
  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className={`section-padding ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-content">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div 
              className="flex items-center mb-6"
              variants={headerVariants}
            >
              <span className="text-caption opacity-50 mr-4 font-mono">03</span>
              <div className={`w-12 h-px ${darkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
            </motion.div>
            <motion.h2 
              className="text-display font-bold tracking-tighter mb-8 lg:mb-0 leading-none"
              variants={headerVariants}
            >
              PROJECTS
              <span className="text-section ml-6 opacity-70">0</span>
            </motion.h2>
          </motion.div>
          
          <motion.p 
            className="text-body opacity-70 max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our portfolio showcases a mix of projects. Hover over each project to see more details.
          </motion.p>
        </div>

        {/* Project Gallery */}
        <motion.div
          className="grid-2-col"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="flex flex-col mb-16"
              variants={itemVariants}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={handleProjectLeave}
            >
              {/* Enhanced Image Container with Smooth Animations */}
              <div className="relative overflow-hidden aspect-[4/3] mb-6 group bg-gray-100 dark:bg-gray-800 rounded-lg">
                <motion.div
                  className="w-full h-full relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Main Image with Smooth Entry Animation */}
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    loading="lazy"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/600x400?text=Image+Unavailable';
                    }}
                  />
                  
                  {/* Hover Image with Smooth Transition */}
                  {project.hoverImage && (
                    <motion.img 
                      src={project.hoverImage}
                      alt={`${project.title} hover`}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: activeProject === project.id ? 1 : 0
                      }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      loading="lazy"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://placehold.co/600x400?text=Image+Unavailable';
                      }}
                    />
                  )}
                  
                  {/* Smooth Overlay Animation */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: activeProject === project.id ? 1 : 0
                    }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-black/40"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: activeProject === project.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        darkMode ? 'bg-white' : 'bg-black'
                      } relative z-10`}
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ 
                        scale: activeProject === project.id ? 1 : 0,
                        rotate: activeProject === project.id ? 0 : -45
                      }}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.22, 1, 0.36, 1],
                        delay: activeProject === project.id ? 0.1 : 0
                      }}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke={darkMode ? 'black' : 'white'} 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Project Info with Enhanced Animations */}
              <div className="flex flex-col">
                <motion.span 
                  className="text-caption font-light mb-2 opacity-60"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  {project.category}
                </motion.span>
                
                <div className="group flex items-start justify-between">
                  <motion.h3 
                    className="text-section font-medium mb-2 group-hover:translate-x-2 transition-transform duration-300"
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 0.7, delay: 0.7 + index * 0.1 }}
                  >
                    <span className="inline-block">
                      {project.title}
                    </span>
                  </motion.h3>
                  
                  <motion.div 
                    className="hidden md:flex"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: activeProject === project.id ? 1 : 0,
                      x: activeProject === project.id ? 0 : -10 
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32" 
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transform -rotate-45"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </motion.div>
                </div>
                
                {/* Project Tags with Staggered Animation */}
                <motion.div 
                  className="flex flex-wrap gap-elements mt-3"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  {Array.from(new Set(project.tags.filter(tag => tag !== 'VR/AR' && tag !== 'Spatial Computing'))).map((tag, tagIndex) => (
                    <motion.span 
                      key={tagIndex}
                      className={`inline-block px-3 py-1 text-xs rounded-full ${
                        darkMode 
                          ? 'bg-white/10' 
                          : 'bg-black/5'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.9 + index * 0.1 + tagIndex * 0.05,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
                
        {/* View All Projects Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            className={`inline-flex items-center px-8 py-4 rounded-full text-body font-medium ${
              darkMode
                ? 'bg-white/5 text-white/60 border border-white/10'
                : 'bg-black/5 text-black/60 border border-black/10'
            } cursor-not-allowed`}
          >
            Coming Soon • More Projects
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 
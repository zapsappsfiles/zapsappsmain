import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    tags: ['Animation', 'Art Direction', 'Three.js', 'GSAP', 'Frontend', 'React'],
    image: `https://picsum.photos/600/400?random=${2}`,
    hoverImage: `https://picsum.photos/600/400?random=${12}`
  },
  {
    id: 3,
    title: 'FLOWER GIRL',
    category: 'Web • Design • Development • 3D',
    tags: ['Character Design', 'WebGL', '3D Animation', 'Portfolio', 'WebGL', '3D', 'GSAP', 'React'],
    image: `https://picsum.photos/600/400?random=${3}`,
    hoverImage: `https://picsum.photos/600/400?random=${13}`
  },
  {
    id: 4,
    title: 'PORTFOLIO',
    category: 'Web • Design • Development • 3D',
    tags: ['VR/AR', 'Interactive', 'Spatial Computing', 'Portfolio', 'WebGL', '3D', 'GSAP', 'Photography', 'React'],
    image: `https://picsum.photos/600/400?random=${4}`,
    hoverImage: `https://picsum.photos/600/400?random=${14}`
  }
];

const Projects: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect on header
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Handle project hover
  const handleProjectHover = (id: number) => {
    setActiveProject(id);
  };

  // Handle project leave
  const handleProjectLeave = () => {
    setActiveProject(null);
  };

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className={`py-32 md:py-40 overflow-hidden ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between">
          <motion.div style={{ y: titleY }}>
            <div className="flex items-center mb-6">
              <span className="text-xl opacity-50 mr-4">03</span>
              <div className={`w-12 h-px ${darkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
            </div>
            <motion.h2 
              ref={titleRef}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 md:mb-0 leading-none"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Projects
              <span className="text-5xl ml-6 opacity-70">0</span>
            </motion.h2>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#about" className="underline text-accent hover:text-accent-dark">About Us</a>
              <a href="#services" className="underline text-accent hover:text-accent-dark">Our Services</a>
              <a href="#contact" className="underline text-accent hover:text-accent-dark">Contact</a>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl opacity-70 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our portfolio showcases a mix of projects. Hover over each project to see more details.
          </motion.p>
        </div>

        {/* Project Gallery */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 }
            }
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="flex flex-col mb-16"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={handleProjectLeave}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6 group bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
        <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: 1 }}
                    loading="lazy"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/600x400?text=Image+Unavailable';
                    }}
                  />
                  
                  {project.hoverImage && (
                    <img 
                      src={project.hoverImage}
                      alt={`${project.title} hover`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                      style={{ 
                        opacity: activeProject === project.id ? 0.9 : 0
                      }}
                      loading="lazy"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://placehold.co/600x400?text=Image+Unavailable';
                      }}
                    />
                  )}
                  
                  {/* Add overlay to images on hover */}
                  {activeProject === project.id && (
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-300"></div>
                  )}

                  {/* Hover Overlay with Arrow Button */}
                  <div 
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                      activeProject === project.id 
                        ? 'opacity-100' 
                        : 'opacity-0'
                    }`}
                  >
                    <motion.div 
                      className={`w-20 h-20 rounded-full flex items-center justify-center ${
                        darkMode ? 'bg-white' : 'bg-black'
                      }`}
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ 
                        scale: activeProject === project.id ? 1 : 0,
                        rotate: activeProject === project.id ? 0 : -45
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="32" 
                        height="32" 
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
                  </div>
                </motion.div>
              </div>
              
              {/* Project Info */}
              <div className="flex flex-col">
                <span className="text-sm font-light mb-2 opacity-60">
                  {project.category}
                </span>
                <div className="group flex items-start justify-between">
                  <h3 className="text-2xl md:text-3xl font-medium mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="inline-block">
                      {project.title}
                    </span>
                  </h3>
                  <motion.div 
                    className="hidden md:flex"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: activeProject === project.id ? 1 : 0,
                      x: activeProject === project.id ? 0 : -10 
                    }}
                    transition={{ duration: 0.3 }}
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
                
                {/* Project Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {Array.from(new Set(project.tags.filter(tag => tag !== 'VR/AR' && tag !== 'Spatial Computing'))).map((tag, index) => (
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
          ))}
                </motion.div>
                
        {/* "View All Projects" button */}
        <div className="mt-20 text-center">
          <motion.a
            href="#"
            className={`inline-flex items-center justify-center px-8 py-4 rounded-full ${
              darkMode 
                ? 'bg-white text-black hover:bg-white/90' 
                : 'bg-black text-white hover:bg-black/90'
            } text-lg transition-colors`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
                  >
            View All Projects
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
                </div>
              </div>
    </section>
  );
};

export default Projects; 
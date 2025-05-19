import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced project data with more details
const projects = [
  {
    id: 1,
    title: 'Monochrome',
    category: 'Brand Identity',
    description: 'Minimalist black and white branding system for a luxury fashion label.',
    client: 'Noir Fashion',
    year: '2023',
    image: 'https://picsum.photos/seed/project1/800/600',
    images: [
      'https://picsum.photos/seed/project1-1/800/600',
      'https://picsum.photos/seed/project1-2/800/600',
      'https://picsum.photos/seed/project1-3/800/600'
    ]
  },
  {
    id: 2,
    title: 'Wireframe Kit',
    category: 'UI Design',
    description: 'Comprehensive wireframe kit with over 200 components for rapid prototyping.',
    client: 'DesignLab',
    year: '2023',
    image: 'https://picsum.photos/seed/project2/800/600',
    images: [
      'https://picsum.photos/seed/project2-1/800/600',
      'https://picsum.photos/seed/project2-2/800/600',
      'https://picsum.photos/seed/project2-3/800/600'
    ]
  },
  {
    id: 3,
    title: 'Minimal Shop',
    category: 'E-Commerce',
    description: 'Clean and functional e-commerce platform with focus on product photography.',
    client: 'Essence Store',
    year: '2022',
    image: 'https://picsum.photos/seed/project3/800/600',
    images: [
      'https://picsum.photos/seed/project3-1/800/600',
      'https://picsum.photos/seed/project3-2/800/600',
      'https://picsum.photos/seed/project3-3/800/600'
    ]
  },
  {
    id: 4,
    title: 'Typography Guide',
    category: 'Print Design',
    description: 'Comprehensive typography manual showcasing font pairings and hierarchies.',
    client: 'TypeFoundry',
    year: '2022',
    image: 'https://picsum.photos/seed/project4/800/600',
    images: [
      'https://picsum.photos/seed/project4-1/800/600',
      'https://picsum.photos/seed/project4-2/800/600',
      'https://picsum.photos/seed/project4-3/800/600'
    ]
  },
  {
    id: 5,
    title: 'Portfolio Site',
    category: 'Web Design',
    description: 'Personal portfolio for a photographer featuring immersive galleries.',
    client: 'Clara Vision',
    year: '2023',
    image: 'https://picsum.photos/seed/project5/800/600',
    images: [
      'https://picsum.photos/seed/project5-1/800/600',
      'https://picsum.photos/seed/project5-2/800/600',
      'https://picsum.photos/seed/project5-3/800/600'
    ]
  },
  {
    id: 6,
    title: 'Annual Report',
    category: 'Print Design',
    description: 'Award-winning annual report design with custom data visualizations.',
    client: 'Nexus Corp',
    year: '2022',
    image: 'https://picsum.photos/seed/project6/800/600',
    images: [
      'https://picsum.photos/seed/project6-1/800/600',
      'https://picsum.photos/seed/project6-2/800/600',
      'https://picsum.photos/seed/project6-3/800/600'
    ]
  },
];

// Categories for filter
const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'brand-identity', label: 'Brand Identity' },
  { id: 'ui-design', label: 'UI Design' },
  { id: 'e-commerce', label: 'E-Commerce' },
  { id: 'print-design', label: 'Print Design' },
  { id: 'web-design', label: 'Web Design' }
];

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category.toLowerCase().replace(' ', '-') === selectedCategory);

  // Handle project selection
  const handleProjectClick = (id: number) => {
    setSelectedProject(id);
    setActiveImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  // Close project modal
  const handleClose = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Get selected project
  const currentProject = selectedProject ? projects.find(p => p.id === selectedProject) : null;

  return (
    <motion.section
      id="projects"
      className="py-20 bg-light dark:bg-dark relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-accent inline-block mb-3 pb-1 border-b border-accent/30 dark:text-white dark:border-white/20">
              Our Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-ink dark:text-white">Selected Work</h2>
            <p className="text-accent/80 max-w-xl mx-auto dark:text-white/70">
              Explore our portfolio of minimalist designs that balance form and function.
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-10">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`mx-2 mb-3 font-mono text-xs uppercase tracking-widest pb-1 transition-all duration-300 relative ${
                selectedCategory === category.id 
                  ? 'text-ink dark:text-white' 
                  : 'text-accent/70 hover:text-ink dark:text-white/60 dark:hover:text-white'
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.label}
              {selectedCategory === category.id && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-px bg-accent dark:bg-white"
                  layoutId="categoryIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          layout
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer overflow-hidden bg-paper dark:bg-dark shadow-sm"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-paper dark:bg-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif text-ink dark:text-white">{project.title}</h3>
                    <span className="text-xs text-accent/70 dark:text-white/60">{project.year}</span>
                  </div>
                  <p className="text-sm text-accent/90 mb-3 dark:text-white/70">{project.client}</p>
                  <p className="text-xs uppercase tracking-wide font-mono text-accent dark:text-white/80">
                    {project.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if no items match the filter */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-accent dark:text-white/80">No projects found in this category.</p>
          </motion.div>
        )}

        {/* View All Projects Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button className="px-6 py-3 font-mono text-xs uppercase tracking-wider border border-ink hover:bg-ink hover:text-paper transition-colors duration-300">
            View All Projects
          </button>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject !== null && currentProject && (
          <motion.div 
            className="fixed inset-0 bg-dark/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="absolute top-4 right-4 text-paper/70 hover:text-paper transition-colors z-10"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            
            <div className="bg-paper max-w-5xl w-full rounded-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between mb-8">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-2">
                      {currentProject.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif mb-2">{currentProject.title}</h2>
                    <p className="text-accent/90">{currentProject.client} — {currentProject.year}</p>
                  </div>
                </div>
                
                {/* Main image */}
                <div className="mb-4 bg-light rounded-sm overflow-hidden">
                  <img 
                    src={activeImageIndex === 0 ? currentProject.image : currentProject.images[activeImageIndex - 1]} 
                    alt={`${currentProject.title} - View ${activeImageIndex + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {/* Thumbnail navigation */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  <div 
                    className={`cursor-pointer overflow-hidden border-2 ${activeImageIndex === 0 ? 'border-accent' : 'border-transparent'}`}
                    onClick={() => setActiveImageIndex(0)}
                  >
                    <img 
                      src={currentProject.image} 
                      alt={`${currentProject.title} - Main`}
                      className="w-full h-full object-cover aspect-square"
                    />
                  </div>
                  {currentProject.images.map((img, idx) => (
                    <div 
                      key={idx}
                      className={`cursor-pointer overflow-hidden border-2 ${activeImageIndex === idx + 1 ? 'border-accent' : 'border-transparent'}`}
                      onClick={() => setActiveImageIndex(idx + 1)}
                    >
                      <img 
                        src={img} 
                        alt={`${currentProject.title} - View ${idx + 1}`}
                        className="w-full h-full object-cover aspect-square"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-serif mb-3">About the Project</h3>
                  <p className="text-accent/80 mb-4">{currentProject.description}</p>
                </div>
                
                <div className="flex justify-between space-x-3">
                  <button
                    className="flex-1 px-3 py-2 border border-accent/30 text-accent font-mono text-xs uppercase tracking-wider flex items-center justify-center"
                    onClick={() => setSelectedProject(
                      selectedProject === 1 ? projects.length : selectedProject - 1
                    )}
                  >
                    <svg className="mr-2 w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                    Previous Project
                  </button>
                  
                  <button
                    className="flex-1 px-3 py-2 bg-accent text-paper font-mono text-xs uppercase tracking-wider flex items-center justify-center"
                    onClick={() => setSelectedProject(
                      selectedProject === projects.length ? 1 : selectedProject + 1
                    )}
                  >
                    Next Project
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Projects; 
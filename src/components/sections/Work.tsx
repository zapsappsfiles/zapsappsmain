import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  client: string;
  year: string;
}

const Work: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  // Project data - in real app this would be fetched from a backend
  const projects: Project[] = [
    {
      id: 1,
      title: 'Monochrome Branding',
      category: 'branding',
      image: `https://picsum.photos/600/400?random=${1}`,
      client: 'Minimal Co.',
      year: '2023'
    },
    {
      id: 2,
      title: 'Editorial Layout',
      category: 'print',
      image: `https://picsum.photos/600/400?random=${2}`,
      client: 'Paper Magazine',
      year: '2023'
    },
    {
      id: 3,
      title: 'Product Photography',
      category: 'photography',
      image: `https://picsum.photos/600/400?random=${3}`,
      client: 'Craft Goods',
      year: '2022'
    },
    {
      id: 4,
      title: 'Minimalist Website',
      category: 'web',
      image: `https://picsum.photos/600/400?random=${4}`,
      client: 'Studio Black',
      year: '2022'
    },
    {
      id: 5,
      title: 'Typography System',
      category: 'branding',
      image: `https://picsum.photos/600/400?random=${5}`,
      client: 'Type Press',
      year: '2021'
    },
    {
      id: 6,
      title: 'Print Collateral',
      category: 'print',
      image: `https://picsum.photos/600/400?random=${6}`,
      client: 'Paper Craft',
      year: '2021'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'branding', label: 'Branding' },
    { id: 'web', label: 'Web' },
    { id: 'print', label: 'Print' },
    { id: 'photography', label: 'Photography' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.165, 0.84, 0.44, 1] 
      } 
    }
  };

  return (
    <section id="work" className="py-24 bg-paper dark:bg-dark">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent/80 dark:text-white/70 inline-block mb-2">Our Work</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-ink dark:text-white">Selected Projects</h2>
          <p className="text-accent/70 dark:text-white/60 max-w-xl mx-auto">
            A collection of our most recent work across various disciplines,
            showcasing our minimalist approach to design.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12 border-b border-accent/10 dark:border-white/10 pb-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`mr-6 mb-4 font-mono text-xs uppercase tracking-widest pb-2 border-b transition-colors ${
                selectedCategory === category.id
                  ? 'border-accent text-accent dark:border-white dark:text-white'
                  : 'border-transparent text-accent/60 hover:text-accent dark:text-white/60 dark:hover:text-white'
              }`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          layout
        >
          <AnimatePresence>
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.95 }}
                onMouseEnter={() => setHoveredItem(project.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="overflow-hidden rounded-md bg-white dark:bg-dark-surface border border-ink/5 dark:border-white/5 shadow-sm hover:shadow-md group cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: hoveredItem === project.id ? 1.05 : 1
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
                    className="absolute inset-0 bg-ink/50 flex flex-col justify-end p-6"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredItem === project.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-xs uppercase tracking-wider font-mono text-white/80 mb-2">
                      {project.client} — {project.year}
                    </span>
                    <h3 className="font-serif text-lg text-white">{project.title}</h3>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Work; 
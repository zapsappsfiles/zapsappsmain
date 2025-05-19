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
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  // Project data - in real app this would be fetched from a backend
  const projects: Project[] = [
    {
      id: 1,
      title: 'Monochrome Branding',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1541185934-01b600ea069c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      client: 'Minimal Co.',
      year: '2023'
    },
    {
      id: 2,
      title: 'Editorial Layout',
      category: 'print',
      image: 'https://images.unsplash.com/photo-1544358315-541fa86514b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      client: 'Paper Magazine',
      year: '2023'
    },
    {
      id: 3,
      title: 'Product Photography',
      category: 'photography',
      image: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      client: 'Craft Goods',
      year: '2022'
    },
    {
      id: 4,
      title: 'Minimalist Website',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      client: 'Studio Black',
      year: '2022'
    },
    {
      id: 5,
      title: 'Typography System',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1569721983011-a3db9ea048c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      client: 'Type Press',
      year: '2021'
    },
    {
      id: 6,
      title: 'Print Collateral',
      category: 'print',
      image: 'https://images.unsplash.com/photo-1557425893-550e4e57be1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
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

  return (
    <section id="work" className="py-24 bg-light border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mb-16">
          <span className="font-mono text-sm uppercase tracking-widest text-accent block mb-4">Our Work</span>
          <h2 className="heading">Selected projects</h2>
          <p className="text-accent max-w-lg">
            A collection of our most recent work across various disciplines,
            showcasing our minimalist approach to design.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap mb-12 border-b border-gray-200 pb-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`mr-6 mb-4 font-mono text-xs uppercase tracking-widest pb-2 border-b transition-colors ${
                selectedCategory === category.id
                  ? 'border-ink text-ink'
                  : 'border-transparent text-accent hover:text-ink'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedId(project.id)}
                className="paper-card aspect-square overflow-hidden cursor-pointer group"
              >
                <div className="relative h-full w-full">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300"></div>
                  
                  <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-paper p-4 shadow-paper">
                      <span className="text-accent text-xs font-mono mb-1 block">{project.client} — {project.year}</span>
                      <h3 className="font-serif text-lg">{project.title}</h3>
                    </div>
                  </div>
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
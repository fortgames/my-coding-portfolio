import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Play } from 'lucide-react';
import DemoModal from './DemoModal';
import ObjectDetectionDemo from './demos/ObjectDetectionDemo';
import NWPDSimulator from './demos/NWPDSimulator';
import MobileVendingSimulator from './demos/MobileVendingSimulator';

const projects = [
  {
    id: 'object-detection',
    title: 'Object Detection Model',
    description: 'Developed a detection model using TensorFlow and OpenCV, increasing object recognition accuracy through a CNN on preprocessed datasets.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
    tags: ['TensorFlow', 'OpenCV', 'Python', 'CNN'],
    github: 'https://github.com',
    demoType: 'interactive',
  },
  {
    id: 'mobile-vending',
    title: 'Mobile Vending App',
    description: 'Multi-user mobile vending application using Flutter and Firebase, incorporating real-time map integration and 4 payment gateways.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    tags: ['Flutter', 'Firebase', 'Dart', 'Maps API'],
    github: 'https://github.com',
    demoType: 'interactive',
  },
  {
    id: 'nwpd-taifa',
    title: 'NWPD Taifa Dashboard',
    description: 'Built a comprehensive task management dashboard for the Kenyan market with real-time updates and intuitive user interface.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    tags: ['React', 'Django', 'PostgreSQL', 'REST API'],
    github: 'https://github.com',
    demoType: 'interactive',
  },
];

export default function Projects() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const renderDemo = () => {
    switch (activeDemo) {
      case 'object-detection':
        return <ObjectDetectionDemo />;
      case 'nwpd-taifa':
        return <NWPDSimulator />;
      case 'mobile-vending':
        return <MobileVendingSimulator />;
      default:
        return null;
    }
  };

  const getDemoTitle = () => {
    const project = projects.find(p => p.id === activeDemo);
    return project ? `${project.title} - Live Demo` : 'Live Demo';
  };

  return (
    <section id="projects" className="section-padding bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block"
            >
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              Featured Projects
            </motion.h2>
          </div>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-medium text-white/60 hover:text-accent transition-colors flex items-center gap-2"
          >
            View all projects <ExternalLink size={16} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold uppercase tracking-wider text-accent">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">{project.title}</h3>
              <p className="text-white/60 leading-relaxed mb-8 flex-grow">{project.description}</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <button 
                  onClick={() => setActiveDemo(project.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all text-sm"
                >
                  <Play size={16} fill="currentColor" />
                  Live Demo
                </button>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-sm"
                >
                  <Github size={16} />
                  Source Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <DemoModal 
        isOpen={!!activeDemo} 
        onClose={() => setActiveDemo(null)} 
        title={getDemoTitle()}
      >
        {renderDemo()}
      </DemoModal>
    </section>
  );
}

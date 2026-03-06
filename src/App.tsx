import React from 'react';
import ShaderBackground from './components/ShaderBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="relative min-h-screen selection:bg-accent selection:text-white">
      <ShaderBackground />
      <Navbar />
      
      <main>
        <Hero />
        
        <section id="about" className="section-padding">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[40px] overflow-hidden border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
                  alt="George Mburu's Workspace" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 glass p-8 rounded-3xl hidden md:block">
                <div className="text-4xl font-bold text-accent">4+</div>
                <div className="text-sm text-white/60 font-medium">Years of Experience</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">About Me</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                Turning complex problems into <span className="text-white/40">elegant solutions.</span>
              </h2>
              <div className="space-y-6 text-lg text-white/60 leading-relaxed">
                <p>
                  I'm a Software Engineer with a strong foundation in full-stack web and mobile 
                  development, complemented by hands-on experience in machine learning and cloud computing.
                </p>
                <p>
                  I have a proven ability to deliver impactful solutions, including 
                  developing internal tools that improved operational efficiency and building AI-driven 
                  applications. I recently automated manual data processing tasks using Python scripts, 
                  saving 8 hours per week and increasing data processing speed by 15%.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-8 mt-12">
                <div>
                  <div className="text-2xl font-bold mb-1">BSc in Information Technology</div>
                  <div className="text-sm text-white/40 uppercase tracking-widest font-bold">Zetech University (2021 - Present)</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Skills />
        <Projects />
        
        <section id="experience" className="section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">Professional Journey</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Experience</h2>
            </div>
            
            <div className="space-y-12">
              {[
                {
                  role: 'Freelance Developer',
                  company: 'Self-Employed',
                  period: 'April 2025 - Present',
                  description: 'Developed custom web solutions for e-commerce platforms and small business websites, integrating SEO optimization and performance monitoring tools. Engineered and deployed 10+ responsive web applications using React, Node.js, and AWS.'
                },
                {
                  role: 'Software Developer Intern',
                  company: 'Internal Logistics Software',
                  period: 'May 2024 - October 2024',
                  description: 'Collaborated with senior developers to build internal tools with Laravel and React. Assisted in database optimization by writing efficient MySQL queries, reducing page load times. Established and maintained REST APIs for integrating logistics software with third-party providers.'
                }
              ].map((exp, i) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l border-white/10 group"
                >
                  <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-white/20 group-hover:bg-accent transition-colors" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <span className="text-sm font-mono text-accent">{exp.period}</span>
                  </div>
                  <div className="text-lg font-medium text-white/80 mb-4">{exp.company}</div>
                  <p className="text-white/60 leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <span>George Mburu {"</>"}</span>
          </div>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} George Mburu. Crafted with passion.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/gitbuh0-byte?tab=repositories" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/george-mburu-353913236/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

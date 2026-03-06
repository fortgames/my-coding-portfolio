import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code2, Cpu, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Available for new opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-gradient leading-[1.1]"
        >
          Crafting Digital <br />
          <span className="text-accent">Experiences</span> with Code
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          I'm a Software Engineer with a strong foundation in full-stack web and mobile 
          development, complemented by hands-on experience in machine learning and cloud computing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full flex items-center justify-center gap-2 hover:bg-white/90 transition-all group"
          >
            View My Work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all"
          >
            Let's Talk
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-3 gap-8 mt-24 max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <Code2 className="text-accent" size={24} />
            </div>
            <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Frontend</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <Cpu className="text-accent" size={24} />
            </div>
            <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Backend</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <Globe className="text-accent" size={24} />
            </div>
            <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Cloud</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

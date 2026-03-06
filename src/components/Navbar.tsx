import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter flex items-center gap-2"
        >
          <span className="hidden sm:inline">George Mburu {"</>"}</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="https://github.com/gitbuh0-byte?tab=repositories" target="_blank" rel="noreferrer" className="p-2 text-white/60 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/george-mburu-353913236/" target="_blank" rel="noreferrer" className="p-2 text-white/60 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 px-6 py-8 flex flex-col gap-6"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-lg font-medium text-white/80"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center gap-6 pt-4 border-t border-white/10">
            <a href="https://github.com/gitbuh0-byte?tab=repositories" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/george-mburu-353913236/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:mburugeorge692@gmail.com" className="text-white/60 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

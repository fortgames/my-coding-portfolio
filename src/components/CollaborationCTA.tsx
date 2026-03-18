import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function CollaborationCTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[40px] bg-accent p-12 md:p-20 text-center"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-black/10 text-black font-mono text-xs uppercase tracking-widest mb-8"
            >
              Let's Work Together
            </motion.span>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Have a project in mind? <br />
              <span className="text-black/40">Let's make it happen.</span>
            </h2>
            
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              I'm always looking for exciting new collaborations and challenges. 
              Whether you're a startup or an established company, I'd love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="https://wa.me/254711210541" 
                target="_blank" 
                rel="noreferrer"
                className="group w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all duration-300 shadow-xl shadow-black/5"
              >
                <MessageCircle size={24} />
                Chat on WhatsApp
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

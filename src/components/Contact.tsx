import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle2, AlertCircle, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        throw new Error(data.message || 'Submission failed');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-[40px] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 md:p-16 bg-accent flex flex-col justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Let's build something <br />
                <span className="text-black/30">extraordinary.</span>
              </h2>
              <p className="text-white/80 text-lg max-w-md mb-12">
                Whether you have a specific project in mind or just want to chat about 
                the latest tech, I'm always open to new connections.
              </p>
            </div>
            
            <div className="space-y-6">
              <a href="mailto:mburugeorge692@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white transition-colors">
                  <Mail className="text-white group-hover:text-accent transition-colors" size={20} />
                </div>
                <span className="text-xl font-medium text-white">mburugeorge692@gmail.com</span>
              </a>
              
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/gitbuh0-byte?tab=repositories" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white group transition-colors"
                >
                  <Github className="text-white group-hover:text-accent transition-colors" size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/george-mburu-353913236/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white group transition-colors"
                >
                  <Linkedin className="text-white group-hover:text-accent transition-colors" size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="p-12 md:p-16 bg-black/40">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-white/60">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-accent font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="John Doe"
                      className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors`}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                    <input
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="john@example.com"
                      className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors`}
                    />
                    {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.email}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Subject</label>
                  <input
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    type="text"
                    placeholder="Project Inquiry"
                    className={`w-full bg-white/5 border ${errors.subject ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors`}
                  />
                  {errors.subject && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.subject}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Message</label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={4}
                    className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors resize-none`}
                  />
                  {errors.message && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.message}</p>}
                </div>
                
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-4 rounded-xl">
                    <AlertCircle size={18} />
                    <span>Something went wrong. Please try again later.</span>
                  </div>
                )}

                <button 
                  disabled={status === 'submitting'}
                  className="w-full py-5 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/90 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

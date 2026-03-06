import React from 'react';
import { motion } from 'motion/react';
import { Database, Layout, Server, Terminal } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const skillData = [
  { subject: 'Web Dev', A: 95, fullMark: 100 },
  { subject: 'Mobile Dev', A: 90, fullMark: 100 },
  { subject: 'Machine Learning', A: 85, fullMark: 100 },
  { subject: 'Cloud', A: 80, fullMark: 100 },
  { subject: 'Database', A: 88, fullMark: 100 },
  { subject: 'UI/UX', A: 82, fullMark: 100 },
];

const skillCategories = [
  {
    title: 'Languages & Frameworks',
    icon: <Layout className="text-accent" />,
    skills: ['Python', 'JavaScript', 'Dart', 'PHP', 'React', 'Next.js', 'Flutter', 'Django', 'Flask', 'Laravel'],
  },
  {
    title: 'Machine Learning',
    icon: <Server className="text-accent" />,
    skills: ['TensorFlow', 'OpenCV', 'CNN', 'Data Preprocessing'],
  },
  {
    title: 'Databases & Tools',
    icon: <Database className="text-accent" />,
    skills: ['MySQL', 'PostgreSQL', 'Firebase', 'Supabase', 'Docker', 'Git', 'Postman'],
  },
  {
    title: 'Cloud Platforms',
    icon: <Terminal className="text-accent" />,
    skills: ['Google Cloud', 'Microsoft Azure', 'AWS'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block"
          >
            Technical Arsenal
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Skills & Expertise
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 aspect-square glass rounded-[40px] p-8 flex items-center justify-center"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#6366f1' }}
                />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillCategories.map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-3xl group hover:border-accent/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';
import { motion } from 'framer-motion';
import { ProjectCard } from '../ui/ProjectCard';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export const Projects = () => {
  const { locale } = useLanguage();
  const t = translations[locale].projects;

  const projects = [
    {
      ...t.items[0],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      github: 'https://github.com/Achrafel88',
      demo: '#'
    },
    {
      ...t.items[1],
      image: 'https://images.unsplash.com/photo-1599148400620-8e1ff0bf28d8?auto=format&fit=crop&q=80&w=800',
      github: 'https://github.com/Achrafel88',
      demo: '#'
    },
    {
      ...t.items[2],
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800',
      github: 'https://github.com/Achrafel88',
      demo: '#'
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4"
          >
            {t.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {t.title_part1} <span className="text-foreground/40 italic">{t.title_part2}</span>
          </motion.h2>
          <div className="w-24 h-[1px] bg-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

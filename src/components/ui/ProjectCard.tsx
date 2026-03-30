'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';
import React from 'react';

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
}

export const ProjectCard = ({ title, description, tags, image, github, demo }: ProjectProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative flex flex-col bg-background/50 backdrop-blur-xl rounded-[2.5rem] border border-foreground/5 overflow-hidden shadow-2xl h-full transition-all hover:border-primary/30"
    >
      {/* Project Image Container */}
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        {/* Corner Icon */}
        <div className="absolute top-6 right-6 p-3 rounded-2xl bg-background/80 backdrop-blur-md border border-foreground/10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all z-20">
          <Layers className="text-primary w-5 h-5" />
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 p-8 flex flex-col">
        <h3 className="text-2xl font-black mb-3 tracking-tighter group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
        
        <p className="text-foreground/60 dark:text-foreground/50 [data-theme='light']:text-indigo-950/70 mb-6 line-clamp-3 text-sm leading-relaxed font-medium">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[9px] font-black uppercase tracking-widest text-primary">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex gap-2">
            {demo && (
              <a
                href={demo}
                target="_blank"
                className="px-5 py-2.5 bg-primary text-foreground rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-primary/80 transition-all shadow-lg shadow-primary/10"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                className="p-2.5 bg-foreground/5 border border-foreground/5 text-foreground/50 rounded-xl hover:bg-foreground hover:text-background transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
          
          <div className="flex gap-1">
             <div className="w-1 h-1 rounded-full bg-primary/20" />
             <div className="w-1 h-1 rounded-full bg-primary/40" />
             <div className="w-1 h-1 rounded-full bg-primary/20" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

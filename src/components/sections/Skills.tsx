'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, BrainCircuit, Globe, Cpu, Layout, Layers, Terminal, BarChart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const skillIcons = [BrainCircuit, Terminal, Layout, Database, BarChart, Cpu];
const skillColors = ['#10b981', '#ec4899', '#6366f1', '#f59e0b', '#06b6d4', '#8b5cf6'];
const skillLevels = [95, 92, 90, 85, 88, 82];

export const Skills = () => {
  const { locale } = useLanguage();
  const t = translations[locale].skills;

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-foreground/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-8 text-center"
          >
            {t.title_part1} <span className="text-primary italic">{t.title_part2}</span>
          </motion.h2>
          <p className="text-foreground/60 max-w-xl text-center">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {t.categories.map((category: any, index: number) => {
            const Icon = skillIcons[index];
            const color = skillColors[index];
            const level = skillLevels[index];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-1 rounded-[2rem] md:rounded-[2.5rem] bg-foreground/5 hover:bg-gradient-to-br transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl"
                style={{ '--tw-gradient-from': `${color}10`, '--tw-gradient-to': `${color}30` } as any}
              >
                <div className="p-8 md:p-10 bg-background/90 backdrop-blur-xl rounded-[1.9rem] md:rounded-[2.4rem] h-full flex flex-col items-center relative overflow-hidden">
                  {/* Decorative Glow */}
                  <div 
                    className="absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: color }}
                  />

                  <div
                    className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-[360deg]"
                    style={{ backgroundColor: `${color}15`, color: color }}
                  >
                    <Icon className="w-8 h-8 md:w-12 md:h-12 drop-shadow-lg" />
                  </div>

                  <h3 className="text-xl md:text-3xl font-black mb-4 md:mb-6 text-center tracking-tighter uppercase">{category.name}</h3>
                  
                  {/* Skill Progress Ring or Bar */}
                  <div className="w-full mb-8 md:mb-10 relative">
                    <div className="flex justify-between items-end mb-2 md:mb-3">
                      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-foreground/40">Mastery Level</span>
                      <span className="text-xs md:text-sm font-black text-primary font-mono">{level}%</span>
                    </div>
                    <div className="w-full bg-foreground/5 h-2 md:h-3 rounded-full p-0.5 md:p-1 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full rounded-full relative"
                        style={{ backgroundColor: color }}
                      >
                        <motion.div 
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-white/30 blur-sm" 
                        />
                      </motion.div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2.5 justify-center mt-auto">
                    {category.items.map((item: string, i: number) => (
                      <span key={i} className="text-[10px] font-black text-foreground/50 uppercase tracking-[0.15em] px-4 py-2 bg-foreground/5 rounded-xl border border-transparent group-hover:border-foreground/10 group-hover:bg-background transition-all">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

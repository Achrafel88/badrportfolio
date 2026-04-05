'use client';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, FileDown } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface TimelineItem {
  date: string;
  title: string;
  subtitle: string;
  description: string;
}

export const About = () => {
  const { locale } = useLanguage();
  const t = translations[locale].about;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="about" ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Bio Side */}
          <div className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-bold mb-8 leading-tight"
            >
              {t.title_part1} <span className="text-primary italic underline decoration-wavy">{t.title_part2}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-foreground/60 mb-8 leading-relaxed"
            >
              {t.description}
            </motion.p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <StatCard label={t.stats.years} value="4+" />
              <StatCard label={t.stats.projects} value="25+" />
              <StatCard label={t.stats.success} value="98%" />
              <StatCard label={t.stats.accuracy} value="92%+" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-foreground/5"
            >
              <h4 className="text-sm font-mono text-primary font-bold uppercase tracking-widest mb-6">{t.certifications.title}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {t.certifications.items.map((cert: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 p-3 glass rounded-xl border border-foreground/5">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-[10px] text-foreground/60 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <a
                href="/bad.pdf"
                download
                className="w-fit px-8 py-4 bg-primary text-foreground rounded-full font-bold flex items-center gap-2 hover:bg-primary/80 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1"
              >
                {t.download_full_cv} <FileDown className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Timeline Side */}
          <div className="relative pl-8">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-0 top-0 w-1 h-full bg-linear-to-b from-primary via-secondary to-transparent rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            />
            
            <div className="space-y-16">
              {t.timeline.map((item: TimelineItem, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="absolute -left-11.25 top-0 p-3 bg-background border border-foreground/10 rounded-full group-hover:border-primary transition-colors text-foreground/50 group-hover:text-primary z-10">
                    <GraduationCap />
                  </div>
                  <div className="p-8 glass rounded-3xl border border-foreground/5 group-hover:border-foreground/20 transition-all">
                    <span className="text-xs font-mono text-primary font-bold tracking-widest">{item.date}</span>
                    <h3 className="text-2xl font-bold mt-2">{item.title}</h3>
                    <p className="text-foreground/40 mb-4">{item.subtitle}</p>
                    <p className="text-foreground/60 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  label: string;
  value: string;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="p-6 glass rounded-3xl border border-foreground/5 flex flex-col items-center">
    <span className="text-3xl font-black text-foreground">{value}</span>
    <span className="text-xs text-foreground/30 uppercase tracking-widest font-mono text-center mt-2">{label}</span>
  </div>
);

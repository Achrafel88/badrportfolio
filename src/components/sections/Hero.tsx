'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Smartphone, Globe, FileDown } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { NeuralNetwork } from '../ui/NeuralNetwork';

export const Hero = () => {
  const { locale } = useLanguage();
  const t = translations[locale].hero;

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-12">
      <NeuralNetwork />
      <div className="container mx-auto px-6 z-10 text-center flex flex-col items-center">
        {/* Profile Image - Optimized for Mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative mb-6 md:mb-12"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-[2rem] md:rounded-3xl overflow-hidden border-2 border-primary/20 bg-background/50 backdrop-blur-sm shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <Image 
              src="/me.png" 
              alt="Achraf El Hasnaoui" 
              width={224} 
              height={224}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
          </div>
          {/* Subtle accent corner */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-primary/50 rounded-br-2xl" />
          <div className="absolute -top-1 -left-1 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl" />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-primary font-mono text-[10px] md:text-xs tracking-widest uppercase"
        >
          {t.status}
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-4 text-foreground leading-[1.05]"
        >
          {t.title} <span className="text-primary italic block md:inline">{t.subtitle}</span>
        </motion.h1>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-2xl font-light mb-8 max-w-2xl text-muted px-2"
        >
          <span className="block text-primary font-bold mb-3 md:mb-4 tracking-tight leading-tight text-lg md:text-3xl">
            {t.tagline}
          </span>
          <span className="text-sm md:text-lg opacity-80">{t.description}</span>
          <span className="block text-[9px] md:text-sm text-primary/70 mt-5 md:mt-8 font-mono tracking-[0.2em] uppercase border border-primary/20 py-1.5 px-5 rounded-full w-fit mx-auto bg-primary/5">
            {t.licence}
          </span>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center sm:justify-center gap-3 md:gap-4 mb-10 w-full max-w-[280px] sm:max-w-none px-4"
        >
          <a
            href="#projects"
            className="w-full sm:w-fit px-6 py-4 bg-primary text-foreground rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-primary/80 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 text-xs md:text-base uppercase tracking-widest"
          >
            {t.view_projects} <ArrowRight className="w-4 h-4 md:w-5 md:h-5 rtl:rotate-180" />
          </a>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <a
              href="/Achraf_CV2.pdf"
              download
              className="flex-1 sm:flex-none px-4 md:px-8 py-4 glass text-foreground rounded-2xl font-bold border-foreground/10 hover:bg-foreground/10 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-xs md:text-base"
            >
               <FileDown className="w-4 h-4" /> {t.download_cv.split(' ')[1] || 'CV'}
            </a>
            <a
              href="https://wa.me/212604539887"
              target="_blank"
              className="flex-1 sm:flex-none px-4 md:px-8 py-4 glass text-foreground rounded-2xl font-bold border-foreground/10 hover:bg-foreground/10 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-xs md:text-base"
            >
               <Globe className="w-4 h-4" /> Hello
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex gap-6"
        >
          {[
            { icon: <Github />, href: "https://github.com/Achrafel88" },
            { icon: <Linkedin />, href: "https://www.linkedin.com/in/achraf-el-hasnaoui-3364a91b6/" },
            { icon: <Mail />, href: "mailto:aelhasnaoui88@gmail.com" },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              whileHover={{ y: -5, scale: 1.1 }}
              className="p-3 glass rounded-full text-foreground/70 hover:text-primary transition-colors border border-foreground/5"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-linear-to-b from-primary to-transparent" />
        <span className="text-[10px] text-muted uppercase tracking-[4px]">Scroll</span>
      </motion.div>
    </section>
  );
};

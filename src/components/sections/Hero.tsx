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
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-24">
      <NeuralNetwork />
      <div className="container mx-auto px-6 z-10 text-center flex flex-col items-center">
        {/* Profile Image - Static and Clean */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative mb-8"
        >
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-3xl overflow-hidden border border-foreground/10 bg-background/50 backdrop-blur-sm shadow-2xl">
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
          <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-primary/50 rounded-br-2xl" />
          <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl" />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 px-4 py-1 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-primary font-mono text-xs tracking-widest uppercase"
        >
          {t.status}
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black tracking-tight mb-4 text-foreground"
        >
          {t.title} <span className="text-primary italic">{t.subtitle}</span>
        </motion.h1>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl font-light mb-8 max-w-2xl text-muted"
        >
          <span className="block text-primary font-bold mb-4 tracking-tight leading-tight">
            {t.tagline}
          </span>
          {t.description}
          <span className="block text-sm text-primary/70 mt-3 font-mono tracking-widest uppercase">{t.licence}</span>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-primary text-foreground rounded-full font-bold flex items-center gap-2 hover:bg-primary/80 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1"
          >
            {t.view_projects} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </a>
          <a
            href="/Achraf_CV2.pdf"
            download
            className="px-8 py-4 glass text-foreground rounded-full font-bold border-foreground/20 hover:bg-foreground/10 transition-all hover:-translate-y-1 flex items-center gap-2"
          >
             {t.download_cv} <FileDown className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/212604539887"
            target="_blank"
            className="px-8 py-4 glass text-foreground rounded-full font-bold border-foreground/20 hover:bg-foreground/10 transition-all hover:-translate-y-1 flex items-center gap-2"
          >
             {t.say_hello} <Globe className="w-5 h-5" />
          </a>
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
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[10px] text-muted uppercase tracking-[4px]">Scroll</span>
      </motion.div>
    </section>
  );
};

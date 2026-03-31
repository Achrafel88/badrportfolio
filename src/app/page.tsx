'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { BrainCircuit, Github, Linkedin, Instagram, Mail } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { locale } = useLanguage();
  const t = translations[locale];

  useEffect(() => {
    // Artificial loading for that "Premium Initial Experience"
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <AnimatePresence>
        {loading ? (
          <LoadingScreen key="loading" locale={locale} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <CustomCursor />
            <Navbar />
            <div className="bg-grain" />
            
            <Hero />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Contact />
            
            <WhatsAppButton />
            <Footer locale={locale} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

const SectionDivider = () => (
  <div className="w-full flex justify-center py-12">
    <div className="w-24 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
  </div>
);

const LoadingScreen = ({ locale }: { locale: string }) => {
  const text = locale === 'ar' ? 'جاري التحميل...' : locale === 'fr' ? 'Initialisation...' : 'Initializing Intelligence...';
  const title = locale === 'ar' ? 'النواة العصبية' : 'Neural Core';

  return (
    <motion.div
      exit={{ y: -1000, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background text-foreground"
    >
      <div className="relative flex flex-col items-center">
        {/* Brain Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-12"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
              filter: ["drop-shadow(0 0 10px rgba(99, 102, 241, 0.4))", "drop-shadow(0 0 25px rgba(99, 102, 241, 0.8))", "drop-shadow(0 0 10px rgba(99, 102, 241, 0.4))"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center glass border border-primary/20"
          >
            <BrainCircuit className="w-20 h-20 md:w-28 md:h-28 text-primary" />
          </motion.div>
          {/* Synaptic Flash effects */}
          <motion.div
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black uppercase tracking-[0.3em] mb-4 text-primary"
        >
          {title}
        </motion.h2>
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-foreground/40 text-sm font-mono uppercase tracking-[0.5em]"
        >
          {text}
        </motion.p>
      </div>
    </motion.div>
  );
};

const Footer = ({ locale }: { locale: string }) => {
  const t = translations[locale];
  return (
    <footer className="pb-12 pt-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass rounded-[3rem] p-8 md:p-16 border-2 border-primary/80 shadow-[0_0_40px_rgba(99,102,241,0.3)] overflow-hidden group"
        >
          {/* Animated Flash/Glow Effect */}
          <motion.div
            animate={{
              left: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2
            }}
            className="absolute top-0 w-1/2 h-full bg-linear-to-r from-transparent via-primary/10 to-transparent -skew-x-12 pointer-events-none"
          />
          
          {/* Static Border Glow */}
          <div className="absolute inset-0 border-2 border-primary/20 rounded-[3rem] pointer-events-none" />

          {/* Animated Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 group-hover:bg-primary/20 transition-all duration-700" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <motion.h2 
                className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase"
                whileHover={{ scale: 1.02 }}
              >
                Achraf <span className="text-primary italic">El Hasnaoui</span>
              </motion.h2>
              <p className="text-foreground/50 text-lg md:text-xl leading-relaxed max-w-md">
                {t.hero.tagline}
              </p>
              
              <div className="flex gap-4 mt-10">
                <FooterSocial icon={<Github />} href="https://github.com/Achrafel88" />
                <FooterSocial icon={<Linkedin />} href="https://www.linkedin.com/in/achraf-el-hasnaoui-3364a91b6/" />
                <FooterSocial icon={<Instagram />} href="https://www.instagram.com/ae_deve/" />
                <FooterSocial icon={<Mail />} href="mailto:aelhasnaoui88@gmail.com" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:gap-16">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8 underline decoration-primary/30 underline-offset-8">Navigation</h4>
                <ul className="space-y-4">
                  {['hero', 'about', 'projects', 'skills', 'contact'].map((item) => (
                    <li key={item}>
                      <a href={`#${item}`} className="text-sm text-foreground/40 hover:text-primary transition-all hover:pl-2 capitalize inline-block">
                        {t.nav[item]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8 underline decoration-primary/30 underline-offset-8">Status</h4>
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Available for Hire</p>
                  <p className="text-xs text-foreground/60 leading-relaxed">Open to new opportunities in AI & Web Engineering.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-12 border-t border-foreground/5 flex flex-col items-center gap-8 text-center">
            <p className="text-[10px] text-foreground/20 font-black uppercase tracking-[0.6em]">
              {t.footer}
            </p>
            <div className="flex gap-4">
               <div className="w-1.5 h-1.5 rounded-full bg-primary/10 animate-pulse" />
               <div className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse delay-75" />
               <div className="w-1.5 h-1.5 rounded-full bg-primary/10 animate-pulse delay-150" />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

const FooterSocial = ({ icon, href }: any) => (
  <motion.a
    href={href}
    target="_blank"
    whileHover={{ y: -5, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="p-4 rounded-2xl bg-foreground/5 border border-foreground/5 hover:border-primary/20 text-foreground/40 hover:text-primary transition-all shadow-sm backdrop-blur-sm"
  >
    {icon}
  </motion.a>
);

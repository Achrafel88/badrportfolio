'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail, Globe } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export const Navbar = () => {
  const { locale, setLocale, dir } = useLanguage();
  const t = translations[locale].nav;
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', icon: <Home className="w-5 h-5" />, label: t.hero, href: '#hero' },
    { id: 'about', icon: <User className="w-5 h-5" />, label: t.about, href: '#about' },
    { id: 'projects', icon: <Briefcase className="w-5 h-5" />, label: t.projects, href: '#projects' },
    { id: 'skills', icon: <Code className="w-5 h-5" />, label: t.skills, href: '#skills' },
    { id: 'contact', icon: <Mail className="w-5 h-5" />, label: t.contact, href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1, ease: 'backOut' }}
      className="fixed bottom-6 md:bottom-auto md:top-8 left-1/2 -translate-x-1/2 z-50 px-3 md:px-6 py-2 md:py-4 glass rounded-full flex items-center gap-2 md:gap-8 border-primary/20 shadow-2xl bg-background/50 backdrop-blur-2xl w-max max-w-[calc(100vw-32px)] justify-between md:justify-start"
    >
      <div className="flex items-center gap-1 md:gap-6 justify-around md:w-auto">
        {navItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-all relative group flex flex-col items-center p-2 md:p-0 ${
              activeSection === item.id ? 'text-primary' : 'text-foreground/50 hover:text-foreground'
            }`}
          >
            <span className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
              {item.icon}
            </span>
            
            {/* Removed label on mobile for better space management */}
            {/* <span className="text-[8px] md:hidden font-bold uppercase tracking-tighter mt-1">{item.label}</span> */}

            {/* Dynamic Underline - Desktop only for better performance */}
            {activeSection === item.id && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-1 md:-bottom-2 w-full h-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}

            <span className="hidden md:block absolute -bottom-12 left-1/2 -translate-x-1/2 bg-background/90 text-foreground text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-foreground/10 font-bold uppercase tracking-widest pointer-events-none">
              {item.label}
            </span>
          </motion.a>
        ))}
      </div>
      
      <div className="w-[1px] h-6 bg-foreground/10 mx-1 md:mx-0" />
      
      {/* Compact Language Cycle Button */}
      <button
        onClick={() => {
          const langs: ('en' | 'fr' | 'ar')[] = ['en', 'fr', 'ar'];
          const currentIndex = langs.indexOf(locale);
          const nextIndex = (currentIndex + 1) % langs.length;
          setLocale(langs[nextIndex]);
        }}
        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-primary text-foreground shadow-lg shadow-primary/20 font-black text-[10px] uppercase transition-all hover:scale-110 active:scale-95 border border-primary/20"
      >
        {locale}
      </button>

      <div className="hidden md:block w-[1px] h-6 bg-foreground/20" />
      <div className="scale-75 md:scale-100">
        <ThemeToggle />
      </div>
    </motion.nav>
  );
};

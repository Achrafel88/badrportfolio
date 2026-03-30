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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1, ease: 'backOut' }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 glass rounded-full flex items-center gap-6 md:gap-8 border-foreground/20 shadow-2xl bg-background/50 backdrop-blur-2xl"
    >
      <div className="flex items-center gap-4 md:gap-6">
        {navItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            whileHover={{ y: -3 }}
            className={`transition-all relative group flex flex-col items-center ${
              activeSection === item.id ? 'text-primary' : 'text-foreground/50 hover:text-foreground'
            }`}
          >
            <span className="w-5 h-5 flex items-center justify-center">
              {item.icon}
            </span>
            
            {/* Dynamic Underline */}
            {activeSection === item.id && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-2 w-full h-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}

            <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-background/90 text-foreground text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-foreground/10 font-bold uppercase tracking-widest pointer-events-none">
              {item.label}
            </span>
          </motion.a>
        ))}
      </div>
      <div className="w-[1px] h-6 bg-foreground/20" />
      
      {/* Language Switcher */}
      <div className="flex gap-2">
        {['en', 'fr', 'ar'].map((lang) => (
          <button
            key={lang}
            onClick={() => setLocale(lang as any)}
            className={`text-[10px] font-black uppercase transition-all ${
              locale === lang ? 'text-primary' : 'text-foreground/30 hover:text-foreground/60'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="w-[1px] h-6 bg-foreground/20" />
      <ThemeToggle />
    </motion.nav>
  );
};

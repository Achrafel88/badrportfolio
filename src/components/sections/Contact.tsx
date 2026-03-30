'use client';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Linkedin, Github, Send, CheckCircle2, Loader2, Instagram } from 'lucide-react';
import { useState } from 'react';
import confetti from 'canvas-confetti';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export const Contact = () => {
  const { locale } = useLanguage();
  const t = translations[locale].contact;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Trigger confetti for a premium feel
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#ec4899', '#10b981']
        });
        
        // Reset form after a delay
        setTimeout(() => {
          setIsSubmitted(false);
        }, 8000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
    } catch (err: any) {
      console.error('Contact form error:', err);
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-foreground/[0.01]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right, #6366f110 1px, transparent 1px), linear-gradient(to bottom, #6366f110 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] -z-10 animate-pulse" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contact Info */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"
            />
            
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-black mb-8 tracking-tighter"
            >
              {t.title_part1} <span className="text-primary italic underline decoration-primary/30 underline-offset-8">{t.title_part2}</span>
            </motion.h2>
            <p className="text-xl text-foreground/60 mb-12 max-w-md leading-relaxed">
              {t.description}
            </p>

            <div className="space-y-6 mb-12">
              <ContactLink
                icon={<Mail className="w-6 h-6" />}
                title={t.email_me}
                value="aelhasnaoui88@gmail.com"
                href="mailto:aelhasnaoui88@gmail.com"
                color="bg-primary/10 text-primary"
              />
              <ContactLink
                icon={<MessageCircle className="w-6 h-6" />}
                title={t.whatsapp}
                value="+212 604 539 887"
                href="https://wa.me/212604539887"
                color="bg-green-500/10 text-green-500"
              />
              <div className="flex gap-4 mt-10 pt-6 border-t border-foreground/5">
                <SocialIcon icon={<Linkedin className="w-6 h-6" />} href="https://www.linkedin.com/in/achraf-el-hasnaoui-3364a91b6/" />
                <SocialIcon icon={<Github className="w-6 h-6" />} href="https://github.com/Achrafel88" />
                <SocialIcon icon={<Instagram className="w-6 h-6" />} href="https://www.instagram.com/ae_deve/" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-1 md:p-1.5 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent shadow-2xl"
          >
            <div className="p-8 md:p-12 bg-white/5 backdrop-blur-[20px] rounded-[2.2rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Send className="w-32 h-32 -rotate-12" />
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500 animate-bounce" />
                  </div>
                  <h3 className="text-3xl font-black mb-4">{t.form.success}</h3>
                  <p className="text-foreground/60">{t.form.back}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSubmitted(false)}
                    className="mt-10 px-8 py-3 bg-foreground text-background rounded-full font-bold transition-all hover:bg-primary"
                  >
                    {t.form.another}
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormInput name="name" label={t.form.name} placeholder="John Doe" />
                    <FormInput name="email" label={t.form.email} placeholder="john@example.com" type="email" />
                  </div>
                  <FormInput name="subject" label={t.form.subject} placeholder="Project Inquiry" />
                  <div className="flex flex-col gap-3 group">
                    <label className="text-xs font-black text-foreground/40 uppercase tracking-[0.2em] ml-2 transition-colors group-focus-within:text-primary">{t.form.message}</label>
                    <textarea
                      name="message"
                      required
                      placeholder={t.form.placeholder}
                      className="bg-foreground/[0.03] dark:bg-white/5 border-2 border-transparent rounded-[1.5rem] p-6 focus:outline-none focus:border-primary/50 focus:bg-background transition-all h-40 text-foreground/80 resize-none shadow-inner"
                    />
                  </div>
                  
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs font-mono bg-red-500/10 p-4 rounded-2xl border border-red-500/20"
                    >
                      {error}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-5 bg-primary text-foreground rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
                  >
                    {isSending ? (
                      <>
                        <span className="uppercase tracking-widest text-sm">{t.form.sending}</span>
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </>
                    ) : (
                      <>
                        <span className="uppercase tracking-[0.2em] text-sm">{t.form.send}</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform rtl:rotate-180" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactLink = ({ icon, title, value, href, color }: any) => (
  <a href={href} className="flex items-center gap-6 group p-4 rounded-3xl transition-all hover:bg-foreground/[0.03]">
    <div className={`p-4 rounded-2xl transition-all group-hover:scale-110 group-hover:shadow-lg ${color}`}>
      {icon}
    </div>
    <div>
      <h4 className="text-[10px] text-foreground/40 uppercase font-black tracking-[0.2em] mb-1">{title}</h4>
      <p className="text-xl font-bold group-hover:text-primary transition-all tracking-tight">{value}</p>
    </div>
  </a>
);

const SocialIcon = ({ icon, href }: any) => (
  <a href={href} target="_blank" className="p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/5 text-foreground/60 hover:text-primary hover:bg-foreground/[0.06] hover:-translate-y-1 transition-all shadow-sm">
    {icon}
  </a>
);

const FormInput = ({ label, placeholder, type = 'text', name }: any) => (
  <div className="flex flex-col gap-3 group">
    <label className="text-xs font-black text-foreground/40 uppercase tracking-[0.2em] ml-2 transition-colors group-focus-within:text-primary">{label}</label>
    <input
      name={name}
      required
      type={type}
      placeholder={placeholder}
      className="bg-foreground/[0.03] border-2 border-transparent rounded-full px-8 py-4 focus:outline-none focus:border-primary/50 focus:bg-background transition-all text-foreground/80 shadow-inner"
    />
  </div>
);


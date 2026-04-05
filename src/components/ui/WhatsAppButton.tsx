'use client';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const whatsappNumber = "+212681068395";
  const message = "Hello Badreddine! I saw your portfolio and I'd like to get in touch.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] transition-all group"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
        
        {/* Pulsing Aura */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 px-4 py-2 bg-background/80 backdrop-blur-md border border-foreground/10 text-foreground text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          Chat with me
        </span>
      </motion.a>
    </motion.div>
  );
};

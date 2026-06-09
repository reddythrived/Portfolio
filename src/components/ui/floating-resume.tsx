'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';

export const FloatingResume = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link
            href="/resume"
            className="flex items-center space-x-2 px-4 py-3 rounded-full bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-wider shadow-2xl shadow-primary/30 border border-primary-foreground/10 group cursor-pointer transition-all duration-300"
            title="Open Resume"
          >
            <FileText className="w-4 h-4 group-hover:rotate-6 transition-transform" />
            <span>View Resume</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

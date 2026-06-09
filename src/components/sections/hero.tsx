'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, ChevronDown } from 'lucide-react';

export const Hero = () => {
  const titles = [
    'AI Engineer',
    'Machine Learning Enthusiast',
    'Full Stack Developer',
    'Problem Solver'
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden z-10 pt-20">
      {/* Background radial spotlight glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-[#06b6d4]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating abstract decorative nodes */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-10 md:left-24 w-12 h-12 border border-white/5 rounded-full bg-white/[0.01] backdrop-blur-sm hidden sm:block"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-10 md:right-24 w-16 h-16 border border-white/5 rounded-full bg-white/[0.01] backdrop-blur-sm hidden sm:block"
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Intro Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span>Available for Internships & Placement</span>
        </motion.div>

        {/* Big Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-8xl font-extrabold tracking-tight text-white glow-text"
        >
          K.P. Thrived Reddy
        </motion.h1>

        {/* Rotating titles container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-12 flex items-center justify-center"
        >
          <span className="text-xl md:text-3xl text-muted-foreground mr-2 font-medium">I am a</span>
          <div className="relative overflow-hidden h-12 w-80 text-left flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute text-xl md:text-3xl font-bold gradient-text-ai"
              >
                {titles[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          Building intelligent systems that solve real-world problems through Artificial Intelligence, Machine Learning, and Modern Web Technologies.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Link
            href="/#projects"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-full bg-primary text-white hover:bg-primary/95 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center group"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/resume"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-primary/50 transition-all duration-300 flex items-center justify-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Resume
          </Link>
          <Link
            href="/#contact"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-full border border-white/5 bg-transparent text-muted-foreground hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>

      {/* Down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center cursor-pointer text-muted-foreground hover:text-white transition-colors"
      >
        <span className="text-xs uppercase tracking-widest mb-1.5 opacity-60">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

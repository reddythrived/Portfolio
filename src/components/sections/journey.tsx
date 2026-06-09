'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, GraduationCap, Code, Rocket, BookOpen } from 'lucide-react';

export const Journey = () => {
  const milestones = [
    {
      year: '2026 - Present',
      title: 'Full Stack AI Engineering',
      subtitle: 'Advanced Next.js, Cloud Databases & ATS Analytics',
      description: 'Developing complex full-stack web applications integrated with AI API engines. Built Next.js 15 ATS Resume Analyzer and AI Trip Planner using PostgreSQL. Focusing on clean server-side rendering, low latency APIs, and performance audits.',
      icon: Rocket,
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.35)] bg-primary',
    },
    {
      year: '2025',
      title: 'Project Engineering & Hackathons',
      subtitle: 'OpenCV Computer Vision & MySQL Dashboards',
      description: 'Engineered "AttendNet AI", a face recognition automated attendance system using dlib-based 128D facial landing coordinates and temporal multi-frame matching. Won first prize at HackAI hackathon for computer vision prototypes.',
      icon: Code,
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.35)] bg-cyan-500',
    },
    {
      year: '2024',
      title: 'AIML Specialization Focus',
      subtitle: 'B.Tech Program Core Curriculum',
      description: 'Dived deep into Artificial Intelligence, Machine Learning algorithms, Feature Engineering, and model optimization tracks. Mastered database structures (PostgreSQL, MySQL, MongoDB) alongside Python backend Flask environments.',
      icon: BookOpen,
      glow: 'shadow-[0_0_20px_rgba(236,72,153,0.35)] bg-pink-500',
    },
    {
      year: '2023',
      title: 'Academic Foundation Set',
      subtitle: 'B.Tech Program Commences',
      description: 'Entered the Bachelor of Technology (B.Tech) program. Formed solid foundations in Data Structures & Algorithms, Object-Oriented Programming (Java/Python), and Linux systems, maintaining an outstanding CGPA score.',
      icon: GraduationCap,
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.35)] bg-emerald-500',
    },
  ];

  return (
    <section id="journey" className="py-24 relative overflow-hidden z-10 px-6 max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute right-10 bottom-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="space-y-4 text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Timeline</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Academic & Growth Journey
        </h3>
        <p className="text-muted-foreground text-sm md:text-base">
          From algorithmic foundations to building production-ready intelligent web architectures.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Center line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2" />

        <div className="space-y-12">
          {milestones.map((milestone, idx) => {
            const Icon = milestone.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={milestone.title}
                className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between"
              >
                {/* Timeline center node indicator */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20">
                  <div className={`p-2.5 rounded-full text-white ${milestone.glow}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content Box */}
                <div
                  className={`w-full sm:w-[45%] pl-12 sm:pl-0 ${
                    isEven ? 'sm:text-right sm:pr-8' : 'sm:order-2 sm:pl-8'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <span className="inline-flex items-center text-xs font-semibold text-primary mb-2">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {milestone.year}
                    </span>
                    <h4 className="text-lg font-bold text-white tracking-tight">{milestone.title}</h4>
                    <h5 className="text-xs font-medium text-muted-foreground mt-0.5">{milestone.subtitle}</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for desktop layout grid alignment */}
                <div className="hidden sm:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

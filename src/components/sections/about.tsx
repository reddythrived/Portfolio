'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { FileText, Download, Briefcase, GraduationCap, ChevronRight } from 'lucide-react';

export const About = () => {
  const passions = [
    'Artificial Intelligence',
    'Machine Learning',
    'Full Stack Development',
    'Computer Vision',
    'Data Analysis',
    'Software Engineering',
    'Backend Development',
    'Cloud Technologies',
    'Data Structures & Algorithms'
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden z-10 px-6 max-w-7xl mx-auto">
      {/* Decorative Blur Glows */}
      <div className="absolute right-0 top-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Bio Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Specializing in AI/ML & Modern Full Stack Systems
            </h3>
          </div>

          <p className="text-muted-foreground leading-relaxed text-lg">
            I am a B.Tech 3rd Year student specializing in Artificial Intelligence and Machine Learning.
            I build responsive, modern, and performance-tuned applications powered by intelligent deep-learning systems.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            I continuously refine my software architecture capabilities by tackling real-world project deployments, contributing to hackathons, solving algorithmic challenges, and structuring scalable APIs.
          </p>

          <div className="space-y-3 pt-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Core Areas of Interest</h4>
            <div className="flex flex-wrap gap-2">
              {passions.map((passion) => (
                <span
                  key={passion}
                  className="px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-xs text-muted-foreground hover:border-primary/30 hover:text-white transition-all duration-300"
                >
                  {passion}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recruiter Quick Access Card */}
        <div className="lg:col-span-5">
          <SpotlightCard spotlightColor="rgba(6, 182, 212, 0.1)" className="border-cyan-500/10">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Recruiter Quick Access</h4>
                  <p className="text-xs text-muted-foreground">Get candidate verification documents instantly</p>
                </div>
              </div>

              {/* Mini resume preview box */}
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Resume_Thrived_Reddy.pdf</h5>
                    <p className="text-xs text-muted-foreground">ATS-Optimized • 1 Page • AI & Full Stack</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href="/resume"
                  className="w-full py-3 text-center text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 transition-all duration-300 flex items-center justify-center group"
                >
                  <span>Open Full PDF Viewer</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="https://drive.google.com/file/d/1c4_s1GxYOUvPlFHm-Qod98wi_-CXvlK8/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-center text-sm font-semibold rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2 text-cyan-400" />
                  Direct Download Resume
                </a>
              </div>

              <div className="border-t border-white/5 pt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Specialization: B.Tech in Artificial Intelligence & Machine Learning
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

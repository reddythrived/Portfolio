'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { ExternalLink, GitBranch, Eye, Sparkles } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  metrics: string[];
  imageUrl?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
}

interface ProjectsProps {
  projects: ProjectData[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden z-10 px-6 max-w-7xl mx-auto">
      {/* Decorative gradient sphere */}
      <div className="absolute right-0 top-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">My Work</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Featured Engineering Projects
        </h3>
        <p className="text-muted-foreground text-sm md:text-base">
          A showcase of systems created using Artificial Intelligence, Machine Learning, and Web Technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id || idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <SpotlightCard className="h-full flex flex-col justify-between border-white/[0.04] p-6 hover:shadow-primary/5">
              <div className="space-y-5">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-primary">
                    {project.title}
                  </h4>
                  {project.metrics && project.metrics.length > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] font-semibold">
                      <Sparkles className="w-2.5 h-2.5 mr-1" />
                      {project.metrics[0]}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Features (Mini List) */}
                {project.features && project.features.length > 0 && (
                  <ul className="space-y-1 text-xs text-muted-foreground border-l border-white/5 pl-3">
                    {project.features.slice(0, 2).map((feat, fidx) => (
                      <li key={fidx} className="line-clamp-1">
                        • {feat}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-muted-foreground border border-white/[0.02]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 pt-6 border-t border-white/5 mt-6">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-white/5 text-white hover:bg-white/10 hover:border-primary/20 border border-transparent transition-all flex items-center justify-center"
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  Details
                </Link>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white border border-transparent hover:border-white/10 transition-all"
                    title="View Source Code"
                  >
                    <GitBranch className="w-4 h-4" />
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all"
                    title="Live Demonstration"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

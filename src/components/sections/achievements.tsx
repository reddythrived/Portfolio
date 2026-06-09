'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/spotlight-card';

export interface AchievementData {
  id: string;
  title: string;
  description: string;
  category: string; // "certifications", "workshops", "hackathons", "technical_events", "academic"
  date: Date;
  credentialUrl?: string | null;
}

interface AchievementsProps {
  achievements: AchievementData[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { label: 'All Achievements', value: 'all' },
    { label: 'Certifications', value: 'certifications' },
    { label: 'Hackathons', value: 'hackathons' },
    { label: 'Workshops & Events', value: 'workshops' },
    { label: 'Academic', value: 'academic' }
  ];

  const filtered = filter === 'all'
    ? achievements
    : achievements.filter(item => {
        if (filter === 'workshops') {
          return item.category === 'workshops' || item.category === 'technical_events';
        }
        return item.category === filter;
      });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'certifications': return 'Certification';
      case 'hackathons': return 'Hackathon Win';
      case 'workshops': return 'Workshop';
      case 'technical_events': return 'Technical Event';
      case 'academic': return 'Academic Milestone';
      default: return 'Achievement';
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden z-10 px-6 max-w-7xl mx-auto">
      <div className="absolute left-10 top-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="space-y-4 text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Milestones</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Achievements & Timeline
        </h3>
        <p className="text-muted-foreground text-sm md:text-base">
          Academic progression, industry certifications, and hackathon highlights.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${
              filter === cat.value
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                : 'bg-white/5 border-white/5 text-muted-foreground hover:text-white hover:border-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Timeline */}
      <div className="max-w-4xl mx-auto space-y-6">
        {filtered.length > 0 ? (
          filtered.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
            >
              <SpotlightCard className="border-white/[0.04] p-5 hover:border-primary/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/25 text-primary mt-1">
                      {item.category === 'certifications' ? (
                        <ShieldCheck className="w-5 h-5" />
                      ) : item.category === 'hackathons' ? (
                        <Zap className="w-5 h-5 text-amber-400" />
                      ) : (
                        <Award className="w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          {getCategoryLabel(item.category)}
                        </span>
                        <span className="text-muted-foreground text-[10px] flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start sm:self-center px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-xs font-semibold text-white hover:bg-white/10 hover:border-primary/20 transition-all flex items-center space-x-1.5"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
            <p className="text-muted-foreground text-sm">No accomplishments found in this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

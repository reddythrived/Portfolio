'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { Code, Layout, Brain, Database, Wrench } from 'lucide-react';

interface Skill {
  name: string;
  proficiency: number;
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  skills: Skill[];
}

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Programming Languages',
      icon: Code,
      color: 'rgba(139, 92, 246, 0.15)', // purple
      skills: [
        { name: 'Python', proficiency: 92 },
        { name: 'TypeScript', proficiency: 85 },
        { name: 'JavaScript', proficiency: 88 },
        { name: 'Java', proficiency: 85 },
        { name: 'SQL', proficiency: 80 }
      ]
    },
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      color: 'rgba(236, 72, 153, 0.15)', // pink
      skills: [
        { name: 'Machine Learning', proficiency: 88 },
        { name: 'Computer Vision', proficiency: 80 },
        { name: 'Data Analysis', proficiency: 85 },
        { name: 'Feature Engineering', proficiency: 82 },
        { name: 'Model Training', proficiency: 84 },
        { name: 'Prediction Systems', proficiency: 86 }
      ]
    },
    {
      title: 'Web Development',
      icon: Layout,
      color: 'rgba(6, 182, 212, 0.15)', // cyan
      skills: [
        { name: 'Next.js', proficiency: 85 },
        { name: 'React', proficiency: 90 },
        { name: 'Tailwind CSS', proficiency: 92 },
        { name: 'Flask', proficiency: 80 },
        { name: 'REST APIs', proficiency: 88 }
      ]
    },
    {
      title: 'Databases',
      icon: Database,
      color: 'rgba(16, 185, 129, 0.15)', // green
      skills: [
        { name: 'PostgreSQL', proficiency: 85 },
        { name: 'MySQL', proficiency: 82 },
        { name: 'MongoDB', proficiency: 78 }
      ]
    },
    {
      title: 'Developer Tools',
      icon: Wrench,
      color: 'rgba(245, 158, 11, 0.15)', // amber
      skills: [
        { name: 'Git & GitHub', proficiency: 90 },
        { name: 'Prisma ORM', proficiency: 82 },
        { name: 'Vercel', proficiency: 85 },
        { name: 'VS Code', proficiency: 92 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden z-10 px-6 max-w-7xl mx-auto">
      {/* Background decoration */}
      <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">My Stack</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Interactive Skill Matrix
        </h3>
        <p className="text-muted-foreground text-sm md:text-base">
          Hover over cards to activate local glowing matrices representing my proficiency ranges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <SpotlightCard
              key={cat.title}
              spotlightColor={cat.color}
              onMouseEnter={() => setActiveCategory(idx)}
              onMouseLeave={() => setActiveCategory(null)}
              className="border-white/[0.04] transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-primary">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-white text-lg">{cat.title}</h4>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-muted-foreground">{skill.name}</span>
                        <span className="text-primary">{skill.proficiency}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers, Brain, CheckCircle, CodeXml, GitBranch } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/spotlight-card';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: React.ComponentType<any>;
  color: string;
}

const Counter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2; // seconds
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMiliseconds / end), 30);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 40); // larger step size
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
      {count}
      {suffix}
    </span>
  );
};

export const Statistics = () => {
  const stats: StatItem[] = [
    {
      label: 'Projects Built',
      value: 12,
      suffix: '+',
      icon: Layers,
      color: 'rgba(139, 92, 246, 0.1)',
    },
    {
      label: 'Tech Stack Skills',
      value: 20,
      suffix: '+',
      icon: Brain,
      color: 'rgba(6, 182, 212, 0.1)',
    },
    {
      label: 'Algorithmic Tasks Done',
      value: 350,
      suffix: '+',
      icon: CodeXml,
      color: 'rgba(236, 72, 153, 0.1)',
    },
    {
      label: 'Certifications',
      value: 5,
      suffix: '',
      icon: CheckCircle,
      color: 'rgba(16, 185, 129, 0.1)',
    },
    {
      label: 'GitHub Contributions',
      value: 450,
      suffix: '+',
      icon: GitBranch,
      color: 'rgba(245, 158, 11, 0.1)',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden z-10 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <SpotlightCard
                spotlightColor={stat.color}
                className="text-center flex flex-col items-center justify-center border-white/[0.03] p-6 h-full"
              >
                <div className="p-3 rounded-full bg-white/5 text-primary mb-4 border border-white/5">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-2">
                  {stat.label}
                </p>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

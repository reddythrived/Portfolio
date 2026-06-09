import React from 'react';
import Link from 'next/link';
import { Settings } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden z-10 border-t border-white/5 bg-[#030303] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <Link href="/" className="text-lg font-bold text-white tracking-tight">
            Thrived<span className="text-primary">.Reddy</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1.5">
            B.Tech in Artificial Intelligence & Machine Learning Specialization.
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <Link href="/#projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="/#skills" className="hover:text-white transition-colors">
            Skills
          </Link>
          <Link href="/#achievements" className="hover:text-white transition-colors">
            Achievements
          </Link>
          <Link href="/#journey" className="hover:text-white transition-colors">
            Journey
          </Link>
          <Link href="/resume" className="text-primary hover:text-white font-medium transition-colors">
            Resume
          </Link>
        </div>

        {/* Legal & Admin Shortcuts */}
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span>&copy; {currentYear} K.P. Thrived Reddy. All rights reserved.</span>
          <Link href="/admin/dashboard" className="p-1 rounded hover:bg-white/5 hover:text-white transition-all">
            <Settings className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

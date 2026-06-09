'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, FileText, FolderGit, Cpu, Award, Map, Mail, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Projects', href: '/#projects', icon: FolderGit },
    { name: 'Skills', href: '/#skills', icon: Cpu },
    { name: 'Achievements', href: '/#achievements', icon: Award },
    { name: 'Journey', href: '/#journey', icon: Map },
    { name: 'Contact', href: '/#contact', icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return pathname === '/' && typeof window !== 'undefined' && window.location.hash === path.substring(1);
    }
    return pathname === path;
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12',
          scrolled
            ? 'bg-[#030303]/70 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300">
              Thrived<span className="text-primary">.Reddy</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 hover:text-white flex items-center space-x-1',
                  isActive(item.href) ? 'text-white' : 'text-muted-foreground'
                )}
              >
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              href="/resume"
              className={cn(
                'text-sm font-medium transition-colors duration-200 hover:text-white flex items-center space-x-1',
                pathname === '/resume' ? 'text-white' : 'text-muted-foreground'
              )}
            >
              <FileText className="w-4 h-4 mr-1 text-primary animate-pulse" />
              <span>Resume</span>
            </Link>
          </div>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/resume"
              className="px-4 py-2 text-xs font-semibold rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg flex items-center"
            >
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              Quick Access
            </Link>
            <Link
              href="/admin/dashboard"
              className="p-2 text-muted-foreground hover:text-white transition-colors rounded-full hover:bg-white/5"
              title="Admin Dashboard"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link
              href="/admin/dashboard"
              className="p-2 text-muted-foreground hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted-foreground hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-[#030303] flex flex-col justify-center px-8 transition-all duration-300 md:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col space-y-6 text-2xl font-bold">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-white transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/resume"
            onClick={() => setIsOpen(false)}
            className="text-primary hover:text-white transition-colors duration-200 flex items-center"
          >
            <FileText className="w-6 h-6 mr-2" />
            Resume
          </Link>
          <div className="pt-8">
            <Link
              href="/resume"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 text-center text-sm font-semibold rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-primary/50 transition-all duration-300 w-full block"
            >
              View Full Resume
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

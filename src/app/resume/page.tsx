import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/nav';
import { Footer } from '@/components/ui/footer';
import { CanvasParticles } from '@/components/ui/canvas-particles';
import { AnalyticsTracker } from '@/components/ui/analytics-tracker';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { FileDown, ExternalLink, ChevronLeft, Calendar, FileText } from 'lucide-react';
import { db } from '@/lib/db';

async function getResumeData() {
  try {
    const resume = await db.resume.findFirst({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
    return resume || { url: 'https://drive.google.com/file/d/1c4_s1GxYOUvPlFHm-Qod98wi_-CXvlK8/view?usp=drivesdk', version: 'v1.0.0' };
  } catch (error) {
    return { url: 'https://drive.google.com/file/d/1c4_s1GxYOUvPlFHm-Qod98wi_-CXvlK8/view?usp=drivesdk', version: 'v1.0.0' };
  }
}

export default async function ResumePage() {
  const resumeData = await getResumeData();
  
  // Transform view link into preview link for clean iframe embedding
  let embedUrl = resumeData.url;
  if (embedUrl.includes('/view')) {
    embedUrl = embedUrl.replace(/\/view.*/, '/preview');
  } else if (embedUrl.includes('/edit')) {
    embedUrl = embedUrl.replace(/\/edit.*/, '/preview');
  }

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#f5f5f7] font-sans">
      <CanvasParticles />
      <AnalyticsTracker />
      <Navbar />

      <main className="relative z-10 pt-28 pb-16 px-6 max-w-6xl mx-auto space-y-8">
        {/* Navigation / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-white transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center">
              <FileText className="w-8 h-8 mr-3 text-primary" />
              Curriculum Vitae
            </h1>
            <p className="text-xs text-muted-foreground">
              Version {resumeData.version} • Optimized for recruiter Applicant Tracking Systems (ATS)
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <a
              href={resumeData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white hover:bg-white/10 hover:border-primary/50 transition-all flex items-center space-x-1.5"
            >
              <span>New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={resumeData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-primary text-xs font-semibold text-white hover:bg-primary/95 transition-all flex items-center space-x-1.5 shadow-lg shadow-primary/10"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Embedded Iframe Container */}
        <SpotlightCard spotlightColor="rgba(139,92,246,0.05)" className="p-1 border-white/5 overflow-hidden">
          <div className="rounded-xl overflow-hidden bg-[#0d0d12] aspect-[1/1.4] sm:aspect-auto sm:h-[800px] w-full relative">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay"
              title="K.P. Thrived Reddy Resume Preview"
            />
          </div>
        </SpotlightCard>
      </main>

      <Footer />
    </div>
  );
}

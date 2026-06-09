import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { CanvasParticles } from '@/components/ui/canvas-particles';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { DashboardClient } from './dashboard-client';
import { ShieldAlert, BarChart3, Mail, Code, Layers, FileDown, LogOut } from 'lucide-react';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/admin/login');
  }

  // Load live DB metrics for the dashboard view
  let totalViews = 0;
  let uniqueViews = 0;
  let messages: any[] = [];
  let projects: any[] = [];
  let skills: any[] = [];
  let viewsByPath: any[] = [];
  let viewsByDevice: any[] = [];
  let viewsByCountry: any[] = [];
  let recentVisits: any[] = [];

  try {
    totalViews = await db.visitorAnalytics.count();
    const uniqueGroup = await db.visitorAnalytics.groupBy({
      by: ['ipHash'],
    });
    uniqueViews = uniqueGroup.length;
    messages = await db.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
    projects = await db.project.findMany({ orderBy: { order: 'asc' } });
    skills = await db.skill.findMany({ orderBy: { category: 'asc' } });
    
    const pathGroup = await db.visitorAnalytics.groupBy({
      by: ['path'],
      _count: { path: true },
      orderBy: { _count: { path: 'desc' } }
    });
    viewsByPath = pathGroup.map(item => ({ path: item.path, count: item._count.path }));

    const deviceGroup = await db.visitorAnalytics.groupBy({
      by: ['device'],
      _count: { device: true }
    });
    viewsByDevice = deviceGroup.map(item => ({ device: item.device || 'Desktop', count: item._count.device }));

    const countryGroup = await db.visitorAnalytics.groupBy({
      by: ['country'],
      _count: { country: true },
      orderBy: { _count: { country: 'desc' } },
      take: 10
    });
    viewsByCountry = countryGroup.map(item => ({ country: item.country || 'Unknown', count: item._count.country }));

    recentVisits = await db.visitorAnalytics.findMany({
      orderBy: { timestamp: 'desc' },
      take: 10
    });
  } catch (error) {
    console.warn('Dashboard DB load fail (using empty lists):', error);
  }

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#f5f5f7] font-sans pb-16">
      <CanvasParticles />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 space-y-8">
        {/* Header Console */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
              <ShieldAlert className="w-8 h-8 mr-3 text-primary" />
              Management Console
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Logged in as {session.user.email} • Live Portfolio Control Room
            </p>
          </div>

          <a
            href="/api/auth/signout"
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400 transition-all flex items-center space-x-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </a>
        </div>

        {/* Live counter cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.05)" className="p-5 border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Total Views</p>
                <p className="text-2xl font-black text-white mt-1">{totalViews}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(6, 182, 212, 0.05)" className="p-5 border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Unique Visitors</p>
                <p className="text-2xl font-black text-white mt-1">{uniqueViews}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-cyan-400" />
            </div>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(236, 72, 153, 0.05)" className="p-5 border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Inbox Records</p>
                <p className="text-2xl font-black text-white mt-1">{messages.length}</p>
              </div>
              <Mail className="w-8 h-8 text-pink-500" />
            </div>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.05)" className="p-5 border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Active Projects</p>
                <p className="text-2xl font-black text-white mt-1">{projects.length}</p>
              </div>
              <Layers className="w-8 h-8 text-emerald-500" />
            </div>
          </SpotlightCard>
        </div>

        {/* Client Tabs Controller */}
        <DashboardClient
          initialMessages={messages}
          initialProjects={projects}
          initialSkills={skills}
          viewsByPath={viewsByPath}
          viewsByDevice={viewsByDevice}
          viewsByCountry={viewsByCountry}
          recentVisits={recentVisits}
        />
      </main>
    </div>
  );
}

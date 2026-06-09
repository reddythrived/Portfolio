import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/ui/nav';
import { Footer } from '@/components/ui/footer';
import { CanvasParticles } from '@/components/ui/canvas-particles';
import { AnalyticsTracker } from '@/components/ui/analytics-tracker';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { ChevronLeft, GitBranch, ExternalLink, Sparkles, CheckCircle2, Cpu, GitFork } from 'lucide-react';
import { db } from '@/lib/db';

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

const fallbackProjects = [
  {
    id: 'p1',
    title: 'AttendNet AI',
    description: 'A full-stack real-time face recognition attendance system using dlib-based 128D embeddings, multi-face detection, temporal validation across frames, Flask backend, cloud database integration, and approximately 96% recognition accuracy.',
    techStack: ['Python', 'Flask', 'OpenCV', 'dlib', 'MySQL', 'Machine Learning'],
    features: [
      'Real-time automated attendance tracking via live camera feed',
      'Deep learning multi-face detection using HoG/CNN architectures',
      'Temporal validation mechanism ensuring user presence across successive frames',
      'Interactive analytics dashboard displaying daily logs, history and charts',
      'Instant attendance reports generation (Excel & PDF formats)'
    ],
    metrics: ['96% Accuracy', '128D Face Embeddings', 'Real-time Detection', 'MySQL Cloud Integration'],
    liveUrl: null,
    githubUrl: 'https://github.com',
  },
  {
    id: 'p2',
    title: 'Weather Prediction System',
    description: 'A comprehensive weather monitoring, forecasting, and prediction platform using the OpenWeather API and a lightweight Flask backend to serve interactive local weather insights.',
    techStack: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'OpenWeather API'],
    features: [
      'Real-time atmospheric condition retrieval for custom locations',
      'Multi-day dynamic weather forecasting with temperature, humidity, and pressure logs',
      'Interactive map layout and weather condition badge highlights',
      'Responsive custom UI design suited for mobile, tablet, and desktop viewports'
    ],
    metrics: ['Live OpenWeather Sync', '5-Day Multi-Forecast', 'Responsive UI Layout', 'API Caching Layer'],
    liveUrl: null,
    githubUrl: 'https://github.com',
  },
  {
    id: 'p3',
    title: 'AI Trip Planner',
    description: 'An AI-powered travel planning platform that generates custom-tailored personalized itineraries based on user destination preference, duration, specific interests, and budget.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'AI APIs', 'Tailwind CSS'],
    features: [
      'Smart AI custom itinerary builder generating day-by-day sightseeing programs',
      'Dynamic budget configuration splitting travel expenses',
      'Intelligent local attraction recommendations based on interest badges',
      'Clean schedule grid layout for optimized viewing'
    ],
    metrics: ['AI Recommendation Engine', 'Day-by-Day View Planner', 'NextJS App Routing', 'PostgreSQL Integration'],
    liveUrl: null,
    githubUrl: 'https://github.com',
  },
  {
    id: 'p4',
    title: 'AI Disease Prediction System',
    description: 'An intelligent medical diagnostic support system that predicts potential diseases based on user lifestyle details and medical symptom inputs through Scikit-learn machine learning models.',
    techStack: ['Python', 'Flask', 'Scikit-learn', 'Machine Learning'],
    features: [
      'Interactive symptom-checker interface',
      'Random Forest / SVM models predicting potential conditions',
      'Risk assessment levels with customized health advice alerts',
      'Dashboard analytical breakdown of historical data'
    ],
    metrics: ['ML Classification Models', 'Multi-Symptom Checker', 'Immediate Health Insights', '90%+ Predictive Precision'],
    liveUrl: null,
    githubUrl: 'https://github.com',
  },
  {
    id: 'p5',
    title: 'AI Resume Analyzer',
    description: 'An intelligent ATS resume analysis platform that evaluates resumes against job descriptions, identifies missing keywords, generates ATS scores, and provides actionable improvement suggestions.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'AI APIs', 'Tailwind CSS'],
    features: [
      'Robust PDF/Word resume parser extracting sections automatically',
      'Advanced ATS optimization score generation comparing resume to job descriptions',
      'Missing keywords and skills extraction tool',
      'AI recommendations and rewrites for bullets'
    ],
    metrics: ['Instant ATS Score Card', 'Interactive Match Visualizer', 'Tailwind Fluid Layout', 'AI Feedback Prompts'],
    liveUrl: null,
    githubUrl: 'https://github.com',
  },
];

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { id } = await params;
  let project = null;

  try {
    project = await db.project.findUnique({
      where: { id },
    });
  } catch (error) {
    console.warn('Prisma lookup failed, falling back to static match');
  }

  // Fallback to static match if not found in db
  if (!project) {
    project = fallbackProjects.find((p) => p.id === id || p.title.toLowerCase().replace(/\s+/g, '-') === id);
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#f5f5f7] font-sans">
      <CanvasParticles />
      <AnalyticsTracker />
      <Navbar />

      <main className="relative z-10 pt-28 pb-16 px-6 max-w-5xl mx-auto space-y-10">
        {/* Navigation */}
        <Link
          href="/#projects"
          className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-white transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5 mr-1" />
          Back to Projects
        </Link>

        {/* Title and stats summary */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight glow-text-purple">
              {project.title}
            </h1>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white hover:bg-white/10 transition-all flex items-center space-x-1.5"
              >
                <GitBranch className="w-4 h-4" />
                <span>Repository</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-primary text-xs font-semibold text-white hover:bg-primary/90 transition-all flex items-center space-x-1.5 shadow-lg shadow-primary/15"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Key Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.metrics.map((metric, idx) => (
              <SpotlightCard key={idx} spotlightColor="rgba(6, 182, 212, 0.05)" className="p-4 border-white/5 text-center">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Metric</p>
                <p className="text-lg md:text-xl font-bold text-white mt-1">{metric}</p>
              </SpotlightCard>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Features breakdown */}
          <div className="md:col-span-8 space-y-6">
            <SpotlightCard className="border-white/5 p-6">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center mb-6">
                <CheckCircle2 className="w-5 h-5 mr-2 text-primary" />
                Key Capabilities & Features
              </h3>
              <ul className="space-y-4">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>

            {/* Architecture visualization flowchart */}
            <SpotlightCard className="border-white/5 p-6">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center mb-6">
                <Cpu className="w-5 h-5 mr-2 text-cyan-400" />
                System Architecture Flow
              </h3>
              <div className="border border-white/5 bg-[#07070a] rounded-xl p-6 space-y-4 font-mono text-[11px] text-muted-foreground">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-cyan-400 font-bold">STAGE</span>
                  <span className="text-primary font-bold">PROCESS FLOW</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span>01. INPUT DATA</span>
                    <span className="text-white text-right">Raw Captures / Form Submissions / API Requests</span>
                  </div>
                  <div className="flex items-center justify-center py-1 text-primary animate-pulse">▼</div>
                  <div className="flex items-start justify-between">
                    <span>02. PROCESSING</span>
                    <span className="text-white text-right">Feature Extraction / Normalization / Token Embeddings</span>
                  </div>
                  <div className="flex items-center justify-center py-1 text-primary animate-pulse">▼</div>
                  <div className="flex items-start justify-between">
                    <span>03. PREDICTION ENGINE</span>
                    <span className="text-white text-right">dlib Embeddings / SVM Models / AI Completion APIs</span>
                  </div>
                  <div className="flex items-center justify-center py-1 text-primary animate-pulse">▼</div>
                  <div className="flex items-start justify-between">
                    <span>04. OUTPUT STAGE</span>
                    <span className="text-white text-right">Interactive Charts / Relational Tables / PDF Reports</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Sidebar Tech Info */}
          <div className="md:col-span-4 space-y-6">
            <SpotlightCard className="border-white/5 p-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center">
                  <GitFork className="w-4 h-4 mr-1.5 text-primary" />
                  Engineering Stack
                </h4>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-white/5 text-xs text-white border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 space-y-4">
                <div>
                  <span className="text-xs text-muted-foreground block">Project Type</span>
                  <span className="text-sm font-semibold text-white block mt-0.5">Machine Learning / Full Stack</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Verification Status</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-semibold mt-1.5">
                    <Sparkles className="w-2.5 h-2.5 mr-1" />
                    Verified Prototype
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

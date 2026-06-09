import { db } from '@/lib/db';
import { Navbar } from '@/components/ui/nav';
import { CanvasParticles } from '@/components/ui/canvas-particles';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { Achievements } from '@/components/sections/achievements';
import { Journey } from '@/components/sections/journey';
import { Statistics } from '@/components/sections/statistics';
import { Contact } from '@/components/sections/contact';
import { FloatingResume } from '@/components/ui/floating-resume';
import { Footer } from '@/components/ui/footer';
import { AnalyticsTracker } from '@/components/ui/analytics-tracker';

// Fallback data in case database URL is placeholder during initial builds or local tests
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
      'Interactive analytics dashboard displaying daily logs, history and charts'
    ],
    metrics: ['96% Accuracy', '128D Face Embeddings'],
    liveUrl: null,
    githubUrl: 'https://github.com',
  },
  {
    id: 'p2',
    title: 'Weather Prediction System',
    description: 'A weather monitoring and prediction platform using the OpenWeather API and a lightweight Flask backend to serve interactive local weather insights.',
    techStack: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'OpenWeather API'],
    features: [
      'Real-time atmospheric condition retrieval for custom locations',
      'Multi-day dynamic weather forecasting with temperature, humidity, and pressure logs',
      'Responsive custom UI design suited for mobile, tablet, and desktop viewports'
    ],
    metrics: ['Live OpenWeather Sync', '5-Day Multi-Forecast'],
    liveUrl: null,
    githubUrl: 'https://github.com',
  },
  {
    id: 'p3',
    title: 'AI Trip Planner',
    description: 'An AI-powered travel planning platform that generates personalized itineraries based on destination, duration, interests, and budget.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'AI APIs', 'Tailwind CSS'],
    features: [
      'Smart AI custom itinerary builder generating day-by-day sightseeing programs',
      'Dynamic budget configuration splitting travel expenses',
      'Intelligent local attraction recommendations based on interest badges'
    ],
    metrics: ['AI Recommendation Engine', 'NextJS App Routing'],
    liveUrl: null,
    githubUrl: 'https://github.com',
  },
  {
    id: 'p4',
    title: 'AI Disease Prediction System',
    description: 'An AI-powered system that predicts potential diseases using lifestyle and medical inputs through machine learning models.',
    techStack: ['Python', 'Flask', 'Scikit-learn', 'Machine Learning'],
    features: [
      'Interactive symptom-checker interface',
      'Random Forest / SVM models predicting potential conditions',
      'Risk assessment levels with customized health advice alerts'
    ],
    metrics: ['ML Classification Models', '90%+ Predictive Precision'],
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
      'Missing keywords and skills extraction tool'
    ],
    metrics: ['Instant ATS Score Card', 'AI Feedback Prompts'],
    liveUrl: null,
    githubUrl: 'https://github.com',
  },
];

const fallbackAchievements = [
  {
    id: 'a1',
    title: 'Machine Learning Specialization',
    description: 'Completed comprehensive Coursera specialization covering supervised learning, neural networks, decision trees, and unsupervised models.',
    category: 'certifications',
    date: new Date('2025-08-15'),
    credentialUrl: 'https://coursera.org',
  },
  {
    id: 'a2',
    title: 'Next.js 15 Full Stack Certification',
    description: 'Mastered App Router, Server Components, and Server Actions for high-performance React architectures.',
    category: 'certifications',
    date: new Date('2026-02-10'),
    credentialUrl: 'https://vercel.com',
  },
  {
    id: 'a3',
    title: 'Winner - HackAI Hackathon',
    description: 'Awarded 1st prize for building an automated vision attendance prototype resolving real-time frame jitter using OpenCV.',
    category: 'hackathons',
    date: new Date('2025-11-20'),
    credentialUrl: null,
  },
  {
    id: 'a4',
    title: 'Advanced Computer Vision Workshop',
    description: 'Participated in hands-on workshop on dlib facial land-marking embeddings, image transformations, and edge detection.',
    category: 'workshops',
    date: new Date('2025-06-05'),
    credentialUrl: null,
  },
  {
    id: 'a5',
    title: 'B.Tech Specialization Track',
    description: 'Maintained excellent academic score in the Artificial Intelligence and Machine Learning program (CGPA 9.2/10).',
    category: 'academic',
    date: new Date('2026-05-30'),
    credentialUrl: null,
  },
];

export const revalidate = 3600; // Cache page for 1 hour

export default async function Home() {
  let projects = [];
  let achievements = [];

  try {
    projects = await db.project.findMany({
      orderBy: { order: 'asc' },
    });
    
    achievements = await db.achievement.findMany({
      orderBy: { date: 'desc' },
    });

    if (projects.length === 0) {
      projects = fallbackProjects;
    }
    if (achievements.length === 0) {
      achievements = fallbackAchievements;
    }
  } catch (error) {
    console.warn('Database offline, using fallback static data:', error);
    projects = fallbackProjects;
    achievements = fallbackAchievements;
  }

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#f5f5f7] font-sans selection:bg-primary/30 selection:text-white">
      {/* Background Interactive Particles */}
      <CanvasParticles />
      <AnalyticsTracker />

      {/* Floating Header */}
      <Navbar />

      {/* Main sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects projects={projects} />
        <Skills />
        <Achievements achievements={achievements} />
        <Journey />
        <Statistics />
        <Contact />
      </main>

      {/* Floating PDF Resume trigger */}
      <FloatingResume />

      {/* Footer link index */}
      <Footer />
    </div>
  );
}

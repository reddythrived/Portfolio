import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean existing data
  await prisma.visitorAnalytics.deleteMany({});
  await prisma.contactMessage.deleteMany({});
  await prisma.resume.deleteMany({});
  await prisma.achievement.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('🧹 Cleaned existing database tables.');

  // 2. Create Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@thrivedreddy.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'super-secure-admin-password-change-me';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      name: 'K.P. Thrived Reddy',
      password: hashedPassword,
    },
  });

  console.log(`👤 Created Admin User: ${admin.email}`);

  // 3. Create Default Resume Reference
  const resume = await prisma.resume.create({
    data: {
      version: 'v1.0.0',
      url: 'https://drive.google.com/file/d/1c4_s1GxYOUvPlFHm-Qod98wi_-CXvlK8/view?usp=drivesdk',
      active: true,
    },
  });

  console.log('📄 Created default resume reference.');

  // 4. Create Default Projects
  const projectsData = [
    {
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
      liveUrl: '',
      githubUrl: 'https://github.com',
      order: 1,
    },
    {
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
      liveUrl: '',
      githubUrl: 'https://github.com',
      order: 2,
    },
    {
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
      liveUrl: '',
      githubUrl: 'https://github.com',
      order: 3,
    },
    {
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
      liveUrl: '',
      githubUrl: 'https://github.com',
      order: 4,
    },
    {
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
      liveUrl: '',
      githubUrl: 'https://github.com',
      order: 5,
    },
  ];

  for (const project of projectsData) {
    await prisma.project.create({
      data: project,
    });
  }

  console.log(`🚀 Seeded ${projectsData.length} projects.`);

  // 5. Create Default Skills
  const skillsData = [
    // Programming
    { name: 'Java', category: 'programming', proficiency: 85, icon: 'code' },
    { name: 'Python', category: 'programming', proficiency: 92, icon: 'terminal' },
    { name: 'JavaScript', category: 'programming', proficiency: 88, icon: 'curly-braces' },
    { name: 'TypeScript', category: 'programming', proficiency: 85, icon: 'shield' },
    { name: 'SQL', category: 'programming', proficiency: 80, icon: 'database' },

    // Web Development
    { name: 'HTML & CSS', category: 'webdev', proficiency: 95, icon: 'layout' },
    { name: 'Tailwind CSS', category: 'webdev', proficiency: 92, icon: 'paint-bucket' },
    { name: 'React', category: 'webdev', proficiency: 90, icon: 'atom' },
    { name: 'Next.js', category: 'webdev', proficiency: 85, icon: 'layers' },
    { name: 'Flask', category: 'webdev', proficiency: 80, icon: 'server' },
    { name: 'REST APIs', category: 'webdev', proficiency: 88, icon: 'cpu' },

    // AI & Machine Learning
    { name: 'Machine Learning', category: 'aiml', proficiency: 88, icon: 'brain' },
    { name: 'Computer Vision', category: 'aiml', proficiency: 80, icon: 'eye' },
    { name: 'Data Analysis', category: 'aiml', proficiency: 85, icon: 'bar-chart' },
    { name: 'Feature Engineering', category: 'aiml', proficiency: 82, icon: 'sliders' },
    { name: 'Model Training', category: 'aiml', proficiency: 84, icon: 'activity' },
    { name: 'Prediction Systems', category: 'aiml', proficiency: 86, icon: 'trending-up' },

    // Databases
    { name: 'MySQL', category: 'databases', proficiency: 82, icon: 'database' },
    { name: 'PostgreSQL', category: 'databases', proficiency: 85, icon: 'database' },
    { name: 'MongoDB', category: 'databases', proficiency: 78, icon: 'database' },

    // Tools
    { name: 'Git & GitHub', category: 'tools', proficiency: 90, icon: 'git-branch' },
    { name: 'Prisma ORM', category: 'tools', proficiency: 82, icon: 'link' },
    { name: 'Vercel', category: 'tools', proficiency: 85, icon: 'cloud-lightning' },
    { name: 'VS Code', category: 'tools', proficiency: 92, icon: 'edit' },
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({
      data: skill,
    });
  }

  console.log(`🛠️ Seeded ${skillsData.length} skills.`);

  // 6. Create Achievements
  const achievementsData = [
    {
      title: 'Machine Learning Specialization',
      description: 'Completed comprehensive Coursera specialization covering supervised learning, neural networks, decision trees, and unsupervised models.',
      category: 'certifications',
      date: new Date('2025-08-15'),
      credentialUrl: 'https://coursera.org',
    },
    {
      title: 'Next.js 15 Full Stack Certification',
      description: 'Mastered App Router, Server Components, and Server Actions for high-performance React architectures.',
      category: 'certifications',
      date: new Date('2026-02-10'),
      credentialUrl: 'https://vercel.com',
    },
    {
      title: 'Winner - HackAI Hackathon',
      description: 'Awarded 1st prize for building an automated vision attendance prototype resolving real-time frame jitter using OpenCV.',
      category: 'hackathons',
      date: new Date('2025-11-20'),
      credentialUrl: '',
    },
    {
      title: 'Advanced Computer Vision Workshop',
      description: 'Participated in hands-on workshop on dlib facial land-marking embeddings, image transformations, and edge detection.',
      category: 'workshops',
      date: new Date('2025-06-05'),
      credentialUrl: '',
    },
    {
      title: 'B.Tech Specialization Track',
      description: 'Maintained excellent academic score in the Artificial Intelligence and Machine Learning program (CGPA 9.2/10).',
      category: 'academic',
      date: new Date('2026-05-30'),
      credentialUrl: '',
    },
  ];

  for (const achievement of achievementsData) {
    await prisma.achievement.create({
      data: achievement,
    });
  }

  console.log(`🏆 Seeded ${achievementsData.length} achievements.`);
  console.log('✅ Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

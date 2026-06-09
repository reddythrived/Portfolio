'use server';

import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

// Helper to verify admin session
async function verifyAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }
  return session;
}

// Helper to hash IP addresses safely
function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip + (process.env.NEXTAUTH_SECRET || 'salt')).digest('hex').substring(0, 16);
}

// 1. Recruiter Contact Actions
export async function submitContactMessage(prevState: any, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
      return { success: false, error: 'All fields are required' };
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Invalid email address' };
    }

    try {
      await db.contactMessage.create({
        data: {
          name,
          email,
          subject,
          message,
        },
      });
    } catch (dbError) {
      console.warn('⚠️ Database offline. Message simulated and logged to terminal:', { name, email, subject, message });
      return { success: true, message: 'Message sent successfully! (Database offline, simulated)' };
    }

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Contact submission error:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}

import { headers } from 'next/headers';

// 2. Visitor Analytics Tracking
export async function trackVisitor(path: string, device: string) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
    const country = headersList.get('x-vercel-ip-country') || 'Localhost';
    const ipHash = hashIp(ip);
    
    // Check if tracked in last 1 hour to prevent flooding
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existing = await db.visitorAnalytics.findFirst({
      where: {
        ipHash,
        path,
        timestamp: {
          gte: oneHourAgo
        }
      }
    });

    if (!existing) {
      await db.visitorAnalytics.create({
        data: {
          ipHash,
          path,
          device: device || 'Desktop',
          country: country,
        },
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return { success: false };
  }
}

// 3. Admin CRUD - Messages
export async function adminGetMessages() {
  await verifyAdmin();
  return await db.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function adminMarkMessageRead(id: string, read: boolean) {
  await verifyAdmin();
  const msg = await db.contactMessage.update({
    where: { id },
    data: { read },
  });
  revalidatePath('/admin/dashboard');
  return msg;
}

export async function adminDeleteMessage(id: string) {
  await verifyAdmin();
  await db.contactMessage.delete({
    where: { id },
  });
  revalidatePath('/admin/dashboard');
  return { success: true };
}

// 4. Admin CRUD - Projects
export async function adminSaveProject(project: {
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  metrics: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  order: number;
}) {
  await verifyAdmin();
  const data = {
    title: project.title,
    description: project.description,
    techStack: project.techStack,
    features: project.features,
    metrics: project.metrics,
    imageUrl: project.imageUrl || null,
    liveUrl: project.liveUrl || null,
    githubUrl: project.githubUrl || null,
    order: Number(project.order),
  };

  if (project.id) {
    const updated = await db.project.update({
      where: { id: project.id },
      data,
    });
    revalidatePath('/');
    revalidatePath(`/projects/${project.id}`);
    revalidatePath('/admin/dashboard');
    return updated;
  } else {
    const created = await db.project.create({
      data,
    });
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return created;
  }
}

export async function adminDeleteProject(id: string) {
  await verifyAdmin();
  await db.project.delete({
    where: { id },
  });
  revalidatePath('/');
  revalidatePath('/admin/dashboard');
  return { success: true };
}

// 5. Admin CRUD - Skills
export async function adminSaveSkill(skill: {
  id?: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
}) {
  await verifyAdmin();
  const data = {
    name: skill.name,
    category: skill.category,
    proficiency: Number(skill.proficiency),
    icon: skill.icon || null,
  };

  if (skill.id) {
    const updated = await db.skill.update({
      where: { id: skill.id },
      data,
    });
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return updated;
  } else {
    const created = await db.skill.create({
      data,
    });
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return created;
  }
}

export async function adminDeleteSkill(id: string) {
  await verifyAdmin();
  await db.skill.delete({
    where: { id },
  });
  revalidatePath('/');
  revalidatePath('/admin/dashboard');
  return { success: true };
}

// 6. Admin CRUD - Achievements
export async function adminSaveAchievement(achievement: {
  id?: string;
  title: string;
  description: string;
  category: string;
  date: string;
  credentialUrl?: string;
}) {
  await verifyAdmin();
  const data = {
    title: achievement.title,
    description: achievement.description,
    category: achievement.category,
    date: new Date(achievement.date),
    credentialUrl: achievement.credentialUrl || null,
  };

  if (achievement.id) {
    const updated = await db.achievement.update({
      where: { id: achievement.id },
      data,
    });
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return updated;
  } else {
    const created = await db.achievement.create({
      data,
    });
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return created;
  }
}

export async function adminDeleteAchievement(id: string) {
  await verifyAdmin();
  await db.achievement.delete({
    where: { id },
  });
  revalidatePath('/');
  revalidatePath('/admin/dashboard');
  return { success: true };
}

// 7. Admin CRUD - Resume Link
export async function adminSaveResume(resume: {
  id?: string;
  version: string;
  url: string;
  active: boolean;
}) {
  await verifyAdmin();
  
  if (resume.active) {
    // Deactivate all other resumes
    await db.resume.updateMany({
      data: { active: false },
    });
  }

  const data = {
    version: resume.version,
    url: resume.url,
    active: resume.active,
  };

  if (resume.id) {
    const updated = await db.resume.update({
      where: { id: resume.id },
      data,
    });
    revalidatePath('/resume');
    revalidatePath('/admin/dashboard');
    return updated;
  } else {
    const created = await db.resume.create({
      data,
    });
    revalidatePath('/resume');
    revalidatePath('/admin/dashboard');
    return created;
  }
}

// 8. Admin Analytics Fetching
export async function adminGetAnalytics() {
  await verifyAdmin();
  
  const totalViews = await db.visitorAnalytics.count();
  const uniqueVisitors = await db.visitorAnalytics.groupBy({
    by: ['ipHash'],
  });

  const viewsByPath = await db.visitorAnalytics.groupBy({
    by: ['path'],
    _count: {
      path: true,
    },
    orderBy: {
      _count: {
        path: 'desc',
      },
    },
  });

  const viewsByDevice = await db.visitorAnalytics.groupBy({
    by: ['device'],
    _count: {
      device: true,
    },
  });

  const viewsByCountry = await db.visitorAnalytics.groupBy({
    by: ['country'],
    _count: {
      country: true,
    },
    orderBy: {
      _count: {
        country: 'desc',
      },
    },
    take: 10,
  });

  const recentVisits = await db.visitorAnalytics.findMany({
    orderBy: { timestamp: 'desc' },
    take: 10,
  });

  return {
    totalViews,
    uniqueVisitorsCount: uniqueVisitors.length,
    viewsByPath: viewsByPath.map((item) => ({ path: item.path, count: item._count.path })),
    viewsByDevice: viewsByDevice.map((item) => ({ device: item.device, count: item._count.device })),
    viewsByCountry: viewsByCountry.map((item) => ({ country: item.country, count: item._count.country })),
    recentVisits,
  };
}

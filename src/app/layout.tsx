import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/ui/auth-provider';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'K.P. Thrived Reddy — AI & ML Engineer | Full Stack Developer',
    template: '%s | K.P. Thrived Reddy',
  },
  description:
    'Portfolio of K.P. Thrived Reddy, B.Tech AI/ML student and Full Stack Developer specializing in intelligent systems, computer vision, and modern web architectures. Open for internships and placements.',
  keywords: [
    'K.P. Thrived Reddy',
    'AI Engineer',
    'Machine Learning',
    'Full Stack Developer',
    'Computer Vision',
    'Next.js',
    'Python',
    'Flask',
    'React',
    'Portfolio',
    'AIML',
    'AttendNet',
  ],
  authors: [{ name: 'K.P. Thrived Reddy' }],
  creator: 'K.P. Thrived Reddy',
  metadataBase: new URL('https://thrived-reddy.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thrived-reddy.vercel.app',
    title: 'K.P. Thrived Reddy — AI & ML Engineer | Full Stack Developer',
    description:
      'Building intelligent systems that solve real-world problems through AI, Machine Learning, and Modern Web Technologies.',
    siteName: 'K.P. Thrived Reddy Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'K.P. Thrived Reddy — AI & ML Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K.P. Thrived Reddy — AI & ML Engineer | Full Stack Developer',
    description:
      'Building intelligent systems that solve real-world problems through AI, Machine Learning, and Modern Web Technologies.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#030303',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}

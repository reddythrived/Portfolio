'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisitor } from '@/app/actions/portfolio';

export const AnalyticsTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    const logVisit = async () => {
      // Determine device category based on viewport width
      let device = 'Desktop';
      if (window.innerWidth < 768) {
        device = 'Mobile';
      } else if (window.innerWidth < 1024) {
        device = 'Tablet';
      }

      try {
        await trackVisitor(pathname || '/', device);
      } catch (err) {
        console.error('Analytics log fail:', err);
      }
    };

    logVisit();
  }, [pathname]);

  return null;
};

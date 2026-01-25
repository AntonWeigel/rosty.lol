import type { MetadataRoute } from 'next';

import { SITE } from '@/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/auth',
        '/forgot-password',
        '/reset-password',
        '/sign-in',
        '/sign-up',
        '/admin',
        '/api/',
      ],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

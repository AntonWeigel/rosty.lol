import type { MetadataRoute } from 'next';

import { SITE } from '@/config';
import { fetchDocsRoutes } from '@/services/doc';
import { fetchPagesRoutes } from '@/services/page';
import { fetchPostsRoutes } from '@/services/post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now },
    { url: `${SITE.url}/roadmap`, lastModified: now },
    { url: `${SITE.url}/changelog`, lastModified: now },
  ];

  const [pages, posts, docs] = await Promise.all([
    fetchPagesRoutes(SITE.url),
    fetchPostsRoutes(SITE.url),
    fetchDocsRoutes(SITE.url),
  ]);

  return [...staticRoutes, ...pages, ...posts, ...docs];
}

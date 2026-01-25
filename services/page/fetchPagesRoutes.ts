import * as React from 'react';

import client from '@/tina/__generated__/client';
import { PageConnectionEdges } from '@/tina/__generated__/types';
import { fetchAllFromTinaConnection } from '@/utils';

/**
 * Fetches all static page URLs for the sitemap.
 *
 * @param baseUrl - The base URL of the site.
 * @returns A list of sitemap entries for static pages.
 */
export const fetchPagesRoutes = React.cache(async function (baseUrl: string) {
  try {
    const edges = await fetchAllFromTinaConnection<PageConnectionEdges>(
      (args) =>
        client.queries
          .pageConnection(args)
          .then((res) => res.data.pageConnection as any),
    );

    return edges.map((edge) => {
      const filename = edge?.node?._sys.filename || '';
      const isHome = filename === 'home' || filename === 'index';

      return {
        url: `${baseUrl}/${isHome ? '' : filename}`,
        lastModified: new Date(
          edge?.node?.seo?.openGraph?.updatedTime || Date.now(),
        ).toISOString(),
      };
    });
  } catch (error) {
    console.error('Error fetching pages for sitemap:', error);
    return [];
  }
});

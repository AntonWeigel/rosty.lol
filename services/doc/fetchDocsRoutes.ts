import * as React from 'react';

import client from '@/tina/__generated__/client';
import { DocConnectionEdges } from '@/tina/__generated__/types';
import { fetchAllFromTinaConnection } from '@/utils';

/**
 * Fetches all documentation URLs for the sitemap.
 *
 * @param baseUrl - The base URL of the site.
 * @returns A list of sitemap entries for documentation pages.
 */
export const fetchDocsRoutes = React.cache(async function (baseUrl: string) {
  try {
    const edges = await fetchAllFromTinaConnection<DocConnectionEdges>((args) =>
      client.queries
        .docConnection(args)
        .then((res) => res.data.docConnection as any),
    );

    return edges.map((edge) => {
      const relativePath = edge?.node?._sys.relativePath || '';
      const urlPath = relativePath.replace(/\.mdx$/, '');

      return {
        url: `${baseUrl}/docs/${urlPath}`,
        lastModified: new Date(
          edge?.node?.seo?.openGraph?.updatedTime || Date.now(),
        ).toISOString(),
      };
    });
  } catch (error) {
    console.error('Error fetching docs for sitemap:', error);
    return [];
  }
});

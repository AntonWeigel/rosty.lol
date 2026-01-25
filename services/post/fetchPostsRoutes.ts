import * as React from 'react';

import client from '@/tina/__generated__/client';
import { PostConnectionEdges } from '@/tina/__generated__/types';
import { fetchAllFromTinaConnection } from '@/utils';

/**
 * Fetches all blog post URLs for the sitemap.
 *
 * @param baseUrl - The base URL of the site.
 * @returns A list of sitemap entries for blog posts.
 */
export const fetchPostsRoutes = React.cache(async function (baseUrl: string) {
  try {
    const edges = await fetchAllFromTinaConnection<PostConnectionEdges>(
      (args) =>
        client.queries
          .postConnection(args)
          .then((res) => res.data.postConnection as any),
    );

    return edges.map((edge) => ({
      url: `${baseUrl}/blog/${edge?.node?._sys.filename}`,
      lastModified: new Date(
        edge?.node?.seo?.openGraph?.updatedTime || Date.now(),
      ).toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    return [];
  }
});

import * as React from 'react';

import client from '@/tina/__generated__/client';

/**
 * Fetches a single blog post by slug with full result for visual editing.
 *
 * @param slug - The post slug (without `.mdx`).
 * @returns Full TinaCMS result (query, variables, data) or null if not found.
 */
export const fetchPostBySlug = React.cache(async function (slug: string) {
  try {
    const relativePath = `${slug}.mdx`;

    const result = await client.queries.post({
      relativePath,
    });

    if (!result?.data?.post) {
      return null;
    }

    return result;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
});

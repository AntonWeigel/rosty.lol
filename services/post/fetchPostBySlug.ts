import * as React from 'react';

import client from '@/tina/__generated__/client';

/**
 * Fetches a single blog post by slug.
 *
 * @param slug - The post slug (without `.mdx`).
 * @returns The full blog post data or null if not found.
 */
export const fetchPostBySlug = React.cache(async function (slug: string) {
  try {
    const relativePath = `${slug}.mdx`;

    const { data } = await client.queries.post({
      relativePath,
    });

    if (!data?.post) {
      return null;
    }

    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
});

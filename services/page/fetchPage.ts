import * as React from 'react';

import client from '@/tina/__generated__/client';

/**
 * Fetches a CMS page by slug using the Tina client with full result for visual editing.
 *
 * @param slug - The slug of the page (without `.mdx`).
 * @returns Full TinaCMS result (query, variables, data) or null if not found.
 */
export const fetchPage = React.cache(async function (slug: string) {
  try {
    const relativePath = `${slug}.mdx`;

    const result = await client.queries.page({
      relativePath,
    });

    if (!result?.data?.page) {
      return null;
    }

    return result;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
});

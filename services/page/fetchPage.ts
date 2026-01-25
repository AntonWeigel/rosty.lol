import * as React from 'react';

import client from '@/tina/__generated__/client';

/**
 * Fetches a CMS page by slug using the Tina client.
 *
 * @param slug - The slug of the page (without `.mdx`).
 * @returns The page data or null if not found.
 */
export const fetchPage = React.cache(async function (slug: string) {
  try {
    const relativePath = `${slug}.mdx`;

    const { data } = await client.queries.page({
      relativePath,
    });

    if (!data?.page) {
      return null;
    }

    return data.page;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
});

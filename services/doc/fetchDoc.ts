import * as React from 'react';

import client from '@/tina/__generated__/client';

/**
 * Fetches a single documentation entry by slug with full result for visual editing.
 *
 * @param slug - The relative path slug of the doc (without `.mdx`).
 * @returns Full TinaCMS result (query, variables, data) or null if not found.
 */
export const fetchDoc = React.cache(async (slug: string) => {
  try {
    const relativePath = `${slug}.mdx`;

    const result = await client.queries.doc({ relativePath });

    if (!result?.data?.doc) {
      return null;
    }

    return result;
  } catch (error) {
    console.error('Error fetching doc:', error);
    return null;
  }
});

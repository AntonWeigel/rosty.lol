import * as React from 'react';

import client from '@/tina/__generated__/client';

/**
 * Fetches a single documentation entry by slug from TinaCMS.
 *
 * @param slug - The relative path slug of the doc (without `.mdx`).
 * @returns The doc data if found, otherwise `null`.
 */
export const fetchDoc = React.cache(async (slug: string) => {
  try {
    const relativePath = `${slug}.mdx`;
    const { data } = await client.queries.doc({ relativePath });

    if (!data?.doc) {
      return null;
    }

    return data.doc;
  } catch (error) {
    console.error('Error fetching doc:', error);
    return null;
  }
});

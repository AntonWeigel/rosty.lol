import * as React from 'react';

import client from '@/tina/__generated__/client';

/**
 * Fetches landing page content from TinaCMS with full result for visual editing.
 *
 * @returns Full TinaCMS result (query, variables, data) or null on failure.
 */
export const fetchLandingPage = React.cache(async function () {
  try {
    const result = await client.queries.landing({
      relativePath: 'index.mdx',
    });

    return result;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
});

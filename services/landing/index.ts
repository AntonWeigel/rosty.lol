import * as React from 'react';

import client from '@/tina/__generated__/client';

/**
 * Fetches landing page content from TinaCMS.
 *
 * @returns Landing page data or null on failure.
 */
export const fetchLandingPage = React.cache(async function () {
  try {
    const { data } = await client.queries.landing({
      relativePath: 'index.mdx',
    });

    return data?.landing || null;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
});

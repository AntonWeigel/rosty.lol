import * as React from 'react';

import { ChangelogTag } from '@/constants/enums';
import { client } from '@/tina/__generated__/client';
import type { ChangelogEntry } from '@/types';

/**
 * Fetches the latest changelog entries from TinaCMS using GraphQL.
 *
 * @param last - Number of latest entries to fetch (default is 50).
 * @returns A list of parsed changelog entries or an empty array on error.
 */
export const fetchChangelog = React.cache(
  async (last = 50): Promise<ChangelogEntry[]> => {
    try {
      const result = await client.queries.changelogConnection({
        sort: 'createdAt',
        last,
      });

      const edges = result?.data?.changelogConnection?.edges;

      if (!edges?.length) return [];

      return edges.map((edge) => ({
        version: edge?.node?.version ?? '',
        title: edge?.node?.title ?? '',
        description: edge?.node?.description ?? '',
        createdAt: edge?.node?.createdAt ?? '',
        tags: (edge?.node?.tags ?? []).filter(
          (tag): tag is string => !!tag,
        ) as ChangelogTag[],
      }));
    } catch (error) {
      console.error('Error fetching changelog:', error);
      return [];
    }
  },
);

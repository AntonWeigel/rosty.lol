import * as React from 'react';

import client from '@/tina/__generated__/client';
import { PostAuthor } from '@/tina/__generated__/types';
import { PostPreview } from '@/types';

/**
 * Fetches a list of blog post previews.
 *
 * @param last - Number of posts to fetch (default: 50).
 * @returns An array of post previews.
 */
export const fetchLatestPosts = React.cache(
  async (last = 50): Promise<PostPreview[]> => {
    try {
      const postsListData = await client.queries.postConnection({
        sort: 'createdAt',
        last,
      });

      const edges = postsListData?.data?.postConnection?.edges;

      if (!edges?.length) return [];

      return edges.map((edge) => ({
        thumbnail: edge?.node?.thumbnail as string,
        title: edge?.node?.title as string,
        author: edge?.node?.author as PostAuthor,
        description: edge?.node?.description as string,
        category: edge?.node?.category as string,
        createdAt: edge?.node?.createdAt as string,
        slug: edge?.node?._sys.filename as string,
      }));
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },
);

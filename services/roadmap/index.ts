'use server';

import { createClient } from '@/config/supabase/server';
import { RoadmapCategory, RoadmapStatus } from '@/constants/enums';
import { client } from '@/tina/__generated__/client';
import { GroupedRoadmapEntry, RoadmapEntry } from '@/types';

/**
 * Fetches roadmap entries from TinaCMS and merges vote counts from Supabase.
 * Groups entries by status and sorts them by votes.
 *
 * @param last - The number of latest entries to fetch.
 * @returns Grouped roadmap entries by status, sorted by votes.
 */
export async function fetchRoadmap(last = 100): Promise<GroupedRoadmapEntry[]> {
  try {
    const [cmsResult, supabase] = await Promise.all([
      client.queries.roadmapConnection({ sort: 'createdAt', last }),
      createClient(),
    ]);

    const edges = cmsResult?.data?.roadmapConnection?.edges;

    if (!edges?.length) return [];

    const { data: voteRows } = await supabase
      .from('roadmap_votes')
      .select('slug, votes');

    const voteMap = new Map<string, number>(
      (voteRows ?? []).map((row) => [row.slug, row.votes]),
    );

    const allEntries: RoadmapEntry[] = edges.map((edge) => {
      const slug = edge?.node?._sys.filename as string;

      return {
        title: edge?.node?.title ?? '',
        slug,
        description: edge?.node?.description ?? '',
        createdAt: edge?.node?.createdAt ?? '',
        status: edge?.node?.status as RoadmapStatus,
        category: edge?.node?.category as RoadmapCategory,
        votes: voteMap.get(slug) ?? 0,
      };
    });

    const orderedStatuses: RoadmapStatus[] = [
      RoadmapStatus.New,
      RoadmapStatus.Evaluating,
      RoadmapStatus.Planned,
      RoadmapStatus.InProgress,
      RoadmapStatus.Released,
    ];

    return orderedStatuses.map((status) => ({
      status,
      items: allEntries
        .filter((entry) => entry.status === status)
        .sort((a, b) => b.votes - a.votes),
    }));
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    return [];
  }
}

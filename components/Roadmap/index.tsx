'use client';

import * as React from 'react';

import { RoadmapStatus } from '@/constants/enums';
import { GroupedRoadmapEntry } from '@/types';

import { RoadmapColumn } from './RoadmapColumn';

type RoadmapOverviewProps = { groupedEntries: GroupedRoadmapEntry[] };

export const RoadmapOverview: React.FC<RoadmapOverviewProps> = ({
  groupedEntries,
}) => {
  const [grouped, setGrouped] = React.useState(groupedEntries);

  const handleVote = (
    slug: string,
    newVotes: number,
    status: RoadmapStatus,
  ) => {
    setGrouped((prev) =>
      prev.map((group) => {
        if (group.status !== status) return group;

        const updatedItems = group.items.map((entry) =>
          entry.slug === slug ? { ...entry, votes: newVotes } : entry,
        );

        const sortedItems = updatedItems.sort((a, b) => b.votes - a.votes);

        return { ...group, items: sortedItems };
      }),
    );
  };

  return (
    <section className="scroll-snap-x mt-8 w-screen overflow-x-auto px-8">
      <div className="mx-auto flex w-max snap-x snap-mandatory flex-row items-start gap-6 pt-8">
        {grouped.map(({ status, items }) => (
          <RoadmapColumn
            key={status}
            status={status}
            entries={items}
            handleVote={handleVote}
          />
        ))}
      </div>
    </section>
  );
};

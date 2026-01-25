import * as React from 'react';

import { Badge } from '@/components/ui/Badge';
import { RoadmapStatus } from '@/constants/enums';
import { RoadmapEntry } from '@/types';
import { cn } from '@/utils';

import { RoadmapCard } from './RoadmapCard';

type RoadmapColumnProps = {
  status: RoadmapStatus;
  entries: RoadmapEntry[];
  handleVote: (slug: string, newVotes: number, status: RoadmapStatus) => void;
};

export const RoadmapColumn: React.FC<RoadmapColumnProps> = ({
  status,
  entries,
  handleVote,
}) => (
  <div className="bg-secondary-light dark:bg-primary-dark relative flex w-[360px] min-w-[360px] snap-start flex-col gap-4 rounded-2xl p-4 pt-8 shadow-md">
    <Badge
      variant="status"
      className={cn(
        'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
        status === RoadmapStatus.Released
          ? 'bg-accent dark:text-primary-light'
          : 'dark:bg-neutral bg-secondary-dark',
      )}
    >
      {status}
    </Badge>
    {entries.map((entry) => (
      <RoadmapCard key={entry.title} entry={entry} onVoteAction={handleVote} />
    ))}
  </div>
);

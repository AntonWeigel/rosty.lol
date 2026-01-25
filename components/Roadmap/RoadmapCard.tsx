'use client';

import * as React from 'react';

import { RichText } from '@/components/RichText';
import { Badge } from '@/components/ui/Badge';
import { RoadmapStatus } from '@/constants/enums';
import { RoadmapEntry } from '@/types';
import { formatTimeAgo } from '@/utils';

import { RoadmapVoteButton } from './RoadmapVoteButton';

type RoadmapCardProps = {
  entry: RoadmapEntry;
  onVoteAction: (slug: string, newVotes: number, status: RoadmapStatus) => void;
};

export const RoadmapCard: React.FC<RoadmapCardProps> = ({
  entry,
  onVoteAction,
}) => {
  return (
    <div className="border-secondary-dark/50 bg-primary-light dark:border-neutral/50 dark:bg-secondary-dark flex flex-col gap-4 rounded-2xl border p-4">
      <div className="flex gap-2.5">
        <RoadmapVoteButton entry={entry} onVoteAction={onVoteAction} />
        <h4 className="text-base font-medium">{entry.title}</h4>
      </div>

      <RichText
        className="dark:[&_p]:text-secondary-light [&_p]:text-sm"
        content={entry.description}
      />

      <div className="flex items-center justify-between gap-2">
        <span className="text-secondary-dark dark:text-neutral text-right text-[10px] font-semibold tracking-wide uppercase">
          {formatTimeAgo(entry.createdAt)}
        </span>
        <Badge variant="tag">{entry.category.toUpperCase()}</Badge>
      </div>
    </div>
  );
};

'use client';

import { ChevronUp } from 'lucide-react';
import * as React from 'react';

import { RoadmapStatus } from '@/constants/enums';
import { RoadmapEntry } from '@/types';
import { cn } from '@/utils';

import { useRoadmapVote } from './useRoadmapVote';

type RoadmapVoteButtonProps = {
  entry: RoadmapEntry;
  onVoteAction: (slug: string, newVotes: number, status: RoadmapStatus) => void;
};

export const RoadmapVoteButton: React.FC<RoadmapVoteButtonProps> = ({
  entry,
  onVoteAction,
}) => {
  const { votes, hasVoted, vote, animating, isLoaded } = useRoadmapVote(
    entry,
    onVoteAction,
  );

  return !isLoaded ? (
    <div className="bg-secondary-light/30 dark:bg-primary-dark/30 size-7 animate-pulse rounded-lg" />
  ) : (
    <button
      onClick={vote}
      aria-label={hasVoted ? 'Remove vote' : 'Upvote feature'}
      className={cn(
        'bg-secondary-light/50 hover:bg-secondary-light/20 dark:bg-primary-dark/50 dark:hover:bg-primary-dark/20 flex size-7 flex-col items-center justify-center rounded-lg border transition-all duration-200',
        hasVoted
          ? 'text-accent border-accent/50'
          : 'dark:text-neutral text-secondary-dark border-secondary-dark/50 dark:border-neutral/50',
        animating && 'animate-vote-shake',
      )}
    >
      <ChevronUp className="size-3" />
      <span className="text-[10px] font-semibold">{votes}</span>
    </button>
  );
};

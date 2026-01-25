import * as React from 'react';

import { unvoteRoadmapAction, voteRoadmapAction } from '@/app/actions';
import { RoadmapStatus } from '@/constants/enums';
import { useLocalStorageState, useToast } from '@/hooks';
import { RoadmapEntry } from '@/types';

/**
 * Manages voting logic and animation state for a roadmap entry.
 *
 * @param entry The roadmap entry being voted on.
 * @param onVote Optional callback triggered after a successful vote or unvote.
 * @returns Voting state, animation flag, vote handler, and load indicator.
 */
export const useRoadmapVote = (
  entry: RoadmapEntry,
  onVote?: (slug: string, newVotes: number, status: RoadmapStatus) => void,
) => {
  const { toast } = useToast();
  const [votes, setVotes] = React.useState(entry.votes);
  const [hasVoted, setHasVoted] = useLocalStorageState<boolean>(
    `voted-${entry.slug}`,
    false,
  );
  const [animating, setAnimating] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const vote = async () => {
    setAnimating(true);

    try {
      const formData = new FormData();
      formData.append('slug', entry.slug);

      const result = hasVoted
        ? await unvoteRoadmapAction(formData)
        : await voteRoadmapAction(formData);

      setAnimating(false);

      if (result.success && typeof result.data?.votes === 'number') {
        setVotes(result.data.votes);
        setHasVoted(!hasVoted);
        onVote?.(entry.slug, result.data.votes, entry.status);
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Voting failed.',
          variant: 'destructive',
        });
      }
    } catch {
      setAnimating(false);
      toast({
        title: 'Error',
        description: 'Could not update your vote.',
        variant: 'destructive',
      });
    }
  };

  return {
    votes,
    hasVoted,
    vote,
    animating,
    isLoaded,
  };
};

import * as React from 'react';

import { Rating } from '@/components/Rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { LandingSectionsHeroSocialProof } from '@/tina/__generated__/types';
import { getInitials } from '@/utils';

type ActiveUsersProps = Omit<LandingSectionsHeroSocialProof, '__typename'>;

export const ActiveUsers: React.FC<ActiveUsersProps> = ({
  highlight,
  text,
  rating,
  avatars,
}) => (
  <div className="flex flex-col items-center gap-4 sm:flex-row">
    <div className="flex -space-x-4">
      {avatars.map((avatar) => (
        <Avatar
          key={avatar.name}
          className="border-primary-light dark:border-secondary-dark border-2"
        >
          <AvatarImage src={avatar.image} alt={avatar.name || 'NA'} />
          <AvatarFallback>{getInitials(avatar.name || 'NA')}</AvatarFallback>
        </Avatar>
      ))}
    </div>

    <div className="flex flex-col items-center gap-0.5 sm:items-start">
      <Rating stars={rating} />
      <div>
        {highlight && (
          <span className="text-bold text-accent text-sm">{highlight} </span>
        )}
        <span className="text-medium text-secondary-dark dark:text-neutral text-sm">
          {text}
        </span>
      </div>
    </div>
  </div>
);

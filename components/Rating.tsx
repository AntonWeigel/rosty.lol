import * as React from 'react';

import { StarIcon } from '@/icons';

type RatingProps = {
  stars: number;
};

const MAX_STARS = 5;

export const Rating: React.FC<RatingProps> = ({ stars }) => (
  <div className="flex">
    {Array.from({ length: MAX_STARS }, (_, index) => (
      <StarIcon key={index} filled={index < stars} />
    ))}
  </div>
);

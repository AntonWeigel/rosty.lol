'use client';

import Image from 'next/image';
import * as React from 'react';

import { LandingSectionsHeroMedia } from '@/tina/__generated__/types';
import { normalizeValueFromTina } from '@/utils';

type MediaProps = {
  data?: (LandingSectionsHeroMedia | null)[] | null;
};

export const Media: React.FC<MediaProps> = ({ data }) => {
  const media = Array.isArray(data) ? data[0] : data;

  if (!media?.__typename) return null;

  switch (media.__typename) {
    case 'LandingSectionsHeroMediaImageMedia':
      return (
        <Image
          src={media.src}
          alt={media.alt || ''}
          width={media.width || 600}
          height={media.height || 600}
          style={{ objectFit: 'cover' }}
          priority
        />
      );
    case 'LandingSectionsHeroMediaVideoMedia':
      return (
        <video
          poster={normalizeValueFromTina(media.posterImage)}
          className="size-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
        >
          <source src={media.videoUrl} type="video/mp4" />
        </video>
      );
    default:
      return null;
  }
};

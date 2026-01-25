import Image from 'next/image';
import * as React from 'react';

import { Post } from '@/tina/__generated__/types';

type BlogPostHeroProps = Pick<Post, 'title' | 'thumbnail'>;

export const BlogPostHero: React.FC<BlogPostHeroProps> = ({
  title,
  thumbnail,
}) => (
  <section className="flex w-full justify-center">
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl sm:h-[400px]">
      <Image src={thumbnail} alt={title} fill objectFit="cover" />
    </div>
  </section>
);

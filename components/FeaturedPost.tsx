import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { FormattedDate } from '@/components/FormattedDate';
import { Badge } from '@/components/ui/Badge';
import { AppRoute } from '@/constants/routes';
import { PostPreview } from '@/types';

export const FeaturedPost: React.FC<{ item: PostPreview }> = ({ item }) => (
  <section>
    <Link
      href={`${AppRoute.BlogPage}/${item.slug}`}
      aria-label={item.title}
      className="group flex flex-col items-center gap-12 md:flex-row"
    >
      <div className="relative h-72 w-full overflow-hidden rounded-2xl md:w-1/2">
        <Image
          src={item.thumbnail}
          alt={item.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          fill
        />
      </div>
      <div className="flex flex-col justify-center gap-8 md:w-1/2">
        <div className="flex items-center justify-between gap-4">
          <Badge variant="tag">{item.category}</Badge>
          <FormattedDate timestamp={item.createdAt} />
        </div>
        <h2 className="text-primary-dark dark:text-primary-light text-center text-4xl leading-tight font-medium group-hover:underline md:text-left">
          {item.title}
        </h2>
        <p className="text-secondary-dark dark:text-neutral text-center text-lg font-medium md:text-left">
          {item.description}
        </p>
      </div>
    </Link>
  </section>
);

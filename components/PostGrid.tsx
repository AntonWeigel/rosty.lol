import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { AppRoute } from '@/constants/routes';
import { PostPreview } from '@/types';
import { cn } from '@/utils';

import { Author } from './Author';
import { BlogPostInfo } from './BlogPostInfo';

export const PostGrid: React.FC<{ items: PostPreview[] }> = ({ items }) => {
  if (!items.length) {
    return null;
  }

  return (
    <section className="grid w-full grid-flow-row grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] place-content-center gap-12 lg:place-content-between">
      {items.map((post, index) => (
        <Link
          key={`post-${index}-${post.title}`}
          href={`${AppRoute.BlogPage}/${post.slug}`}
          aria-label={post.title}
          className={cn(
            'flex flex-col rounded-2xl transition-all duration-300 hover:shadow-xl',
            'bg-primary-light dark:bg-secondary-dark hover:bg-secondary-light hover:dark:bg-primary-dark',
          )}
        >
          <div className="relative h-[200px] w-full overflow-hidden rounded-2xl">
            <Image
              src={post.thumbnail}
              alt={post.title}
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              fill
            />
          </div>
          <div className="flex flex-col justify-center gap-6 p-6">
            <BlogPostInfo category={post.category} createdAt={post.createdAt} />

            <h2 className="text-primary-dark dark:text-primary-light text-2xl font-medium">
              {post.title}
            </h2>

            <Author author={post.author} />
          </div>
        </Link>
      ))}
    </section>
  );
};

import * as React from 'react';

import { Author } from '@/components/Author';
import { BlogPostInfo } from '@/components/BlogPostInfo';
import { Post } from '@/tina/__generated__/types';

type BlogPostHeaderProps = Pick<
  Post,
  'title' | 'description' | 'category' | 'createdAt' | 'author'
>;

export const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  title,
  description,
  category,
  createdAt,
  author,
}) => (
  <section className="flex w-full max-w-screen-md flex-col gap-6">
    <BlogPostInfo category={category} createdAt={createdAt} />
    <h1 className="text-4xl leading-tight font-medium sm:text-5xl sm:leading-tight">
      {title}
    </h1>
    <p className="text-secondary-dark dark:text-neutral text-xl leading-normal font-medium">
      {description}
    </p>
    <Author author={author} />
  </section>
);

'use client';

import * as React from 'react';
import { useTina } from 'tinacms/dist/react';

import { BlogPostHeader } from '@/components/BlogPostHeader';
import { BlogPostHero } from '@/components/BlogPostHero';
import { BlogSections } from '@/components/BlogSections';
import { SubscribeNewsletter } from '@/components/SubscribeNewsletter';
import { PostQuery } from '@/tina/__generated__/types';

type BlogPostClientProps = {
  query: string;
  variables: { relativePath: string };
  data: PostQuery;
};

export const BlogPostClient: React.FC<BlogPostClientProps> = ({
  query,
  variables,
  data,
}) => {
  const { data: liveData } = useTina({
    query,
    variables,
    data,
  });

  const post = liveData?.post;

  if (!post) return null;

  return (
    <>
      <BlogPostHero title={post.title} thumbnail={post.thumbnail} />
      <BlogPostHeader
        title={post.title}
        description={post.description}
        createdAt={post.createdAt}
        category={post.category}
        author={post.author}
      />
      <BlogSections sections={post.sections} />
      <SubscribeNewsletter />
    </>
  );
};

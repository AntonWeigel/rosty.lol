import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { BlogPostHeader } from '@/components/BlogPostHeader';
import { BlogPostHero } from '@/components/BlogPostHero';
import { BlogSections } from '@/components/BlogSections';
import { SubscribeNewsletter } from '@/components/SubscribeNewsletter';
import { fetchPostBySlug } from '@/services/post';
import client from '@/tina/__generated__/client';
import { generateSeoMetadata } from '@/utils';

export async function generateStaticParams() {
  const postsListData = await client.queries.postConnection();

  const paths = postsListData?.data?.postConnection?.edges?.map((edge) => {
    return {
      slug: edge?.node?._sys.filename,
    };
  });

  return paths || [];
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return generateSeoMetadata({
    seo: post.seo,
    pathname: `blog/${slug}`,
  });
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const { isEnabled: isPreview } = await draftMode();

  if (isPreview) {
    return <h1>Preview Mode</h1>;
  }

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
}

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogPostClient } from '@/components/BlogPostClient';
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
  const result = await fetchPostBySlug(slug);

  if (!result?.data?.post) {
    return {
      title: 'Post not found',
    };
  }

  return generateSeoMetadata({
    seo: result.data.post.seo,
    pathname: `blog/${slug}`,
  });
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const result = await fetchPostBySlug(slug);

  if (!result?.data?.post) {
    return notFound();
  }

  return (
    <BlogPostClient
      query={result.query}
      variables={result.variables}
      data={result.data}
    />
  );
}

import type { Metadata } from 'next';

import { FeaturedPost } from '@/components/FeaturedPost';
import { PostGrid } from '@/components/PostGrid';
import { SubscribeNewsletter } from '@/components/SubscribeNewsletter';
import { SITE } from '@/config';
import { AppRoute } from '@/constants/routes';
import { fetchLatestPosts } from '@/services/post';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read generic updates, best practices, and example articles included in this demo starter template.',
  keywords: [
    'blog',
    'demo',
    'updates',
    'product news',
    'starter kit',
    'template',
  ],
  openGraph: {
    title: `Blog | ${SITE.name}`,
    description:
      'Read generic updates, best practices, and example articles included in this demo starter template.',
    url: AppRoute.BlogPage,
    siteName: SITE.name,
    type: 'website',
    images: [
      {
        url: '/1280x640.webp',
        width: 1280,
        height: 640,
        alt: 'Demo blog overview',
        type: 'image/webp',
      },
    ],
  },
};

export default async function Page() {
  const posts = await fetchLatestPosts();

  if (!posts.length) {
    return <div>No posts found.</div>;
  }

  const [latestPost, ...otherPosts] = posts;

  return (
    <>
      <FeaturedPost item={latestPost} />
      <PostGrid items={otherPosts} />
      <SubscribeNewsletter />
    </>
  );
}

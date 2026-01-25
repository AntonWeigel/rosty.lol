import { Metadata } from 'next';

import { SITE } from '@/config';
import {
  DocSeo,
  LandingSeo,
  PageSeo,
  PostSeo,
} from '@/tina/__generated__/types';

type SeoData = LandingSeo | PageSeo | PostSeo | DocSeo;

/**
 * Generates Next.js `Metadata` from SEO fields defined in TinaCMS.
 *
 * Supports multiple content types (landing, page, post, doc) and includes Open Graph
 * and article-specific metadata if available.
 *
 * @param seo - The SEO data from a TinaCMS schema.
 * @param pathname - Optional pathname to construct the canonical URL.
 * @returns A `Metadata` object suitable for use in Next.js pages.
 */
export function generateSeoMetadata({
  seo,
  pathname = '',
}: {
  seo: SeoData;
  pathname?: string;
}): Metadata {
  const title = seo?.title || 'Untitled';
  const description = seo?.description || '';
  const openGraph = seo?.openGraph;
  const article = seo?.article;

  const url = `${SITE.url}/${pathname}`.replace(/\/+$/, '');

  return {
    title,
    description,
    keywords: seo?.keywords,
    authors: seo?.author ? [{ name: seo.author }] : [],
    robots: seo?.robots === false ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      type: (openGraph?.type as any) || 'website',
      locale: openGraph?.locale,
      siteName: openGraph?.siteName,
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      url,
      images: openGraph?.image
        ? [
            {
              url: openGraph.image.url,
              width: openGraph.image.width,
              height: openGraph.image.height,
              alt: openGraph.image.alt,
              type: openGraph.image.type,
            },
          ]
        : [],
    },
    ...(article && {
      article: {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        section: article.section,
        authors: seo?.author ? [seo.author] : [],
        tags: article.tag ? [article.tag] : [],
      },
    }),
  };
}

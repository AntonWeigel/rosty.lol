import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DocsClient } from '@/components/DocsClient';
import {
  fetchAndStructureDocs,
  fetchDoc,
  getPrevNextDoc,
} from '@/services/doc';
import client from '@/tina/__generated__/client';
import { generateSeoMetadata, getBreadcrumbsFromNav } from '@/utils';

export async function generateStaticParams() {
  const docsListData = await client.queries.docConnection();

  const paths = docsListData?.data?.docConnection?.edges?.map((edge) => {
    return {
      slug: edge?.node?._sys.breadcrumbs,
    };
  });

  return paths || [];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  if (!slug?.length) return notFound();

  const docSlug = slug.join('/');
  const result = await fetchDoc(docSlug);
  if (!result?.data?.doc) return notFound();

  return generateSeoMetadata({
    seo: result.data.doc.seo,
    pathname: `docs/${docSlug}`,
  });
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await props.params;
  if (!slug?.length) return notFound();
  const docSlug = slug.join('/');
  const navItems = await fetchAndStructureDocs();
  const breadcrumbs = getBreadcrumbsFromNav(navItems, slug);
  const result = await fetchDoc(docSlug);
  const { prev, next } = getPrevNextDoc(navItems, `/docs/${docSlug}`);

  if (!result?.data?.doc) return notFound();

  return (
    <DocsClient
      query={result.query}
      variables={result.variables}
      data={result.data}
      breadcrumbs={breadcrumbs}
      prev={prev}
      next={next}
    />
  );
}

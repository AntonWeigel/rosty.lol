import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { DocsBreadcrumbs } from '@/components/DocsBreadcrumbs';
import { DocsPagination } from '@/components/DocsPagination';
import { DocsSections } from '@/components/DocsSections';
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
  const doc = await fetchDoc(docSlug);
  if (!doc) return notFound();

  return generateSeoMetadata({ seo: doc.seo, pathname: `docs/${docSlug}` });
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await props.params;
  if (!slug?.length) return notFound();
  const docSlug = slug.join('/');
  const navItems = await fetchAndStructureDocs();
  const breadcrumbs = getBreadcrumbsFromNav(navItems, slug);
  const doc = await fetchDoc(docSlug);
  const { prev, next } = getPrevNextDoc(navItems, `/docs/${docSlug}`);

  if (!doc) return notFound();

  const { isEnabled: isPreview } = await draftMode();

  if (isPreview) {
    return <h1>Preview Mode</h1>;
  }

  return (
    <>
      <DocsBreadcrumbs breadcrumbs={breadcrumbs} />
      <DocsSections sections={doc.sections} />
      <DocsPagination prev={prev} next={next} />
    </>
  );
}

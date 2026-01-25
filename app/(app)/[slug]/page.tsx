import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageHeader } from '@/components/PageHeader';
import { PageSections } from '@/components/PageSections';
import { fetchPage } from '@/services/page';
import client from '@/tina/__generated__/client';
import { generateSeoMetadata } from '@/utils';

export async function generateStaticParams() {
  const pageListData = await client.queries.pageConnection();

  const paths = pageListData?.data?.pageConnection?.edges?.map((edge) => {
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
  const page = await fetchPage(slug);

  if (!page) {
    return {
      title: 'Page not found',
    };
  }

  return generateSeoMetadata({
    seo: page.seo,
    pathname: slug,
  });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = await fetchPage(slug);

  if (!page) {
    return notFound();
  }

  return (
    <>
      <PageHeader title={page.title} subtitle={page.subtitle} />
      <PageSections sections={page.sections} />
    </>
  );
}

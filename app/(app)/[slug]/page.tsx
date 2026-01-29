import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageClient } from '@/components/PageClient';
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
  const result = await fetchPage(slug);

  if (!result?.data?.page) {
    return {
      title: 'Page not found',
    };
  }

  return generateSeoMetadata({
    seo: result.data.page.seo,
    pathname: slug,
  });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const result = await fetchPage(slug);

  if (!result?.data?.page) {
    return notFound();
  }

  return (
    <PageClient
      query={result.query}
      variables={result.variables}
      data={result.data}
    />
  );
}

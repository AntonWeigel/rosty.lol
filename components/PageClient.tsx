'use client';

import * as React from 'react';
import { useTina } from 'tinacms/dist/react';

import { PageHeader } from '@/components/PageHeader';
import { PageSections } from '@/components/PageSections';
import { PageQuery } from '@/tina/__generated__/types';

type PageClientProps = {
  query: string;
  variables: { relativePath: string };
  data: PageQuery;
};

export const PageClient: React.FC<PageClientProps> = ({
  query,
  variables,
  data,
}) => {
  const { data: liveData } = useTina({
    query,
    variables,
    data,
  });

  const page = liveData?.page;

  if (!page) return null;

  return (
    <>
      <PageHeader title={page.title} subtitle={page.subtitle} />
      <PageSections sections={page.sections} />
    </>
  );
};

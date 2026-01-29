'use client';

import * as React from 'react';
import { useTina } from 'tinacms/dist/react';

import { DocsBreadcrumbs } from '@/components/DocsBreadcrumbs';
import { DocsPagination } from '@/components/DocsPagination';
import { DocsSections } from '@/components/DocsSections';
import { DocQuery } from '@/tina/__generated__/types';
import { FlatNavItem } from '@/types';

type DocsClientProps = {
  query: string;
  variables: { relativePath: string };
  data: DocQuery;
  breadcrumbs: { title: string; href: string }[];
  prev: FlatNavItem | null;
  next: FlatNavItem | null;
};

export const DocsClient: React.FC<DocsClientProps> = ({
  query,
  variables,
  data,
  breadcrumbs,
  prev,
  next,
}) => {
  const { data: liveData } = useTina({
    query,
    variables,
    data,
  });

  const doc = liveData?.doc;

  if (!doc) return null;

  return (
    <>
      <DocsBreadcrumbs breadcrumbs={breadcrumbs} />
      <DocsSections sections={doc.sections} />
      <DocsPagination prev={prev} next={next} />
    </>
  );
};

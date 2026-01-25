import * as React from 'react';

import { FlatNavItem } from '@/types';

import { PaginationLink } from './PaginationLink';

type DocsPaginationProps = {
  prev?: FlatNavItem | null;
  next?: FlatNavItem | null;
};

export const DocsPagination: React.FC<DocsPaginationProps> = ({
  prev,
  next,
}) => {
  if (!prev && !next) return null;

  return (
    <nav
      className="flex w-full justify-between gap-6"
      aria-label="Docs navigation"
    >
      {prev ? (
        <PaginationLink item={prev} direction="prev" />
      ) : (
        <div className="w-1/2" />
      )}
      {next ? (
        <PaginationLink item={next} direction="next" />
      ) : (
        <div className="w-1/2" />
      )}
    </nav>
  );
};

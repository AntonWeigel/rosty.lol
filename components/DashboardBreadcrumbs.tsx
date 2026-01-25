import Link from 'next/link';
import * as React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';
import type { BreadcrumbEntry } from '@/types';

type DashboardBreadcrumbsProps = {
  items: BreadcrumbEntry[];
};

export const DashboardBreadcrumbs = ({ items }: DashboardBreadcrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map(({ title, url, isLast }) => (
          <React.Fragment key={url}>
            {isLast ? (
              <BreadcrumbPage>{title}</BreadcrumbPage>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={url}>{title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {!isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

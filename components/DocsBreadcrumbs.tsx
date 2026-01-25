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

type DocsBreadcrumbsProps = {
  breadcrumbs: { title: string; href: string }[];
};

export const DocsBreadcrumbs: React.FC<DocsBreadcrumbsProps> = ({
  breadcrumbs,
}) => {
  if (!breadcrumbs.length) return null;

  return (
    <section className="w-full">
      <Breadcrumb variant="large" className="mb-6">
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <React.Fragment key={crumb.href}>
                {isLast ? (
                  <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.title}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
};

import * as React from 'react';

import { cn } from '@/utils';

type PageHeaderProps = {
  title: string;
  subtitle?: string | null | undefined;
  className?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-secondary-light dark:bg-primary-dark flex w-full flex-col gap-4 rounded-2xl px-4 py-20 text-center shadow-md',
        className,
      )}
    >
      <h1 className="text-5xl font-semibold">{title}</h1>
      {subtitle && (
        <p className="text-secondary-dark dark:text-secondary-light mt-2 text-lg font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};

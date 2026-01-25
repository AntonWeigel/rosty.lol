import * as React from 'react';

export const DataTableBadge: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <span className="border-secondary-dark/20 bg-primary-light/50 text-secondary-dark dark:border-secondary-light/20 dark:bg-secondary-dark/50 dark:text-secondary-light rounded-lg border px-4 py-1 text-sm font-medium">
      {children}
    </span>
  );
};

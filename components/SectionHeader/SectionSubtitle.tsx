import * as React from 'react';

export const SectionSubtitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p className="text-secondary-dark dark:text-neutral text-center text-lg font-medium sm:text-xl">
    {children}
  </p>
);

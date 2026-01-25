import * as React from 'react';

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h2 className="text-primary-dark dark:text-primary-light text-center text-4xl leading-tight font-medium sm:text-5xl sm:leading-tight">
    {children}
  </h2>
);

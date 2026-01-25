import * as React from 'react';

export const SectionLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h3 className="text-highlight text-sm font-semibold tracking-wider uppercase">
    {children}
  </h3>
);

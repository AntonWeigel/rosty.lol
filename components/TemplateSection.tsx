import * as React from 'react';

import { cn, normalizeValueFromTina } from '@/utils';

export type TemplateSectionProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  'id'
> & {
  id?: string | null;
  highlighted?: boolean;
};

export const TemplateSection = ({
  id,
  className,
  highlighted,
  children,
  ...props
}: TemplateSectionProps) => (
  <section
    id={normalizeValueFromTina(id)}
    className={cn(
      'flex w-full flex-col items-center justify-center gap-12',
      highlighted
        ? 'bg-secondary-light dark:bg-primary-dark -mt-24 w-screen py-24'
        : 'scroll-mt-24',
      className,
    )}
    {...props}
  >
    {children}
  </section>
);

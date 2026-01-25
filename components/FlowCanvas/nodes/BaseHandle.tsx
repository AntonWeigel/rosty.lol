import { Handle, HandleProps } from '@xyflow/react';
import * as React from 'react';

import { cn } from '@/utils';

export type BaseHandleProps = HandleProps;

export const BaseHandle = ({
  className,
  children,
  ...props
}: BaseHandleProps) => (
  <Handle
    className={cn(
      'bg-primary-light dark:border-neutral/50 dark:bg-secondary-dark h-[11px] w-[11px] rounded-full border transition',
      className,
    )}
    {...props}
  >
    {children}
  </Handle>
);

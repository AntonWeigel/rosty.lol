'use client';

import { Loader } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils';

type LoadingOverlayProps = React.HTMLAttributes<HTMLDivElement> & {
  text?: string;
};

export const LoadingOverlay = ({
  className,
  text,
  ...props
}: LoadingOverlayProps) => (
  <div
    className={cn(
      'dark:text-neutral text-primary-light fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/50 backdrop-blur-xs',
      className,
    )}
    {...props}
  >
    <Loader className="size-8 animate-spin" />
    {text && <p className="text-sm">{text}</p>}
  </div>
);

'use client';

import { Loader } from 'lucide-react';
import * as React from 'react';

import { Button, ButtonProps } from '@/components/ui/Button';

export type TransitionButtonProps = ButtonProps & {
  isPending: boolean;
  icon?: React.ReactNode;
  pendingText: string;
  children: React.ReactNode;
};

export const TransitionButton: React.FC<TransitionButtonProps> = ({
  isPending,
  icon,
  pendingText,
  children,
  ...props
}) => (
  <Button disabled={isPending} {...props} variant="fire">
    {isPending ? (
      <>
        <Loader className="size-4 animate-spin" />
        <span>{pendingText}</span>
      </>
    ) : (
      <>
        {icon}
        <span>{children}</span>
      </>
    )}
  </Button>
);

'use client';

import * as React from 'react';
import { useFormStatus } from 'react-dom';

import { TransitionButton } from '@/components/TransitionButton';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils';

type SubmitButtonProps = React.ComponentProps<typeof Button> & {
  pendingText?: string;
  icon?: React.ReactNode;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  pendingText = 'Submitting…',
  icon,
  className,
  ...props
}) => {
  const { pending } = useFormStatus();

  return (
    <TransitionButton
      type="submit"
      isPending={pending}
      pendingText={pendingText}
      icon={icon}
      className={cn('w-fit', className)}
      {...props}
    >
      {children}
    </TransitionButton>
  );
};

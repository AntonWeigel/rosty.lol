import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

export const inputBaseStyles =
  'flex h-10 w-full rounded-xl border border-secondary-dark/20 px-4 py-1 text-sm text-primary-dark shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral placeholder:text-primary-dark/50 focus:outline-hidden focus:ring-2 focus:ring-highlight/30 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary-light/20 dark:bg-primary-dark/50 dark:text-primary-light dark:placeholder:text-primary-light/50 dark:focus:ring-highlight/30';

export const inputVariants = cva(inputBaseStyles, {
  variants: {
    variant: {
      primary: 'bg-primary-light/50 dark:bg-secondary-dark/50',
      secondary: 'bg-secondary-light/50',
    },
    invalid: {
      true: 'border-destructive/20 bg-destructive/10 text-destructive focus:ring-destructive/30 dark:border-destructive/20 dark:bg-destructive/10 dark:text-destructive dark:focus:ring-destructive/30',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

const Input = ({
  className,
  type = 'text',
  variant,
  invalid,
  ...props
}: InputProps) => (
  <input
    type={type}
    className={cn(inputVariants({ variant, invalid }), className)}
    {...props}
  />
);

export { Input };

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-primary-light transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-highlight/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-secondary-dark',
  {
    variants: {
      variant: {
        default:
          'bg-[image:var(--gradient-fire)] text-primary-dark shadow-xs hover:opacity-90',
        accent: 'bg-accent text-primary-light hover:bg-accent/80',
        success: 'bg-success text-primary-light hover:bg-success/80',
        highlight:
          'border-2 border-highlight/20 shadow-xs hover:bg-primary-dark/10 dark:border-highlight/20 dark:hover:bg-primary-light/10',
        outline:
          'border-2 border-primary-dark/20 shadow-xs hover:bg-primary-dark/10 dark:border-primary-light/20 dark:hover:bg-primary-light/10',
        destructive:
          'border-2 border-destructive/20 text-destructive shadow-xs hover:bg-destructive/10 dark:border-destructive/20',
        ghost: 'hover:text-highlight dark:hover:text-highlight',
        link: 'underline-offset-4 hover:underline',
        icon: cn(
          'border border-secondary-dark/50 hover:bg-highlight/10 hover:border-highlight/20 bg-secondary-light/50 shadow-xs',
          'dark:border-neutral/50 dark:hover:bg-highlight/10 dark:hover:border-highlight/20 dark:bg-primary-dark/50',
        ),
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-7 p-4',
        md: 'h-8 rounded-lg px-2',
        lg: 'h-10 px-8 py-2',
        icon: 'size-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };

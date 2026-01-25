import { ChevronRightIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

const breadcrumbVariants = cva('group text-secondary-dark dark:text-neutral', {
  variants: {
    variant: {
      default: 'text-sm',
      large: 'text-3xl font-medium',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Breadcrumb = ({
  className,
  variant,
  ...props
}: React.ComponentProps<'nav'> &
  VariantProps<typeof breadcrumbVariants> & {
    separator?: React.ReactNode;
  }) => (
  <nav
    aria-label="breadcrumb"
    data-variant={variant}
    className={cn(breadcrumbVariants({ variant }), className)}
    {...props}
  />
);

const BreadcrumbList = ({
  className,
  ref,
  ...props
}: React.ComponentProps<'ol'> & {
  ref?: React.Ref<HTMLOListElement>;
}) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1.5 break-words sm:gap-2.5',
      className,
    )}
    {...props}
  />
);

const BreadcrumbItem = ({
  className,
  ref,
  ...props
}: React.ComponentProps<'li'> & {
  ref?: React.Ref<HTMLLIElement>;
}) => (
  <li
    ref={ref}
    className={cn('inline-flex list-none items-center gap-1.5', className)}
    {...props}
  />
);

const BreadcrumbLink = ({
  asChild,
  className,
  ref,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
  ref?: React.Ref<HTMLAnchorElement>;
}) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      className={cn(
        'dark:text-neutral text-secondary-dark/50 hover:text-highlight dark:hover:text-highlight transition-colors',
        className,
      )}
      {...props}
    />
  );
};

const BreadcrumbPage = ({
  className,
  ref,
  ...props
}: React.ComponentProps<'span'> & {
  ref?: React.Ref<HTMLSpanElement>;
}) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn(
      'dark:text-primary-light text-primary-dark font-medium',
      className,
    )}
    {...props}
  />
);

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn(
      '[&>svg]:size-3.5 group-data-[variant=large]:[&>svg]:size-6',
      className,
    )}
    {...props}
  >
    {children ?? <ChevronRightIcon />}
  </li>
);

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className="size-4" />
    <span className="sr-only">More</span>
  </span>
);

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};

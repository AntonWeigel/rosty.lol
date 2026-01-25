'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = ({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Viewport>) => (
  <ToastPrimitives.Viewport
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[320px]',
      className,
    )}
    {...props}
  />
);

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-2xl p-4 pr-6 shadow-lg backdrop-blur-md transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default:
          'bg-secondary-dark text-primary-light dark:bg-primary-light dark:text-secondary-dark',
        destructive:
          'bg-destructive/90 text-secondary-light dark:bg-destructive/80',
        success: 'bg-success/90 text-secondary-light dark:bg-success/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Toast = ({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants>) => (
  <ToastPrimitives.Root
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
);

const ToastAction = ({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Action>) => (
  <ToastPrimitives.Action
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus:ring-1 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50',
      'hover:bg-secondary focus:ring-highlight/30 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive group-[.destructive]:border-neutral/50 bg-transparent',
      className,
    )}
    {...props}
  />
);

const ToastClose = ({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Close>) => (
  <ToastPrimitives.Close
    className={cn(
      'text-secondary-light hover:text-primary-light absolute top-2 right-2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:ring-1 focus:outline-hidden group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className,
    )}
    toast-close=""
    {...props}
  >
    <Cross2Icon className="size-4" />
  </ToastPrimitives.Close>
);

const ToastTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Title>) => (
  <ToastPrimitives.Title
    className={cn('text-sm font-semibold [&+div]:text-xs', className)}
    {...props}
  />
);

const ToastDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Description>) => (
  <ToastPrimitives.Description
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
);

type ToastProps = React.ComponentProps<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  type ToastActionElement,
  ToastClose,
  ToastDescription,
  type ToastProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
};

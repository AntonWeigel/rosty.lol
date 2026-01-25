'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-xs',
      className,
    )}
    {...props}
  />
);

const dialogVariants = cva(
  'fixed z-50 grid w-full max-w-[calc(100%-32px)] rounded-2xl gap-8 shadow-lg transition-all duration-200 p-6 bg-secondary-light dark:bg-primary-dark ' +
    'data-[state=open]:animate-in data-[state=closed]:animate-out ' +
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ' +
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ' +
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] ' +
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
  {
    variants: {
      size: {
        sm: 'sm:max-w-[360px]',
        default: 'sm:max-w-[540px]',
        lg: 'sm:max-w-[720px]',
      },
      position: {
        centered: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        top: 'left-1/2 top-[10%] -translate-x-1/2',
      },
    },
    defaultVariants: {
      size: 'default',
      position: 'centered',
    },
  },
);

export interface DialogContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogVariants> {
  showCloseButton?: boolean;
}

const DialogContent = ({
  className,
  children,
  size,
  position,
  showCloseButton = true,
  ...props
}: DialogContentProps) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(dialogVariants({ size, position }), className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          className={cn(
            'absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100',
            'focus:ring-highlight/30 dark:focus:ring-highlight/30 focus:ring-4 focus:outline-hidden',
            'ring-offset-primary-light data-[state=open]:text-secondary-dark data-[state=open]:bg-highlight dark:data-[state=open]:text-primary-light',
            'disabled:pointer-events-none',
          )}
        >
          <Cross2Icon className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
);

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-4 text-center', className)}
    {...props}
  />
);

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex justify-center gap-6', className)} {...props} />
);

const DialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    className={cn(
      'text-highlight flex items-center justify-center gap-2 text-center text-sm font-semibold tracking-wide uppercase',
      className,
    )}
    {...props}
  />
);

const DialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    className={cn(
      'dark:text-neutral text-secondary-dark text-sm leading-relaxed',
      className,
    )}
    {...props}
  />
);

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

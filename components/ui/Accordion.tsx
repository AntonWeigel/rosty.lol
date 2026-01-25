'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { cn } from '@/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item
    className={cn(
      'dark:bg-primary-dark bg-secondary-light group rounded-2xl border border-transparent px-6 py-4 shadow-xs transition-all duration-300 sm:rounded-3xl sm:px-10 sm:py-6',
      'data-[state=open]:border-secondary-dark/20 data-[state=open]:dark:border-neutral/20',
      className,
    )}
    {...props}
  />
);

const AccordionTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        'dark:text-primary-light text-primary-dark flex flex-1 items-center justify-between text-left text-lg font-medium [&[data-state=open]>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-6 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

const AccordionContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content
    className="text-secondary-dark data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down dark:text-neutral overflow-hidden"
    {...props}
  >
    <div className={cn('pt-6', className)}>{children}</div>
  </AccordionPrimitive.Content>
);

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

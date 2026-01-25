'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/utils';

import { useCenterActiveTab } from './useCenterActiveTab';
import { useCheckScroll } from './useCheckScroll';

const Tabs = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root
    className={cn('relative flex w-screen flex-col items-center', className)}
    {...props}
  />
);

const TabsList = ({
  className,
  activeTab,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  activeTab?: string;
}) => {
  const tabsListRef = React.useRef<HTMLDivElement>(null);

  const { canScrollLeft, canScrollRight } = useCheckScroll(tabsListRef);
  useCenterActiveTab(tabsListRef, activeTab);

  return (
    <TabsPrimitive.List
      ref={tabsListRef}
      className={cn(
        'scrollbar-hide flex w-full items-center justify-between gap-8 overflow-x-auto p-4 sm:max-w-3xl',
        className,
      )}
      {...props}
    >
      {/* Conditional Gradient Indicators */}
      {canScrollLeft && (
        <div className="from-secondary-light/70 via-secondary-light/30 dark:from-primary-dark/80 dark:via-primary-dark/30 pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r to-transparent blur-xs sm:w-12 md:w-16" />
      )}
      {canScrollRight && (
        <div className="from-secondary-light/70 via-secondary-light/30 dark:from-primary-dark/80 dark:via-primary-dark/30 pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l to-transparent blur-xs sm:w-12 md:w-16" />
      )}

      {children}
    </TabsPrimitive.List>
  );
};

const TabsTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      'flex flex-col items-center justify-center gap-3 whitespace-nowrap',
      'rounded-lg p-2.5 transition-all',
      'dark:text-primary-light dark:hover:text-highlight dark:data-[state=active]:text-highlight text-primary-dark hover:text-highlight hover:bg-highlight/10 dark:hover:bg-highlight/10 data-[state=active]:text-highlight font-medium',
      className,
    )}
    {...props}
  />
);

const TabsContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    className={cn(
      'bg-secondary-light dark:bg-primary-dark m-auto mt-4 w-full max-w-3xl px-6 py-10',
      className,
    )}
    {...props}
  />
);

export { Tabs, TabsContent, TabsList, TabsTrigger };

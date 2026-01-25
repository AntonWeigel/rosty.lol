'use client';

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import * as React from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';

import { Button, buttonVariants } from '@/components/ui/Button';
import { cn } from '@/utils';

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) => {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('text-primary-dark p-3 font-sans', className)}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-4 md:flex-row',
          defaultClassNames.months,
        ),
        month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-primary-dark',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-primary-dark',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex h-9 w-full items-center justify-center font-semibold text-primary-dark',
          defaultClassNames.month_caption,
        ),
        caption_label: cn(
          'text-sm font-medium',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse space-y-1',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-neutral w-9 font-normal text-[0.8rem]',
          defaultClassNames.weekday,
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 transition-all duration-200 rounded-md',
          'hover:bg-secondary-light hover:text-primary-dark',
          'aria-selected:bg-highlight/20 aria-selected:text-highlight',
          'aria-selected:hover:bg-highlight/30 aria-selected:hover:text-highlight',
          defaultClassNames.day,
        ),
        day_today: 'bg-secondary-light text-primary-dark rounded-xl',
        outside: cn(
          'text-neutral opacity-50 aria-selected:bg-highlight/10 aria-selected:text-highlight aria-selected:opacity-30',
          defaultClassNames.outside,
        ),
        disabled: cn('text-neutral opacity-30', defaultClassNames.disabled),
        range_middle:
          'aria-selected:bg-secondary-light aria-selected:text-primary-dark',
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          const Icon =
            orientation === 'left'
              ? ChevronLeftIcon
              : orientation === 'right'
                ? ChevronRightIcon
                : ChevronDownIcon;
          return <Icon className={cn('h-4 w-4', className)} {...props} />;
        },
        ...components,
      }}
      {...props}
    />
  );
};

export { Calendar };

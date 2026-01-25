'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { inputBaseStyles } from '@/components/ui/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { cn, formatDateShort } from '@/utils';

type DatePickerProps = {
  date: Date | undefined;
  setDateAction: (date: Date | undefined) => void;
  name?: string;
  placeholder?: string;
  disabled?: React.ComponentProps<typeof DayPicker>['disabled'];
  className?: string;
};

export const DatePicker = ({
  date,
  setDateAction,
  name,
  placeholder = 'Pick a date',
  disabled,
  className,
}: DatePickerProps) => {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              inputBaseStyles,
              'bg-primary-light/50 hover:bg-primary-light/80 justify-start text-left font-normal',
              !date && 'text-primary-dark/50',
            )}
          >
            {date ? formatDateShort(date) : <span>{placeholder}</span>}
            <CalendarIcon className="ml-auto size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDateAction}
            disabled={disabled}
            autoFocus
          />
        </PopoverContent>
      </Popover>

      {name && (
        <input
          type="hidden"
          name={name}
          value={date ? format(date, 'yyyy-MM-dd') : ''}
        />
      )}
    </div>
  );
};

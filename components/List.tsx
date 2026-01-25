import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { CheckIcon, CloseIcon } from '@/icons';
import { cn } from '@/utils';

const listItemVariants = cva('flex items-start space-x-2 text-left', {
  variants: {
    type: {
      default: 'text-secondary-dark dark:text-neutral',
      accent: 'text-accent',
      success: 'text-success',
      destructive: 'text-destructive',
      disabled: 'text-secondary-dark/50 line-through dark:text-neutral/50',
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

export interface ListItemProps extends VariantProps<typeof listItemVariants> {
  children: React.ReactNode;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, type, className }) => (
  <li className={listItemVariants({ type })}>
    <div className={cn('mt-0.5 size-5', className)}>
      {type === 'disabled' || type === 'destructive' ? (
        <CloseIcon />
      ) : (
        <CheckIcon />
      )}
    </div>
    <span>{children}</span>
  </li>
);

const List: React.FC<{ children: React.ReactNode }> & {
  Item: typeof ListItem;
} = ({ children }) => <ul className="space-y-2">{children}</ul>;

List.Item = ListItem;

export { List, listItemVariants };

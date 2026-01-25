import * as React from 'react';

import { cn } from '@/utils';

type ToggleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
  srText?: string;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  icon,
  srText,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        'hover:text-highlight text-secondary-dark hover:bg-highlight/10 dark:text-primary-light dark:hover:text-highlight rounded-lg p-2.5 transition-all',
        'dark:focus:ring-highlight/30',
        className,
      )}
      {...props}
    >
      {icon}
      {srText && <span className="sr-only">{srText}</span>}
    </button>
  );
};

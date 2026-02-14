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
        'hover:text-highlight text-secondary-dark dark:text-primary-light dark:hover:text-highlight rounded-lg p-2 transition-all',
        className,
      )}
      {...props}
    >
      {icon}
      {srText && <span className="sr-only">{srText}</span>}
    </button>
  );
};

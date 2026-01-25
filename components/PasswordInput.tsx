'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';

import { Input, InputProps } from '@/components/ui/Input';
import { cn } from '@/utils';

export const PasswordInput = ({ className, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative w-full">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-8', className)}
        autoComplete="current-password"
        required
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="text-primary-dark/50 hover:text-highlight/50 dark:text-neutral dark:hover:text-highlight/50 absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          <EyeIcon className="size-4" />
        ) : (
          <EyeOffIcon className="size-4" />
        )}
      </button>
    </div>
  );
};

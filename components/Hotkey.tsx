import * as React from 'react';

import { cn } from '@/utils';

type HotkeyProps = {
  className?: string;
  children: React.ReactNode;
};

export const Hotkey: React.FC<HotkeyProps> & {
  Symbol: typeof HotkeySymbol;
} = ({ className, children }) => {
  return (
    <div
      className={cn(
        'text-secondary-dark dark:text-neutral flex items-center space-x-1 text-xs',
        className,
      )}
    >
      {children}
    </div>
  );
};

type HotkeySymbolProps = {
  children: React.ReactNode;
};

const HotkeySymbol: React.FC<HotkeySymbolProps> = ({ children }) => {
  return (
    <span className="border-secondary-dark/50 bg-secondary-light dark:border-neutral/50 dark:bg-primary-dark flex h-5 items-center justify-center rounded-md border px-1">
      {children}
    </span>
  );
};

Hotkey.Symbol = HotkeySymbol;

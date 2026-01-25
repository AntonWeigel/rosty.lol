'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';

import { ToggleButton } from '@/components/ToggleButton';
import { Skeleton } from '@/components/ui/Skeleton';
import { MoonIcon, SunIcon } from '@/icons';

export const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="size-11 rounded-lg" />;
  }

  const isDarkMode = resolvedTheme === 'dark';

  const toggleTheme = () => setTheme(isDarkMode ? 'light' : 'dark');

  const icon = isDarkMode ? <MoonIcon /> : <SunIcon />;

  return (
    <ToggleButton
      icon={icon}
      onClick={toggleTheme}
      srText="Toggle theme"
      aria-label="Toggle theme"
    />
  );
};

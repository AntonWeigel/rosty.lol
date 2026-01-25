'use client';

import * as React from 'react';

import { ScreenValue } from '@/constants/screens';

/**
 * Hook to determine if the current screen width is **below a specific breakpoint**.
 *
 * @param screenValue A pixel value from the `Screen` constants (e.g., `Screen.sm`)
 * @returns `true` if the viewport is smaller than the given breakpoint
 */
export const useScreenBreakpoint = (screenValue: ScreenValue): boolean => {
  const [matches, setMatches] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${screenValue - 1}px)`);

    const update = () => {
      setMatches(mql.matches);
    };

    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [screenValue]);

  return !!matches;
};

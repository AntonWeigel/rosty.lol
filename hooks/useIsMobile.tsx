'use client';

import { Screen } from '@/constants/screens';
import { useScreenBreakpoint } from '@/hooks/useScreenBreakpoint';

/**
 * Determines if the current viewport width matches a mobile breakpoint.
 *
 * @returns `true` if the viewport is smaller than `Screen.md`.
 */
export const useIsMobile = (): boolean => {
  return useScreenBreakpoint(Screen.md);
};

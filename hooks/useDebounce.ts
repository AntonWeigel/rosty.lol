'use client';

import * as React from 'react';

/**
 * Delays updating a value until after a specified delay.
 *
 * @param value - The value to debounce.
 * @param delay - Delay in milliseconds.
 * @returns The debounced value.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

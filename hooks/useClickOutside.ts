'use client';

import * as React from 'react';

/**
 * Runs a callback when the user clicks outside the given element.
 *
 * @param ref - Ref to the target element.
 * @param callback - Function to run on outside click.
 */
export const useClickOutside = <T extends HTMLDivElement | null>(
  ref: React.RefObject<T>,
  callback: () => void,
): void => {
  React.useEffect(() => {
    // Function to call when click is detected outside the referenced element
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Bind the event listener
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [ref, callback]);
};

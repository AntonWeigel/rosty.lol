'use client';

import * as React from 'react';

/**
 * Tracks whether a DOM element is currently visible in the viewport.
 *
 * @param options - Optional IntersectionObserver options.
 * @returns A ref to attach to the element and a boolean indicating visibility.
 */
export const useInView = <T extends HTMLElement = HTMLElement>(
  options = {},
): [React.RefObject<T | null>, boolean] => {
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
        ...options,
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isInView];
};

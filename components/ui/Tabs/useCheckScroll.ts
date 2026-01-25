import * as React from 'react';

/**
 * Tracks whether a scrollable container can scroll left or right.
 *
 * @param tabsListRef - Ref to a horizontally scrollable element.
 * @returns Flags indicating if left or right scrolling is possible.
 */
export const useCheckScroll = (
  tabsListRef: React.RefObject<HTMLDivElement | null>,
) => {
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    if (tabsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  }, [tabsListRef]);

  React.useEffect(() => {
    const current = tabsListRef.current;
    if (!current) return;

    current.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    const observer = new MutationObserver(checkScroll);
    observer.observe(current, { childList: true, subtree: true });

    // Initial scroll check on mount
    checkScroll();

    // Cleanup event listeners on unmount
    return () => {
      current.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      observer.disconnect();
    };
  }, [checkScroll, tabsListRef]);

  return { canScrollLeft, canScrollRight };
};

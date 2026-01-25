import * as React from 'react';

/**
 * Scrolls the tab container to center the currently active tab.
 *
 * @param tabsListRef - Ref to the scrollable tab container.
 * @param activeTab - The currently active tab key (optional).
 */

export const useCenterActiveTab = (
  tabsListRef: React.RefObject<HTMLDivElement | null>,
  activeTab?: string,
) => {
  const [previousActiveTab, setPreviousActiveTab] =
    React.useState<HTMLElement | null>(null);

  const centerActiveTab = React.useCallback(() => {
    if (tabsListRef?.current) {
      const activeTabElement = tabsListRef.current.querySelector(
        '[data-state="active"]',
      ) as HTMLElement;

      if (activeTabElement && activeTabElement !== previousActiveTab) {
        const tabsContainerWidth = tabsListRef.current.clientWidth;
        const tabWidth = activeTabElement.offsetWidth;
        const tabOffsetLeft = activeTabElement.offsetLeft;

        // Calculate the scroll position needed to center the active tab
        const scrollTo =
          tabOffsetLeft - (tabsContainerWidth / 2 - tabWidth / 2);

        tabsListRef.current.scrollTo({
          left: scrollTo,
          behavior: 'smooth',
        });

        setPreviousActiveTab(activeTabElement);
      }
    }
  }, [tabsListRef, previousActiveTab]);

  React.useEffect(() => {
    centerActiveTab();
  }, [activeTab, centerActiveTab]);
};

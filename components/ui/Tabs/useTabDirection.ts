import * as React from 'react';

/**
 * Tracks active tab and detects if the user navigated left or right.
 *
 * @param tabs - Array of tab objects with unique `value` keys.
 * @param defaultTab - Initial tab value to show on mount.
 * @returns Current tab value, direction of change, and change handler.
 */
export const useTabDirection = (
  tabs: { value: string }[],
  defaultTab: string,
) => {
  const tabOrder = tabs.map((tab) => tab.value);
  const [activeTab, setActiveTab] = React.useState(defaultTab);
  const [previousIndex, setPreviousIndex] = React.useState(
    tabOrder.indexOf(defaultTab),
  );
  const [direction, setDirection] = React.useState<'left' | 'right'>('left');

  /**
   * Handles tab value change and determines slide direction.
   *
   * @param newTab - The new active tab value.
   */
  const handleTabChange = (newTab: string) => {
    const newIndex = tabOrder.indexOf(newTab);
    if (newIndex === -1) return;

    setDirection(newIndex > previousIndex ? 'left' : 'right');
    setPreviousIndex(newIndex);
    setActiveTab(newTab);
  };

  return {
    activeTab,
    direction,
    handleTabChange,
  };
};

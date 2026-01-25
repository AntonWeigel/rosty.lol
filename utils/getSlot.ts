import * as React from 'react';

/**
 * Extracts a single slot component from children.
 * Use this if you're only interested in one specific child type.
 *
 * @param children - The children passed to a React component.
 * @param slot - The component type to extract.
 * @returns The extracted slot, or `undefined` if not found.
 */
export function getSlot<T>(
  children: React.ReactNode,
  slot: T,
): React.ReactNode | undefined {
  return React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === slot,
  );
}

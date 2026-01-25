import * as React from 'react';

/**
 * Extracts a specific React component from children.
 *
 * @param children - The children passed to a React component.
 * @param component - The component type to extract.
 * @returns An object containing the extracted component (`found`) and the remaining children (`others`).
 */
export function extractComponent<T>(
  children: React.ReactNode,
  component: T,
): { found: React.ReactNode; others: React.ReactNode } {
  const found = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === component,
  );

  const others = React.Children.toArray(children).filter(
    (child) => !React.isValidElement(child) || child.type !== component,
  );

  return { found, others };
}

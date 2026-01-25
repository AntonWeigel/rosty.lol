'use client';

import * as React from 'react';

import { isServer } from '@/utils';

const removeItem = (key: string) => {
  if (!isServer) {
    window.localStorage.removeItem(key);
  }
};

/**
 * Persists state to localStorage with support for serialization and default values.
 *
 * @param key - The localStorage key to use.
 * @param defaultValue - Initial value or initializer function.
 * @param options - Optional serialize/deserialize functions.
 * @returns The state, setter, and a function to manually remove the key.
 */
export const useLocalStorageState = <T>(
  key: string,
  defaultValue: T | (() => T),
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
) => {
  const [state, setState] = React.useState<T>(() => {
    if (isServer)
      return typeof defaultValue === 'function'
        ? (defaultValue as () => T)()
        : defaultValue;

    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage);
      } catch (error) {
        removeItem(key);
      }
    }
    return typeof defaultValue === 'function'
      ? (defaultValue as () => T)()
      : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    if (isServer) return;

    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      removeItem(prevKey);
    }
    prevKeyRef.current = key;

    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState, () => removeItem(key)] as const;
};

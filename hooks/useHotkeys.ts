'use client';

import * as React from 'react';

type HotkeyHandler = (event: KeyboardEvent) => void;

type Hotkey = {
  keys: string[]; // Example: ['Meta', 'K'] or ['Control', 'S']
  handler: HotkeyHandler;
};

/**
 * Listens for custom hotkey combinations and runs their corresponding handlers.
 *
 * @param hotkeys - Array of key combinations and their associated handlers.
 */
export const useHotkeys = (hotkeys: Hotkey[]): void => {
  React.useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      for (const { keys, handler } of hotkeys) {
        const allKeysPressed = keys.every((key) => {
          if (key === 'Meta') return event.metaKey;
          if (key === 'Control') return event.ctrlKey;
          if (key === 'Shift') return event.shiftKey;
          if (key === 'Alt') return event.altKey;
          return event.key?.toLowerCase() === key.toLowerCase();
        });

        if (allKeysPressed) {
          event.preventDefault();
          handler(event);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [hotkeys]);
};

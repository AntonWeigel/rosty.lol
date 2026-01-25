/**
 * Determines whether the current environment is server-side.
 *
 * @returns `true` if running on the server, `false` if in the browser.
 */
export const isServer = typeof window === 'undefined';

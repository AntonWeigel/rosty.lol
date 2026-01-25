/**
 * Builds a callable no-op proxy for disabled integrations that tolerates any API surface.
 *
 * @param name - Integration name used in the default fallback payload
 * @param result - Optional terminal value to resolve for calls
 * @returns A proxy object where any property/method access resolves safely
 */
export function createDisabledProxy(name: string, result?: unknown) {
  const terminal = Promise.resolve(
    result ?? { id: `${name.toLowerCase()}-disabled` },
  );
  const fnProxy: any = new Proxy(() => {}, {
    apply: () => terminal,
    get: () => fnProxy,
  });
  return new Proxy(
    {},
    {
      get: (_t, prop) => (prop === '__enabled' ? false : fnProxy),
    },
  );
}

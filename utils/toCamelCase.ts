function transformObject<T extends Record<string, any>>(obj: T): T {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      acc[camelKey] = obj[key];
      return acc;
    },
    {} as Record<string, any>,
  ) as T;
}

/**
 * Transforms an object's keys from snake_case to camelCase.
 *
 * @param obj - The input object with snake_case keys.
 * @returns A new object with camelCase keys.
 */
export function convertToCamelCase<T extends Record<string, any>>(
  data: any | null,
): T | null {
  if (!data) return null;
  return transformObject(data);
}

/**
 * Converts a single object’s keys from snake_case to camelCase.
 *
 * @param data - The object to convert.
 * @returns The object with camelCase keys, or null if input is null.
 */
export function mapToCamelCase<T extends Record<string, any>>(
  data: any[] | null,
): T[] {
  if (!data) return [];
  return data.map(transformObject);
}

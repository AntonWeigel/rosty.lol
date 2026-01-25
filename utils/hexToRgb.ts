/**
 * Converts a hexadecimal color string (e.g., "#ffffff") to its RGB components.
 *
 * @param hex - A 6-digit hexadecimal string starting with "#".
 * @returns An object with `r`, `g`, and `b` components or `null` if invalid.
 */
export function hexToRgb(
  hex: string,
): { r: number; g: number; b: number } | null {
  const normalized = hex.replace(/^#/, '');
  if (normalized.length !== 6) return null;

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return { r, g, b };
}

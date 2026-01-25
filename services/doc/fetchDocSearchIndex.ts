import { SITE } from '@/config';
import { DOCS_SEARCH_INDEX } from '@/constants';

/**
 * Fetches the documentation search index JSON file from the public URL.
 *
 * @returns Parsed search index data as JSON.
 * @throws Error if the fetch fails.
 */
export async function fetchDocSearchIndex() {
  const response = await fetch(`${SITE.url}/${DOCS_SEARCH_INDEX}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch the search index: ${response.statusText}`);
  }
  return await response.json();
}

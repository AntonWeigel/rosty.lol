/**
 * Extracts snippets of text around the search query from the provided content
 * and highlights the query using <mark> tags.
 * The snippets include up to 20 characters before and 30 after each match.
 *
 * @param text - The content to search within.
 * @param query - The search query to match.
 * @returns An array of snippets containing the matched query highlighted.
 */
export function extractSearchSnippets(text: string, query: string): string[] {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const snippets: string[] = [];

  // Regular expression to match up to 20 characters before and 30 after the query
  const regex = new RegExp(`(.{0,20})(${lowerQuery})(.{0,30})`, 'gi');

  let match;
  while ((match = regex.exec(lowerText))) {
    const before = match[1] || ''; // Text before the match
    const matchText = match[2]; // The matched query
    const after = match[3] || ''; // Text after the match

    // Combine the snippet with <mark> highlighting the query
    const snippet = `${before}<mark>${matchText}</mark>${after}`;
    snippets.push(snippet.trim());
  }

  return snippets.length ? snippets : [];
}

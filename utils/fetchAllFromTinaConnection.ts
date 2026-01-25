/**
 * Recursively fetches all edges from a Tina paginated connection.
 *
 * @template T - The typed edge returned by the Tina query (e.g. `PageConnectionEdges`)
 * @param queryFn - A function that returns a Tina connection
 * @returns A list of non-null edge entries from all pages
 */
export async function fetchAllFromTinaConnection<T>(
  queryFn: (args: { first: number; after?: string }) => Promise<
    | {
        edges?: (T | null)[] | null;
        pageInfo?: {
          hasNextPage: boolean;
          endCursor?: string;
        } | null;
      }
    | undefined
  >,
): Promise<T[]> {
  const allEdges: T[] = [];
  let after: string | undefined = undefined;
  let hasNextPage = true;

  while (hasNextPage) {
    const res = await queryFn({ first: 100, after });
    const edges = res?.edges ?? [];
    allEdges.push(...(edges.filter(Boolean) as T[]));
    hasNextPage = !!res?.pageInfo?.hasNextPage;
    after = res?.pageInfo?.endCursor;
  }

  return allEdges;
}

/**
 * Creates a Supabase-compatible client that safely no-ops when the integration is disabled.
 *
 * @returns A client-shaped object where calls resolve to neutral results (no throws)
 */
export function createDisabledClient(): any {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
    },
    from: () => disabledQueryBuilder(),
    rpc: async () => ({ data: null, error: { message: 'Supabase disabled' } }),
    storage: {
      from: () => ({
        upload: async () => ({
          data: null,
          error: { message: 'Supabase disabled' },
        }),
      }),
    },
  };
}

function disabledQueryBuilder() {
  const result = { data: null, error: { message: 'Supabase disabled' } };
  const chain: any = {
    select: () => chain,
    order: () => chain,
    eq: () => chain,
    limit: () => chain,
    single: async () => result,
    maybeSingle: async () => result,
    insert: async () => result,
    upsert: async () => result,
    update: async () => result,
    delete: async () => result,
  };
  return chain;
}

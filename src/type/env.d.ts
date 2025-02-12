/* eslint-disable no-var */
declare namespace globalThis {
  import type { PagefindSearchOptions } from '../components/search/index'
  var pagefind:
    | {
        // https://github.com/CloudCannon/pagefind/blob/2a0aa90cfb78bb8551645ac9127a1cd49cf54add/pagefind_web_js/lib/coupled_search.ts#L600
        debouncedSearch: <T>(
          term: string,
          options?: PagefindSearchOptions,
          debounceTimeoutMs?: number
        ) => Promise<{
          results: {
            data: () => Promise<T>
            id: string
          }[]
        } | null>
        options: (opts: Record<string, unknown>) => Promise<void>
      }
    | undefined
}

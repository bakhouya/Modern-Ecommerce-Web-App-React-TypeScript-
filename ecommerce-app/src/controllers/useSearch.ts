
// ===============================================================================================
// useSearch.ts
// React Query hook for the public search endpoint.
// ===============================================================================================
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../services/searching/searchService";


// -----------------------------------------------------------------------------------------------
// useSearch
// - query: the SUBMITTED search text (not the input value), so no request is sent while typing
// - enabled: the request runs only when the query is not empty
// - queryKey includes the trimmed query: same search = served from cache
// - signal: React Query gives us an AbortSignal, so an old request is cancelled automatically
// - staleTime: results stay "fresh" for 1 minute (no refetch for the same query)
// - retry: false, same as useTrackOrder
// -----------------------------------------------------------------------------------------------
export const useSearch = (query: string) => {
    const q = query.trim();
    return useQuery({
        queryKey: ["search", q],
        queryFn: ({ signal }) => searchApi(q, signal),
        enabled: Boolean(q),
        retry: false,
        staleTime: 60 * 1000,
    });
};
// -----------------------------------------------------------------------------------------------


import type { SearchResponse } from "../../types/searchTypes";
import { StoreApi } from "../storeApi";



// -----------------------------------------------------------------------------------------------
// SEARCH
// Sends the search text and returns products, brands and categories in one response.
// - params: axios encodes the query string automatically (no need for encodeURIComponent)
// - signal: optional AbortController signal, to cancel an old request when the user
//   submits a new search before the previous one has finished
// -----------------------------------------------------------------------------------------------
export const searchApi = async (q: string, signal?: AbortSignal): Promise<SearchResponse> => {
  const { data } = await StoreApi.get<SearchResponse>("public/search/", {params: { q: q.trim() }, signal});
  return data;
};
// -----------------------------------------------------------------------------------------------

import { QueryClient } from "@tanstack/react-query";
import { STALE_TIME_DATA_CACHE_SHORT } from "@/const";

export function createAppQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1,
                staleTime: STALE_TIME_DATA_CACHE_SHORT,
                networkMode: "online",
                retryDelay: 3000,
            },
        },
    });
}

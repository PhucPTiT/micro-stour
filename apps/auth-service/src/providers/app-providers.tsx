import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { useState, type ReactNode } from "react";
import { createAppQueryClient } from "@/lib/query-client";

type AppProvidersProps = {
    children: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
    const [queryClient] = useState(() => createAppQueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>{children}</TooltipProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

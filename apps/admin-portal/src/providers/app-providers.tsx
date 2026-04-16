import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { type ReactNode, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { createAppQueryClient } from "@/lib/query-client";

type AppProvidersProps = {
    children: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
    const [queryClient] = useState(() => createAppQueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <TooltipProvider>{children}</TooltipProvider>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

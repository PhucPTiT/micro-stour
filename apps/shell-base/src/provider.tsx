import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { ThemeProvider } from "./components/theme-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
    );
}

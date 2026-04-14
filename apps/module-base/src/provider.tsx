import { TooltipProvider } from "@workspace/ui/components/tooltip";

export default function Provider({ children }: { children: React.ReactNode }) {
    return <TooltipProvider>{children}</TooltipProvider>;
}

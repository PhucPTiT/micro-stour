import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
    );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@workspace/ui/globals.css";
import { App } from "./App.tsx";
import AppProviders from "./providers/app-providers.tsx";

// biome-ignore lint/style/noNonNullAssertion: <default>
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProviders>
            <App />
        </AppProviders>
    </StrictMode>,
);

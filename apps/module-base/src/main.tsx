import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@workspace/ui/globals.css";
import App from "./App.tsx";
import Provider from "./provider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <div className="bg-background min-h-svh p-6">
            <Provider>
                <App />
            </Provider>
        </div>
    </StrictMode>,
);

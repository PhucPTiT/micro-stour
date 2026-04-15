import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@workspace/ui/globals.css";
import App from "./App";
import Layout from "./layouts";
import AppProviders from "./providers/app-providers";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProviders>
            <BrowserRouter>
                <Layout>
                    <App />
                </Layout>
            </BrowserRouter>
        </AppProviders>
    </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@workspace/ui/globals.css";
import App from "./App";
import Layout from "./layouts";
import Provider from "./provider";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider>
            <BrowserRouter>
                <Layout>
                    <App />
                </Layout>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);

import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        federation({
            name: "auth-service",
            filename: "authService.js",
            exposes: {
                "./App": "./src/App.tsx",
            },
            shared: ["react", "react-dom", "react-router-dom", "@tanstack/react-query"],
        }),
    ],
    server: {
        host: "0.0.0.0",
        port: 3000,
        strictPort: true,
    },
    preview: {
        port: 3000,
        strictPort: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        target: "esnext",
        modulePreload: false,
        minify: false,
        cssCodeSplit: false,
    },
});

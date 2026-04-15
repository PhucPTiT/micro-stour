import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        federation({
            name: "shell",
            remotes: {
                module: "http://localhost:3001/assets/remoteEntry.js",
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
});

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
            name: "admin-portal",
            remotes: {
                authService: "http://localhost:3000/assets/authService.js",
            },
            shared: ["react", "react-dom", "react-router-dom", "@tanstack/react-query"],
        }),
    ],
    server: {
        host: "0.0.0.0",
        port: 9999,
        strictPort: true,
    },
    preview: {
        port: 9999,
        strictPort: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});

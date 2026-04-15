import type React from "react";
import { ACCESS_TOKEN_KEY } from "@/const";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!token) {
        const callbackUrl = `${window.location.pathname}${window.location.search}`;

        window.location.href = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;

        return null;
    }

    return <>{children}</>;
}

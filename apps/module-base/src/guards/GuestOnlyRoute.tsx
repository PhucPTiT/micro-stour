import type React from "react";
import { ACCESS_TOKEN_KEY } from "@/const";

function GuestOnlyRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    const params = new URLSearchParams(window.location.search);
    const callbackUrl = params.get("callbackUrl");

    if (token) {
        window.location.replace(callbackUrl || "/");
        return null;
    }

    return <>{children}</>;
}

export default GuestOnlyRoute;

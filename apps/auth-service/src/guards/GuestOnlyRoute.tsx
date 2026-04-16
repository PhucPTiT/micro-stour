import { Outlet } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "@/const";

function GuestOnlyRoute() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    const params = new URLSearchParams(window.location.search);
    const callbackUrl = params.get("callbackUrl");

    if (token) {
        window.location.replace(callbackUrl || "/");
        return null;
    }

    return <Outlet />;
}

export default GuestOnlyRoute;

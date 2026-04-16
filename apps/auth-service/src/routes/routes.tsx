import { useRoutes } from "react-router-dom";
import { moduleRoutes } from "./route-config";

export function AppRoutes() {
    return useRoutes(moduleRoutes);
}

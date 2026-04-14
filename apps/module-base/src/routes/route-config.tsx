import type { RouteObject } from "react-router-dom";
import ErrorPage from "@/pages/error";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";

export const moduleRoutes: RouteObject[] = [
    {
        index: true,
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "test",
        element: <div>Test Page</div>,
        errorElement: <ErrorPage />,
    },
    {
        path: "test/:id",
        element: <div>Test ID Page</div>,
        errorElement: <ErrorPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

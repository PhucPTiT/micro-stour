import type { RouteObject } from "react-router-dom";
import GuestOnlyRoute from "@/guards/GuestOnlyRoute";
import { ProtectedRoute } from "@/guards/ProtectedRoute";
import ErrorPage from "@/pages/error";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/not-found";

export const moduleRoutes: RouteObject[] = [
    {
        errorElement: <ErrorPage />,
        children: [
            // Guest routes
            {
                element: <GuestOnlyRoute />,
                children: [
                    {
                        path: "login",
                        element: <LoginPage />,
                    },
                ],
            },

            // Protected routes
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: "test",
                        element: <div>Test Page</div>,
                    },
                    {
                        path: "test/:id",
                        element: <div>Test ID Page</div>,
                    },
                ],
            },

            // Not found
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
];

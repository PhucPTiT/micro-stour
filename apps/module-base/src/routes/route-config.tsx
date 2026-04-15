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
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "login",
                element: (
                    <GuestOnlyRoute>
                        <LoginPage />
                    </GuestOnlyRoute>
                ),
            },
            {
                path: "test",
                element: (
                    <ProtectedRoute>
                        <div>Test Page</div>
                    </ProtectedRoute>
                ),
            },
            {
                path: "test/:id",
                element: (
                    <ProtectedRoute>
                        <div>Test ID Page</div>
                    </ProtectedRoute>
                ),
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
];

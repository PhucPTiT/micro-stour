import AuthServiceApp from "authService/App";
import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "@/components/error-boundary";
import GuestOnlyRoute from "@/guard/GuestOnlyRoute";
import { ProtectedRoute } from "@/guard/ProtectedRoute";
import { ShellLayout } from "@/layouts/layout";
import ErrorPage, { ErrorState } from "@/pages/error";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";

function AuthRoute() {
    return (
        <ErrorBoundary fallback={<ErrorState message="The remote module crashed while rendering." />}>
            <Suspense
                fallback={<div className="bg-card rounded-3xl border p-6 text-sm">Loading module micro app...</div>}
            >
                <AuthServiceApp />
            </Suspense>
        </ErrorBoundary>
    );
}

const router = createBrowserRouter([
    {
        element: <GuestOnlyRoute />,
        children: [
            {
                path: "/auth/test/*",
                element: <AuthRoute />,
            },
        ],
    },

    // Protected routes
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <ShellLayout />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: "/home",
                        element: <HomePage />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export function AppRoutes() {
    return <RouterProvider router={router} />;
}

import ModuleApp from "module/App";
import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "@/components/error-boundary";
import { ShellLayout } from "@/layouts/layout";
import ErrorPage, { ErrorState } from "@/pages/error";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";

function ModuleRoute() {
    return (
        <ErrorBoundary fallback={<ErrorState message="The remote module crashed while rendering." />}>
            <Suspense
                fallback={<div className="bg-card rounded-3xl border p-6 text-sm">Loading module micro app...</div>}
            >
                <ModuleApp />
            </Suspense>
        </ErrorBoundary>
    );
}

const router = createBrowserRouter([
    {
        element: <ShellLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/module/*",
                element: <ModuleRoute />,
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

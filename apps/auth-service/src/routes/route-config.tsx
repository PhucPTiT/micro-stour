import type { RouteObject } from "react-router-dom";
import GuestOnlyRoute from "@/guards/GuestOnlyRoute";
import { ProtectedRoute } from "@/guards/ProtectedRoute";
import ErrorPage from "@/pages/error";
import ForgotPasswordPage from "@/pages/forgot-password";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/not-found";
import RegisterPage from "@/pages/register";

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
                    {
                        path: "register",
                        element: <RegisterPage />,
                    },
                    {
                        path: "forgot-password",
                        element: <ForgotPasswordPage />,
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

import { ROUTES } from "@/shared/model/routers";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./app";
import { AppHeader } from '@/features/header';
import { ProtectedRoute } from './protected-route';
import { ProtectedLayout } from './protectedLayout';

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                element: 
                <>
                    <ProtectedRoute />
                </>,
                children: [
                    {
                        element: <ProtectedLayout />,
                        children: [
                            {
                                path: ROUTES.HOME,
                                lazy: () => import("@/features/home/home.page"),
                            },
                            {
                                path: ROUTES.REGISTATIONUSER,
                                lazy: () => import("@/features/registration-user/registration-user.page"),
                            },
                            {
                                path: ROUTES.INFO,
                                lazy: () => import("@/features/info/info.page"),
                            },
                            {
                                path: ROUTES.ADMINPANEL,
                                lazy: () => import("@/features/admin-panel/admin-panel.page"),
                            },
                            {
                                path: ROUTES.BRANCHES,
                                lazy: () => import("@/features/branch/branch.page"),
                            },
                            {
                                path: ROUTES.TEMPLATESIGN,
                                lazy: () => import("@/features/template-sign/template-sign.page"),
                            },
                        ]
                    },
                    
                ]
            },
            {
                path: ROUTES.LOGIN,
                lazy: () => import("@/features/auth/login.page"),
            },
            {
                path: ROUTES.START,
                loader: () => redirect(ROUTES.HOME),
            },
        ],
    },
]);
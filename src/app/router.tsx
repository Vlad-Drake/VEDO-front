import { ROUTES } from "@/shared/model/routers";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./app";
import { ProtectedRoute } from "./protected-route";
import { ProtectedLayout } from "./protectedLayout";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: (
          <>
            <ProtectedRoute />
          </>
        ),
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
                lazy: () =>
                  import("@/features/registration-user/registration-user.page"),
              },
              {
                path: ROUTES.TASKS,
                lazy: () => import("@/features/tasks/tasks.page"),
              },
              {
                path: ROUTES.DOCS,
                lazy: () => import("@/features/docs/docs.page"),
              },
              {
                path: ROUTES._DOCS,
                loader: () => redirect(ROUTES._DOCS + '/all'),
              },
              {
                path: ROUTES.DOCINFO,
                lazy: () => import("@/features/doc-info/doc-into.page"),
              },
              {
                path: ROUTES._DOCINFO,
                loader: () => redirect(ROUTES._DOCINFO + '/all'),
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
                path: ROUTES._BRANCHES,
                loader: () => redirect(ROUTES._BRANCHES + '/all'),
              },
              {
                path: ROUTES.GROUPCHANGEAPPROVER,
                lazy: () => import("@/features/group-change-approver/group-change-approver.page"),
              },
              {
                path: ROUTES.TEMPLATESIGN,
                lazy: () =>
                  import("@/features/template-sign/template-sign.page"),
              },
              {
                path: ROUTES.REGULARAPPROVERS,
                lazy: () => import("@/features/regular-approvers/regular-approvers.page"),
              }
            ],
          },
        ],
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

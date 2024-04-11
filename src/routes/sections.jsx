import { Suspense, lazy } from "react";
import { Outlet, useRoutes, Navigate } from "react-router-dom";
import DashboardLayout from "@/layout";
import { Loading } from "@/components";
import LoginGoogle from "@/sections/authen/Authen";
import useAuth from "@/hooks/useAuth";

export const UserManagementView = lazy(() => import("@/pages/UserManagement"));

export const Router = () => {
  const { isAuthenticated } = useAuth();

  const routes = useRoutes([
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/user" /> : <LoginGoogle />,
    },
    {
      element: isAuthenticated ? (
        <DashboardLayout>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/" />
      ),
      children: [
        {
          element: <UserManagementView />,
          path: "/user",
        },
      ],
    },
  ]);
  return routes;
};

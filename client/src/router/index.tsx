import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const LoginPage = lazy(() => import("../pages/Login/Index"));
const RegisterPage = lazy(() => import("../pages/Register/Index"));
const MainLayout = lazy(() => import("../layout/MainLayout"));
const DashboardPage = lazy(() => import("../pages/Dashboard/Index"));

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    )
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<Loading />}>
        <RegisterPage />
      </Suspense>
    )
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Navigate to="/dashboard" />
        )
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <DashboardPage />
          </Suspense>
        )
      },
    ]
  }
])
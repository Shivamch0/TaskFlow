import { lazy } from "react";
import AppLayout from "../layouts/AppLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";

const DashboardPage = lazy(
  () => import("../pages/dashboard/DashboardPage.jsx"),
);
const ProjectsPage = lazy(() => import("../pages/projects/ProjectsPage.jsx"));
const ProjectDetailsPage = lazy(
  () => import("../pages/projects/ProjectDetailsPage.jsx"),
);
const TasksPage = lazy(() => import("../pages/tasks/TasksPage.jsx"));
const AnalyticsPage = lazy(
  () => import("../pages/analytics/AnalyticsPage.jsx"),
);
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage.jsx"));
const SettingsPage = lazy(() => import("../pages/settings/SettingsPage.jsx"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage.jsx"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage.jsx"));
const ForgotPasswordPage = lazy(
  () => import("../pages/auth/ForgotPasswordPage.jsx"),
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.jsx"));

export const routeConfig = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:projectId", element: <ProjectDetailsPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthLayout>
        <RegisterPage />
      </AuthLayout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthLayout>
        <ForgotPasswordPage />
      </AuthLayout>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

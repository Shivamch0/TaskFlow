import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { AppLayout } from '../layouts/AppLayout';
import { AuthLayout } from '../layouts/AuthLayout';

// Pages
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import ProjectDetails from '../pages/ProjectDetails';
import Analytics from '../pages/Analytics';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const router = createBrowserRouter([
  // Auth Routes Wrapper
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  // App SaaS Dashboard Routes Wrapper (Protected)
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'projects/:projectId',
        element: <ProjectDetails />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  // Catch all - redirect to dashboard index or login
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layers } from 'lucide-react';

export function AuthLayout() {
  const { currentUser, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <svg className="animate-spin h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  // If user is already authenticated, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-200">
      {/* Top background accent details */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-slate-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-2xl mb-6">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Layers className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-slate-800 dark:text-slate-200">
            TaskFlow
          </span>
        </div>
        
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight font-display">
          Welcome to TaskFlow
        </h2>
        <p className="mt-2 text-sm text-slate-400 dark:text-slate-500 font-medium">
          Manage your projects, tasks, and subtasks effortlessly.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-premium border border-slate-100 dark:border-slate-800 rounded-xl sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

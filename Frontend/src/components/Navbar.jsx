import React from 'react';
import { Menu, Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function Navbar({ onMenuOpen }) {
  const location = useLocation();

  // Get current page name based on path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/projects/')) return 'Project Details';
    if (path === '/projects') return 'Projects';
    if (path === '/analytics') return 'Analytics';
    if (path === '/profile') return 'Profile';
    if (path === '/settings') return 'Settings';
    return 'TaskFlow';
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onMenuOpen}
          className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold font-display text-slate-800">
          {getPageTitle()}
        </h2>
      </div>

      {/* Date display */}
      <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
        <span>{formattedDate}</span>
      </div>
    </header>
  );
}

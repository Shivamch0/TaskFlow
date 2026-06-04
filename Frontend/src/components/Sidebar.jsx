import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  BarChart3, 
  UserCircle, 
  Settings as SettingsIcon, 
  LogOut, 
  X,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Sidebar({ isOpen, onClose }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: UserCircle },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-100 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Top brand header */}
        <div>
          <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2.5" onClick={onClose}>
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-800">
                TaskFlow
              </span>
            </NavLink>
            <button 
              type="button" 
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 lg:hidden rounded-lg hover:bg-slate-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User profile section */}
        {currentUser && (
          <div className="p-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-3 px-2">
              <img 
                src={currentUser.avatar || 'https://api.dicebear.com/7.x/adventurer/svg'} 
                alt={currentUser.name} 
                className="w-10 h-10 rounded-full border border-slate-100 bg-slate-50 object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-700 truncate font-display">
                  {currentUser.name}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4.5 h-4.5" />
              Sign Out
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

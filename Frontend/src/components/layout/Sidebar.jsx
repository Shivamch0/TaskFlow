import { NavLink } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  User,
  Settings,
  Sparkles,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Projects", path: "/projects", icon: LayoutDashboard },
  { name: "Tasks", path: "/tasks", icon: ClipboardList },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Profile", path: "/profile", icon: User },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex lg:w-80 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white lg:px-5 lg:py-8">
      <div className="flex items-center gap-3 px-2">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
          TF
        </div>
        <div>
          <p className="text-xl font-semibold">TaskFlow</p>
          <p className="text-sm text-slate-500">Productivity suite</p>
        </div>
      </div>

      <div className="mt-10 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white shadow"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </div>

      <div className="mt-auto rounded-3xl bg-slate-50 p-5 text-slate-700 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Workspace</p>
            <p className="text-xs text-slate-500">Design & delivery</p>
          </div>
          <Sparkles className="h-5 w-5 text-slate-500" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

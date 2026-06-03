import { Search, PlusCircle, Bell, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-50 p-3 text-slate-600 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Welcome back
              </p>
              <h1 className="text-xl font-semibold text-slate-900">
                Your active workspace
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 min-w-0">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search projects, tasks, teams"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">
            <PlusCircle className="h-5 w-5" />
            New project
          </button>
          <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition hover:bg-slate-100">
            <Bell className="h-5 w-5" />
          </button>
          <Link
            to="/profile"
            className="inline-flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2 transition hover:bg-slate-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
              A
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-900">
                Alex Morgan
              </p>
              <p className="text-xs text-slate-500">Product Designer</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

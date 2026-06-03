import { Link, useLocation } from "react-router-dom";

const labels = {
  projects: "Projects",
  tasks: "Tasks",
  analytics: "Analytics",
  profile: "Profile",
  settings: "Settings",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="text-slate-400 hover:text-slate-700">
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const label = labels[segment] || segment.replace(/-/g, " ");

          return (
            <li key={path} className="flex items-center gap-2">
              <span>/</span>
              {index === segments.length - 1 ? (
                <span className="font-medium text-slate-900 capitalize">
                  {label}
                </span>
              ) : (
                <Link
                  to={path}
                  className="text-slate-400 hover:text-slate-700 capitalize"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

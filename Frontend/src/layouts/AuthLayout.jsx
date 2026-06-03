import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl bg-white border border-slate-200 shadow-lg rounded-3xl p-8 sm:p-10">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 transition"
          >
            TaskFlow
          </Link>
          <p className="mt-4 text-slate-500">
            A modern productivity dashboard for teams and individuals.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

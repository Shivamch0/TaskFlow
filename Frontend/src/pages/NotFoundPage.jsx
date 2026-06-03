import { Link } from "react-router-dom";
import Button from "../components/ui/Button.jsx";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
          Page not found
        </p>
        <h1 className="mt-6 text-4xl font-semibold text-slate-900">
          Oops! Nothing to see here.
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <Button variant="primary">Return to dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

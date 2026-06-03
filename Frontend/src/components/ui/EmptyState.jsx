const EmptyState = ({ title, description, action }) => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
        {title}
      </p>
      <p className="mt-4 text-sm text-slate-600">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;

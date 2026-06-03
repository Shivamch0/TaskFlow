const ProgressBar = ({ value = 0, label, className = "" }) => {
  return (
    <div className={className}>
      {label && (
        <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-linear-to-r from-slate-900 to-slate-600 transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

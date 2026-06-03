const Input = ({ label, error, helperText, className = "", ...props }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-800">{label}</label>
      )}
      <input
        className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 outline-none transition ${error ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white"} focus:border-slate-400 focus:ring-2 focus:ring-slate-200`}
        {...props}
      />
      {helperText && <p className="text-xs text-slate-500">{helperText}</p>}
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
};

export default Input;

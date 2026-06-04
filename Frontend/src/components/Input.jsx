import React from 'react';

export function Input({
  label,
  type = 'text',
  error,
  className = '',
  id,
  options = [], // for type="select"
  rows = 3, // for type="textarea"
  ...props
}) {
  const inputId = id || `input_${Math.random().toString(36).substr(2, 9)}`;
  const baseInputStyles = 'w-full px-3 py-2 border rounded-lg shadow-sm text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const stateStyles = error
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
    : 'border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-indigo-500 focus:border-indigo-500';

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div>
        {type === 'textarea' ? (
          <textarea
            id={inputId}
            rows={rows}
            className={`${baseInputStyles} ${stateStyles} resize-y`}
            {...props}
          />
        ) : type === 'select' ? (
          <select
            id={inputId}
            className={`${baseInputStyles} ${stateStyles} bg-white`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={inputId}
            type={type}
            className={`${baseInputStyles} ${stateStyles}`}
            {...props}
          />
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600 mt-1" id={`${inputId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

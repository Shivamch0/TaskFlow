import React from 'react';

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend, // { type: 'increase'|'decrease', text: 'string' }
  className = '',
  iconColor = 'text-indigo-600 bg-indigo-50'
}) {
  return (
    <div className={`bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-premium transition-all duration-200 hover:shadow-premium-hover ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-display">
            {value}
          </p>
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      
      {(description || trend) && (
        <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
          {trend && (
            <span className={`font-semibold inline-flex items-center gap-0.5 ${
              trend.type === 'increase' ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {trend.type === 'increase' ? '↑' : '↓'} {trend.text}
            </span>
          )}
          {description && <span>{description}</span>}
        </div>
      )}
    </div>
  );
}

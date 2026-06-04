import React from 'react';

/**
 * Reusable Progress Bar
 * @param {number} value - Progress value from 0 to 100
 * @param {boolean} showText - Whether to display progress percentage text
 * @param {string} size - Track size ('sm' or 'md' or 'lg')
 */
export function ProgressBar({
  value = 0,
  showText = false,
  size = 'sm',
  className = ''
}) {
  const clampedValue = Math.min(Math.max(value || 0, 0), 100);
  
  // Height classes
  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  // Define colors based on progress percentage
  let progressColor = 'bg-indigo-600';
  if (clampedValue < 30) {
    progressColor = 'bg-red-500';
  } else if (clampedValue < 70) {
    progressColor = 'bg-amber-500';
  } else if (clampedValue === 100) {
    progressColor = 'bg-emerald-500';
  }

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-slate-500">
          <span>Progress</span>
          <span className={`${clampedValue === 100 ? 'text-emerald-600' : 'text-slate-700'}`}>
            {clampedValue}%
          </span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${progressColor}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}

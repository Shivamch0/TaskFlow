import { Button } from './Button';

export function EmptyState({
  title,
  description,
  icon: Icon,
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 ${className}`}>
      {Icon && (
        <div className="p-3 bg-white rounded-full border border-slate-100 shadow-sm text-slate-400 mb-4">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-base font-bold text-slate-800 font-display mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-500 max-w-sm mb-5">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

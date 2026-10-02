import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) {
  const baseStyles = 'inline-flex items-center font-medium rounded-md transition-colors';

  const variants = {
    default:
      'bg-slate-100 text-slate-700 border border-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    primary:
      'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900',
    accent:
      'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-900',
    success:
      'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900',
    muted:
      'bg-gray-100 text-gray-600 dark:bg-slate-800/80 dark:text-slate-400',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs sm:text-[13px] px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}>
      {children}
    </span>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  icon: Icon,
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  download = false,
  target,
  rel,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-[8px] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-[#2563EB] text-white hover:bg-[#1D4ED8] active:bg-[#1E40AF] shadow-sm hover:shadow',
    secondary:
      'bg-white dark:bg-slate-800 text-[#111827] dark:text-slate-100 border border-[#E5E7EB] dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm',
    outline:
      'border border-[#2563EB] text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/40',
    ghost:
      'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm sm:text-base px-5 py-2.5 gap-2',
    lg: 'text-base sm:text-lg px-6 py-3.5 gap-2.5',
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={target || (href.startsWith('http') ? '_blank' : undefined)}
        rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
        download={download}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}

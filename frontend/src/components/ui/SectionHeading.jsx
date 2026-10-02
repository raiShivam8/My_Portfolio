import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  const alignments = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={`mb-10 sm:mb-12 ${alignments[align]} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider text-[#2563EB] uppercase mb-2">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#111827] dark:text-white tracking-tight leading-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-[#4B5563] dark:text-slate-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

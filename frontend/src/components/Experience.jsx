import React from 'react';
import SectionHeading from './ui/SectionHeading';
import Badge from './ui/Badge';
import { experienceData } from '../data/experience';
import { Briefcase, Calendar, Building2, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 bg-white/50 dark:bg-slate-900/30 border-t border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Work History"
          title="EXPERIENCE"
          subtitle="Real-world engineering contributions and backend system development."
        />

        <div className="max-w-4xl mx-auto">
          {experienceData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800/95 rounded-[14px] border border-[#E5E7EB] dark:border-slate-700 p-6 sm:p-8 lg:p-9 shadow-sm card-hover-effect relative overflow-hidden"
            >
              {/* Left accent bar */}
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-blue-600"></div>

              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-700/80">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      <Briefcase className="w-4 h-4" />
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white tracking-tight">
                      {item.role}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-[#4B5563] dark:text-slate-300 font-medium">
                    <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                      <Building2 className="w-4 h-4" />
                      {item.company}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.duration}
                    </span>
                  </div>
                </div>

                <div className="self-start sm:self-auto">
                  <Badge variant="primary" size="lg">
                    {item.duration} Duration
                  </Badge>
                </div>
              </div>

              {/* Summary Description */}
              <p className="mt-6 text-base text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Responsibilities list */}
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-3">
                  Key Responsibilities & Contributions:
                </h4>
                <ul className="space-y-2.5">
                  {item.responsibilities.map((resp, rIdx) => (
                    <li
                      key={rIdx}
                      className="flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack tags */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
                  Stack:
                </span>
                {item.technologies.map((tech) => (
                  <Badge key={tech} variant="default" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

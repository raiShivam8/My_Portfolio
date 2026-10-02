import React from 'react';
import SectionHeading from './ui/SectionHeading';
import Badge from './ui/Badge';
import { technologyHighlights } from '../data/skills';
import { Check, ShieldCheck, Zap, Database } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 border-t border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Background"
          title="ABOUT ME"
          subtitle="A dedicated Junior Full Stack Developer with hands-on industry experience building scalable backends and modern web applications."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main narrative */}
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-[#4B5563] dark:text-slate-300 leading-relaxed">
            <p>
              I'm a Junior Full Stack Developer with <strong className="font-semibold text-[#111827] dark:text-white">6 months of industry experience at Enjay IT Solutions Ltd.</strong>, where I worked on web applications and backend systems using PHP and Laravel.
            </p>
            <p>
              My primary focus is PHP and Laravel, while I also work with JavaScript, React.js, Node.js, Express.js, REST APIs, and relational and NoSQL databases.
            </p>
            <p>
              I've worked on features including authentication and authorization, admin dashboards, API integrations, database-driven applications, background processing with Redis and Laravel Horizon, and AI-powered functionality.
            </p>
            <p>
              I'm interested in building practical, reliable software and continuing to grow as a full-stack developer through real-world projects and engineering challenges.
            </p>
          </div>

          {/* Highlights & Core Stack Card */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-800/90 rounded-[14px] border border-[#E5E7EB] dark:border-slate-700/80 p-6 sm:p-7 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] dark:text-white tracking-tight mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                Core Technology Highlights
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                Key technologies applied across real-world client workflows and production systems.
              </p>

              {/* Technology badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {technologyHighlights.map((tech) => (
                  <Badge key={tech} variant="primary" size="md">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Engineering Focus points */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Production-tested Laravel & PHP architecture</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Secure JWT & Session-based authentication models</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Asynchronous job queues via Redis & Horizon</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Relational schema design (PostgreSQL & MySQL)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

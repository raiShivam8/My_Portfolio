import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Code2, Terminal, CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';

export default function Hero() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-blue-500/5 dark:bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Information */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/80 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wider text-blue-700 dark:text-blue-300 uppercase">
                JUNIOR FULL STACK DEVELOPER
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight text-[#111827] dark:text-white leading-[1.1] mb-6">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Shivam Rai</span>
            </h1>

            {/* Main description */}
            <p className="text-lg sm:text-xl text-[#4B5563] dark:text-slate-300 font-normal leading-relaxed mb-4 max-w-2xl">
              I build modern web applications and backend systems using <strong className="font-semibold text-slate-900 dark:text-white">PHP</strong>, <strong className="font-semibold text-slate-900 dark:text-white">Laravel</strong>, <strong className="font-semibold text-slate-900 dark:text-white">React.js</strong>, and <strong className="font-semibold text-slate-900 dark:text-white">Node.js</strong>, with 6 months of industry experience.
            </p>

            {/* Secondary description */}
            <p className="text-base text-[#6B7280] dark:text-slate-400 leading-relaxed mb-8 max-w-2xl">
              I focus on building reliable applications, REST APIs, database-driven systems, authentication, AI integrations, and scalable backend features.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              <Button
                onClick={() => scrollToSection('projects')}
                variant="primary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto shadow-md shadow-blue-500/10"
              >
                View Projects
              </Button>

              <Button
                href="/Shivam_Rai_Resume.pdf"
                download="Shivam_Rai_Resume.pdf"
                variant="secondary"
                size="md"
                icon={Download}
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5 pt-4 border-t border-slate-200/80 dark:border-slate-800 w-full">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                Connect:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/raiShivam8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm font-medium"
                  aria-label="Shivam Rai GitHub profile"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/shivam-rai-201753362/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm font-medium"
                  aria-label="Shivam Rai LinkedIn profile"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="mailto:raishivamrai837@gmail.com"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm font-medium"
                  aria-label="Contact Shivam Rai by email"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Technical / Code Visual */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-[14px] bg-[#1E293B] border border-slate-700/80 shadow-xl overflow-hidden card-hover-effect">
              {/* Window Bar */}
              <div className="px-4 py-3 bg-[#0F172A] border-b border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    developer.config.ts
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                  Open for opportunities
                </span>
              </div>

              {/* Code Snippet */}
              <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 overflow-x-auto">
                <div>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">developer</span> = &#123;
                </div>
                <div className="pl-5">
                  <span className="text-slate-400">name:</span>{' '}
                  <span className="text-emerald-300">"Shivam Rai"</span>,
                </div>
                <div className="pl-5">
                  <span className="text-slate-400">role:</span>{' '}
                  <span className="text-emerald-300">"Junior Full Stack Developer"</span>,
                </div>
                <div className="pl-5">
                  <span className="text-slate-400">experience:</span>{' '}
                  <span className="text-amber-300">"6 months (Enjay IT Solutions)"</span>,
                </div>
                <div className="pl-5">
                  <span className="text-slate-400">primaryFocus:</span>{' '}
                  <span className="text-emerald-300">"PHP / Laravel"</span>,
                </div>
                <div className="pl-5">
                  <span className="text-slate-400">frontend:</span>{' '}
                  <span className="text-emerald-300">"React.js & Tailwind CSS"</span>,
                </div>
                <div className="pl-5">
                  <span className="text-slate-400">backend:</span>{' '}
                  <span className="text-emerald-300">"PHP, Laravel, Node.js"</span>,
                </div>
                <div className="pl-5">
                  <span className="text-slate-400">databases:</span>{' '}
                  <span className="text-blue-300">["PostgreSQL", "MySQL", "MongoDB"]</span>,
                </div>
                <div className="pl-5">
                  <span className="text-slate-400">specialties:</span>{' '}
                  <span className="text-blue-300">[</span>
                </div>
                <div className="pl-9 text-slate-400">
                  <span className="text-emerald-300">"REST APIs"</span>,{' '}
                  <span className="text-emerald-300">"Authentication & Roles"</span>,
                </div>
                <div className="pl-9 text-slate-400">
                  <span className="text-emerald-300">"Redis & Queues"</span>,{' '}
                  <span className="text-emerald-300">"AI Integrations"</span>
                </div>
                <div className="pl-5">
                  <span className="text-blue-300">]</span>
                </div>
                <div>&#125;;</div>

                {/* Micro Status Terminal Footer */}
                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Laravel Horizon • Queues Active
                  </span>
                  <span className="text-slate-500">UTF-8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

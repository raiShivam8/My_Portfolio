import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#0B1120] border-t border-[#E5E7EB] dark:border-slate-800 text-slate-600 dark:text-slate-400 py-12 transition-colors">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs">
                SR
              </span>
              <span className="text-lg font-bold text-[#111827] dark:text-white tracking-tight">
                Shivam Rai
              </span>
            </div>
            <p className="text-sm text-[#6B7280] dark:text-slate-400">
              Junior Full Stack Developer • PHP, Laravel, React.js & Node.js
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/raiShivam8/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://www.linkedin.com/in/shivam-rai-201753362/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a
              href="mailto:raishivamrai837@gmail.com"
              className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Direct Email"
            >
              <Mail className="w-5 h-5" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280] dark:text-slate-500">
          <p>© 2026 Shivam Rai. All rights reserved.</p>
          <p>Built with React and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}

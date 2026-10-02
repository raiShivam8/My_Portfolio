import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, Layers, Sparkles, Server } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';

export default function ProjectCard({ project, priority = false }) {
  const isAiHelpdesk = project.slug === 'ai-helpdesk';

  return (
    <article className="group bg-white dark:bg-slate-800/90 rounded-[14px] border border-[#E5E7EB] dark:border-slate-700/80 shadow-sm overflow-hidden card-hover-effect flex flex-col lg:flex-row">
      {/* Visual / Screenshot Preview Area */}
      <div className="lg:w-1/2 bg-slate-900 text-white relative min-h-[260px] sm:min-h-[320px] p-6 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700/80">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="ml-1 text-slate-300">
              {isAiHelpdesk ? 'ai-helpdesk.internal' : 'mycart.store'}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px]">
            {isAiHelpdesk ? 'Laravel 11 • Gemini' : 'React • Node • Express'}
          </span>
        </div>

        {/* Visual Mockup inside */}
        <div className="relative z-10 my-4 p-4 rounded-lg bg-slate-950/80 border border-slate-800 shadow-inner group-hover:scale-[1.02] transition-transform duration-200">
          {isAiHelpdesk ? (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  AI Ticket Processor
                </span>
                <span className="text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded text-[10px]">
                  STATUS: LIVE QUEUE
                </span>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-200 font-medium">#TK-804: Production API Timeout</span>
                  <span className="text-[10px] text-rose-400 bg-rose-950/80 px-1.5 py-0.2 rounded border border-rose-900">
                    High Priority
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  Sender: client-support@domain.com via IMAP
                </p>
                <div className="pt-1 flex items-center gap-2 text-[10px] text-blue-300">
                  <span className="bg-blue-900/40 px-1.5 py-0.5 rounded">Gemini Sentiment: Urgent</span>
                  <span className="bg-purple-900/40 px-1.5 py-0.5 rounded">Category: Backend Error</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Redis Queue: Horizon Active</span>
                <span className="text-slate-500">PostgreSQL DB</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Server className="w-3.5 h-3.5" />
                  MERN Full Stack Engine
                </span>
                <span className="text-blue-400 bg-blue-950/80 px-1.5 py-0.5 rounded text-[10px]">
                  JWT AUTH: VERIFIED
                </span>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-200 font-medium">Active Session: Admin Dashboard</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-900">
                    Role: Admin
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-300">
                  <div className="p-1.5 bg-slate-950/60 rounded border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Product Catalog</span>
                    <span>MongoDB Atlas</span>
                  </div>
                  <div className="p-1.5 bg-slate-950/60 rounded border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Checkout & Mail</span>
                    <span>Brevo API Ready</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Client: React + Context API</span>
                <span className="text-slate-500">Server: Express REST</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer info badge in visual */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <span>{project.eyebrow}</span>
          <span className="text-blue-400 font-medium group-hover:underline flex items-center gap-1">
            Explore Details <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {project.eyebrow}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white tracking-tight mb-3">
            <Link
              to={`/projects/${project.slug}`}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {project.title}
            </Link>
          </h3>

          <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 leading-relaxed mb-6 font-normal">
            {project.shortDescription}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="default" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 border-t border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center gap-3">
          <Button
            to={`/projects/${project.slug}`}
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
          >
            View Case Study
          </Button>

          {project.github && (
            <Button
              href={project.github}
              variant="secondary"
              size="sm"
              icon={Github}
              iconPosition="left"
            >
              GitHub
            </Button>
          )}

          {project.liveDemo && (
            <Button
              href={project.liveDemo}
              variant="ghost"
              size="sm"
              icon={ExternalLink}
              iconPosition="right"
            >
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

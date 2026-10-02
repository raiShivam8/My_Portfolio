import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Workflow,
  Sparkles,
  Layers,
  Server,
  Image as ImageIcon,
  Check,
  Maximize2,
  X,
} from 'lucide-react';

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const isAiHelpdesk = project.slug === 'ai-helpdesk';

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Projects
          </Link>
        </div>

        {/* 1. Project Hero */}
        <header className="pb-10 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/80 mb-4">
            <span className="text-xs font-semibold tracking-wider text-blue-700 dark:text-blue-300 uppercase">
              {project.eyebrow}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] dark:text-white leading-tight mb-5">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#4B5563] dark:text-slate-300 leading-relaxed max-w-3xl mb-8">
            {project.shortDescription}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="primary" size="md">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Hero CTAs / Links */}
          <div className="flex flex-wrap items-center gap-4">
            {project.github && (
              <Button
                href={project.github}
                variant="primary"
                size="md"
                icon={Github}
                iconPosition="left"
              >
                View on GitHub
              </Button>
            )}

            {project.liveDemo && (
              <Button
                href={project.liveDemo}
                variant="secondary"
                size="md"
                icon={ExternalLink}
                iconPosition="right"
              >
                Live Application
              </Button>
            )}

            {project.backendUrl && (
              <Button
                href={project.backendUrl}
                variant="secondary"
                size="md"
                icon={ExternalLink}
                iconPosition="right"
              >
                Backend API Service
              </Button>
            )}
          </div>
        </header>

        {/* 2. Overview */}
        <section className="py-12 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight mb-4">
            Project Overview
          </h2>
          <div className="prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg text-[#4B5563] dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {project.overview}
          </div>
        </section>

        {/* 3. Key Features */}
        <section className="py-12 border-b border-slate-200 dark:border-slate-800">
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight mt-1">
              Key Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.keyFeatures.map((feat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/90 rounded-[14px] border border-[#E5E7EB] dark:border-slate-700/80 p-6 shadow-sm card-hover-effect"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] dark:text-white tracking-tight">
                    {feat.title}
                  </h3>
                </div>
                <p className="text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Workflow / Architecture Diagram */}
        <section className="py-12 border-b border-slate-200 dark:border-slate-800">
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              System Design
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight mt-1">
              How It Works & Architecture
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Sequential flow of requests, processing pipelines, and data state transitions.
            </p>
          </div>

          {/* Polished Visual Flow Diagram */}
          <div className="bg-[#0F172A] rounded-[16px] border border-slate-700/80 p-6 sm:p-8 text-white shadow-xl overflow-hidden">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2 text-blue-400 font-semibold">
                <Workflow className="w-4 h-4" />
                {isAiHelpdesk ? 'Asynchronous Mail & AI Pipeline' : 'MERN Client-Server Request Flow'}
              </span>
              <span className="text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                End-to-End Pipeline
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {project.workflowSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 flex flex-col justify-between relative group hover:border-blue-500/50 transition-colors"
                >
                  <div>
                    <span className="text-[11px] font-mono text-blue-400 font-bold block mb-1">
                      STEP {step.step}
                    </span>
                    <h4 className="text-sm font-semibold text-white tracking-tight mb-2">
                      {step.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. My Contribution */}
        <section className="py-12 border-b border-slate-200 dark:border-slate-800">
          <div className="mb-6">
            <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              Engineering Responsibility
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight mt-1">
              My Contribution
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800/90 rounded-[14px] border border-[#E5E7EB] dark:border-slate-700/80 p-6 sm:p-8 shadow-sm">
            <div className="prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg text-[#4B5563] dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {project.contribution}
            </div>
          </div>
        </section>

        {/* 6. Technical Challenges */}
        <section className="py-12 border-b border-slate-200 dark:border-slate-800">
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              Problem Solving
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight mt-1">
              Technical Challenges
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.challenges.map((chal, cIdx) => (
              <div
                key={cIdx}
                className="bg-white dark:bg-slate-800/90 rounded-[14px] border border-[#E5E7EB] dark:border-slate-700/80 p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-1 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-[#111827] dark:text-white">
                    {chal.title}
                  </h3>
                </div>
                <p className="text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed">
                  {chal.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. What I Learned */}
        <section className="py-12 border-b border-slate-200 dark:border-slate-800">
          <div className="mb-6">
            <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              Key Takeaways
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight mt-1">
              What I Learned
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800/90 rounded-[14px] border border-[#E5E7EB] dark:border-slate-700/80 p-6 sm:p-8 shadow-sm">
            <ul className="space-y-3">
              {project.learnings.map((item, lIdx) => (
                <li
                  key={lIdx}
                  className="flex items-start gap-3 text-base text-[#4B5563] dark:text-slate-300"
                >
                  <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 8. Screenshots Placeholder / Previews */}
        <section className="py-12 border-b border-slate-200 dark:border-slate-800">
          <div className="mb-6">
            <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              Interface Previews
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight mt-1">
              Application Previews & Views
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.screenshots.map((s, sIdx) => {
              if (s.splitImages && s.splitImages.length === 2) {
                return (
                  <div
                    key={sIdx}
                    onClick={() => setSelectedScreenshot(s)}
                    className="group relative bg-white dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 grid grid-cols-2">
                      <div className="relative h-full bg-[#f1f5f9] dark:bg-slate-900/90 border-r border-slate-200 dark:border-slate-800 flex items-center justify-center p-1.5 overflow-hidden">
                        <img
                          src={s.splitImages[0].image}
                          alt={s.splitImages[0].label || s.title}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {s.splitImages[0].label && (
                          <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur shadow-sm">
                            {s.splitImages[0].label}
                          </span>
                        )}
                      </div>
                      <div className="relative h-full bg-[#f1f5f9] dark:bg-slate-900/90 flex items-center justify-center p-1.5 overflow-hidden">
                        <img
                          src={s.splitImages[1].image}
                          alt={s.splitImages[1].label || s.title}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {s.splitImages[1].label && (
                          <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur shadow-sm">
                            {s.splitImages[1].label}
                          </span>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-xs font-medium text-slate-900 dark:text-white backdrop-blur shadow-sm">
                          <Maximize2 className="w-3.5 h-3.5" />
                          View Split (50/50)
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {s.caption}
                        </p>
                      </div>
                      <span className="mt-3 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded self-start">
                        50/50 Split View
                      </span>
                    </div>
                  </div>
                );
              }

              if (s.image) {
                return (
                  <div
                    key={sIdx}
                    onClick={() => setSelectedScreenshot(s)}
                    className="group relative bg-white dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-xs font-medium text-slate-900 dark:text-white backdrop-blur shadow-sm">
                          <Maximize2 className="w-3.5 h-3.5" />
                          View Fullscreen
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {s.caption}
                        </p>
                      </div>
                      <span className="mt-3 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded self-start">
                        Live Screenshot
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={sIdx}
                  className="bg-slate-100 dark:bg-slate-800/60 rounded-[14px] border border-dashed border-slate-300 dark:border-slate-700 p-6 flex flex-col justify-center items-center text-center min-h-[180px]"
                >
                  <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {s.title}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                    {s.caption}
                  </span>
                  <span className="mt-3 text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                    Screenshot preview
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. Navigation / Links Footer */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Projects
          </Link>

          <div className="flex items-center gap-4">
            {isAiHelpdesk ? (
              <Link
                to="/projects/mycart"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Next Project: MyCart MERN →
              </Link>
            ) : (
              <Link
                to="/projects/ai-helpdesk"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Previous Project: AI Helpdesk →
              </Link>
            )}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedScreenshot && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedScreenshot(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                <div>
                  <h4 className="text-base font-semibold text-white">
                    {selectedScreenshot.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedScreenshot.caption}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-2 sm:p-4 bg-slate-950 max-h-[82vh] overflow-auto flex items-center justify-center">
                {selectedScreenshot.splitImages && selectedScreenshot.splitImages.length === 2 ? (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch justify-center">
                    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                      <span className="text-xs font-semibold text-blue-400 mb-3 font-mono tracking-wider uppercase bg-blue-950/80 px-2.5 py-1 rounded border border-blue-900/60">
                        {selectedScreenshot.splitImages[0].label} (50%)
                      </span>
                      <div className="flex-1 flex items-center justify-center w-full">
                        <img
                          src={selectedScreenshot.splitImages[0].image}
                          alt={selectedScreenshot.splitImages[0].label}
                          className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                      <span className="text-xs font-semibold text-blue-400 mb-3 font-mono tracking-wider uppercase bg-blue-950/80 px-2.5 py-1 rounded border border-blue-900/60">
                        {selectedScreenshot.splitImages[1].label} (50%)
                      </span>
                      <div className="flex-1 flex items-center justify-center w-full">
                        <img
                          src={selectedScreenshot.splitImages[1].image}
                          alt={selectedScreenshot.splitImages[1].label}
                          className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={selectedScreenshot.image}
                    alt={selectedScreenshot.title}
                    className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

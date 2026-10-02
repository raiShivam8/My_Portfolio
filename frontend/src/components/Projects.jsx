import React from 'react';
import SectionHeading from './ui/SectionHeading';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-white/50 dark:bg-slate-900/30 border-t border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Portfolio"
          title="FEATURED PROJECTS"
          subtitle="Selected projects showcasing my full-stack development and backend engineering experience."
        />

        <div className="space-y-8 sm:space-y-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

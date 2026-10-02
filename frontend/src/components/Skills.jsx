import React from 'react';
import SectionHeading from './ui/SectionHeading';
import Badge from './ui/Badge';
import { skillCategories } from '../data/skills';
import { Server, Layout, Database, Bot, Terminal, Mail } from 'lucide-react';

export default function Skills() {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Backend':
        return <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Frontend':
        return <Layout className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Databases':
        return <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'APIs & AI':
        return <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Tools & Infrastructure':
        return <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Email & Integrations':
        return <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 border-t border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Competencies"
          title="TECHNICAL SKILLS"
          subtitle="Technologies and tools I work with."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.category}
              className="bg-white dark:bg-slate-800/90 rounded-[14px] border border-[#E5E7EB] dark:border-slate-700/80 p-6 shadow-sm card-hover-effect flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] dark:text-white tracking-tight">
                    {cat.category}
                  </h3>
                </div>

                <p className="text-xs text-[#6B7280] dark:text-slate-400 mb-5 leading-normal">
                  {cat.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                {cat.skills.map((skill) => (
                  <Badge key={skill} variant="default" size="md">
                    {skill}
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

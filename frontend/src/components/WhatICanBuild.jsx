import React from 'react';
import SectionHeading from './ui/SectionHeading';
import ServiceCard from './ServiceCard';
import { whatICanBuild } from '../data/skills';

export default function WhatICanBuild() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 border-t border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Capabilities"
          title="WHAT I CAN BUILD"
          subtitle="Real-world system solutions, API integrations, and modern full-stack architectures."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatICanBuild.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

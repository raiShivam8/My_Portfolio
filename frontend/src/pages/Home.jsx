import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import WhatICanBuild from '../components/WhatICanBuild';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <WhatICanBuild />
        <Contact />
      </main>
    </div>
  );
}

import React from 'react';
import { Layers, Server, LayoutDashboard, Cpu, PlugZap } from 'lucide-react';

const iconMap = {
  Layers: Layers,
  Server: Server,
  LayoutDashboard: LayoutDashboard,
  Cpu: Cpu,
  PlugZap: PlugZap,
};

export default function ServiceCard({ item }) {
  const IconComponent = iconMap[item.icon] || Layers;

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-[14px] border border-[#E5E7EB] dark:border-slate-700/80 p-6 shadow-sm card-hover-effect flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5">
          <IconComponent className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-[#111827] dark:text-white tracking-tight mb-2.5">
          {item.title}
        </h3>

        <p className="text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
          {item.description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
        <span>Production Ready</span>
      </div>
    </div>
  );
}

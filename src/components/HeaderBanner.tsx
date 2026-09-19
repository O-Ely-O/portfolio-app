import React from 'react';
import { Sparkles, FolderGit2, Clock, ThumbsUp, Code2, Briefcase } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const HeaderBanner: React.FC = () => {
  return (
    <header className="grid grid-cols-1 md:grid-cols-12 gap-2.5 mb-2.5 shrink-0">
      {/* Name and titles card (tagname__card) */}
      <div
        id="tagname-card"
        className="md:col-span-5 lg:col-span-5 glass-subcard rounded-xl p-3 flex flex-col justify-center border border-white/90 shadow-xs relative overflow-hidden"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-300/60 flex items-center justify-center text-amber-500 shrink-0 shadow-inner">
            <Sparkles className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl lg:text-2xl font-black tracking-tight text-slate-800 font-['Poppins']">
                James Elliot
              </h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Online" />
            </div>
            <p className="text-[11px] text-blue-700 font-semibold leading-none mt-0.5">
              Data & AI Automation Specialist
            </p>
          </div>
        </div>

        {/* Roles pills */}
        <div className="flex flex-wrap gap-1 mt-2">
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50/90 px-2 py-0.5 rounded border border-emerald-200/70 tracking-wider">
            AI AUTOMATION
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50/90 px-2 py-0.5 rounded border border-emerald-200/70 tracking-wider">
            DATA PIPELINES
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50/90 px-2 py-0.5 rounded border border-emerald-200/70 tracking-wider">
            N8N & CLOUD
          </span>
        </div>
      </div>

      {/* Tech stats and highlights card (techicon__card) */}
      <div
        id="techicon-card"
        className="md:col-span-7 lg:col-span-7 glass-subcard rounded-xl p-2.5 flex items-center border border-white/90 shadow-xs"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full">
          <div className="p-2 rounded-lg bg-white/70 border border-white/80 text-center hover:bg-white transition-all">
            <div className="flex items-center justify-center gap-1 text-sky-600 mb-0.5">
              <FolderGit2 className="w-3 h-3" />
              <span className="text-sm font-bold text-slate-800">{PERSONAL_INFO.stats.projectsCompleted}</span>
            </div>
            <div className="text-[10px] font-medium text-slate-500">Projects</div>
          </div>

          <div className="p-2 rounded-lg bg-white/70 border border-white/80 text-center hover:bg-white transition-all">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-0.5">
              <Clock className="w-3 h-3" />
              <span className="text-sm font-bold text-slate-800">{PERSONAL_INFO.stats.yearsExperience}</span>
            </div>
            <div className="text-[10px] font-medium text-slate-500">Experience</div>
          </div>

          <div className="p-2 rounded-lg bg-white/70 border border-white/80 text-center hover:bg-white transition-all">
            <div className="flex items-center justify-center gap-1 text-emerald-600 mb-0.5">
              <ThumbsUp className="w-3 h-3" />
              <span className="text-sm font-bold text-slate-800">{PERSONAL_INFO.stats.clientSatisfaction}</span>
            </div>
            <div className="text-[10px] font-medium text-slate-500">Satisfaction</div>
          </div>

          <div className="p-2 rounded-lg bg-white/70 border border-white/80 text-center hover:bg-white transition-all">
            <div className="flex items-center justify-center gap-1 text-indigo-600 mb-0.5">
              <Code2 className="w-3 h-3" />
              <span className="text-sm font-bold text-slate-800">{PERSONAL_INFO.stats.technologiesMastered}</span>
            </div>
            <div className="text-[10px] font-medium text-slate-500">Tech Stacks</div>
          </div>
        </div>
      </div>
    </header>
  );
};

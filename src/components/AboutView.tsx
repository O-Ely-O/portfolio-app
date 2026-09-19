import React from 'react';
import { EXPERIENCES_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { Briefcase, Calendar, CheckCircle2, Download, UserCheck, HeartHandshake, Database, Compass, BarChart3 } from 'lucide-react';

interface AboutViewProps {
  onOpenResume: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenResume }) => {
  return (
    <div id="about-view-container" className="space-y-5">
      {/* Bio / Introduction Banner */}
      <div className="glass-subcard rounded-2xl p-5 border border-white/90 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-blue-100/70 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                About James Elliot
              </h2>
              <p className="text-xs text-slate-500">
                Data & AI Automation Specialist • {PERSONAL_INFO.location}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenResume}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>View Official CV / PDF</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {PERSONAL_INFO.tagline}
        </p>

        {/* Philosophy pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-100">
          <div className="p-2.5 rounded-xl bg-blue-50/90 border border-slate-200/60">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1">
              <Database className="w-3.5 h-3.5 text-sky-500" />
              <span>Data Integration & Automation</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Centralizing multiple data sources & automate background processing.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-sky-50/90 border-slate-200/60">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1">
              <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
              <span>Data Analytics</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Transforming raw datasets into actionable insights & high-impact visual reporting.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/90  border-slate-200/60 " >
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-500" />
              <span>Client Empathy</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Clear communication, dependable timelines, and collaborative product delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Work Experience Section (Faithful to user's provided DXC Technology structure) */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-sky-500" />
          Professional Experience
        </h3>

        <div className="space-y-3.5">
          {EXPERIENCES_DATA.map((exp, idx) => (
            <div
              key={idx}
              className="glass-subcard rounded-2xl p-4 sm:p-5 border border-white/90 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200/70 pb-2 mb-2.5">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-800">
                    {exp.company}
                  </h4>
                  <div className="text-xs font-semibold text-blue-600">
                    {exp.role}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 bg-blue-50/90 px-2.5 py-1 rounded-full w-fit">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                {exp.description}
              </p>

              {/* Achievements */}
              <div className="space-y-1 mb-3">
                {exp.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium text-slate-600 bg-blue-50/90 px-2 py-0.5 rounded-md border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

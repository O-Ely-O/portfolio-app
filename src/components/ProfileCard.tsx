import React, { useState } from 'react';
import { Mail, MapPin, Download, Github, Linkedin, Dribbble, Twitter, Award, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { PERSONAL_INFO, SKILLS_DATA } from '../data/portfolioData';
import { TabType } from '../types';

// Profile image
import JamesImage from '../assets/James.jpg';

// Local skill logos
import PythonLogo from '../assets/skills/python.svg';
import SQLLogo from '../assets/skills/postgresql.svg';
import OpenAILogo from '../assets/skills/ollama.svg';
import N8nLogo from '../assets/skills/n8n.svg';
import DataAnalyticsLogo from '../assets/skills/googlebigquery.svg';
import FastAPILogo from '../assets/skills/fastapi.svg';

interface ProfileCardProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenResume: () => void;
}

const SKILL_LOGOS: Record<string, string> = {
  postgresql: SQLLogo,
  googlebigquery: DataAnalyticsLogo,
  n8n: N8nLogo,
  ollama: OpenAILogo,
  python: PythonLogo,
  fastapi: FastAPILogo,
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ onNavigateTab, onOpenResume }) => {
  const primarySkills = SKILLS_DATA.slice(0, 6);
  const [showMobileSkills, setShowMobileSkills] = useState(false);

  return (
    <aside
      id="self-profile-card"
      className="glass-subcard rounded-2xl p-3.5 sm:p-4 lg:p-4 flex flex-col justify-between h-auto lg:h-full border border-white/90 shadow-md relative overflow-hidden"
    >
      {/* BACKGROUND DECORATIVE BUBBLES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-4 left-6 w-2.5 h-2.5 bg-sky-400/30 rounded-full animate-pulse" />
        <div className="absolute top-16 right-5 w-3.5 h-3.5 bg-blue-500/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-32 left-4 w-2 h-2 bg-indigo-400/30 rounded-full" />
        <div className="absolute bottom-24 right-6 w-3 h-3 bg-sky-300/40 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-12 left-8 w-2.5 h-2.5 bg-blue-400/30 rounded-full" />
      </div>

      {/* MOBILE COMPACT PRESENTATION (< lg) */}
      <div className="block lg:hidden relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Avatar with Status Badge */}
            <div className="relative shrink-0">
              {/* Tiny floating bubble near avatar */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-sky-400 rounded-full border border-white animate-ping" style={{ animationDuration: '3s' }} />
              
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-sky-400 to-blue-600 shadow-sm">
                <img
                  src={JamesImage}
                  alt="James - Data & AI Automation Specialist"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <span
                className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
                title="Available for projects"
              />
            </div>

            {/* Mobile Title & Meta */}
            <div className="min-w-0">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 inline-block truncate max-w-full">
                {PERSONAL_INFO.role}
              </span>
              <div className="flex items-center gap-1.5 flex-wrap mt-1">
                <span className="text-[10px] text-slate-600 flex items-center gap-0.5 font-medium">
                  <MapPin className="w-2.5 h-2.5 text-sky-500" />
                  {PERSONAL_INFO.location.split(',')[0]}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">• 6+ Years Exp</span>
              </div>
            </div>
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onNavigateTab('contact')}
              className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <Mail className="w-3 h-3" />
              <span>Hire Me</span>
            </button>
            <button
              onClick={onOpenResume}
              className="px-2 py-1.5 bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1 cursor-pointer"
              title="View Resume"
            >
              <Download className="w-3 h-3 text-sky-500" />
              <span className="hidden sm:inline">CV</span>
            </button>
          </div>
        </div>

        {/* Mobile Expandable Skills Bar Toggle */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-100/60 text-xs">
          <div className="flex items-center gap-1.5">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-6 h-6 rounded-full bg-white/80 hover:bg-sky-500 hover:text-white text-slate-600 flex items-center justify-center transition-all border border-slate-200/60"
            >
              <Github className="w-3 h-3" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-6 h-6 rounded-full bg-white/80 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-all border border-slate-200/60"
            >
              <Linkedin className="w-3 h-3" />
            </a>
            <a
              href={PERSONAL_INFO.socials.dribbble}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble Portfolio"
              className="w-6 h-6 rounded-full bg-white/80 hover:bg-pink-500 hover:text-white text-slate-600 flex items-center justify-center transition-all border border-slate-200/60"
            >
              <Dribbble className="w-3 h-3" />
            </a>
            <a
              href={PERSONAL_INFO.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="w-6 h-6 rounded-full bg-white/80 hover:bg-sky-400 hover:text-white text-slate-600 flex items-center justify-center transition-all border border-slate-200/60"
            >
              <Twitter className="w-3 h-3" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setShowMobileSkills(!showMobileSkills)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded cursor-pointer transition-colors"
          >
            <Award className="w-3 h-3 text-sky-500" />
            <span>Skills ({primarySkills.length})</span>
            {showMobileSkills ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Mobile Accordion for Skills */}
        {showMobileSkills && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 animate-fade-in">
            {primarySkills.map((skill) => (
              <div key={skill.name} className="bg-white/70 p-1.5 rounded-lg border border-slate-200/60">
                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-700 mb-0.5">
                  <span className="truncate">{skill.name}</span>
                  <span className="text-slate-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-200/70 h-1 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DESKTOP FULL PRESENTATION (lg:) - Balanced with floating bubbles */}
      <div className="hidden lg:flex flex-col justify-between h-full space-y-2.5 relative z-10">
        <div className="space-y-2.5">
          {/* Responsive Profile Avatar with Tiny Floating Bubbles */}
          <div className="flex flex-col items-center text-center pt-1">
            <div className="relative mb-2.5 group">
              {/* Floating tiny bubbles surrounding the avatar frame */}
              <span className="absolute -top-2 left-2 w-3 h-3 bg-sky-400/70 rounded-full shadow-2xs animate-pulse" />
              <span className="absolute top-4 -right-2 w-2.5 h-2.5 bg-blue-500/60 rounded-full shadow-2xs animate-bounce" style={{ animationDuration: '2.5s' }} />
              <span className="absolute -bottom-1 left-3 w-2 h-2 bg-indigo-400/60 rounded-full shadow-2xs" />
              <span className="absolute bottom-6 -left-3 w-3.5 h-3.5 bg-sky-300/50 rounded-full shadow-2xs animate-pulse" style={{ animationDuration: '4s' }} />

              <div className="w-28 h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-full p-1 bg-gradient-to-tr from-sky-300 via-blue-400 to-indigo-500 shadow-md">
                <img
                  src={JamesImage}
                  alt="James - Data & AI Automation Specialist"
                  className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <span
                className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs"
                title="Available for projects & full-time"
              />
            </div>

            {/* Role & Experience */}
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50/90 px-3 py-0.5 rounded-full border border-blue-100/90 shadow-2xs">
              {PERSONAL_INFO.role}
            </span>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-600 mt-1 font-medium flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sky-500" />
                {PERSONAL_INFO.location}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                6+ Yrs Exp
              </span>
            </div>
          </div>

          {/* Quick Socials */}
          <div className="flex items-center justify-center gap-2 py-1.5 border-y border-blue-100/60">
            <a
              id="social-github-btn"
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-7 h-7 rounded-full bg-white/80 hover:bg-sky-500 hover:text-white text-slate-600 flex items-center justify-center transition-all shadow-xs hover:scale-110 border border-slate-200/60"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              id="social-linkedin-btn"
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-7 h-7 rounded-full bg-white/80 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-all shadow-xs hover:scale-110 border border-slate-200/60"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              id="social-dribbble-btn"
              href={PERSONAL_INFO.socials.dribbble}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble Portfolio"
              className="w-7 h-7 rounded-full bg-white/80 hover:bg-pink-500 hover:text-white text-slate-600 flex items-center justify-center transition-all shadow-xs hover:scale-110 border border-slate-200/60"
            >
              <Dribbble className="w-3.5 h-3.5" />
            </a>
            <a
              id="social-twitter-btn"
              href={PERSONAL_INFO.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="w-7 h-7 rounded-full bg-white/80 hover:bg-sky-400 hover:text-white text-slate-600 flex items-center justify-center transition-all shadow-xs hover:scale-110 border border-slate-200/60"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Professional Skills section with progress bars */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-sky-500" />
                Core Skills
              </h3>
              <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">Mastery</span>
            </div>

            <div className="space-y-1.5">
              {primarySkills.map((skill) => {
                const logoSrc = SKILL_LOGOS[skill.iconName];
                return (
                  <div key={skill.name} className="group">
                    {/* Skill header */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {/* Logo container */}
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 border transition-all duration-200 group-hover:scale-105 group-hover:shadow-sm"
                          style={{
                            backgroundColor: `${skill.color}12`,
                            borderColor: `${skill.color}30`,
                          }}
                        >
                          {logoSrc ? (
                            <img
                              src={logoSrc}
                              alt=""
                              aria-hidden="true"
                              className="w-3.5 h-3.5 object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: skill.color }}
                            />
                          )}
                        </div>

                        {/* Skill name */}
                        <span className="text-[11px] font-semibold text-slate-700 group-hover:text-blue-700 transition-colors truncate">
                          {skill.name}
                        </span>
                      </div>

                      {/* Percentage */}
                      <span
                        className="text-[10px] font-bold shrink-0 px-1.5 py-0.2 rounded-md"
                        style={{
                          color: skill.color,
                          backgroundColor: `${skill.color}10`,
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-200/60 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color}, #38BDF8)`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-2 border-t border-blue-100/70 space-y-1.5 mt-auto">
          <button
            id="btn-hire-me-sidebar"
            onClick={() => onNavigateTab('contact')}
            className="w-full py-2 px-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </button>

          <button
            id="btn-download-resume"
            onClick={onOpenResume}
            className="w-full py-1.5 px-3 bg-white/80 hover:bg-white text-slate-700 hover:text-blue-600 border border-slate-200/80 rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-sky-500" />
            <span>View CV</span>
          </button>

          <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-600 font-semibold pt-0.5">
            <CheckCircle2 className="w-3 h-3" />
            <span>Reply in &lt; 24h</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
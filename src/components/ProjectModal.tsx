import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, Calendar, Award } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="project-detail-modal"
        className="glass-subcard-2 max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-white max-h-[90vh] flex flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200/80 bg-white/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
              {project.category}
            </span>
            {project.stats && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-500" />
                {project.stats}
              </span>
            )}
          </div>
          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto custom-scrollbar p-5 space-y-5">
          {/* Cover Hero Image */}
          <div className="relative rounded-xl overflow-hidden shadow-md h-60 sm:h-72 border border-slate-100">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
              <div className="text-white">
                <h2 className="text-xl sm:text-2xl font-bold font-['Poppins'] drop-shadow-sm">
                  {project.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 drop-shadow-sm">
                  {project.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Description & Case Study Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
              Project Overview & Architecture
            </h3>
            <p className="text-sm text-slate-800 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Deliverables & Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                Key Deliverables & Innovations
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Badges */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Technologies & Methodologies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-emerald-700 bg-emerald-50/90 px-2.5 py-1 rounded-sm border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200/80 bg-slate-50/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-800">
            <Calendar className="w-3.5 h-3.5" />
            <span>Delivered in {project.year}</span>
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Launch Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

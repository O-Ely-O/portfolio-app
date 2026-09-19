import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ExternalLink, Eye, Sparkles, Filter, ArrowUpRight } from 'lucide-react';

interface ProjectsViewProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'BI Dashboard', 'Web Apps', 'AI Automation'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <div id="projects-view-container" className="space-y-4">
      {/* Header with Title and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-blue-100/60">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-500" />
            Featured Creative & Engineering Work
          </h2>
          <p className="text-xs text-slate-500">
            Hover over cards to explore technologies, case notes, and interactive live previews.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
          <Filter className="w-3 h-3 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white/70 hover:bg-white text-slate-600 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with signature smooth hover animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden glass-subcard border border-white/90 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer bg-white/60"
            onClick={() => onSelectProject(project)}
          >
            {/* Project Image with Zoom Transition */}
            <div className="w-full h-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Static Badge on Top Left */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase rounded-lg bg-white/90 text-blue-700 shadow-sm backdrop-blur-md border border-white/80">
                {project.category}
              </span>
            </div>

            {/* Subdued Bottom Gradient Info (Visible when NOT hovered) */}
            <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent text-white transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
              <h3 className="text-base font-bold tracking-tight text-white line-clamp-1">
                {project.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                {project.subtitle}
              </p>
            </div>

            {/* Interactive Smooth Hover Overlay (Inspired by User's `.box .overlay` spec) */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/85 to-blue-950/70 p-5 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out backdrop-blur-sm">
              <span className="text-[10px] font-bold text-sky-400 tracking-wider uppercase mb-1">
                {project.year} • {project.category}
              </span>
              
              <h3 className="text-lg font-bold text-white mb-1.5 font-['Poppins']">
                {project.title}
              </h3>

              <p className="text-xs text-slate-200 line-clamp-3 mb-3 leading-relaxed">
                {project.description}
              </p>

              {/* Tags inside overlay */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium bg-white/20 text-white px-2 py-0.5 rounded backdrop-blur-xs border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-[10px] text-sky-300 px-1 py-0.5 font-semibold">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProject(project);
                  }}
                  className="flex-1 py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-102"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                </button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-md hover:scale-105 flex items-center justify-center"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

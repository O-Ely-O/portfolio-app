import React, { useState } from 'react';
import { BackgroundDecorations } from './components/BackgroundDecorations';
import { ProfileCard } from './components/ProfileCard';
import { HeaderBanner } from './components/HeaderBanner';
import { NavBar } from './components/NavBar';
import { ProjectsView } from './components/ProjectsView';
import { AboutView } from './components/AboutView';
import { CertificatesView } from './components/CertificatesView';
import { CreativeLabView } from './components/CreativeLabView';
import { ContactFormView } from './components/ContactFormView';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TabType, Project } from './types';

import portfolioIcon from '../assets/portfolio-icon.svg';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <ErrorBoundary>
      {/* 
        Responsive viewport layout:
        - On desktop (lg+): fixed h-screen with fixed central glass card (no page scrolling, internal viewport containment)
        - On mobile (< lg): fluid min-h-screen allowing smooth natural touch scrolling with compact profile header
      */}
      <div className="min-h-screen lg:h-screen w-full relative flex items-start lg:items-center justify-center p-2.5 sm:p-3.5 md:p-4 lg:p-5 overflow-y-auto lg:overflow-hidden">
        {/* Background ambient lighting and retro geometric motifs strictly at extremities */}
        <BackgroundDecorations />

        {/* Center Glassmorphism Master Card */}
        <main
          id="glass-portfolio-wrapper"
          className="relative z-10 w-full max-w-[1380px] my-auto min-h-0 lg:h-full lg:max-h-[92vh] glass-primary rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 md:p-4.5 shadow-[0_20px_60px_-15px_rgba(70,130,180,0.35)] border border-white/95 backdrop-blur-xl flex flex-col overflow-visible lg:overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[265px_1fr] gap-3 lg:gap-3.5 h-auto lg:h-full overflow-visible lg:overflow-hidden items-stretch">
            {/* Left Profile Card (Self Card) - Compact row & accordion on mobile, slim vertical sidebar on desktop */}
            <div className="h-auto lg:h-full flex flex-col shrink-0">
              <ProfileCard
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  // On mobile, smoothly scroll navigation/content into view if clicked from top
                  if (window.innerWidth < 1024) {
                    const navEl = document.getElementById('main-navigation-bar');
                    if (navEl) {
                      navEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                onOpenResume={() => setIsResumeOpen(true)}
              />
            </div>

            {/* Right Main Section (dominant width, fixed intact layout on desktop, fluid on mobile) */}
            <div className="flex flex-col h-auto lg:h-full overflow-visible lg:overflow-hidden min-w-0 flex-1">
              {/* Top Banner (tagname__card & techicon__card) */}
              <HeaderBanner />

              {/* Navigation Bar (navbar__card with interactive following orange line) */}
              <NavBar
                activeTab={activeTab}
                onSelectTab={(tab) => setActiveTab(tab)}
              />

              {/* Scrollable Main Card (main__card) fixed perfectly inside container on desktop */}
              <section
                id="main-content-display"
                className="glass-subcard rounded-2xl p-3.5 sm:p-5 flex-1 min-h-[460px] lg:min-h-0 overflow-y-auto custom-scrollbar border border-white/90 shadow-inner relative"
              >
                {activeTab === 'projects' && (
                  <ProjectsView
                    onSelectProject={(project) => setSelectedProject(project)}
                  />
                )}

                {activeTab === 'about' && (
                  <AboutView
                    onOpenResume={() => setIsResumeOpen(true)}
                  />
                )}

                {activeTab === 'certificates' && (
                  <CertificatesView />
                )}

                {activeTab === 'lab' && (
                  <CreativeLabView />
                )}

                {activeTab === 'contact' && (
                  <ContactFormView />
                )}
              </section>
            </div>
          </div>
        </main>

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Full Resume / CV Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
}

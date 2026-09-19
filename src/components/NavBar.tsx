import React, { useState, useRef, useEffect } from 'react';
import { TabType } from '../types';
import { LayoutGrid, User, Award, FlaskConical, Send } from 'lucide-react';
import { PROJECTS_DATA, CERTIFICATES_DATA } from '../data/portfolioData';

interface NavBarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'projects' as TabType, label: 'Projects', icon: LayoutGrid, count: PROJECTS_DATA.length.toString() },
    { id: 'about' as TabType, label: 'About Me', icon: User },
    { id: 'certificates' as TabType, label: 'Certificates', icon: Award, count: CERTIFICATES_DATA.length.toString() },
    { id: 'lab' as TabType, label: 'Creative Lab', icon: FlaskConical },
    { id: 'contact' as TabType, label: 'Hire Me!', icon: Send, highlight: true }
  ];

  const [hoveredTab, setHoveredTab] = useState<TabType | null>(null);
  const [lineStyle, setLineStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0
  });

  const tabRefs = useRef<{ [key in TabType]?: HTMLButtonElement | null }>({});
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  // Measure and position the interactive orange line
  const updateLinePosition = (targetTab: TabType) => {
    const tabEl = tabRefs.current[targetTab];
    const navEl = navContainerRef.current;
    if (tabEl && navEl) {
      const navRect = navEl.getBoundingClientRect();
      const tabRect = tabEl.getBoundingClientRect();
      const left = tabRect.left - navRect.left;
      const width = tabRect.width;
      setLineStyle({ left, width, opacity: 1 });
    }
  };

  // Follow activeTab on mount and whenever activeTab changes
  useEffect(() => {
    updateLinePosition(hoveredTab || activeTab);

    // If on a compact screen with overflow, scroll active tab into view
    if (tabRefs.current[activeTab] && navContainerRef.current) {
      const tabEl = tabRefs.current[activeTab];
      const navEl = navContainerRef.current;
      if (navEl.scrollWidth > navEl.clientWidth) {
        tabEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab, hoveredTab]);

  // Handle window resize to keep the indicator aligned
  useEffect(() => {
    const handleResize = () => updateLinePosition(hoveredTab || activeTab);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab, hoveredTab]);

  return (
    <nav
      id="main-navigation-bar"
      ref={navContainerRef}
      onMouseLeave={() => setHoveredTab(null)}
      className="glass-subcard rounded-xl px-2 py-1.5 mb-3 border border-white/90 shadow-sm relative overflow-x-auto custom-scrollbar select-none"
    >
      <div className="flex items-center gap-1 sm:gap-2 min-w-max relative pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isHovered = hoveredTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              onClick={() => {
                onSelectTab(tab.id);
                setHoveredTab(null);
              }}
              onMouseEnter={() => setHoveredTab(tab.id)}
              className={`relative z-10 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'text-blue-900'
                  : isHovered
                  ? 'text-blue-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
                  isActive
                    ? 'text-blue-600 scale-110'
                    : isHovered
                    ? 'text-amber-500 scale-110'
                    : 'text-slate-400'
                }`}
              />
              <span>{tab.label}</span>

              {tab.count && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5 transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}

        {/* Interactive following orange line (follows hover and returns to active tab) */}
        <div
          id="nav-interactive-orange-indicator"
          className="absolute bottom-0 h-1.5 rounded-full pointer-events-none z-20 transition-all duration-300 ease-out"
          style={{
            left: `${lineStyle.left}px`,
            width: `${lineStyle.width}px`,
            opacity: lineStyle.opacity,
            backgroundColor: '#ffbb00',
            boxShadow: '0 2px 10px rgba(255, 187, 0, 0.75), 0 0 6px rgba(255, 187, 0, 0.5)'
          }}
        />
      </div>
    </nav>
  );
};

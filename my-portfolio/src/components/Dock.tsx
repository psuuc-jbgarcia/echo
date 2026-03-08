import React, { useState } from 'react';
import { Terminal, Lightbulb, FolderKanban, Award, Mail, User, FolderOpen, Github } from 'lucide-react';
import './Dock.css';

interface DockProps {
  toggleWindow: (id: string) => void;
  openWindows: Record<string, boolean>;
  activeWindow: string | null;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const apps = [
  { id: 'terminal',        name: 'Terminal',        icon: Terminal,     color: '#1a1a1a' },
  { id: 'about',           name: 'About Me',        icon: User,         color: '#8B5CF6' },
  { id: 'projects_folder', name: 'Projects',        icon: FolderOpen,   color: '#F59E0B' },
  { id: 'skills',          name: 'Skills',          icon: Lightbulb,    color: '#f5a623' },
  { id: 'experience',      name: 'Experience',      icon: FolderKanban, color: '#4a90e2' },
  { id: 'certifications',  name: 'Certifications',  icon: Award,        color: '#e83e8c' },
  { id: 'contact',         name: 'Contact',         icon: Mail,         color: '#27ae60' },
];

const Dock: React.FC<DockProps> = ({ toggleWindow, openWindows, activeWindow, toggleTheme, isDarkMode }) => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  return (
    <div className="dock-container glass">
      {apps.map((app) => (
        <div
          key={app.id}
          className={`dock-item-wrapper ${openWindows[app.id] ? 'is-open' : ''} ${activeWindow === app.id ? 'is-active' : ''}`}
          onClick={() => toggleWindow(app.id)}
          onMouseEnter={() => setHoveredApp(app.id)}
          onMouseLeave={() => setHoveredApp(null)}
        >
          {hoveredApp === app.id && <div className="dock-tooltip glass">{app.name}</div>}
          <div className="dock-icon" style={{ backgroundColor: app.color, color: '#fff' }}>
            <app.icon size={26} />
          </div>
          <div className="dock-dot"></div>
        </div>
      ))}

      <div className="dock-divider"></div>

      {/* GitHub Link */}
      <div
        className="dock-item-wrapper"
        onClick={() => window.open('https://github.com/psuuc-jbgarcia', '_blank')}
        onMouseEnter={() => setHoveredApp('github')}
        onMouseLeave={() => setHoveredApp(null)}
      >
        {hoveredApp === 'github' && <div className="dock-tooltip glass">GitHub</div>}
        <div className="dock-icon" style={{ backgroundColor: '#333', color: '#fff' }}>
          <Github size={26} />
        </div>
        <div className="dock-dot"></div>
      </div>

      <div className="dock-divider"></div>

      {/* Theme Toggle */}
      <div
        className="dock-item-wrapper"
        onClick={toggleTheme}
        onMouseEnter={() => setHoveredApp('theme')}
        onMouseLeave={() => setHoveredApp(null)}
      >
        {hoveredApp === 'theme' && <div className="dock-tooltip glass">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</div>}
        <div className="dock-icon theme-icon" style={{ backgroundColor: isDarkMode ? '#111' : '#fff', color: isDarkMode ? '#fff' : '#333' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isDarkMode ? (
              <>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </>
            ) : (
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            )}
          </svg>
        </div>
        <div className="dock-dot"></div>
      </div>
    </div>
  );
};

export default Dock;

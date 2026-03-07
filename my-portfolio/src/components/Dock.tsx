import React, { useState } from 'react';
import { Terminal, Lightbulb, FolderKanban, Award, Mail, ChevronUp } from 'lucide-react';
import './Dock.css';

interface DockProps {
  toggleWindow: (id: string) => void;
  openWindows: Record<string, boolean>;
  activeWindow: string | null;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const apps = [
  { id: 'terminal', name: 'Terminal', icon: Terminal, color: '#333' },
  { id: 'skills', name: 'Skills', icon: Lightbulb, color: '#f5a623' },
  { id: 'experience', name: 'Experience', icon: FolderKanban, color: '#4a90e2' },
  { id: 'certifications', name: 'Certifications', icon: Award, color: '#e83e8c' },
  { id: 'contact', name: 'Contact', icon: Mail, color: '#27ae60' }
];

const Dock: React.FC<DockProps> = ({ toggleWindow, openWindows, activeWindow, toggleTheme, isDarkMode }) => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  // Determine an OS icon representing the theme toggle
  const ThemeIcon = isDarkMode ? ChevronUp : ChevronUp; // Just a placeholder, actually we'll just style it like a system pref

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
            <app.icon size={28} />
          </div>
          <div className="dock-dot"></div>
        </div>
      ))}
      
      <div className="dock-divider"></div>

      {/* System Theme Toggle Icon in Dock */}
      <div 
        className="dock-item-wrapper"
        onClick={toggleTheme}
        onMouseEnter={() => setHoveredApp('theme')}
        onMouseLeave={() => setHoveredApp(null)}
      >
        {hoveredApp === 'theme' && <div className="dock-tooltip glass">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</div>}
        <div className="dock-icon theme-icon" style={{ backgroundColor: '#fff', color: '#333' }}>
           {/* Custom SVG or icon for theme, here we just use logic */}
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             {isDarkMode ? (
               <circle cx="12" cy="12" r="5" />
             ) : (
               <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
             )}
           </svg>
        </div>
      </div>
    </div>
  );
};

export default Dock;

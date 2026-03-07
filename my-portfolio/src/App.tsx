import { useState, useEffect } from 'react';
import Dock from './components/Dock';
import DraggableWindow from './components/DraggableWindow';
import SkillsApp from './components/SkillsApp';
import ExperienceApp from './components/ExperienceApp';
import CertificationsApp from './components/CertificationsApp';
import ContactApp from './components/ContactApp';
import TopBar from './components/TopBar';
import MatrixRain from './components/MatrixRain';
import DesktopIcon from './components/DesktopIcon';
import ContextMenu from './components/ContextMenu';
import { LiveGitFeed, SystemLogs } from './components/Widgets';
import { Folder, FileText, Trash2 } from 'lucide-react';
import './App.css';

function App() {
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({
    terminal: true, // Auto-open terminal on load
  });
  const [activeWindow, setActiveWindow] = useState<string | null>('terminal');

  // Theme state for Dock syncing
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; show: boolean }>({ x: 0, y: 0, show: false });
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<string | null>(null);

  useEffect(() => {
    // Initial global theme check
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleWindow = (id: string) => {
    setOpenWindows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    if (!openWindows[id]) {
      setActiveWindow(id); // Focusing it when opening
    } else if (activeWindow === id) {
      setActiveWindow(null); // Unfocusing if closing the active one
    }
  };

  const focusWindow = (id: string) => {
    setActiveWindow(id);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, show: true });
  };

  const handleContextMenuAction = (action: string) => {
    setContextMenu({ ...contextMenu, show: false });
    if (action === 'terminal') {
      if (!openWindows['terminal']) toggleWindow('terminal');
      else focusWindow('terminal');
    } else if (action === 'wallpaper') {
      toggleTheme();
    } else if (action === 'github') {
      window.open('https://github.com/jerico/portfolio-os', '_blank');
    }
  };

  const handleDesktopClick = () => {
    setSelectedDesktopIcon(null);
  };

  return (
    <div className="os-desktop" onContextMenu={handleContextMenu} onClick={handleDesktopClick}>
      {/* Background graphic */}
      <div className="os-bg-mesh"></div>
      <div className="os-bg-glow glow-cyan"></div>
      <div className="os-bg-glow glow-blue"></div>
      <div className="os-cursor-glow"></div>

      <MatrixRain />

      {/* Desktop Icons */}
      <DesktopIcon 
        icon={<Folder size={32} />} 
        label="Projects" top={60} left={20} 
        isSelected={selectedDesktopIcon === 'projects_folder'}
        onClick={(e) => { e.stopPropagation(); setSelectedDesktopIcon('projects_folder'); toggleWindow('projects_folder'); }} 
      />
      <DesktopIcon 
        icon={<FileText size={32} />} 
        label="Resume.pdf" top={160} left={20} 
        isSelected={selectedDesktopIcon === 'resume_pdf'}
        onClick={(e) => { e.stopPropagation(); setSelectedDesktopIcon('resume_pdf'); toggleWindow('resume_pdf'); }} 
      />
      <DesktopIcon 
        icon={<Trash2 size={32} />} 
        label="Trash" top={260} left={20} 
        isSelected={selectedDesktopIcon === 'trash_bin'}
        onClick={(e) => { e.stopPropagation(); setSelectedDesktopIcon('trash_bin'); toggleWindow('trash_bin'); }} 
      />

      {/* Widgets */}
      <LiveGitFeed />
      <SystemLogs />

      {/* Context Menu */}
      {contextMenu.show && (
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          onClose={() => setContextMenu({ ...contextMenu, show: false })} 
          onAction={handleContextMenuAction} 
        />
      )}
      <TopBar />

      {/* Windows Area */}
      <div className="os-workspace">
        <DraggableWindow
          id="projects_folder"
          title="Projects"
          isOpen={!!openWindows['projects_folder']}
          isActive={activeWindow === 'projects_folder'}
          onClose={() => toggleWindow('projects_folder')}
          onFocus={() => focusWindow('projects_folder')}
          defaultPosition={{ x: 150, y: 150 }}
          defaultSize={{ width: 500, height: 350 }}
          closeOnly={true}
        >
          <div className="coming-soon-container">
            <Folder size={48} className="coming-soon-icon" />
            <h2>Projects</h2>
            <p>Coming Soon...</p>
          </div>
        </DraggableWindow>

        <DraggableWindow
          id="resume_pdf"
          title="Resume.pdf"
          isOpen={!!openWindows['resume_pdf']}
          isActive={activeWindow === 'resume_pdf'}
          onClose={() => toggleWindow('resume_pdf')}
          onFocus={() => focusWindow('resume_pdf')}
          defaultPosition={{ x: 250, y: 100 }}
          defaultSize={{ width: 500, height: 600 }}
          closeOnly={true}
        >
          <div className="coming-soon-container">
            <FileText size={48} className="coming-soon-icon" />
            <h2>Resume.pdf</h2>
            <p>PDF Viewer Coming Soon...</p>
          </div>
        </DraggableWindow>

        <DraggableWindow
          id="trash_bin"
          title="Trash"
          isOpen={!!openWindows['trash_bin']}
          isActive={activeWindow === 'trash_bin'}
          onClose={() => toggleWindow('trash_bin')}
          onFocus={() => focusWindow('trash_bin')}
          defaultPosition={{ x: 350, y: 250 }}
          defaultSize={{ width: 400, height: 300 }}
          closeOnly={true}
        >
          <div className="coming-soon-container">
            <Trash2 size={48} className="coming-soon-icon" />
            <h2>Trash</h2>
            <p>Trash is empty.</p>
          </div>
        </DraggableWindow>

        <DraggableWindow
          id="terminal"
          title="jerico@portfolio:~"
          isOpen={!!openWindows['terminal']}
          isActive={activeWindow === 'terminal'}
          onClose={() => toggleWindow('terminal')}
          onFocus={() => focusWindow('terminal')}
          defaultPosition={{ x: 50, y: 50 }}
          defaultSize={{ width: 650, height: 400 }}
        >
          <div className="terminal-content" style={{ fontFamily: 'monospace', color: 'var(--text-color)' }}>
            <p><span style={{ color: 'var(--accent-cyan)' }}>jerico@portfolio</span>:<span style={{ color: 'var(--accent-blue)' }}>~</span>$ whoami</p>
            <p style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '1.1rem' }}>Jerico B. Garcia</p>

            <p><span style={{ color: 'var(--accent-cyan)' }}>jerico@portfolio</span>:<span style={{ color: 'var(--accent-blue)' }}>~</span>$ cat intro.txt</p>
            <p style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
              Hello! I'm a Mobile & Web Developer crafting beautiful applications. <br />
              I also work as an IT Instructor at Universidad de Dagupan.<br />
              <br />
              I built this portfolio as an interactive desktop environment. <br />
              Try dragging this window, or open other apps from the dock below!
            </p>

            <p><span style={{ color: 'var(--accent-cyan)' }}>jerico@portfolio</span>:<span style={{ color: 'var(--accent-blue)' }}>~</span>$ <span className="cursor-blink" style={{ display: 'inline-block', width: '8px', height: '15px', background: 'var(--text-color)', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }}></span></p>
          </div>
        </DraggableWindow>

        <DraggableWindow
          id="skills"
          title="Skills Map"
          isOpen={!!openWindows['skills']}
          isActive={activeWindow === 'skills'}
          onClose={() => toggleWindow('skills')}
          onFocus={() => focusWindow('skills')}
          defaultPosition={{ x: 100, y: 80 }}
          defaultSize={{ width: 800, height: 500 }}
        >
          <SkillsApp />
        </DraggableWindow>

        <DraggableWindow
          id="experience"
          title="System Logs: Experience"
          isOpen={!!openWindows['experience']}
          isActive={activeWindow === 'experience'}
          onClose={() => toggleWindow('experience')}
          onFocus={() => focusWindow('experience')}
          defaultPosition={{ x: 200, y: 120 }}
          defaultSize={{ width: 750, height: 550 }}
        >
          <ExperienceApp />
        </DraggableWindow>

        <DraggableWindow
          id="certifications"
          title="Certificates Store"
          isOpen={!!openWindows['certifications']}
          isActive={activeWindow === 'certifications'}
          onClose={() => toggleWindow('certifications')}
          onFocus={() => focusWindow('certifications')}
          defaultPosition={{ x: 300, y: 160 }}
          defaultSize={{ width: 850, height: 500 }}
        >
          <CertificationsApp />
        </DraggableWindow>

        <DraggableWindow
          id="contact"
          title="Network Connections"
          isOpen={!!openWindows['contact']}
          isActive={activeWindow === 'contact'}
          onClose={() => toggleWindow('contact')}
          onFocus={() => focusWindow('contact')}
          defaultPosition={{ x: 400, y: 200 }}
          defaultSize={{ width: 700, height: 450 }}
        >
          <ContactApp />
        </DraggableWindow>
      </div>

      <Dock
        toggleWindow={toggleWindow}
        openWindows={openWindows}
        activeWindow={activeWindow}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;

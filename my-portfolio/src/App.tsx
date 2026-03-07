import React, { useState, useEffect } from 'react';
import Dock from './components/Dock';
import DraggableWindow from './components/DraggableWindow';
import SkillsApp from './components/SkillsApp';
import ExperienceApp from './components/ExperienceApp';
import CertificationsApp from './components/CertificationsApp';
import ContactApp from './components/ContactApp';
import './App.css';

function App() {
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({
    terminal: true, // Auto-open terminal on load
  });
  const [activeWindow, setActiveWindow] = useState<string | null>('terminal');
  
  // Theme state for Dock syncing
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <div className="os-desktop">
      {/* Background graphic */}
      <div className="os-bg-glow glow-cyan"></div>
      <div className="os-bg-glow glow-blue"></div>

      {/* Windows Area */}
      <div className="os-workspace">
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
              Hello! I'm a Mobile & Web Developer crafting beautiful applications. <br/>
              I also work as an IT Instructor at Universidad de Dagupan.<br/>
              <br/>
              I built this portfolio as an interactive desktop environment. <br/>
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

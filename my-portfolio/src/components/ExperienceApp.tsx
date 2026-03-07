import React from 'react';
import { FolderKanban } from 'lucide-react';
import './Experience.css';

const ExperienceApp: React.FC = () => {
  return (
    <div className="coming-soon-container">
      <FolderKanban size={48} className="coming-soon-icon" />
      <h2>Experience Timeline</h2>
      <p>Content is currently under construction. Coming soon.</p>
    </div>
  );
};

export default ExperienceApp;

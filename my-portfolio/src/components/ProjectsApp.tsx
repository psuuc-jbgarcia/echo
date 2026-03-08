import React from 'react';
import { FolderOpen } from 'lucide-react';

const ProjectsApp: React.FC = () => (
  <div className="coming-soon-container">
    <FolderOpen size={48} className="coming-soon-icon" />
    <h2>Projects</h2>
    <p>Under development — coming soon.</p>
  </div>
);

export default ProjectsApp;

import React from 'react';
import { Lightbulb } from 'lucide-react';
import './Skills.css';

const SkillsApp: React.FC = () => {
  return (
    <div className="coming-soon-container">
      <Lightbulb size={48} className="coming-soon-icon" />
      <h2>Skills Module</h2>
      <p>Content is currently under construction. Coming soon.</p>
    </div>
  );
};

export default SkillsApp;

import React from 'react';
import { Award } from 'lucide-react';
import './Certifications.css';

const CertificationsApp: React.FC = () => {
  return (
    <div className="coming-soon-container">
      <Award size={48} className="coming-soon-icon" />
      <h2>Certifications & Credentials</h2>
      <p>Content is currently under construction. Coming soon.</p>
    </div>
  );
};

export default CertificationsApp;

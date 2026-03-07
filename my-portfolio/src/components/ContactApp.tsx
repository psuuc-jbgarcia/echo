import React from 'react';
import { Mail } from 'lucide-react';
import './Contact.css';

const ContactApp: React.FC = () => {
  return (
    <div className="coming-soon-container">
      <Mail size={48} className="coming-soon-icon" />
      <h2>Network Connections</h2>
      <p>Content is currently under construction. Coming soon.</p>
    </div>
  );
};

export default ContactApp;

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Contact.css';

const ContactApp: React.FC = () => {
  const links = [
    {
      icon: <Mail size={22} />,
      label: 'Email',
      value: 'jbgarcia@psuuc.edu.ph',
      href: 'mailto:jbgarcia@psuuc.edu.ph',
      color: '#E040FB',
    },
    {
      icon: <Github size={22} />,
      label: 'GitHub',
      value: 'github.com/psuuc-jbgarcia',
      href: 'https://github.com/psuuc-jbgarcia',
      color: '#1DE9B6',
    },
    {
      icon: <Linkedin size={22} />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/jbgarcia',
      href: 'https://linkedin.com/in/jbgarcia',
      color: '#2979FF',
    },
  ];

  return (
    <div className="contact-app">
      <div className="contact-header">
        <span className="contact-path">~/network --connections</span>
      </div>

      <div className="contact-intro">
        <p>
          Feel free to reach out! Whether you have a project idea, a job opportunity, or just want to
          connect — I'm always open to new conversations.
        </p>
      </div>

      <div className="contact-links">
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            style={{ '--link-color': link.color } as React.CSSProperties}
          >
            <div className="contact-icon" style={{ color: link.color }}>
              {link.icon}
            </div>
            <div className="contact-info">
              <span className="contact-label">{link.label}</span>
              <span className="contact-value">{link.value}</span>
            </div>
            <div className="contact-arrow">→</div>
          </a>
        ))}
      </div>

      <div className="contact-footer">
        <span className="contact-status">
          <span className="status-dot" /> Available for freelance & internship opportunities
        </span>
      </div>
    </div>
  );
};

export default ContactApp;

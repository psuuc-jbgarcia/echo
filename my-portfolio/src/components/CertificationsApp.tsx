import React from 'react';
import './Certifications.css';

const certifications = [
  {
    title: 'Laravel',
    subtitle: 'Ranking in the Top 10%',
    issuer: 'TestDome',
    date: 'May 23, 2024',
    image: '/certifications/laravel.jpg',
  },
  {
    title: 'TOPCIT Certificate',
    subtitle: 'Level 2 (Score: 313/1000)',
    issuer: 'Institute for Information & Communications Technology Promotion',
    date: 'August 24, 2025',
    image: '/certifications/topcit.jpg',
  }
];

const CertificationsApp: React.FC = () => {
  return (
    <div className="certifications-app">
      <div className="certifications-header">
        <span className="certifications-path">$ ls ~/certifications/</span>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <div key={index} className="cert-card">
            <div className="cert-image-container">
              <img src={cert.image} alt={`${cert.title} Certificate`} className="cert-image" />
            </div>
            <div className="cert-content">
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-subtitle">{cert.subtitle}</p>
              <div className="cert-meta">
                <span className="cert-issuer">🏢 {cert.issuer}</span>
                <span className="cert-date">📅 {cert.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsApp;

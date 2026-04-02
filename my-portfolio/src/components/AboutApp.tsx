import React from 'react';
import { Mail } from 'lucide-react';
import './AboutApp.css';

interface AboutAppProps {
  onContactClick?: () => void;
}

const AboutApp: React.FC<AboutAppProps> = ({ onContactClick }) => {
  return (
    <div className="about-app">
      <div className="about-header">
        <span className="about-path">$ cat about_me.txt</span>
      </div>

      <div className="about-content">
        <div className="about-profile-header">
          <div className="profile-image-container">
            <img src="/hero-image.jpg" alt="Jerico B. Garcia" className="about-profile-img" />
            <div className="profile-online-status"></div>
          </div>
          <div className="profile-info-header">
            <h1 className="profile-name">Jerico B. Garcia</h1>
            <p className="profile-title">Developer & IT Instructor</p>
            <div className="profile-badges">
              <span className="profile-badge">MIT Candidate</span>
              <span className="profile-badge">Full Stack</span>
            </div>
          </div>
        </div>

        <div className="about-info-grid">
          <div className="about-info-block">
            <div className="about-info-label">👤 Name</div>
            <div className="about-info-value">Jerico B. Garcia</div>
          </div>
          <div className="about-info-block">
            <div className="about-info-label">🎓 Education</div>
            <div className="about-info-value">
              MIT — Universidad de Dagupan (Ongoing)<br />
              BSIT major in Web and Mobile Technologies — PSU, Urdaneta City Campus
            </div>
          </div>
          <div className="about-info-block">
            <div className="about-info-label">💼 Role</div>
            <div className="about-info-value">Developer & IT Instructor</div>
          </div>
          <div className="about-info-block">
            <div className="about-info-label">📍 Location</div>
            <div className="about-info-value">Santa Barbara, Pangasinan</div>
          </div>
        </div>

        <div className="about-divider" />

        <div className="about-spec-section">
          <div className="about-spec-label">🛠 Specialization</div>
          <div className="about-spec-tags">
            {['Web Development', 'Mobile Development'].map(s => (
              <span key={s} className="spec-tag">{s}</span>
            ))}
          </div>
        </div>

        <div className="about-divider" />

        <div className="about-passion">
          <div className="about-spec-label">💡 Bio</div>
          <p className="about-passion-text">
            Graduated BSIT student (major in Web and Mobile technologies) at Pangasinan State University – Urdaneta City Campus.
            Currently pursuing Master in Information Technology at Universidad de Dagupan.
            Passionate about building user-friendly applications with experience in web and mobile development, as well as basic to advanced computer troubleshooting.
            Eager to contribute to innovation and gain hands-on experience in a professional environment.
          </p>
        </div>

        <div className="about-resume-actions">
          <button
            onClick={onContactClick}
            className="resume-btn view-btn"
            style={{ borderStyle: 'dotted', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Mail size={16} /> Updating Resume... (Click to Request)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutApp;

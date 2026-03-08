import React from 'react';
import { Download, Eye } from 'lucide-react';
import './AboutApp.css';

const AboutApp: React.FC = () => {
  return (
    <div className="about-app">
      <div className="about-header">
        <span className="about-path">$ cat about_me.txt</span>
      </div>

      <div className="about-content">
        <div className="about-section">
          <pre className="about-ascii">
            {`██╗███████╗██████╗ ██╗ ██████╗ ██████╗ 
     ██║██╔════╝██╔══██╗██║██╔════╝██╔═══██╗
     ██║█████╗  ██████╔╝██║██║     ██║   ██║
██   ██║██╔══╝  ██╔══██╗██║██║     ██║   ██║
╚█████╔╝███████╗██║  ██║██║╚██████╗╚██████╔╝
 ╚════╝ ╚══════╝╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═════╝ `}
          </pre>
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
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn view-btn"
          >
            <Eye size={16} /> View Resume
          </a>
          <a
            href="/resume.pdf"
            download="Jerico_Garcia_Resume.pdf"
            className="resume-btn download-btn"
          >
            <Download size={16} /> Download Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutApp;

import React from 'react';
import './Skills.css';

const SkillsApp: React.FC = () => (
  <div className="skills-app">
    <div className="skills-header">
      <span className="skills-path">$ skills --show-all --verbose</span>
    </div>
    
    <div className="skills-grid">
      {/* Tech Skills Column */}
      <div className="skills-column">
        <h3 className="column-title">
          <span className="title-icon">🚀</span>
          Core Tech Stack
        </h3>
        
        <div className="skill-card tech-stack">
          <div className="card-section">
            <h4 className="section-subtitle">Web & Mobile</h4>
            <div className="skill-tag-container">
              {['PHP', 'Laravel', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Node.js with Express', 'Dart', 'Flutter', 'Firebase'].map(t => (
                <span key={t} className="skill-tag tech">{t}</span>
              ))}
            </div>
          </div>

          <div className="card-section">
            <h4 className="section-subtitle">Database & Programming</h4>
            <div className="skill-tag-container">
              {['MySQL', 'C++', 'Python Flask', 'Java', 'Java GUI'].map(t => (
                <span key={t} className="skill-tag language">{t}</span>
              ))}
            </div>
          </div>

          <div className="card-section">
            <h4 className="section-subtitle">Design & Tools</h4>
            <div className="skill-tag-container">
              {['Figma', 'WordPress', 'Postman'].map(t => (
                <span key={t} className="skill-tag tool">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Skills Column */}
      <div className="skills-column">
        <h3 className="column-title">
          <span className="title-icon">🛠</span>
          Technical Expertise
        </h3>
        
        <div className="skill-card technical-expertise">
          <div className="technical-list">
            {[
              { id: 'trouble', label: 'Computer Troubleshooting', sub: 'Basic to Advanced' },
              { id: 'assembly', label: 'Hardware Maintenance', sub: 'Assembly & Disassembly' },
              { id: 'os', label: 'OS Deployment', sub: 'Windows & Linux Installation' },
              { id: 'suite', label: 'Productivity Suites', sub: 'MS Office & Google Suite' }
            ].map(item => (
              <div key={item.id} className="technical-item">
                <div className="item-dot"></div>
                <div className="item-content">
                  <span className="item-label">{item.label}</span>
                  <span className="item-sub">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-hint">
          <div className="hint-icon">💡</div>
          <p>Continuous learning and adaptability in evolving environments.</p>
        </div>
      </div>
    </div>
  </div>
);

export default SkillsApp;

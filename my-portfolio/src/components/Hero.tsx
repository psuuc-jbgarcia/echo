import React from 'react';
import { Smartphone, Globe, GraduationCap, ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background Graphic Elements */}
      <div className="bg-glow glow-cyan"></div>
      <div className="bg-glow glow-blue"></div>

      <div className="hero-grid">
        <div className="hero-content">
          <div className="badge glass">
            <span className="badge-dot"></span>
            Hello, I'm Jerico B. Garcia
          </div>

          <h1 className="hero-title">
            Building <span className="text-gradient">Digital</span> <br />
            Experiences
          </h1>

          <p className="hero-subtitle">
            Mobile & Web Developer crafting beautiful applications.<br />
            IT Instructor at Universidad de Dagupan.
          </p>

          <div className="hero-cta">
            <a href="#experience" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-secondary glass">
              Contact Me
            </a>
          </div>

          <div className="hero-stats" style={{ justifyContent: 'flex-start' }}>
            <div className="stat-card glass" style={{ minWidth: 'auto', padding: '1rem' }}>
              <Globe className="stat-icon" style={{ width: 32, height: 32, padding: '0.5rem' }} />
              <div className="stat-info">
                <span className="stat-value" style={{ fontSize: '1rem' }}>Web Dev</span>
              </div>
            </div>
            <div className="stat-card glass" style={{ minWidth: 'auto', padding: '1rem' }}>
              <Smartphone className="stat-icon" style={{ width: 32, height: 32, padding: '0.5rem' }} />
              <div className="stat-info">
                <span className="stat-value" style={{ fontSize: '1rem' }}>Mobile Apps</span>
              </div>
            </div>
            <div className="stat-card glass" style={{ minWidth: 'auto', padding: '1rem' }}>
              <GraduationCap className="stat-icon" style={{ width: 32, height: 32, padding: '0.5rem' }} />
              <div className="stat-info">
                <span className="stat-value" style={{ fontSize: '1rem' }}>Education</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-image-container">
          {/* Optional animated ring behind image */}
          <div className="hero-image-ring"></div>
          <img src="/hero-image.jpg" alt="Jerico B. Garcia - Developer" className="hero-image" />
        </div>
      </div>

      <div className="scroll-indicator" style={{ left: '50%', transform: 'translateX(-50%)' }}>
        <a href="#skills">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;

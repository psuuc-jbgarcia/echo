import React from 'react';
import './Experience.css';

const ExperienceApp: React.FC = () => {
  return (
    <div style={{ fontFamily: 'monospace', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        <span style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600 }}>$ cat experience.log</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Current Role */}
        <div style={{
          borderLeft: '3px solid var(--accent-cyan)',
          paddingLeft: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(var(--accent-cyan-rgb), 0.12)',
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(var(--accent-cyan-rgb), 0.3)',
              borderRadius: '20px',
              padding: '2px 10px',
              fontSize: '0.72rem',
              fontWeight: 700,
            }}>● Current</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>July 2025 – Present</span>
          </div>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-color)', marginTop: '0.25rem' }}>
            IT Instructor
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
            Universidad de Dagupan
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '0.25rem' }}>
            Teaching IT and programming subjects including web development,
            database systems, and programming fundamentals to BSIT students.
            Also covers Platform Technology basics: Linux fundamentals,
            network scanning concepts, and deploying web applications
            using Apache2 web server.
          </p>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
            {['Teaching', 'Web Dev', 'Database Systems', 'Platform Tech', 'Linux', 'Apache2', 'Network Scanning', 'PHP', 'MySQL'].map(tag => (
              <span key={tag} style={{
                fontSize: '0.71rem',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(var(--text-color-rgb), 0.06)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-color)',
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
          1 entry found — more experience being added
        </span>
      </div>
    </div>
  );
};

export default ExperienceApp;

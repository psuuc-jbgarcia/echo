import React from 'react';
import './Projects.css';

const projects = [
  {
    title: 'First Ever Website',
    type: 'Static Website',
    tech: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'GitHub', url: 'https://github.com/psuuc-jbgarcia/firsttry' },
      { label: 'Live Demo', url: 'https://psuuc-jbgarcia.github.io/firsttry/' }
    ]
  },
  {
    title: 'AI-Powered Essay Evaluation & Scoring System for Teachers',
    type: 'Web Application',
    tech: ['React', 'Node.js', 'MongoDB', 'Gemini AI', 'PWA', 'Tailwind CSS', 'Docker'],
    links: [
      { label: 'GitHub', url: 'https://github.com/psuuc-jbgarcia/pen2grade' }
    ]
  },
  {
    title: 'Smart Parking Management System with Plate Number Recognition',
    type: 'Mobile & Web App',
    tech: ['Firebase', 'Python', 'YOLO', 'Flask', 'Computer Vision', 'Flutter'],
    links: [
      { label: 'User Side', url: 'https://github.com/psuuc-jbgarcia/parkwatch_app' },
      { label: 'Admin Side', url: 'https://github.com/psuuc-jbgarcia/parkwatch' }
    ]
  },
  {
    title: 'Santa Maria Barangay Document Request System with Customer Support Chatbot',
    type: 'Web Application',
    tech: ['PHP', 'HTML', 'CSS', 'MySQL', 'Bootstrap'],
    links: [
      { label: 'GitHub', url: 'https://github.com/psuuc-jbgarcia/santamariabrgy_requestdocs' }
    ]
  },
  {
    title: 'Recipe System with Customer Support Chatbot',
    type: 'Web Application',
    tech: ['PHP', 'MySQL', 'Bootstrap'],
    links: [
      { label: 'GitHub', url: 'https://github.com/psuuc-jbgarcia/Recipe_System' }
    ]
  },
  {
    title: 'Recipe App',
    type: 'Mobile Application',
    tech: ['Flutter', 'Firebase', 'API Integration'],
    links: [
      { label: 'GitHub', url: 'https://github.com/psuuc-jbgarcia/mad_recipeapp' }
    ]
  },
  {
    title: 'Simple Inventory Management',
    type: 'Web Application',
    tech: ['Node.js', 'Express', 'MySQL', 'EJS'],
    links: []
  },
  {
    title: 'Quiz App',
    type: 'Mobile Application',
    tech: ['Flutter', 'Firebase'],
    links: []
  }
];

const ProjectsApp: React.FC = () => (
  <div className="projects-app">
    <div className="projects-header">
      <span className="projects-path">$ ls ~/projects/</span>
    </div>

    <div className="projects-grid">
      {projects.map((project, index) => (
        <div key={index} className="project-card">
          <div className="project-content">
            <div className="project-type-badge">{project.type}</div>
            <h3 className="project-title">{project.title}</h3>

            <div className="project-tech-title">Technologies Used:</div>
            <div className="project-tech-list">
              {project.tech.map((tech, i) => (
                <span key={i} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>

          {project.links && project.links.length > 0 && (
            <div className="project-links">
              {project.links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="github-link">
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ marginRight: '6px' }}
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ProjectsApp;

import React from 'react';
import './Projects.css';

const projects = [
  {
    title: 'AI-Powered Essay Evaluation & Scoring System for Teachers',
    tech: ['React', 'Node.js', 'MongoDB', 'Gemini AI', 'PWA', 'Tailwind CSS', 'Docker']
  },
  {
    title: 'Smart Parking Management System with Plate Number Recognition',
    tech: ['Firebase', 'Python', 'YOLO', 'Flask', 'Computer Vision']
  },
  {
    title: 'Santa Maria Barangay Document Request System with Customer Support Chatbot',
    tech: ['PHP', 'HTML', 'CSS', 'MySQL', 'Bootstrap']
  },
  {
    title: 'Recipe System with Customer Support Chatbot',
    tech: ['PHP', 'MySQL', 'Bootstrap']
  },
  {
    title: 'Quiz App',
    tech: ['Flutter', 'Firebase']
  },
  {
    title: 'E-commerce Website',
    tech: ['Laravel', 'MySQL']
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
          <h3 className="project-title">{project.title}</h3>
          
          <div className="project-tech-title">Technologies Used:</div>
          <div className="project-tech-list">
            {project.tech.map((tech, i) => (
              <span key={i} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProjectsApp;

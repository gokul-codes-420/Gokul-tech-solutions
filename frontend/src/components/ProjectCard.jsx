import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-image-box">
        <img
          src={project.image || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'}
          alt={project.title}
          className="project-image"
          loading="lazy"
        />
      </div>

      <div className="project-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span className="badge badge-subtle" style={{ fontSize: '11px', padding: '3px 8px' }}>
            {project.category}
          </span>
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '12px', color: '#64748b' }}
              aria-label={`View live project for ${project.title}`}
            >
              <span>Live Case</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>
          {project.title}
        </h3>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, flexGrow: 1 }}>
          {project.description}
        </p>

        {project.technologies?.length > 0 && (
          <div className="project-tags">
            {project.technologies.map((tech, i) => (
              <span key={i} className="project-tag">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

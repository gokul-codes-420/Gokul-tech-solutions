import React from 'react';
import { User, UserCheck } from 'lucide-react';

/**
 * ============================================================================
 * LEADERSHIP MEMBERS CONFIGURATION
 * Provide your image URL directly in `imageUrl`:
 * e.g., imageUrl: 'https://example.com/photo.jpg' or imageUrl: '/images/founder.jpg'
 * ============================================================================
 */
export const leadershipMembers = [
  {
    id: 'founder',
    role: 'FOUNDER',
    name: 'Gokul S.',
    imageUrl: '/images/founder.jpg',
    description: 'Guiding visionary strategy, core enterprise engineering principles, and long-term innovation roadmap.',
    badgeColor: '#2563eb',
    badgeBg: '#eff6ff',
  },
  {
    id: 'ceo',
    role: 'CEO',
    name: 'Chief Executive Officer',
    imageUrl: '/images/ceo.png',
    description: 'Leading global operations, client partner executive alignment, and organizational scale.',
    badgeColor: '#059669',
    badgeBg: '#ecfdf5',
  },
  {
    id: 'manager',
    role: 'MANAGER',
    name: 'Operations & Tech Manager',
    imageUrl: '/images/manager.png',
    description: 'Orchestrating cross-functional engineering sprints, quality control, and mission delivery.',
    badgeColor: '#7c3aed',
    badgeBg: '#f5f3ff',
  },
  {
    id: 'sales-manager',
    role: 'SALES MANAGER',
    name: 'Enterprise Sales Manager',
    imageUrl: '/images/sales-manager.png',
    description: 'Driving enterprise partnerships, client relationship growth, and strategic revenue solutions.',
    badgeColor: '#ea580c',
    badgeBg: '#fff7ed',
  },
];

export default function LeadershipSection({ members = leadershipMembers }) {
  return (
    <div
      className="leadership-section"
      style={{
        marginTop: '64px',
        paddingTop: '56px',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span
            className="badge badge-accent"
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 700,
              fontSize: '12px',
              padding: '6px 14px',
            }}
          >
            Core Leadership & Management
          </span>
        </div>
        <h3
          style={{
            fontSize: 'clamp(24px, 3.5vw, 32px)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: '12px',
          }}
        >
          Executive Leadership Team
        </h3>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '15.5px',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Meet the experienced executives and management personnel directing strategic vision, delivery excellence, and market growth.
        </p>
      </div>

      {/* 4 Photo Cards Grid */}
      <div className="leadership-grid">
        {members.map((member) => (
          <div key={member.id} className="leadership-card">
            {/* Photo Area */}
            <div className="leadership-image-wrapper">
              {member.imageUrl ? (
                <img
                  src={member.imageUrl}
                  alt={`${member.role} - ${member.name}`}
                  className="leadership-photo"
                />
              ) : (
                <div className="leadership-photo-placeholder">
                  <div
                    className="placeholder-icon-circle"
                    style={{ backgroundColor: member.badgeBg, color: member.badgeColor }}
                  >
                    <User size={34} />
                  </div>
                  <span className="placeholder-text">{member.role} Photo</span>
                  <span className="placeholder-subtext">Set imageUrl in code</span>
                </div>
              )}

              {/* Role Overlay Badge on Photo */}
              <div
                className="leadership-role-tag"
                style={{ backgroundColor: member.badgeBg, color: member.badgeColor }}
              >
                <span style={{ fontWeight: 800, fontSize: '11.5px', letterSpacing: '0.06em' }}>
                  {member.role}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="leadership-content">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '6px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: member.badgeColor,
                    textTransform: 'uppercase',
                  }}
                >
                  {member.role}
                </span>
                <UserCheck size={14} color={member.badgeColor} />
              </div>

              <h4
                style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                {member.name}
              </h4>

              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

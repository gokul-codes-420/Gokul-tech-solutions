import React from 'react';

export default function SectionTitle({
  badge,
  badgeType = 'subtle',
  title,
  subtitle,
  align = 'center', // 'center' or 'left'
  className = '',
}) {
  return (
    <div className={`section-header ${align === 'center' ? 'text-center' : ''} ${className}`}>
      {badge && <span className={`badge badge-${badgeType}`}>{badge}</span>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

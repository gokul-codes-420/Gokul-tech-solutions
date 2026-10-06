import React from 'react';

export default function StatsCard({ number, label, suffix = '' }) {
  return (
    <div className="stat-item">
      <div className="stat-number">
        {number}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

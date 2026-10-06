import React from 'react';

export default function Logo({ size = 'md', light = false, admin = false }) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const iconDim = isSm ? 28 : isLg ? 38 : 34;
  const brandFontSize = isSm ? '16px' : isLg ? '22px' : '18.5px';
  const tagFontSize = isSm ? '13px' : isLg ? '16.5px' : '15px';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSm ? '9px' : '11px',
        userSelect: 'none',
        lineHeight: 1,
      }}
    >
      {/* Sleek Minimalist Tech Icon */}
      <div
        style={{
          width: iconDim,
          height: iconDim,
          borderRadius: isSm ? '7px' : '9px',
          background: light
            ? '#ffffff'
            : 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
          color: light ? '#0f172a' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: light
            ? '0 2px 6px rgba(0, 0, 0, 0.08)'
            : '0 2px 8px rgba(15, 23, 42, 0.2)',
          border: light ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <svg
          width={iconDim * 0.58}
          height={iconDim * 0.58}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Modern isometric tech cube / layers signifying full stack digital solutions */}
          <path
            d="M12 2.5L20.5 7.4V16.6L12 21.5L3.5 16.6V7.4L12 2.5Z"
            stroke={light ? '#0f172a' : '#38bdf8'}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2.5V12M20.5 7.4L12 12M3.5 7.4L12 12"
            stroke={light ? '#0f172a' : '#93c5fd'}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="2"
            fill={light ? '#0f172a' : '#ffffff'}
          />
        </svg>
      </div>

      {/* Modern High-End Typography */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
        <span
          style={{
            fontSize: brandFontSize,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: light ? '#ffffff' : '#0f172a',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Gokul
        </span>
        <span
          style={{
            fontSize: tagFontSize,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: light ? '#94a3b8' : '#64748b',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {admin ? 'Admin' : 'Tech Solutions'}
        </span>
      </div>
    </div>
  );
}

import React from 'react';

export default function LoadingSpinner({ text = 'Loading...', size = 32 }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
        gap: '16px',
        width: '100%',
      }}
    >
      <div className="spinner" style={{ width: size, height: size, borderWidth: 3 }} />
      {text && (
        <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {text}
        </span>
      )}
    </div>
  );
}

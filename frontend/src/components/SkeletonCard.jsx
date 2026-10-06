import React from 'react';

export default function SkeletonCard({ count = 3, type = 'product' }) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {items.map((key) => (
        <div key={key} className="card" style={{ padding: '24px', gap: '16px' }}>
          {type === 'product' && (
            <div className="skeleton" style={{ width: '100%', height: '180px', borderRadius: '8px' }} />
          )}
          {type === 'service' && (
            <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '8px' }} />
          )}
          <div className="skeleton" style={{ width: '60%', height: '24px' }} />
          <div className="skeleton" style={{ width: '95%', height: '16px' }} />
          <div className="skeleton" style={{ width: '80%', height: '16px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
            <div className="skeleton" style={{ width: '30%', height: '20px' }} />
            <div className="skeleton" style={{ width: '25%', height: '32px', borderRadius: '6px' }} />
          </div>
        </div>
      ))}
    </>
  );
}

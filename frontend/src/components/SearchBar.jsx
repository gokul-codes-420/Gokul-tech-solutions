import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  onClear,
}) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
      <Search
        size={17}
        color="#94a3b8"
        style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />
      <input
        type="text"
        className="form-control"
        style={{
          paddingLeft: '40px',
          paddingRight: value ? '36px' : '16px',
          height: '42px',
        }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && onClear && (
        <button
          onClick={onClear}
          type="button"
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#94a3b8',
            display: 'flex',
          }}
          aria-label="Clear search input"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}

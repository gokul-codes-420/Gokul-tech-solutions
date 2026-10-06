import React from 'react';

export default function FilterBar({
  options = [],
  activeOption,
  onSelect,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      {options.map((opt) => {
        const isActive = activeOption === opt;
        return (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            type="button"
            className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              fontWeight: 600,
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

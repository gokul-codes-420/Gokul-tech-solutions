import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '36px',
      }}
    >
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{ padding: '6px 10px' }}
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
        <button
          key={pg}
          type="button"
          className={`btn btn-sm ${currentPage === pg ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => onPageChange(pg)}
          style={{ width: '36px', padding: '6px 0', textAlign: 'center' }}
        >
          {pg}
        </button>
      ))}

      <button
        type="button"
        className="btn btn-secondary btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{ padding: '6px 10px' }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

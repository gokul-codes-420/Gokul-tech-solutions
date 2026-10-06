import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Bell } from 'lucide-react';

export default function AdminNavbar({ title = 'Dashboard Overview' }) {
  const { user } = useAuth();

  return (
    <header className="admin-topbar">
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
          {title}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border)',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <ShieldCheck size={16} color="#10b981" />
          <span>Admin Access Verified</span>
        </div>

        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
          {user?.name}
        </div>
      </div>
    </header>
  );
}

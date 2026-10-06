import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import {
  LayoutDashboard,
  Package,
  Layers,
  Briefcase,
  Mail,
  Users,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';

export default function AdminSidebar({ unreadMessagesCount = 0 }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link to="/admin" style={{ textDecoration: 'none' }}>
          <Logo size="sm" admin={true} />
        </Link>
      </div>

      <nav className="admin-sidebar-nav">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          <Package size={18} />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/services"
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          <Layers size={18} />
          <span>Services</span>
        </NavLink>

        <NavLink
          to="/admin/projects"
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          <Briefcase size={18} />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/admin/messages"
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          style={{ justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Mail size={18} />
            <span>Messages</span>
          </div>
          {unreadMessagesCount > 0 && (
            <span
              className="badge badge-accent"
              style={{ padding: '2px 8px', fontSize: '11px', borderRadius: '9999px' }}
            >
              {unreadMessagesCount}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          <Users size={18} />
          <span>Users</span>
        </NavLink>

        <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '12px 0' }} />

        <Link
          to="/"
          target="_blank"
          className="admin-nav-item"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ExternalLink size={18} />
          <span>Live Website</span>
        </Link>

        <button
          onClick={handleLogout}
          className="admin-nav-item"
          style={{
            border: 'none',
            background: 'none',
            color: 'var(--danger)',
            cursor: 'pointer',
            textAlign: 'left',
            marginTop: 'auto',
          }}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </nav>

      <div
        style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border-light)',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.name || 'Admin'}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#0f172a',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '12px',
              flexShrink: 0,
            }}
          >
            {user?.name ? user.name.replace(/^(mr|mrs|ms|dr|er|prof)\.?\s+/i, '').charAt(0).toUpperCase() || 'A' : 'A'}
          </div>
        )}
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {user?.name || 'Administrator'}
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Admin Portal</div>
        </div>
      </div>
    </aside>
  );
}

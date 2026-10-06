import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { statsAPI, contactAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import Button from '../../components/Button';
import {
  Users,
  Package,
  Layers,
  Briefcase,
  Mail,
  ArrowRight,
  Plus,
  Eye,
  CheckCircle,
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Dashboard – Gokul Tech Admin';
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await statsAPI.getStats();
        setStats(res.data);
      } catch (err) {
        setError(err.message || 'Unable to retrieve statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner text="Compiling executive metrics..." />;

  return (
    <div>
      {error && (
        <div
          style={{
            padding: '14px 20px',
            backgroundColor: 'var(--danger-bg)',
            color: 'var(--danger)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
          }}
        >
          {error}
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Total Users
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px', color: 'var(--primary)' }}>
              {stats?.totalUsers || 0}
            </div>
            <Link to="/admin/users" style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              <span>Manage Users</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Users size={22} />
          </div>
        </div>

        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Products
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px', color: 'var(--primary)' }}>
              {stats?.totalProducts || 0}
            </div>
            <Link to="/admin/products" style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              <span>Catalog</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Package size={22} />
          </div>
        </div>

        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Services
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px', color: 'var(--primary)' }}>
              {stats?.totalServices || 0}
            </div>
            <Link to="/admin/services" style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              <span>Capabilities</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Layers size={22} />
          </div>
        </div>

        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Projects
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px', color: 'var(--primary)' }}>
              {stats?.totalProjects || 0}
            </div>
            <Link to="/admin/projects" style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              <span>Portfolio</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Briefcase size={22} />
          </div>
        </div>

        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Messages
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px', color: 'var(--primary)' }}>
              {stats?.totalMessages || 0}
              {stats?.unreadMessages > 0 && (
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent)', marginLeft: 8 }}>
                  ({stats.unreadMessages} new)
                </span>
              )}
            </div>
            <Link to="/admin/messages" style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              <span>Inbox</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Mail size={22} />
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div
        className="card"
        style={{
          padding: '24px 32px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Quick Administration Actions</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Direct shortcuts to publish products, add case studies, and audit messages.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button to="/admin/products" variant="primary" size="sm" icon={<Plus size={15} />}>
            Manage Products
          </Button>
          <Button to="/admin/services" variant="secondary" size="sm" icon={<Plus size={15} />}>
            Manage Services
          </Button>
          <Button to="/admin/projects" variant="secondary" size="sm" icon={<Plus size={15} />}>
            Manage Projects
          </Button>
        </div>
      </div>

      {/* Recent Contact Form Inquiries Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Recent Contact Inquiries</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
              Submissions received from the contact form
            </p>
          </div>
          <Button to="/admin/messages" variant="secondary" size="sm">
            View All Messages
          </Button>
        </div>

        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date Received</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentContacts?.length > 0 ? (
                stats.recentContacts.map((msg) => (
                  <tr key={msg._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{msg.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{msg.email}</div>
                    </td>
                    <td>{msg.subject || 'General Inquiry'}</td>
                    <td>
                      <span
                        className={`badge ${
                          msg.status === 'unread'
                            ? 'badge-accent'
                            : msg.status === 'read'
                            ? 'badge-subtle'
                            : 'badge-success'
                        }`}
                        style={{ fontSize: '11px', textTransform: 'capitalize' }}
                      >
                        {msg.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <Link to="/admin/messages" className="btn btn-secondary btn-sm" style={{ padding: '4px 10px' }}>
                        <Eye size={13} />
                        <span>Inspect</span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '32px' }}>
                    No messages received yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

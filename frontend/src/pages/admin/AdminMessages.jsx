import React, { useState, useEffect } from 'react';
import { contactAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  Eye,
  Trash2,
  CheckCircle,
  Mail,
  Phone,
  Clock,
  MessageSquare,
} from 'lucide-react';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMessage, setViewMessage] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const toast = useToast();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await contactAPI.getAll();
      setMessages(res.data);
    } catch (err) {
      toast.error(err.message || 'Failed to retrieve messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Inquiries & Messages – Gokul Tech Admin';
    fetchMessages();
  }, []);

  const handleView = async (msg) => {
    setViewMessage(msg);
    // Auto-mark as read if unread
    if (msg.status === 'unread') {
      try {
        await contactAPI.updateStatus(msg._id, 'read');
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, status: 'read' } : m))
        );
      } catch (err) {
        console.warn('Status update warning:', err.message);
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'unread' ? 'read' : currentStatus === 'read' ? 'replied' : 'unread';
    try {
      await contactAPI.updateStatus(id, nextStatus);
      toast.success(`Message marked as ${nextStatus}`);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status: nextStatus } : m))
      );
      if (viewMessage && viewMessage._id === id) {
        setViewMessage((prev) => ({ ...prev, status: nextStatus }));
      }
    } catch (err) {
      toast.error(err.message || 'Status update failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await contactAPI.delete(id);
      toast.success('Message deleted successfully.');
      setDeleteConfirmId(null);
      if (viewMessage && viewMessage._id === id) {
        setViewMessage(null);
      }
      fetchMessages();
    } catch (err) {
      toast.error(err.message || 'Delete operation failed.');
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Inquiries & Contact Messages</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Submissions received from prospective clients via the website contact form
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={fetchMessages}>
          Refresh Messages
        </Button>
      </div>

      <div className="table-wrapper">
        {loading ? (
          <LoadingSpinner text="Retrieving messages inbox..." />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg._id} style={{ fontWeight: msg.status === 'unread' ? 600 : 400 }}>
                    <td>{msg.name}</td>
                    <td>
                      <a href={`mailto:${msg.email}`} style={{ color: 'var(--accent)' }}>
                        {msg.email}
                      </a>
                    </td>
                    <td>{msg.phone || '—'}</td>
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
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleView(msg)}
                          style={{ padding: '6px' }}
                          title="View message details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleToggleStatus(msg._id, msg.status)}
                          style={{ padding: '6px' }}
                          title="Cycle Status (Unread -> Read -> Replied)"
                        >
                          <CheckCircle size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteConfirmId(msg._id)}
                          style={{ padding: '6px' }}
                          title="Delete message"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '48px' }}>
                    No messages received yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* View Message Modal */}
      <Modal
        isOpen={Boolean(viewMessage)}
        onClose={() => setViewMessage(null)}
        title="Contact Inquiry Details"
        maxWidth={580}
      >
        {viewMessage && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>SENDER</div>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>{viewMessage.name}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{viewMessage.email}</div>
                {viewMessage.phone && (
                  <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                    Phone: {viewMessage.phone}
                  </div>
                )}
              </div>

              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>DATE & STATUS</div>
                <div style={{ fontSize: '14px', marginTop: 4 }}>
                  {new Date(viewMessage.createdAt).toLocaleString()}
                </div>
                <div style={{ marginTop: 8 }}>
                  <span
                    className={`badge ${
                      viewMessage.status === 'unread'
                        ? 'badge-accent'
                        : viewMessage.status === 'read'
                        ? 'badge-subtle'
                        : 'badge-success'
                    }`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    Status: {viewMessage.status}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                SUBJECT
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600 }}>{viewMessage.subject}</div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                MESSAGE CONTENT
              </div>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '14.5px',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {viewMessage.message}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a
                href={`mailto:${viewMessage.email}?subject=Re: ${encodeURIComponent(viewMessage.subject || 'Apex Dynamics Inquiry')}`}
                className="btn btn-primary btn-sm"
              >
                <Mail size={15} />
                <span>Reply via Email</span>
              </a>

              <div style={{ display: 'flex', gap: 10 }}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleToggleStatus(viewMessage._id, viewMessage.status)}
                >
                  Change Status
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setDeleteConfirmId(viewMessage._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Deletion"
        maxWidth={400}
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
          Delete this contact message permanently?
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <Button variant="secondary" onClick={() => setDeleteConfirmId(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteConfirmId)}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

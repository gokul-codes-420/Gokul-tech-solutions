import React, { useState, useEffect } from 'react';
import { usersAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Shield, ShieldAlert, User, Trash2 } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const { user: currentUser } = useAuth();
  const toast = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await usersAPI.getAll();
      setUsers(res.data);
    } catch (err) {
      toast.error(err.message || 'Failed to retrieve users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Manage Users – Gokul Tech Admin';
    fetchUsers();
  }, []);

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await usersAPI.updateRole(userId, newRole);
      toast.success(`User role changed to ${newRole}`);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      toast.error(err.message || 'Failed to update role');
    }
  };

  const handleDelete = async (id) => {
    try {
      await usersAPI.delete(id);
      toast.success('User deleted successfully.');
      setDeleteConfirmId(null);
      fetchUsers();
    } catch (err) {
      toast.error(err.message || 'Failed to delete user.');
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
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Registered Users & Roles</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Inspect registered accounts, manage administrative privileges, and audit access
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={fetchUsers}>
          Refresh Accounts
        </Button>
      </div>

      <div className="table-wrapper">
        {loading ? (
          <LoadingSpinner text="Retrieving user database..." />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Registration Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = u._id === currentUser?._id;
                return (
                  <tr key={u._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            backgroundColor: u.role === 'admin' ? 'var(--primary)' : 'var(--bg-subtle)',
                            color: u.role === 'admin' ? '#ffffff' : 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '13px',
                          }}
                        >
                          {u.name ? u.name[0].toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>
                            {u.name} {isSelf && <span style={{ fontSize: '11px', color: 'var(--accent)' }}>(You)</span>}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${u.role === 'admin' ? 'badge-accent' : 'badge-subtle'}`}
                        style={{ fontSize: '11px', textTransform: 'uppercase' }}
                      >
                        {u.role === 'admin' && <Shield size={12} style={{ marginRight: 4 }} />}
                        {u.role}
                      </span>
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 8 }}>
                        {!isSelf && (
                          <>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => handleRoleToggle(u._id, u.role)}
                              title={u.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                            >
                              {u.role === 'admin' ? 'Demote' : 'Promote Admin'}
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => setDeleteConfirmId(u._id)}
                              style={{ padding: '6px' }}
                              title="Delete user"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm User Account Deletion"
        maxWidth={400}
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
          Are you sure you want to permanently delete this user account?
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <Button variant="secondary" onClick={() => setDeleteConfirmId(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteConfirmId)}>
            Delete Account
          </Button>
        </div>
      </Modal>
    </div>
  );
}

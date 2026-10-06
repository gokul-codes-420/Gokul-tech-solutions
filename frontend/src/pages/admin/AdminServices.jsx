import React, { useState, useEffect } from 'react';
import { servicesAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Briefcase,
  TrendingUp,
  Globe,
  Cpu,
  Server,
  Layers,
  ShieldCheck,
  Code,
  Database,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const iconOptions = [
  'Briefcase',
  'TrendingUp',
  'Globe',
  'Cpu',
  'Server',
  'Layers',
  'ShieldCheck',
  'Code',
  'Database',
];

const initialForm = {
  title: '',
  icon: 'Briefcase',
  shortDescription: '',
  description: '',
  features: '',
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const toast = useToast();

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await servicesAPI.getAll();
      setServices(res.data);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Manage Services – Gokul Tech Admin';
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv) => {
    setIsEditing(true);
    setEditingId(srv._id);
    setFormData({
      title: srv.title || '',
      icon: srv.icon || 'Briefcase',
      shortDescription: srv.shortDescription || '',
      description: srv.description || '',
      features: Array.isArray(srv.features) ? srv.features.join(', ') : '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Title and description are required.');
      return;
    }

    const payload = {
      title: formData.title,
      icon: formData.icon,
      shortDescription: formData.shortDescription,
      description: formData.description,
      features: formData.features.split(',').map((f) => f.trim()).filter(Boolean),
    };

    try {
      setSubmitting(true);
      if (isEditing) {
        await servicesAPI.update(editingId, payload);
        toast.success('Service updated successfully.');
      } else {
        await servicesAPI.create(payload);
        toast.success('Service created successfully.');
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      toast.error(err.message || 'Operation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await servicesAPI.delete(id);
      toast.success('Service removed.');
      setDeleteConfirmId(null);
      fetchServices();
    } catch (err) {
      toast.error(err.message || 'Failed to delete service.');
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
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Services Catalog</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Maintain capabilities, consulting practices, and technical deliverables
          </p>
        </div>

        <Button variant="primary" onClick={handleOpenAdd} icon={<Plus size={16} />}>
          Add Service
        </Button>
      </div>

      <div className="table-wrapper">
        {loading ? (
          <LoadingSpinner text="Retrieving services..." />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Icon</th>
                <th>Summary</th>
                <th>Features Count</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((srv) => (
                  <tr key={srv._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{srv.title}</div>
                    </td>
                    <td>
                      <span className="badge badge-subtle">{srv.icon || 'Briefcase'}</span>
                    </td>
                    <td style={{ maxWidth: '300px' }}>
                      <span style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                        {srv.shortDescription || srv.description?.slice(0, 70) + '...'}
                      </span>
                    </td>
                    <td>{srv.features?.length || 0} items</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <Link
                          to={`/services/${srv._id}`}
                          target="_blank"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '6px' }}
                          title="View on site"
                        >
                          <ExternalLink size={14} />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleOpenEdit(srv)}
                          style={{ padding: '6px' }}
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteConfirmId(srv._id)}
                          style={{ padding: '6px' }}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '48px' }}>
                    No services cataloged.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Service Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'Edit Service' : 'Add New Service'}
        maxWidth={640}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Service Title *</label>
              <input
                type="text"
                className="form-control"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Enterprise Cloud & DevOps"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Icon Representation</label>
              <select
                className="form-control"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              >
                {iconOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Short Description</label>
            <input
              type="text"
              className="form-control"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="1-sentence elevator pitch..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Comprehensive Description *</label>
            <textarea
              className="form-control"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Full engagement deliverables and approach..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Features / Deliverables (comma-separated)</label>
            <textarea
              className="form-control"
              rows={3}
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Architecture Review, Disaster Recovery SLA, 24/7 Monitoring"
            />
            <span className="form-hint">Separate items with commas</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={submitting}>
              {isEditing ? 'Save Changes' : 'Publish Service'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Deletion"
        maxWidth={420}
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
          Are you sure you want to delete this service?
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

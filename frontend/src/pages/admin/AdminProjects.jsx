import React, { useState, useEffect } from 'react';
import { projectsAPI } from '../../services/api';
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
} from 'lucide-react';

const initialForm = {
  title: '',
  category: 'Business',
  description: '',
  image: '',
  technologies: '',
  projectUrl: '',
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const toast = useToast();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectsAPI.getAll();
      setProjects(res.data);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Manage Projects – Gokul Tech Admin';
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setIsEditing(true);
    setEditingId(proj._id);
    setFormData({
      title: proj.title || '',
      category: proj.category || 'Business',
      description: proj.description || '',
      image: proj.image || '',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : '',
      projectUrl: proj.projectUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.category || !formData.description.trim()) {
      toast.error('Title, category, and description are required.');
      return;
    }

    const payload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      projectUrl: formData.projectUrl,
    };

    try {
      setSubmitting(true);
      if (isEditing) {
        await projectsAPI.update(editingId, payload);
        toast.success('Project updated.');
      } else {
        await projectsAPI.create(payload);
        toast.success('Project published.');
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.message || 'Operation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await projectsAPI.delete(id);
      toast.success('Project deleted.');
      setDeleteConfirmId(null);
      fetchProjects();
    } catch (err) {
      toast.error(err.message || 'Failed to delete project.');
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
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Client Projects Portfolio</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Publish and manage enterprise case studies and customer references
          </p>
        </div>

        <Button variant="primary" onClick={handleOpenAdd} icon={<Plus size={16} />}>
          Add Project
        </Button>
      </div>

      <div className="table-wrapper">
        {loading ? (
          <LoadingSpinner text="Retrieving projects..." />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Technologies</th>
                <th>Case Link</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((proj) => (
                  <tr key={proj._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img
                          src={proj.image || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=200&q=80'}
                          alt={proj.title}
                          style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }}
                        />
                        <div style={{ fontWeight: 600 }}>{proj.title}</div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-accent" style={{ fontSize: '11px', padding: '3px 8px' }}>
                        {proj.category}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxWidth: 220 }}>
                        {proj.technologies?.slice(0, 3).map((tech, i) => (
                          <span key={i} className="badge badge-subtle" style={{ fontSize: '10.5px', padding: '2px 6px' }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      {proj.projectUrl ? (
                        <a
                          href={proj.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '13px', color: 'var(--accent)' }}
                        >
                          <span>URL</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>None</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleOpenEdit(proj)}
                          style={{ padding: '6px' }}
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteConfirmId(proj._id)}
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
                    No case study projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'Edit Case Study Project' : 'Add New Case Study Project'}
        maxWidth={640}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Project Title *</label>
              <input
                type="text"
                className="form-control"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Core Banking Platform Migration"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Web">Web</option>
                <option value="Mobile">Mobile</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Case Study Link / External URL</label>
            <input
              type="url"
              className="form-control"
              value={formData.projectUrl}
              onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
              placeholder="https://example.com/case-study"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technologies Used (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, Node.js, Express, Three.js, Docker"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Project Description & Measurable Impact *</label>
            <textarea
              className="form-control"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detail challenges, architectural implementation, and metric results..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={submitting}>
              {isEditing ? 'Save Changes' : 'Publish Project'}
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
          Are you sure you want to permanently delete this project?
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

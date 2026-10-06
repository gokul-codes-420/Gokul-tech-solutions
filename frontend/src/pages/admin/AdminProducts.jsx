import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import SearchBar from '../../components/SearchBar';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const initialForm = {
  name: '',
  category: 'Enterprise Software',
  shortDescription: '',
  description: '',
  image: '',
  price: 1200,
  features: '',
  specifications: '{"Deployment": "Cloud / Hybrid", "SLA": "99.99%"}',
  availability: 'Available',
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const toast = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productsAPI.getAll();
      setProducts(res.data);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Manage Products – Gokul Tech Admin';
    fetchProducts();
  }, []);

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setIsEditing(true);
    setEditingId(prod._id);

    // Format features as comma separated string
    const featuresStr = Array.isArray(prod.features) ? prod.features.join(', ') : '';
    // Format specs as JSON string
    let specsStr = '{}';
    try {
      if (prod.specifications) {
        specsStr = JSON.stringify(prod.specifications, null, 2);
      }
    } catch {
      specsStr = '{}';
    }

    setFormData({
      name: prod.name || '',
      category: prod.category || 'Enterprise Software',
      shortDescription: prod.shortDescription || '',
      description: prod.description || '',
      image: prod.image || '',
      price: prod.price || 0,
      features: featuresStr,
      specifications: specsStr,
      availability: prod.availability || 'Available',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.category.trim() || !formData.description.trim()) {
      toast.error('Name, category, and description are required.');
      return;
    }

    let parsedSpecs = {};
    if (formData.specifications.trim()) {
      try {
        parsedSpecs = JSON.parse(formData.specifications);
      } catch (err) {
        toast.error('Invalid JSON in Specifications field.');
        return;
      }
    }

    const payload = {
      name: formData.name,
      category: formData.category,
      shortDescription: formData.shortDescription,
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      price: Number(formData.price) || 0,
      features: formData.features.split(',').map((f) => f.trim()).filter(Boolean),
      specifications: parsedSpecs,
      availability: formData.availability,
    };

    try {
      setSubmitting(true);
      if (isEditing) {
        await productsAPI.update(editingId, payload);
        toast.success('Product updated successfully.');
      } else {
        await productsAPI.create(payload);
        toast.success('Product published successfully.');
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.message || 'Operation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await productsAPI.delete(id);
      toast.success('Product deleted.');
      setDeleteConfirmId(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.message || 'Failed to delete product.');
    }
  };

  // Client-side filtering for fast admin responsiveness
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header and Add button */}
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
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Products & Solutions Catalog</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Publish, edit, and maintain all enterprise products in MongoDB
          </p>
        </div>

        <Button variant="primary" onClick={handleOpenAdd} icon={<Plus size={16} />}>
          Add Product
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search product catalog..."
          onClear={() => setSearchTerm('')}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Category:
          </span>
          <select
            className="form-control"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '13.5px' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Enterprise Software">Enterprise Software</option>
            <option value="Data & Analytics">Data & Analytics</option>
            <option value="Productivity">Productivity</option>
            <option value="Security">Security</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="table-wrapper">
        {loading ? (
          <LoadingSpinner text="Retrieving products catalog..." />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Updated</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img
                          src={p.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&q=80'}
                          alt={p.name}
                          style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 600 }}>{p.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            slug: {p.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-accent" style={{ fontSize: '11px', padding: '3px 8px' }}>
                        {p.category}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>
                        {p.price > 0 ? `₹${p.price.toLocaleString('en-IN')}/mo` : 'Custom'}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          p.availability === 'In Stock'
                            ? 'badge-success'
                            : 'badge-subtle'
                        }`}
                        style={{ fontSize: '11px', padding: '3px 8px' }}
                      >
                        {p.availability}
                      </span>
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {new Date(p.updatedAt || p.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <Link
                          to={`/products/${p._id}`}
                          target="_blank"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '6px' }}
                          title="View on live website"
                        >
                          <ExternalLink size={14} />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleOpenEdit(p)}
                          style={{ padding: '6px' }}
                          title="Edit Product"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteConfirmId(p._id)}
                          style={{ padding: '6px' }}
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '48px' }}>
                    No products found matching query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'Edit Product Solution' : 'Add New Product Solution'}
        maxWidth={700}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                className="form-control"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Apex Enterprise Suite"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Enterprise Software">Enterprise Software</option>
                <option value="Data & Analytics">Data & Analytics</option>
                <option value="Productivity">Productivity</option>
                <option value="Security">Security</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Price (₹ INR / month)</label>
              <input
                type="number"
                className="form-control"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0 for custom pricing"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Availability Status</label>
              <select
                className="form-control"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              >
                <option value="Available">Available</option>
                <option value="In Stock">In Stock</option>
                <option value="Limited">Limited</option>
                <option value="Contact Us">Contact Us</option>
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
            <label className="form-label">Short Description</label>
            <input
              type="text"
              className="form-control"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief 1-sentence synopsis..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Full Product Description *</label>
            <textarea
              className="form-control"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed architecture and utility overview..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Key Features (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Feature 1, Feature 2, Feature 3"
            />
            <span className="form-hint">Separate individual features with commas</span>
          </div>

          <div className="form-group">
            <label className="form-label">Technical Specifications (JSON format)</label>
            <textarea
              className="form-control"
              rows={3}
              value={formData.specifications}
              onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
              placeholder='{"Deployment": "Cloud-Native", "Uptime SLA": "99.99%"}'
            />
            <span className="form-hint">Valid JSON key-value pairs</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={submitting}>
              {isEditing ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Deletion"
        maxWidth={440}
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: '15px' }}>
          Are you sure you want to permanently delete this product? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <Button variant="secondary" onClick={() => setDeleteConfirmId(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(deleteConfirmId)}
          >
            Delete Product
          </Button>
        </div>
      </Modal>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Zap,
  Server,
  Mail,
  Share2,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productsAPI.getByIdOrSlug(id);
        setProduct(res.data);
        document.title = `${res.data.name} – Gokul Tech Solutions`;
      } catch (err) {
        setError(err.message || 'Product could not be retrieved');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard.');
    }
  };

  if (loading) return <LoadingSpinner text="Loading product specifications..." />;

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: 16 }}>Product Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
          {error || 'The requested product solution does not exist or has been retired.'}
        </p>
        <Button to="/products" variant="primary">
          Back to Products Catalog
        </Button>
      </div>
    );
  }

  // Handle specifications whether Map, Object, or array
  const specsEntries =
    product.specifications instanceof Map
      ? Array.from(product.specifications.entries())
      : typeof product.specifications === 'object' && product.specifications !== null
      ? Object.entries(product.specifications)
      : [];

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 32px)', paddingBottom: '96px' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to All Products</span>
          </Link>

          <button
            onClick={handleShare}
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Share2 size={14} />
            <span>Share Solution</span>
          </button>
        </div>

        {/* Product Hero Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'start',
            marginBottom: '64px',
          }}
        >
          {/* Product Image */}
          <div
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-subtle)',
              boxShadow: 'var(--shadow-lg)',
              height: '460px',
            }}
          >
            <img
              src={product.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Product Details Information */}
          <div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
              <span className="badge badge-accent">{product.category}</span>
              <span
                className={`badge ${
                  product.availability === 'In Stock' ? 'badge-success' : 'badge-subtle'
                }`}
              >
                {product.availability || 'Available'}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', fontWeight: 800, marginBottom: '16px' }}>
              {product.name}
            </h1>

            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              {product.shortDescription || product.description}
            </p>

            <div
              style={{
                padding: '24px',
                backgroundColor: 'var(--bg-light)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                marginBottom: '28px',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Enterprise Licensing Tier
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '36px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                  {product.price > 0 ? `₹${product.price.toLocaleString('en-IN')}` : 'Custom Pricing'}
                </span>
                {product.price > 0 && (
                  <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                    per instance / billed monthly
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Button to="/contact" variant="primary" size="lg" icon={<Mail size={16} />}>
                Request Live Demonstration
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                Contact Sales Engineering
              </Button>
            </div>
          </div>
        </div>

        {/* Full Description & Features */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'start' }}>
          <div>
            <div className="card" style={{ padding: '36px', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>
                Architectural & Functional Overview
              </h3>
              <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                {product.description}
              </p>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="card" style={{ padding: '36px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>
                  Key Solution Capabilities
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {product.features.map((feat, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-light)',
                          color: 'var(--accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <Check size={13} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: '15.5px', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Technical Specifications Table */}
          <div>
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Server size={20} color="#2563eb" />
                <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Technical Specifications</h3>
              </div>

              {specsEntries.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {specsEntries.map(([key, val], idx) => (
                    <div
                      key={idx}
                      style={{
                        paddingBottom: '12px',
                        borderBottom: idx === specsEntries.length - 1 ? 'none' : '1px solid var(--border-light)',
                      }}
                    >
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        {key}
                      </div>
                      <div style={{ fontSize: '14.5px', fontWeight: 500, color: 'var(--text-primary)', marginTop: '2px' }}>
                        {String(val)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  Standard enterprise specification sheet available upon NDA execution.
                </div>
              )}

              <div
                style={{
                  marginTop: '28px',
                  padding: '16px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--text-secondary)',
                }}
              >
                <ShieldCheck size={16} color="#10b981" />
                <span>Complies with ISO 27001, SOC 2 Type II</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

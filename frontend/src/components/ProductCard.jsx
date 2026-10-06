import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const displayFeatures = product.features?.slice(0, 3) || [];

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-body">
        <div className="product-category-row">
          <span className="badge badge-accent" style={{ fontSize: '11px', padding: '4px 10px' }}>
            {product.category}
          </span>
          <span className={`badge ${product.availability === 'In Stock' ? 'badge-success' : 'badge-subtle'}`} style={{ fontSize: '11px', padding: '4px 10px' }}>
            {product.availability || 'Available'}
          </span>
        </div>

        <h3 className="product-title">{product.name}</h3>

        <p className="product-description">
          {product.shortDescription || product.description?.slice(0, 110) + '...'}
        </p>

        {displayFeatures.length > 0 && (
          <ul className="product-features-list">
            {displayFeatures.map((feat, i) => (
              <li key={i} className="product-feature-item">
                <Check size={14} color="#2563eb" style={{ flexShrink: 0 }} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="product-footer">
          <div className="product-price">
            {product.price > 0 ? (
              <>
                ₹{product.price.toLocaleString('en-IN')}
                <span> / mo</span>
              </>
            ) : (
              <span>Enterprise</span>
            )}
          </div>

          <Link
            to={`/products/${product._id || product.slug}`}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 14px' }}
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

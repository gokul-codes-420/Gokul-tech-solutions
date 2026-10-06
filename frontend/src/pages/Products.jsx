import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { productsAPI } from '../services/api';
import { FALLBACK_PRODUCTS } from '../data/mockData';

const categories = ['All', 'Enterprise Software', 'Data & Analytics', 'Productivity', 'Security', 'Infrastructure'];

export default function Products() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Products & Solutions – Gokul Tech Solutions';
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        if (searchTerm.trim()) params.search = searchTerm.trim();
        if (selectedCategory !== 'All') params.category = selectedCategory;

        const res = await productsAPI.getAll(params);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        }
        setError(null);
      } catch (err) {
        console.warn('Using fallback products:', err.message);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedCategory]);

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 32px)', paddingBottom: '96px' }}>
      <section className="section" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
        <div className="container">
          <SectionTitle
            badge="Enterprise Platforms"
            badgeType="accent"
            title="Products & Turnkey Solutions"
            subtitle="Explore our ecosystem of modular, enterprise-tested software platforms designed to optimize data operations, workflows, and cyber defense."
            align="center"
          />

          {/* Search & Category Filter Controls */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              marginTop: '40px',
              marginBottom: '36px',
            }}
          >
            <FilterBar
              options={categories}
              activeOption={selectedCategory}
              onSelect={setSelectedCategory}
            />

            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search solutions by keyword..."
              onClear={() => setSearchTerm('')}
            />
          </div>

          {error && (
            <div
              style={{
                padding: '16px',
                backgroundColor: 'var(--danger-bg)',
                color: 'var(--danger)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                marginBottom: '32px',
              }}
            >
              {error}
            </div>
          )}

          {/* Products Grid */}
          <div className="products-grid">
            {loading ? (
              <SkeletonCard count={6} type="product" />
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))
            ) : (
              <div
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '64px 20px',
                  backgroundColor: 'var(--bg-light)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                }}
              >
                <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>No Products Found</h4>
                <p style={{ color: 'var(--text-secondary)' }}>
                  No solutions matched your search filter. Try clearing your search keyword or switching categories.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

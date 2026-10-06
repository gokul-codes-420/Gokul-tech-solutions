import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import FilterBar from '../components/FilterBar';
import SkeletonCard from '../components/SkeletonCard';
import { projectsAPI } from '../services/api';
import { FALLBACK_PROJECTS } from '../data/mockData';

const categories = ['All', 'Web', 'Mobile', 'Business', 'Other'];

export default function Portfolio() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Portfolio – Gokul Tech Solutions Case Studies & Deployments';
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;

        const res = await projectsAPI.getAll(params);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProjects(res.data);
        }
        setError(null);
      } catch (err) {
        console.warn('Using fallback projects:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCategory]);

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 32px)', paddingBottom: '96px' }}>
      <section className="section" style={{ paddingTop: '32px' }}>
        <div className="container">
          <SectionTitle
            badge="Case Studies"
            badgeType="accent"
            title="Engineered Deployments & Real Impact"
            subtitle="Explore how our cross-functional engineering teams have accelerated operations, resolved throughput bottlenecks, and secured critical infrastructure."
            align="center"
          />

          {/* Category Filter */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '40px',
              marginBottom: '48px',
            }}
          >
            <FilterBar
              options={categories}
              activeOption={selectedCategory}
              onSelect={setSelectedCategory}
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

          {/* Portfolio Grid */}
          <div className="portfolio-grid">
            {loading ? (
              <SkeletonCard count={6} type="product" />
            ) : projects.length > 0 ? (
              projects.map((proj, idx) => (
                <ProjectCard key={proj._id} project={proj} index={idx} />
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
                <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>No Case Studies In This Category</h4>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Select "All" to view our complete portfolio of engineering achievements.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

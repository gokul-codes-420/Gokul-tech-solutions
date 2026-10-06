import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import SkeletonCard from '../components/SkeletonCard';
import Button from '../components/Button';
import { servicesAPI } from '../services/api';
import { FALLBACK_SERVICES } from '../data/mockData';
import { HelpCircle } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Services – Gokul Tech Solutions Enterprise Capabilities';
    const fetchServices = async () => {
      try {
        const res = await servicesAPI.getAll();
        if (Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data);
        }
      } catch (err) {
        console.warn('Using fallback services:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 32px)', paddingBottom: '96px' }}>
      <section className="section" style={{ paddingTop: '32px', paddingBottom: '48px' }}>
        <div className="container">
          <SectionTitle
            badge="Strategic Offerings"
            badgeType="accent"
            title="Enterprise Services Designed for Scale"
            subtitle="Tailored technical advisory, custom platform engineering, and 24/7 managed infrastructure formulated to solve high-stakes challenges."
            align="center"
          />

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

          <div className="services-grid" style={{ marginTop: '48px' }}>
            {loading ? (
              <SkeletonCard count={6} type="service" />
            ) : (
              services.map((service, index) => (
                <ServiceCard key={service._id} service={service} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Engagement Advisory Section */}
      <section className="section section-light" style={{ marginTop: '48px' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: 'var(--accent)',
            }}
          >
            <HelpCircle size={26} />
          </div>

          <h3 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '12px' }}>
            Need a Customized Advisory Solution?
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6, marginBottom: '28px' }}>
            Every enterprise has unique operational constraints, legacy obligations, and compliance frameworks. Our principal architects craft bespoke technical roadmaps tailored to your stack.
          </p>

          <Button to="/contact" variant="primary" size="lg">
            Schedule an Architectural Discovery Session
          </Button>
        </div>
      </section>
    </div>
  );
}

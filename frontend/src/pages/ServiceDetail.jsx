import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Globe,
  Cpu,
  Server,
  Layers,
  Briefcase,
  Code,
  Database,
} from 'lucide-react';

const iconMap = {
  TrendingUp,
  Globe,
  Cpu,
  Server,
  Layers,
  ShieldCheck,
  Briefcase,
  Code,
  Database,
};

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await servicesAPI.getById(id);
        setService(res.data);
        document.title = `${res.data.title} – Gokul Tech Solutions Services`;
      } catch (err) {
        setError(err.message || 'Service not found');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <LoadingSpinner text="Retrieving service details..." />;

  if (error || !service) {
    return (
      <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: 16 }}>Service Unavailable</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>{error || 'Unable to locate the specified service.'}</p>
        <Button to="/services" variant="primary">
          Back to All Services
        </Button>
      </div>
    );
  }

  const IconComp = iconMap[service.icon] || Briefcase;

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 32px)', paddingBottom: '96px' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Back Link */}
        <Link
          to="/services"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: '32px',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Services</span>
        </Link>

        {/* Service Header */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              flexShrink: 0,
            }}
          >
            <IconComp size={32} />
          </div>

          <div>
            <span className="badge badge-accent" style={{ marginBottom: '8px' }}>
              Enterprise Capability
            </span>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800 }}>
              {service.title}
            </h1>
          </div>
        </div>

        {/* Lead Summary */}
        <div
          className="card"
          style={{
            padding: '36px',
            marginBottom: '40px',
            backgroundColor: 'var(--bg-light)',
            borderLeft: '4px solid var(--accent)',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>
            Executive Overview
          </h3>
          <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--text-primary)' }}>
            {service.description}
          </p>
        </div>

        {/* Deliverables & Key Features */}
        <div className="card" style={{ padding: '36px', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
            Core Deliverables & Methodologies
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {service.features?.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                }}
              >
                <CheckCircle2 size={18} color="#2563eb" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: '14.5px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Inquire CTA Box */}
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: 'var(--radius-lg)',
            padding: '48px',
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
            Request an Engagement Scope for {service.title}
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '580px', margin: '0 auto 28px' }}>
            Connect directly with an engineering principal to evaluate your objectives, timeline, and delivery parameters.
          </p>
          <Button to="/contact" variant="primary" size="lg" style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
            Initiate Conversation
          </Button>
        </div>
      </div>
    </div>
  );
}

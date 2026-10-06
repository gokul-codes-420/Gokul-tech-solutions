import React, { useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import {
  Target,
  Eye,
  HeartHandshake,
  ShieldCheck,
  CheckCircle,
  Users,
  Award,
  Globe2,
} from 'lucide-react';

export default function About() {
  useEffect(() => {
    document.title = 'About Us – Gokul Tech Solutions Corporate Overview';
  }, []);

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 32px)', paddingBottom: '96px' }}>
      {/* Hero Header */}
      <section className="section" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        <div className="container">
          <SectionTitle
            badge="About Gokul Tech Solutions"
            badgeType="accent"
            title="Pioneering High-Trust Digital Engineering"
            subtitle="Founded to bridge the divide between strategic business objectives and rock-solid software execution."
            align="center"
          />

          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              height: '420px',
              border: '1px solid var(--border)',
              marginTop: '40px',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80"
              alt="Gokul Tech Solutions Corporate Headquarters"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values Cards */}
      <section className="section section-light">
        <div className="container">
          <SectionTitle
            badge="Guiding Principles"
            badgeType="subtle"
            title="Our Purpose, Ambition & Code"
            subtitle="The foundational tenets guiding how we engineer platforms and partner with enterprise clients."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <div className="card card-interactive">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--accent-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: 'var(--accent)',
                }}
              >
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                To empower forward-thinking organizations with bulletproof software engineering, clean cloud infrastructure, and decisive data intelligence, removing technological barriers to scale.
              </p>
            </div>

            <div className="card card-interactive">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--accent-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: 'var(--accent)',
                }}
              >
                <Eye size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                Our Vision
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                To set the industry gold standard for transparent, dependable, and resilient enterprise software systems where security, speed, and elegance converge effortlessly.
              </p>
            </div>

            <div className="card card-interactive">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--accent-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: 'var(--accent)',
                }}
              >
                <HeartHandshake size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                Our Values
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Radical accountability, unbending security principles, craftsmanship in every line of code, and an unwavering commitment to client success through transparent partnership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <SectionTitle
                badge="The Gokul Tech Difference"
                badgeType="accent"
                title="Why Market Leaders Entrust Their Critical Systems to Us"
                subtitle="We combine the rigor of elite corporate advisory with the rapid iteration and technical ingenuity of high-caliber engineering."
                align="left"
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '32px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
                      Senior-Only Architecture Teams
                    </h4>
                    <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                      No handoffs to junior contractors. Every engagement is staffed by seasoned principal architects and engineers.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <ShieldCheck size={20} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
                      Zero-Tolerance Security Posture
                    </h4>
                    <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                      From automated static analysis to automated penetration tests, we protect corporate data with military-grade standards.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <Award size={20} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
                      Guaranteed Outcomes & Measurable ROI
                    </h4>
                    <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                      We link deliverables to objective performance benchmarks: latency thresholds, uptime SLAs, and operational efficiency gains.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '36px' }}>
                <Button to="/contact" variant="primary" size="lg">
                  Initiate Partnership
                </Button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '16px',
              }}
            >
              <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                <Users size={28} color="#2563eb" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--primary)' }}>98%</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Client Retention Rate</div>
              </div>

              <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                <Globe2 size={28} color="#2563eb" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--primary)' }}>14+</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Countries Served</div>
              </div>

              <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                <Award size={28} color="#2563eb" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--primary)' }}>500+</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Deployments Launched</div>
              </div>

              <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                <ShieldCheck size={28} color="#2563eb" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--primary)' }}>99.99%</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Production Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

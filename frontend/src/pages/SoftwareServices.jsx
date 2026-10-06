import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Cloud,
  TrendingUp,
  Video,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  PhoneCall,
  Clock,
  Sparkles,
} from 'lucide-react';
import Button from '../components/Button';

const CORE_SERVICES = [
  {
    id: 'software-dev',
    title: 'Customized Software Development',
    icon: Code2,
    description:
      'We develop secure, scalable, and efficient software solutions tailored to your business requirements, ensuring smooth operations and growth.',
    features: [
      'Bespoke Web & Mobile Applications',
      'Microservices & Enterprise Architecture',
      'REST & GraphQL High-Throughput APIs',
      'Legacy Modernization & Code Refactoring',
    ],
  },
  {
    id: 'cloud-services',
    title: 'Cloud Services (AWS & More)',
    icon: Cloud,
    description:
      'Scale your business with reliable cloud solutions. We offer AWS, Azure, and Google Cloud setup, hosting, and maintenance at competitive rates.',
    features: [
      'Multi-Cloud Strategy (AWS, Azure & GCP)',
      'Automated CI/CD DevOps Pipelines',
      '24/7 Managed Server Infrastructure',
      'Cost Governance & Disaster Recovery',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & SEO',
    icon: TrendingUp,
    description:
      'Grow your online presence with our professional SEO, social media marketing, and lead generation services designed to drive real results.',
    features: [
      'Technical & On-Page SEO Ranking',
      'High-ROI Paid Ads (Google & Meta)',
      'Conversion Rate Optimization (CRO)',
      'Brand Social Media & Content Campaigns',
    ],
  },
  {
    id: 'filmmaking-video',
    title: 'Filmmaking & Short Film Production',
    icon: Video,
    description:
      'Bring your ideas to life with our creative team. We produce short films, corporate videos, and marketing content to elevate your brand story.',
    features: [
      'Corporate Ad Films & Commercials',
      'Creative Short Film Production',
      'Product Demos & 4K Explainer Videos',
      'High-End Color Grading & Post-Production',
    ],
  },
];

export default function SoftwareServices() {
  useEffect(() => {
    document.title = 'Software Services – Gokul Tech Solutions Enterprise Capabilities';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* =================================================================
          TOP ROYAL BLUE HERO BANNER (Matches user screenshot)
          ================================================================= */}
      <section
        style={{
          backgroundColor: '#0056d2',
          backgroundImage: 'linear-gradient(135deg, #0056d2 0%, #0045aa 100%)',
          paddingTop: 'calc(var(--header-height) + 64px)',
          paddingBottom: '72px',
          color: '#ffffff',
          textAlign: 'center',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'clamp(28px, 4.2vw, 46px)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.025em',
              lineHeight: 1.25,
              marginBottom: '18px',
            }}
          >
            Innovative IT &amp; Creative Services for Your Business
          </h1>

          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.92)',
              lineHeight: 1.7,
              maxWidth: '820px',
              margin: '0 auto',
            }}
          >
            At Gokul Tech Solutions, we provide cutting-edge solutions to help your business grow.
            From customized software development to cloud hosting, digital marketing, and short film
            production &mdash; we deliver high-quality services tailored to your needs.
          </p>
        </div>
      </section>

      {/* =================================================================
          OUR CORE SERVICES SECTION (Matches user screenshot)
          ================================================================= */}
      <section className="section" style={{ paddingTop: '64px', paddingBottom: '56px' }}>
        <div className="container">
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: 'clamp(24px, 3.2vw, 34px)',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Our Core Services
            </h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px', marginBottom: 0 }}>
              End-to-end technology engineering and media solutions tailored for ambitious enterprises
            </p>
          </div>

          {/* 4 Cards Grid (Exact match to screenshot layout) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {CORE_SERVICES.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '36px 24px',
                    textAlign: 'center',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 16px 32px -6px rgba(0, 86, 210, 0.12)';
                    e.currentTarget.style.borderColor = '#93c5fd';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.03)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div>
                    {/* Blue Icon */}
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        margin: '0 auto 20px',
                        borderRadius: '12px',
                        backgroundColor: '#eff6ff',
                        color: '#0056d2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComponent size={28} strokeWidth={2.2} />
                    </div>

                    {/* Service Title */}
                    <h3
                      style={{
                        fontSize: '17px',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '14px',
                        lineHeight: 1.35,
                      }}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '13.5px',
                        color: '#475569',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <div
                    style={{
                      marginTop: '24px',
                      paddingTop: '20px',
                      borderTop: '1px solid #f1f5f9',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {service.features.map((feat, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#64748b' }}>
                          <CheckCircle size={14} color="#0056d2" style={{ flexShrink: 0 }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Enterprise CTA Banner */}
          <div
            style={{
              marginTop: '56px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '40px 32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#0056d2',
                    backgroundColor: '#eff6ff',
                    padding: '4px 10px',
                    borderRadius: '999px',
                  }}
                >
                  Ready to Build?
                </span>
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                Have a project or custom software requirement in mind?
              </h3>
              <p style={{ color: '#64748b', fontSize: '14.5px', margin: 0 }}>
                Speak with our lead engineers for architectural estimation and milestone planning.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button to="/contact" variant="primary" icon={<ArrowRight size={16} />}>
                Request a Proposal
              </Button>
              <Button to="/apply-internship" variant="secondary">
                Apply Internship
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

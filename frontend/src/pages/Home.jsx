import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroVisual from '../components/HeroVisual';
import SolutionVisual from '../components/SolutionVisual';
import SectionTitle from '../components/SectionTitle';
import StatsCard from '../components/StatsCard';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';
import ProjectCard from '../components/ProjectCard';
import Button from '../components/Button';
import SkeletonCard from '../components/SkeletonCard';
import LeadershipSection from '../components/LeadershipSection';
import HiringPartners from '../components/HiringPartners';
import JobOrientedCourses from '../components/JobOrientedCourses';
import { servicesAPI, productsAPI, projectsAPI } from '../services/api';
import {
  FALLBACK_SERVICES,
  FALLBACK_PRODUCTS,
  FALLBACK_PROJECTS,
} from '../data/mockData';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export default function Home() {
  const [services, setServices] = useState(FALLBACK_SERVICES.slice(0, 6));
  const [products, setProducts] = useState(FALLBACK_PRODUCTS.slice(0, 3));
  const [projects, setProjects] = useState(FALLBACK_PROJECTS.slice(0, 3));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Gokul Tech Solutions – Modern Business Solutions & Enterprise Platforms';
    const fetchData = async () => {
      try {
        const [servicesRes, productsRes, projectsRes] = await Promise.allSettled([
          servicesAPI.getAll(),
          productsAPI.getAll(),
          projectsAPI.getAll(),
        ]);

        if (servicesRes.status === 'fulfilled' && Array.isArray(servicesRes.value?.data) && servicesRes.value.data.length > 0) {
          setServices(servicesRes.value.data.slice(0, 6));
        }
        if (productsRes.status === 'fulfilled' && Array.isArray(productsRes.value?.data) && productsRes.value.data.length > 0) {
          setProducts(productsRes.value.data.slice(0, 3));
        }
        if (projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value?.data) && projectsRes.value.data.length > 0) {
          setProjects(projectsRes.value.data.slice(0, 3));
        }
      } catch (err) {
        console.warn('Home page data load warning:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* =================================================================
          1. HERO SECTION
          ================================================================= */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Content Column */}
            <div className="hero-content">
              <div>
                <span className="badge badge-accent">
                  <ShieldCheck size={14} />
                  <span>Trusted Business Solutions</span>
                </span>
              </div>

              <h1 className="hero-title">
                Building Better Solutions for Modern Businesses
              </h1>

              <p className="hero-description">
                We design and engineer enterprise-grade digital software, cloud architecture, and strategic technology solutions that empower organizations to scale with security and velocity.
              </p>

              <div className="hero-cta-group">
                <Button to="/services" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
                  Explore Services
                </Button>
                <Button to="/contact" variant="secondary" size="lg">
                  Contact Us
                </Button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={15} color="#10b981" />
                  <span>ISO 27001 Certified</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={15} color="#10b981" />
                  <span>99.99% Uptime SLA</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="hero-canvas-wrapper" style={{ height: 'auto', minHeight: '440px' }}>
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          HIRING PARTNERS MARQUEE
          ================================================================= */}
      <HiringPartners />

      {/* =================================================================
          2. TRUST / STATS SECTION
          ================================================================= */}
      <section className="section-light" style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="stats-grid">
            <StatsCard number="10+" label="Years Experience" delay={0.0} />
            <StatsCard number="500+" label="Projects Completed" delay={0.1} />
            <StatsCard number="250+" label="Happy Clients" delay={0.2} />
            <StatsCard number="24/7" label="Support" delay={0.3} />
          </div>
        </div>
      </section>

      {/* =================================================================
      {/* =================================================================
          3. ABOUT GOKUL TECH SOLUTIONS (TRAINING & SOLUTIONS)
          ================================================================= */}
      <section className="section" style={{ padding: '64px 0 32px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {/* Left Content Column */}
            <div>
              {/* Badge */}
              <div style={{ marginBottom: '14px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#2563eb',
                    backgroundColor: '#eff6ff',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    border: '1px solid #dbeafe',
                  }}
                >
                  ABOUT GOKUL TECH SOLUTIONS
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: 'clamp(24px, 3.2vw, 36px)',
                  fontWeight: 800,
                  color: '#0f172a',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  marginBottom: '18px',
                }}
              >
                Leading IT Training Institute in Chennai &amp; Bangalore with 100% Job Support
              </h2>

              {/* Paragraphs */}
              <p
                style={{
                  fontSize: '14.5px',
                  lineHeight: 1.65,
                  color: '#475569',
                  marginBottom: '14px',
                }}
              >
                Gokul Tech Solutions is widely recognized as the best software training institute in Chennai &amp; Bangalore, featuring modern campus facilities in Velachery (Chennai) and dedicated placement support hubs serving Bangalore tech corridors. We guarantee 100% job confirmations and comprehensive 100% job support.
              </p>

              <p
                style={{
                  fontSize: '14.5px',
                  lineHeight: 1.65,
                  color: '#475569',
                  marginBottom: '28px',
                }}
              >
                We bridge the gap between college curricula and real industry demands through hands-on coding labs, real client deliverables, and comprehensive interview preparation, ensuring every candidate becomes an immediately productive software engineer.
              </p>

              {/* 4 Feature Points Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '20px 24px',
                  marginBottom: '32px',
                }}
              >
                {/* 1. Job-Oriented Curriculum */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ color: '#2563eb', marginTop: '2px', flexShrink: 0 }}>
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a', margin: '0 0 3px' }}>
                      Job-Oriented Curriculum
                    </h4>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.45 }}>
                      Industry-aligned courses with high placement focus.
                    </p>
                  </div>
                </div>

                {/* 2. Real Enterprise Projects */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ color: '#2563eb', marginTop: '2px', flexShrink: 0 }}>
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a', margin: '0 0 3px' }}>
                      Real Enterprise Projects
                    </h4>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.45 }}>
                      Build live client apps, not just toy examples.
                    </p>
                  </div>
                </div>

                {/* 3. Daily Placement Drives */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ color: '#2563eb', marginTop: '2px', flexShrink: 0 }}>
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a', margin: '0 0 3px' }}>
                      Daily Placement Drives
                    </h4>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.45 }}>
                      Over 20+ company interview schedules daily.
                    </p>
                  </div>
                </div>

                {/* 4. 1-on-1 Architect Mentorship */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ color: '#2563eb', marginTop: '2px', flexShrink: 0 }}>
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a', margin: '0 0 3px' }}>
                      1-on-1 Architect Mentorship
                    </h4>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.45 }}>
                      Learn best practices from senior IT mentors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Learn More About Us Button */}
              <div>
                <Button
                  to="/about"
                  variant="outline"
                  icon={<ArrowRight size={15} />}
                  style={{
                    borderRadius: '999px',
                    borderColor: '#93c5fd',
                    color: '#2563eb',
                    padding: '10px 24px',
                    fontWeight: 600,
                  }}
                >
                  Learn More About Us
                </Button>
              </div>
            </div>

            {/* Right Column: Brand Card with Gokul Tech Solutions in place of TVK */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                padding: '48px 36px',
                boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '360px',
                position: 'relative',
              }}
            >
              {/* Brand Typography */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  lineHeight: 0.95,
                  marginBottom: '24px',
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(44px, 5.5vw, 68px)',
                    fontWeight: 900,
                    color: '#0076ce',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  GOKUL
                </span>
                <span
                  style={{
                    fontSize: 'clamp(36px, 4.5vw, 54px)',
                    fontWeight: 900,
                    color: '#0076ce',
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  TECH
                </span>
                <span
                  style={{
                    fontSize: 'clamp(26px, 3.4vw, 40px)',
                    fontWeight: 800,
                    color: '#0076ce',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    marginTop: '4px',
                  }}
                >
                  SOLUTIONS
                </span>
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontSize: 'clamp(12px, 1.4vw, 15px)',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: '#0076ce',
                  textTransform: 'uppercase',
                  borderTop: '2px solid rgba(0, 118, 206, 0.2)',
                  paddingTop: '16px',
                  width: '100%',
                  maxWidth: '340px',
                }}
              >
                EMPOWERING CAREER GROWTH
              </div>
            </div>
          </div>

          {/* Core Leadership & Management - 4 Photo Boxes */}
          <LeadershipSection />
        </div>
      </section>

      {/* =================================================================
          4. SERVICES SECTION
          ================================================================= */}
      <section className="section section-light">
        <div className="container">
          <SectionTitle
            badge="Enterprise Services"
            badgeType="accent"
            title="Comprehensive Technical Capabilities"
            subtitle="Explore our specialized services formulated to tackle intricate technological and operational challenges."
            align="center"
          />

          <div className="services-grid">
            {loading ? (
              <SkeletonCard count={6} type="service" />
            ) : (
              (Array.isArray(services) ? services : FALLBACK_SERVICES).map((service, index) => (
                <ServiceCard key={service._id || index} service={service} index={index} />
              ))
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Button to="/services" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* =================================================================
          5. 3D SERVICES SECTION ("Modern Solutions. Simple Experience.")
          ================================================================= */}
      <section className="section">
        <div className="container">
          <div className="solutions-3d-box">
            <div className="solutions-3d-grid">
              <div>
                <span
                  className="badge"
                  style={{
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    marginBottom: '16px',
                  }}
                >
                  Interactive Architecture
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 'clamp(28px, 3.5vw, 42px)', marginBottom: '16px' }}>
                  Modern Solutions. Simple Experience.
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '17px', lineHeight: 1.6, marginBottom: '28px' }}>
                  We strip away redundant friction. Our engineering methodologies transform fragmented, legacy business operations into seamless, automated, and observable systems.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <Button to="/products" variant="accent">
                    Explore Solutions
                  </Button>
                  <Button
                    to="/contact"
                    variant="outline"
                    style={{ color: '#ffffff', borderColor: '#475569' }}
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </div>

              <div className="solutions-3d-canvas" style={{ height: 'auto', minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SolutionVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          6. JOB-ORIENTED IT COURSES FOR CAREER SUCCESS
          ================================================================= */}
      <JobOrientedCourses />

      {/* =================================================================
          7. PORTFOLIO SHOWCASE
          ================================================================= */}
      <section className="section">
        <div className="container">
          <SectionTitle
            badge="Selected Works"
            badgeType="accent"
            title="Real-World Impact & Case Studies"
            subtitle="A curated glimpse of mission-critical systems deployed for industry leaders across diverse domains."
            align="center"
          />

          <div className="portfolio-grid">
            {loading ? (
              <SkeletonCard count={3} type="product" />
            ) : (
              (Array.isArray(projects) ? projects : FALLBACK_PROJECTS).map((project, index) => (
                <ProjectCard key={project._id || index} project={project} index={index} />
              ))
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Button to="/portfolio" variant="secondary" icon={<ArrowRight size={15} />}>
              Explore Complete Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* =================================================================
          8. CALL TO ACTION BANNER
          ================================================================= */}
      <section
        style={{
          padding: '80px 0',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container" style={{ maxWidth: '720px' }}>
          <span
            className="badge"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              marginBottom: '20px',
            }}
          >
            Start Your Engagement
          </span>

          <h2 style={{ color: '#ffffff', fontSize: 'clamp(30px, 4vw, 44px)', marginBottom: '16px' }}>
            Ready to Accelerate Your Enterprise Architecture?
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '32px' }}>
            Discuss your technical roadmap with our executive architects and discover how Gokul Tech Solutions can support your growth objectives.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Button to="/contact" variant="primary" size="lg" style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
              Speak with an Architect
            </Button>
            <Button
              to="/products"
              variant="outline"
              size="lg"
              style={{ color: '#ffffff', borderColor: '#334155' }}
            >
              Browse Solutions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

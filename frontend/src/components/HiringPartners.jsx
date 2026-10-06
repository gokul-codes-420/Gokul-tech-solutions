import React from 'react';

/**
  * Official Hiring Partners Logos & Brands
  * Styled with precision SVG elements & authentic brand typography
  */
const PARTNERS = [
  {
    id: 'tcs',
    name: 'Tata Consultancy Services (TCS)',
    renderLogo: () => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
        <span style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '0.18em', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
          TATA
        </span>
        <span style={{ fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.12em', color: '#475569', marginTop: '3px', textTransform: 'uppercase' }}>
          CONSULTANCY SERVICES
        </span>
      </div>
    ),
  },
  {
    id: 'infosys',
    name: 'Infosys',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: 800, color: '#007cc3', letterSpacing: '-0.03em', fontFamily: 'system-ui, sans-serif' }}>
          Infosys
        </span>
      </div>
    ),
  },
  {
    id: 'cognizant',
    name: 'Cognizant India',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#0033a0" strokeWidth="2.5" />
          <path d="M12 6v6l4 2" stroke="#0033a0" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', letterSpacing: '-0.02em' }}>
          cognizant
        </span>
      </div>
    ),
  },
  {
    id: 'wipro',
    name: 'Wipro',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="6" cy="12" r="2.5" fill="#f59e0b" />
          <circle cx="12" cy="6" r="2.5" fill="#ef4444" />
          <circle cx="18" cy="12" r="2.5" fill="#10b981" />
          <circle cx="12" cy="18" r="2.5" fill="#3b82f6" />
        </svg>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', letterSpacing: '-0.01em' }}>
          wipro
        </span>
      </div>
    ),
  },
  {
    id: 'accenture',
    name: 'Accenture India',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#000000', letterSpacing: '-0.02em', position: 'relative' }}>
          accenture
          <span style={{ position: 'absolute', top: '-6px', right: '35px', color: '#a100ff', fontSize: '13px', fontWeight: 900 }}>
            &gt;
          </span>
        </span>
      </div>
    ),
  },
  {
    id: 'hcl',
    name: 'HCLTech',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span style={{ fontSize: '19px', fontWeight: 900, color: '#1d4ed8', letterSpacing: '-0.03em' }}>
          HCL
        </span>
        <span style={{ fontSize: '17px', fontWeight: 400, color: '#64748b' }}>
          Tech
        </span>
      </div>
    ),
  },
  {
    id: 'ibm',
    name: 'IBM India',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: 900, color: '#1f2937', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
          IBM
        </span>
      </div>
    ),
  },
  {
    id: 'oracle',
    name: 'Oracle Financial Services / Oracle India',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '17px', fontWeight: 900, color: '#c74634', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          ORACLE
        </span>
      </div>
    ),
  },
  {
    id: 'capgemini',
    name: 'Capgemini India',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#0070ad">
          <path d="M12 2L4 9l8 13 8-13-8-7z" />
        </svg>
        <span style={{ fontSize: '17px', fontWeight: 700, color: '#0070ad', letterSpacing: '-0.02em' }}>
          Capgemini
        </span>
      </div>
    ),
  },
  {
    id: 'zoho',
    name: 'Zoho Corporation',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 6px)', gap: '2px' }}>
          <div style={{ width: '6px', height: '6px', backgroundColor: '#e11d48', borderRadius: '1px' }} />
          <div style={{ width: '6px', height: '6px', backgroundColor: '#16a34a', borderRadius: '1px' }} />
          <div style={{ width: '6px', height: '6px', backgroundColor: '#2563eb', borderRadius: '1px' }} />
          <div style={{ width: '6px', height: '6px', backgroundColor: '#ca8a04', borderRadius: '1px' }} />
        </div>
        <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', letterSpacing: '0.05em' }}>
          ZOHO
        </span>
      </div>
    ),
  },
  {
    id: 'lti-mindtree',
    name: 'LTIMindtree',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span style={{ fontSize: '18px', fontWeight: 900, color: '#0284c7', letterSpacing: '-0.02em' }}>
          LTI
        </span>
        <span style={{ fontSize: '17px', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.01em' }}>
          Mindtree
        </span>
      </div>
    ),
  },
  {
    id: 'tech-mahindra',
    name: 'Tech Mahindra',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontSize: '15.5px', fontWeight: 800, color: '#ef4444', letterSpacing: '-0.01em' }}>
          Tech
        </span>
        <span style={{ fontSize: '15.5px', fontWeight: 600, color: '#1e293b', letterSpacing: '-0.01em' }}>
          Mahindra
        </span>
      </div>
    ),
  },
];

export default function HiringPartners() {
  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...PARTNERS, ...PARTNERS];

  return (
    <section
      className="hiring-partners-section"
      style={{
        padding: '38px 0 34px',
        backgroundColor: '#fafafa',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ textAlign: 'center', marginBottom: '22px' }}>
        <h3
          style={{
            fontSize: '19px',
            fontWeight: 700,
            color: '#1e293b',
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          Our Hiring Partners
        </h3>
        <p
          style={{
            fontSize: '13px',
            color: '#64748b',
            marginTop: '4px',
            marginBottom: 0,
          }}
        >
          Our certified candidates & engineering alumni are hired across leading Fortune 500 & top Indian IT enterprises
        </p>
      </div>

      {/* Infinite Scrolling Track (Left to Right) */}
      <div className="partners-marquee-container">
        <div className="partners-marquee-track">
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="partner-logo-item"
              title={partner.name}
            >
              {partner.renderLogo()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

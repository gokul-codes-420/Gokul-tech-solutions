import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Zap,
  Server,
  Cpu,
  Globe,
  Lock,
  Activity,
  ArrowUpRight,
} from 'lucide-react';

export default function HeroVisual() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
        userSelect: 'none',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Main Professional Tech Dashboard Card */}
      <div
        className="hero-dashboard-card"
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#0f172a',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Terminal / Console Window Header */}
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Traffic light dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
            <span style={{ marginLeft: '8px', fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>
              gts-cloud-core // prod-v2.6
            </span>
          </div>

          {/* Live Status indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="live-status-dot" />
            <span style={{ fontSize: '11.5px', color: '#34d399', fontWeight: 600, letterSpacing: '0.02em' }}>
              Operational
            </span>
          </div>
        </div>

        {/* Dashboard Body */}
        <div style={{ padding: '22px 24px' }}>
          {/* Top Metrics Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            {/* Metric 1 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '10px',
                padding: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '11.5px', marginBottom: '4px' }}>
                <Activity size={13} color="#38bdf8" />
                <span>Uptime SLA</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
                99.99%
              </div>
              <div style={{ fontSize: '10.5px', color: '#34d399', marginTop: '2px', fontWeight: 500 }}>
                &uarr; Zero Downtime
              </div>
            </div>

            {/* Metric 2 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '10px',
                padding: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '11.5px', marginBottom: '4px' }}>
                <Zap size={13} color="#f59e0b" />
                <span>Avg Latency</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
                24ms
              </div>
              <div style={{ fontSize: '10.5px', color: '#38bdf8', marginTop: '2px', fontWeight: 500 }}>
                Global CDN Edge
              </div>
            </div>

            {/* Metric 3 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '10px',
                padding: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '11.5px', marginBottom: '4px' }}>
                <Lock size={13} color="#10b981" />
                <span>Security</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
                256-Bit
              </div>
              <div style={{ fontSize: '10.5px', color: '#10b981', marginTop: '2px', fontWeight: 500 }}>
                Zero-Trust Shield
              </div>
            </div>
          </div>

          {/* Real-time Throughput Graph Visualization */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              padding: '14px 16px',
              marginBottom: '18px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>
                Live Cloud Telemetry &amp; Throughput
              </span>
              <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>
                4.8M req/min
              </span>
            </div>

            {/* Clean SVG Live Wave Graph */}
            <div style={{ height: '70px', width: '100%', position: 'relative' }}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 70"
                preserveAspectRatio="none"
                style={{ overflow: 'visible' }}
              >
                <defs>
                  <linearGradient id="heroGraphGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Filled gradient area */}
                <path
                  d="M0,50 Q40,25 80,45 T160,20 T240,40 T320,15 T400,28 L400,70 L0,70 Z"
                  fill="url(#heroGraphGradient)"
                />

                {/* Main line */}
                <path
                  d="M0,50 Q40,25 80,45 T160,20 T240,40 T320,15 T400,28"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  className="graph-line-pulse"
                />

                {/* Real-time active point pulse */}
                <circle cx="320" cy="15" r="4" fill="#38bdf8" />
                <circle cx="320" cy="15" r="8" fill="rgba(56, 189, 248, 0.4)" className="ping-dot" />
              </svg>
            </div>
          </div>

          {/* Active Enterprise Modules Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '6px',
                fontSize: '11px',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <Server size={12} color="#38bdf8" />
              <span>Hybrid Cloud Architecture</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '6px',
                fontSize: '11px',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <Cpu size={12} color="#f59e0b" />
              <span>Automated CI/CD Pipelines</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '6px',
                fontSize: '11px',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <Globe size={12} color="#34d399" />
              <span>Multi-Region CDN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Accent Card 1: Top Right */}
      <div
        className="floating-badge-top"
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-16px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: '#ecfdf5',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <CheckCircle2 size={18} />
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
            Production Verified
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>
            100% Automated Tests Passed
          </div>
        </div>
      </div>

      {/* Floating Accent Card 2: Bottom Left */}
      <div
        className="floating-badge-bottom"
        style={{
          position: 'absolute',
          bottom: '-18px',
          left: '-16px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ShieldCheck size={18} />
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
            Enterprise Security
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>
            ISO 27001 &bull; 99.99% Uptime
          </div>
        </div>
      </div>

      {/* Embedded subtle CSS keyframes for gentle floating animations */}
      <style>{`
        .live-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #34d399;
          display: inline-block;
          box-shadow: 0 0 8px #34d399;
          animation: pulseStatus 2s infinite ease-in-out;
        }

        @keyframes pulseStatus {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.55;
            transform: scale(1.15);
          }
        }

        .floating-badge-top {
          animation: floatTopBadge 4.5s ease-in-out infinite;
        }

        .floating-badge-bottom {
          animation: floatBottomBadge 5.5s ease-in-out infinite;
        }

        @keyframes floatTopBadge {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes floatBottomBadge {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        .hero-dashboard-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.12);
        }

        @keyframes pingEffect {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        .ping-dot {
          transform-origin: 320px 15px;
          animation: pingEffect 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @media (max-width: 640px) {
          .floating-badge-top {
            display: none !important;
          }
          .floating-badge-bottom {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

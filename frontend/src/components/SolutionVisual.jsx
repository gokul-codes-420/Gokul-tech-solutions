import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  CheckCircle2,
  Server,
  Cloud,
  Zap,
} from 'lucide-react';

const ARCHITECTURE_LAYERS = [
  {
    id: 1,
    title: 'Edge & Frontend Experience',
    subtitle: 'Ultra-fast global edge delivery with Next.js & React',
    icon: Cloud,
    badge: '< 15ms TTFB',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.1)',
  },
  {
    id: 2,
    title: 'Microservices & API Gateway',
    subtitle: 'Modular Node.js microservices with distributed load balancing',
    icon: Server,
    badge: 'Auto-Scaling',
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.1)',
  },
  {
    id: 3,
    title: 'High-Performance Data Core',
    subtitle: 'Zero-latency replication, real-time caching & secure persistence',
    icon: Database,
    badge: 'ACID Compliant',
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.1)',
  },
  {
    id: 4,
    title: 'Enterprise Security & Governance',
    subtitle: '256-bit encryption, role-based access & automated compliance',
    icon: ShieldCheck,
    badge: 'ISO 27001',
    color: '#a78bfa',
    bg: 'rgba(167, 139, 250, 0.1)',
  },
];

export default function SolutionVisual() {
  const [activeLayer, setActiveLayer] = useState(1);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      {/* Background Soft Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />

      {/* Main Architecture Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Layers size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#ffffff' }}>
                Unified Architecture Stack
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                4 Interconnected Digital Layers
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 8px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              borderRadius: '20px',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 6px #10b981',
              }}
            />
            <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 600 }}>
              Synchronized
            </span>
          </div>
        </div>

        {/* Stack Layers List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {ARCHITECTURE_LAYERS.map((layer) => {
            const Icon = layer.icon;
            const isHovered = activeLayer === layer.id;

            return (
              <div
                key={layer.id}
                onMouseEnter={() => setActiveLayer(layer.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 14px',
                  backgroundColor: isHovered
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isHovered
                    ? `1px solid ${layer.color}`
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  transform: isHovered ? 'translateX(4px)' : 'none',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: layer.bg,
                    color: layer.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: isHovered ? '#ffffff' : '#e2e8f0',
                      }}
                    >
                      {layer.title}
                    </div>
                    <span
                      style={{
                        fontSize: '10.5px',
                        color: layer.color,
                        fontWeight: 600,
                        backgroundColor: layer.bg,
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {layer.badge}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#94a3b8',
                      marginTop: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {layer.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Metrics */}
        <div
          style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11.5px',
            color: '#94a3b8',
          }}
        >
          <span>Telemetry Protocol: gRPC / TLS 1.3</span>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>Zero Data Bottlenecks</span>
        </div>
      </div>
    </div>
  );
}

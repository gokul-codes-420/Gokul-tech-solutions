import React, { useRef, useState, useEffect, Component, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn('3D Canvas fallback triggered:', error.message);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function FallbackVisual() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '260px',
          height: '260px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            marginBottom: '16px',
            boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.5)',
          }}
        >
          ▲
        </div>
        <div style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '-0.02em' }}>
          Gokul Tech Solutions
        </div>
        <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>
          Autonomous Cloud Systems
        </div>
      </div>
    </div>
  );
}

// Lightweight, elegant geometric structure for business hero
function BusinessGeometry({ isMobile, reducedMotion }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (reducedMotion) return;

    const { pointer, clock } = state;
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      const targetX = pointer.x * 0.06;
      const targetY = pointer.y * 0.06;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetX + t * 0.03,
        0.03
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -targetY + Math.sin(t * 0.1) * 0.03,
        0.03
      );
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.04;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Faceted Geometric Polyhedron */}
      <mesh>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.15}
          metalness={0.85}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          wireframe={false}
          flatShading={true}
        />
      </mesh>

      {/* Subtle Geometric Wireframe Cage for Tech Precision */}
      <mesh scale={[1.52, 1.52, 1.52]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Single Minimalist Precision Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3.5, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} transparent opacity={0.6} />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#2563eb"
          roughness={0.2}
          metalness={0.7}
          emissive="#1e3a8a"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!hasWebGL) {
    return <FallbackVisual />;
  }

  return (
    <CanvasErrorBoundary fallback={<FallbackVisual />}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Suspense fallback={<FallbackVisual />}>
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 45 }}
            dpr={isMobile ? 1 : [1, 1.75]}
            gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
            <directionalLight position={[-5, -4, -3]} intensity={0.6} color="#93c5fd" />
            <pointLight position={[0, -2, 2]} intensity={0.5} color="#3b82f6" />

            <Float
              speed={reducedMotion ? 0 : 0.6}
              rotationIntensity={reducedMotion ? 0 : 0.08}
              floatIntensity={reducedMotion ? 0 : 0.15}
            >
              <BusinessGeometry isMobile={isMobile} reducedMotion={reducedMotion} />
            </Float>
          </Canvas>
        </Suspense>
      </div>
    </CanvasErrorBoundary>
  );
}

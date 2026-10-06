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
      }}
    >
      <div
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#ffffff',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>◈</div>
        <div style={{ fontWeight: 600, fontSize: '14px' }}>Unified Architecture</div>
      </div>
    </div>
  );
}

function SolutionGeometry({ isMobile, reducedMotion }) {
  const meshRef = useRef();
  const sphereRef = useRef();

  useFrame((state) => {
    if (reducedMotion) return;
    const { pointer, clock } = state;
    const t = clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        pointer.x * 0.06 + t * 0.03,
        0.03
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -pointer.y * 0.05 + Math.cos(t * 0.1) * 0.03,
        0.03
      );
    }

    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t * 0.4) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <dodecahedronGeometry args={[1.35, 0]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          wireframe={false}
          flatShading={true}
        />
      </mesh>

      <mesh scale={[1.38, 1.38, 1.38]}>
        <dodecahedronGeometry args={[1.35, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.25} />
      </mesh>

      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.9}
          emissive="#60a5fa"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

export default function Solution3D() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handleMotion = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handleMotion);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mq.removeEventListener('change', handleMotion);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <CanvasErrorBoundary fallback={<FallbackVisual />}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Suspense fallback={<FallbackVisual />}>
          <Canvas
            camera={{ position: [0, 0, 4.2], fov: 45 }}
            dpr={isMobile ? 1 : [1, 1.5]}
            gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffffff" />
            <directionalLight position={[-4, -3, -2]} intensity={0.5} color="#38bdf8" />

            <Float
              speed={reducedMotion ? 0 : 0.6}
              rotationIntensity={reducedMotion ? 0 : 0.06}
              floatIntensity={reducedMotion ? 0 : 0.1}
            >
              <SolutionGeometry isMobile={isMobile} reducedMotion={reducedMotion} />
            </Float>
          </Canvas>
        </Suspense>
      </div>
    </CanvasErrorBoundary>
  );
}

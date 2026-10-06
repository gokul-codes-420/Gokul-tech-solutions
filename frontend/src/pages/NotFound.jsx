import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 – Page Not Found | Gokul Tech Solutions';
  }, []);

  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 64px',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '520px' }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            color: 'var(--primary)',
          }}
        >
          <Compass size={36} />
        </div>

        <span className="badge badge-subtle" style={{ marginBottom: '16px' }}>
          Error 404
        </span>

        <h1 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800, marginBottom: '16px' }}>
          Page Not Found
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.6, marginBottom: '32px' }}>
          The page you're looking for doesn't exist or has been relocated to another endpoint.
        </p>

        <Button to="/" variant="primary" size="lg" icon={<Home size={16} />}>
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/Button';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { LogIn, ShieldAlert, KeyRound, Check } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login, loginWithGoogle, user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const getDestination = (targetUser) => {
    const fromPath =
      typeof location.state?.from === 'string'
        ? location.state.from
        : location.state?.from?.pathname;
    if (fromPath) return fromPath;
    if (targetUser?.role === 'admin') return '/admin';
    return '/';
  };

  useEffect(() => {
    document.title = 'Sign In – Gokul Tech Solutions Portal';
    if (user) {
      navigate(getDestination(user), { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setError(null);
      const loggedUser = await loginWithGoogle();
      toast.success(`Signed in with Google! Welcome, ${loggedUser.name}`);
      navigate(getDestination(loggedUser), { replace: true });
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
      toast.error(err.message || 'Google sign-in failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide both email address and password');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const loggedUser = await login(email, password);
      toast.success(`Welcome back, ${loggedUser.name}`);
      navigate(getDestination(loggedUser), { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please verify credentials.');
      toast.error(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 64px',
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '40px',
          backgroundColor: '#ffffff',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <KeyRound size={22} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Account Sign In
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginTop: '6px' }}>
            Access the Gokul Tech Solutions executive portal
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--danger-bg)',
              color: 'var(--danger)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              fontSize: '13.5px',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            {error}
          </div>
        )}

        {/* Google OAuth Sign-In Button */}
        <div style={{ marginBottom: '20px' }}>
          <GoogleSignInButton
            onClick={handleGoogleSignIn}
            loading={googleLoading}
            text="Continue with Google"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            or continue with email
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" htmlFor="login-password">
                Password
              </label>
            </div>
            <input
              id="login-password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            icon={<LogIn size={16} />}
            style={{ width: '100%', marginTop: '12px' }}
          >
            Sign In
          </Button>
        </form>


        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ fontWeight: 600, color: 'var(--primary)' }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

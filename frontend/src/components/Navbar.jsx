import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import Logo from './Logo';
import {
  Menu,
  X,
  Shield,
  LogOut,
  ChevronDown,
} from 'lucide-react';

const getDisplayName = (fullName) => {
  if (!fullName) return 'User';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return 'User';
  const prefixes = ['mr', 'mr.', 'mrs', 'mrs.', 'ms', 'ms.', 'dr', 'dr.', 'er', 'er.', 'prof', 'prof.', 'shri', 'smt'];
  if (parts.length > 1 && prefixes.includes(parts[0].toLowerCase())) {
    return `${parts[0]} ${parts[1]}`;
  }
  return parts[0];
};

const getInitials = (fullName) => {
  if (!fullName) return 'U';
  const cleanName = fullName.replace(/^(mr|mrs|ms|dr|er|prof|shri|smt)\.?\s+/i, '').trim();
  return cleanName ? cleanName.charAt(0).toUpperCase() : fullName.charAt(0).toUpperCase();
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef(null);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setImgError(false);
  }, [user?.photoURL]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo & Name */}
        <Link to="/" onClick={closeMobileMenu} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo />
        </Link>

        {/* Center / Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/software-services"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Software Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {user ? (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  borderRadius: '24px',
                }}
                aria-expanded={userDropdownOpen}
              >
                {user.photoURL && !imgError ? (
                  <img
                    src={user.photoURL}
                    alt={user.name || 'User'}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={() => setImgError(true)}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      display: 'block',
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(user?.name)}
                  </span>
                )}
                <span style={{ fontWeight: 600, fontSize: '13.5px' }}>
                  {getDisplayName(user.name)}
                </span>
                <ChevronDown size={14} style={{ opacity: 0.7 }} />
              </button>

              {userDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    minWidth: '220px',
                    padding: '6px 0',
                    zIndex: 1100,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      padding: '12px 14px',
                      borderBottom: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: 'rgba(248, 250, 252, 0.7)',
                    }}
                  >
                    {user.photoURL && !imgError ? (
                      <img
                        src={user.photoURL}
                        alt={user.name || 'User'}
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        onError={() => setImgError(true)}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          backgroundColor: '#2563eb',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '15px',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {getInitials(user?.name)}
                      </div>
                    )}
                    <div style={{ overflow: 'hidden', minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: '13.5px',
                          color: 'var(--text-primary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {user.name}
                      </div>
                      <div
                        style={{
                          fontSize: '11.5px',
                          color: 'var(--text-secondary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {user.email}
                      </div>
                    </div>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="nav-link"
                      onClick={() => setUserDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        fontSize: '13.5px',
                      }}
                    >
                      <Shield size={15} color="#2563eb" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '10px 16px',
                      fontSize: '13.5px',
                      color: 'var(--danger)',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button to="/login" variant="secondary" size="sm">
              Login
            </Button>
          )}

          <Button to="/apply-internship" variant="primary" size="sm">
            Apply Internship
          </Button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <NavLink to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
            Home
          </NavLink>
          <NavLink to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
            About
          </NavLink>
          <NavLink to="/software-services" className="mobile-nav-link" onClick={closeMobileMenu}>
            Software Services
          </NavLink>
          <NavLink to="/products" className="mobile-nav-link" onClick={closeMobileMenu}>
            Products
          </NavLink>
          <NavLink to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>
            Contact
          </NavLink>
          <NavLink to="/apply-internship" className="mobile-nav-link" onClick={closeMobileMenu}>
            Apply Internship
          </NavLink>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {user ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  {user.photoURL && !imgError ? (
                    <img
                      src={user.photoURL}
                      alt={user.name || 'User'}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={() => setImgError(true)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '14px',
                        flexShrink: 0,
                      }}
                    >
                      {getInitials(user?.name)}
                    </div>
                  )}
                  <div style={{ overflow: 'hidden', minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.email}
                    </div>
                  </div>
                </div>

                {isAdmin && (
                  <Button to="/admin" variant="secondary" onClick={closeMobileMenu}>
                    Admin Dashboard
                  </Button>
                )}
                <Button variant="danger" onClick={handleLogout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button to="/login" variant="secondary" onClick={closeMobileMenu}>
                Sign In
              </Button>
            )}
            <Button to="/apply-internship" variant="primary" onClick={closeMobileMenu}>
              Apply Internship
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

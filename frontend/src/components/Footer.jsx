import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import { LinkedinIcon, TwitterIcon, GithubIcon } from './SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-brand">
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <Logo light={true} />
            </Link>
            <p>
              Engineering reliable enterprise architectures, digital platforms, and operational systems for high-growth modern businesses.
            </p>
            <div style={{ display: 'flex', gap: '14px', marginTop: '20px' }}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', transition: 'color 150ms' }}
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', transition: 'color 150ms' }}
                aria-label="Twitter Profile"
              >
                <TwitterIcon size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', transition: 'color 150ms' }}
                aria-label="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li>
                <Link to="/about" className="footer-link">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">Services</Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">Products & Solutions</Link>
              </li>
              <li>
                <Link to="/portfolio" className="footer-link">Client Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contact & Inquiries</Link>
              </li>
            </ul>
          </div>

          {/* Solutions / Services */}
          <div className="footer-col">
            <h4>Capabilities</h4>
            <ul className="footer-links">
              <li>
                <Link to="/services" className="footer-link">Cloud Infrastructure</Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">Enterprise Systems</Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">Cybersecurity Shields</Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">Data Telemetry & AI</Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">Technical Advisory</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <MapPin size={15} color="#60a5fa" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Salem (D/T), Mettur (T/K), Kolathur (P/O) - 636303</span>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={15} color="#60a5fa" style={{ flexShrink: 0 }} />
                <a href="tel:+919361033010" style={{ color: 'inherit', textDecoration: 'none' }}>+91 9361033010</a>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Mail size={15} color="#60a5fa" style={{ flexShrink: 0 }} />
                <a href="mailto:gokulsanth33010@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>gokulsanth33010@gmail.com</a>
              </li>
              <li style={{ marginTop: '12px' }}>
                <Link
                  to="/contact"
                  className="btn btn-outline btn-sm"
                  style={{ color: '#ffffff', borderColor: '#334155' }}
                >
                  <span>Request Proposal</span>
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            &copy; {currentYear} Gokul Tech Solutions, Inc. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ color: '#64748b' }}>Privacy Policy</span>
            <span style={{ color: '#64748b' }}>Terms of Service</span>
            <span style={{ color: '#64748b' }}>Security Whitepaper</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

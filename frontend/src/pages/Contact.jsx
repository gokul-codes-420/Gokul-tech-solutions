import React, { useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactForm';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us – Gokul Tech Solutions Enterprise Inquiries';
  }, []);

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 32px)', paddingBottom: '96px' }}>
      <section className="section" style={{ paddingTop: '32px' }}>
        <div className="container">
          <SectionTitle
            badge="Direct Communication"
            badgeType="accent"
            title="Let's Discuss Your Business Roadmap"
            subtitle="Whether you're scoping an enterprise platform migration or seeking advisory on infrastructure optimization, our principal team is ready."
            align="center"
          />

          <div className="contact-grid" style={{ marginTop: '56px' }}>
            {/* Left side: Business Contact Info */}
            <div className="contact-info-card">
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
                Corporate Headquarters
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
                Connect with our team directly. For time-sensitive incident response or executive briefings, please reach out via direct phone.
              </p>

              <ul className="contact-info-list">
                <li className="contact-info-item">
                  <div className="contact-info-icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      Physical Location
                    </strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6 }}>
                      Salem ( D/T ) Mettur ( T/K )<br />
                      Kolathur ( P/O ), Pin - 636303
                    </span>
                  </div>
                </li>

                <li className="contact-info-item">
                  <div className="contact-info-icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      Telephone & Support
                    </strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14.5px' }}>
                      <a href="tel:+919361033010" style={{ color: 'inherit', textDecoration: 'none' }}>
                        +91 9361033010
                      </a>
                    </span>
                  </div>
                </li>

                <li className="contact-info-item">
                  <div className="contact-info-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      Email Inquiries
                    </strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14.5px' }}>
                      <a href="mailto:gokulsanth33010@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                        gokulsanth33010@gmail.com
                      </a>
                    </span>
                  </div>
                </li>

                <li className="contact-info-item">
                  <div className="contact-info-icon">
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      Operating Hours
                    </strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14.5px' }}>
                      Monday – Saturday: 9:00 AM – 7:00 PM IST<br />
                      24/7 Priority Support available for active clients
                    </span>
                  </div>
                </li>
              </ul>

            </div>

            {/* Right side: Interactive Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

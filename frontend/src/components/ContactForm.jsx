import React, { useState } from 'react';
import { contactAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import Button from './Button';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Business Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in your name, email address, and message.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await contactAPI.send(formData);
      setSubmitted(true);
      toast.success('Your message has been sent successfully. We will reply promptly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Business Inquiry',
        message: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to deliver message. Please try again.');
      toast.error(err.message || 'Failed to deliver message.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="card"
        style={{
          padding: '48px 36px',
          textAlign: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: '#ecfdf5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <CheckCircle2 size={32} color="#10b981" />
        </div>
        <h3 style={{ fontSize: 24, marginBottom: 12 }}>Message Received</h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 440, marginBottom: 28 }}>
          Thank you for reaching out. Our business advisory team has received your communication and will respond within 24 business hours.
        </p>
        <Button variant="secondary" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: '36px', backgroundColor: '#ffffff' }}>
      <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>
        Send Us a Message
      </h3>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: 'var(--danger-bg)',
            color: 'var(--danger)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px',
            fontSize: '14px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          {error}
        </div>
      )}

      <div className="contact-form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">
            Full Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">
            Business Email *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="contact-form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-phone">
            Phone Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className="form-control"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-subject">
            Inquiry Subject
          </label>
          <select
            id="contact-subject"
            name="subject"
            className="form-control"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="General Business Inquiry">General Business Inquiry</option>
            <option value="Enterprise Solution Demo">Enterprise Solution Demo</option>
            <option value="Consulting & Advisory">Consulting & Advisory</option>
            <option value="Partnership & Integration">Partnership & Integration</option>
            <option value="Technical Support">Technical Support</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contact-message">
          Message Details *
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="form-control"
          placeholder="Briefly describe your objectives, timeframe, or inquiries..."
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        icon={<Send size={16} />}
        style={{ marginTop: '8px', width: '100%' }}
      >
        Send Message
      </Button>
    </form>
  );
}

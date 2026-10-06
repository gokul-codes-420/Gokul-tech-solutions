import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { contactAPI } from '../services/api';
import {
  User,
  GraduationCap,
  FileText,
  CreditCard,
  CheckCircle2,
  Upload,
  X,
  FileCheck,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Printer,
  ShieldCheck,
  AlertCircle,
  QrCode,
  Building,
  Phone,
  Mail,
  Lock,
  LogIn,
} from 'lucide-react';

const DOMAINS = [
  'Full Stack Web Development (MERN)',
  'Frontend Development (React & Modern UI)',
  'Backend & API Engineering (Node.js)',
  'Artificial Intelligence & Data Science',
  'Mobile Application Development (React Native / Flutter)',
  'Cloud Computing & DevOps',
  'UI/UX Design & Product Prototyping',
];

const DEGREES = [
  'B.E / B.Tech',
  'B.Sc',
  'BCA',
  'MCA',
  'M.E / M.Tech',
  'M.Sc',
  'Diploma',
  'Other',
];

const YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  'Final Year (4th Year)',
  'Recent Graduate (2025 / 2026)',
];

const DURATIONS = [
  '1 Month (Fast Track)',
  '2 Months (Standard)',
  '3 Months (Comprehensive)',
  '6 Months (Extended Industrial)',
];

export default function ApplyInternship() {
  const { user, loading: authLoading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Pre-fill user data when authenticated
  useEffect(() => {
    if (user) {
      setFormData((prev) => {
        let first = prev.personal.firstName;
        let last = prev.personal.lastName;
        if (!first && user.name) {
          const parts = user.name.trim().split(/\s+/);
          first = parts[0] || '';
          last = parts.slice(1).join(' ') || '';
        }
        return {
          ...prev,
          personal: {
            ...prev.personal,
            firstName: first,
            lastName: last,
            email: prev.personal.email || user.email || '',
          },
        };
      });
    }
  }, [user]);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal
    personal: {
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      city: '',
      state: '',
      address: '',
      linkedin: '',
    },
    // Step 2: Academic
    academic: {
      college: '',
      degree: 'B.E / B.Tech',
      branch: '',
      year: '3rd Year',
      cgpa: '',
      domain: 'Full Stack Web Development (MERN)',
      duration: '1 Month (Fast Track)',
      mode: 'Online (Flexible)',
    },
    // Step 3: Documents
    documents: {
      resumeFile: null,
      resumeName: '',
      resumeSize: '',
      portfolioUrl: '',
      notes: '',
    },
    // Step 4: Payment
    payment: {
      method: 'UPI / QR Code',
      transactionId: '',
      agreed: false,
    },
  });

  const [errors, setErrors] = useState({});

  // Input change handlers
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [name]: value },
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleAcademicChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      academic: { ...prev.academic, [name]: value },
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // Resume file handler
  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        resume: 'File size exceeds 8MB limit. Please upload a smaller file.',
      }));
      return;
    }

    const formattedSize =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        resumeFile: file,
        resumeName: file.name,
        resumeSize: formattedSize,
      },
    }));
    setErrors((prev) => ({ ...prev, resume: null }));
    addToast('Resume uploaded successfully', 'success');
  };

  const handleRemoveResume = () => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        resumeFile: null,
        resumeName: '',
        resumeSize: '',
      },
    }));
  };



  // Step Validations
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      const { firstName, lastName, email, phone, city, state } = formData.personal;
      if (!firstName?.trim()) newErrors.firstName = 'First Name is required';
      if (!lastName?.trim()) newErrors.lastName = 'Last Name is required';
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
        newErrors.email = 'Valid Email Address is required';
      if (!phone.trim() || phone.replace(/\D/g, '').length < 10)
        newErrors.phone = 'Valid 10-digit Phone Number is required';
      if (!city.trim()) newErrors.city = 'City / Town is required';
      if (!state.trim()) newErrors.state = 'State is required';
    }

    if (step === 2) {
      const { college, branch, cgpa } = formData.academic;
      if (!college.trim()) newErrors.college = 'College or University Name is required';
      if (!branch.trim()) newErrors.branch = 'Department / Branch is required';
      if (!cgpa.trim()) newErrors.cgpa = 'CGPA or Percentage is required';
    }

    if (step === 3) {
      if (!formData.documents.resumeName) {
        newErrors.resume = 'Please upload your Resume (PDF or DOCX format is required)';
      }
    }

    if (step === 4) {
      const { transactionId, agreed } = formData.payment;
      if (!transactionId.trim() || transactionId.trim().length < 6) {
        newErrors.transactionId =
          'Please enter a valid 12-digit UTR or Transaction Reference number';
      }
      if (!agreed) {
        newErrors.agreed = 'You must confirm the application declaration to submit';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('gokulsanth33010@oksbi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
    addToast('UPI ID copied to clipboard', 'info');
  };

  // Submit Application
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setSubmitting(true);
    const applicationId = `GTS-INT-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    const applicantFullName =
      `${formData.personal.firstName || ''} ${formData.personal.lastName || ''}`.trim() ||
      formData.personal.fullName ||
      'Applicant';

    const applicationRecord = {
      applicationId,
      submittedAt: new Date().toISOString(),
      personal: {
        ...formData.personal,
        fullName: applicantFullName,
      },
      academic: formData.academic,
      documents: {
        resumeName: formData.documents.resumeName,
        resumeSize: formData.documents.resumeSize,
        portfolioUrl: formData.documents.portfolioUrl,
      },
      payment: {
        amount: 499,
        currency: 'INR',
        method: formData.payment.method,
        transactionId: formData.payment.transactionId,
        status: 'Under Verification',
      },
    };

    try {
      // 1. Save locally in browser
      const existing = JSON.parse(
        localStorage.getItem('internship_applications') || '[]'
      );
      localStorage.setItem(
        'internship_applications',
        JSON.stringify([applicationRecord, ...existing])
      );

      // 2. Also forward to backend contact API so admin sees it in Admin Messages
      try {
        await contactAPI.send({
          name: applicantFullName,
          email: formData.personal.email,
          phone: formData.personal.phone,
          subject: `[Internship Application - ${applicationId}] ${formData.academic.domain}`,
          message: `
INTERNSHIP APPLICATION REGISTRATION
==================================
Application ID: ${applicationId}
Registration Date: ${new Date().toLocaleString()}

APPLICANT PERSONAL DETAILS:
---------------------------
First Name: ${formData.personal.firstName}
Last Name: ${formData.personal.lastName}
Full Name: ${applicantFullName}
Email: ${formData.personal.email}
Phone: ${formData.personal.phone}
Date of Birth: ${formData.personal.dob || 'N/A'}
Gender: ${formData.personal.gender || 'N/A'}
City/State: ${formData.personal.city}, ${formData.personal.state}
Address: ${formData.personal.address || 'N/A'}
LinkedIn: ${formData.personal.linkedin || 'N/A'}

ACADEMIC DETAILS:
-----------------
College: ${formData.academic.college}
Degree: ${formData.academic.degree}
Branch/Department: ${formData.academic.branch}
Year: ${formData.academic.year}
CGPA / %: ${formData.academic.cgpa}
Track: ${formData.academic.domain}
Duration: ${formData.academic.duration}
Preferred Mode: ${formData.academic.mode}

DOCUMENTS:
----------
Resume: ${formData.documents.resumeName} (${formData.documents.resumeSize})
Portfolio: ${formData.documents.portfolioUrl || 'N/A'}

PAYMENT DETAILS:
----------------
Amount: INR 499
Mode: ${formData.payment.method}
UTR / Transaction Reference: ${formData.payment.transactionId}
Verification Status: Pending Review
`,
        });
      } catch (backendErr) {
        console.warn('Backend logging note:', backendErr.message);
      }

      setSubmittedData(applicationRecord);
      addToast('Application submitted successfully!', 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      addToast(err.message || 'Failed to submit application', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Steps definition for header
  const steps = [
    { id: 1, label: 'Personal', icon: User },
    { id: 2, label: 'Academic', icon: GraduationCap },
    { id: 3, label: 'Documents', icon: FileText },
    { id: 4, label: 'Payment', icon: CreditCard },
  ];

  return (
    <div
      style={{
        backgroundColor: '#f8fafc',
        minHeight: '88vh',
        paddingTop: 'calc(var(--header-height) + 52px)',
        paddingBottom: '96px',
        color: '#0f172a',
        position: 'relative',
      }}
    >
      {/* Login Required Modal Popup */}
      {!authLoading && !user && (
        <div
          id="login-required-modal"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '28px 24px',
              maxWidth: '380px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px #e2e8f0',
            }}
          >
            {/* Minimal Icon */}
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#f1f5f9',
                color: '#2563eb',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
              }}
            >
              <Lock size={20} strokeWidth={2} />
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '6px',
                letterSpacing: '-0.01em',
              }}
            >
              Please You can Login First
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: '13.5px',
                color: '#64748b',
                lineHeight: 1.5,
                margin: '0 0 20px 0',
              }}
            >
              Please sign in to your account to fill and submit the internship application.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={() => navigate('/login', { state: { from: '/apply-internship' } })}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <LogIn size={15} />
                Login to Continue
              </button>

              <button
                type="button"
                onClick={() => navigate('/register', { state: { from: '/apply-internship' } })}
                style={{
                  width: '100%',
                  padding: '9px 16px',
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  fontWeight: 500,
                  fontSize: '13px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <User size={15} />
                Don't have an account? Register
              </button>
            </div>

            {/* Back Home link */}
            <div style={{ marginTop: '16px' }}>
              <Link
                to="/"
                style={{
                  fontSize: '12.5px',
                  color: '#64748b',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <ArrowLeft size={13} /> Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Form Container - blurred and protected when !user */}
      <div
        className="container"
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          filter: !user ? 'blur(4px)' : 'none',
          pointerEvents: !user ? 'none' : 'auto',
          userSelect: !user ? 'none' : 'auto',
          opacity: !user ? 0.45 : 1,
          transition: 'all 0.25s ease',
        }}
      >
        {/* Breadcrumb / Top Header */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: '#64748b',
              marginBottom: '8px',
            }}
          >
            <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>
              Home
            </Link>
            <span>/</span>
            <span style={{ color: '#0f172a', fontWeight: 600 }}>
              Apply Internship
            </span>
          </div>

          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              marginBottom: '6px',
            }}
          >
            Application Registration Form
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
            Certified Industrial Internship Program &bull; Gokul Tech Solutions
          </p>
        </div>

        {/* If Application is Submitted Successfully */}
        {submittedData ? (
          <div
            id="printable-receipt"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '36px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                paddingBottom: '24px',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#ecfdf5',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h2
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '6px',
                }}
              >
                Registration Submitted Successfully
              </h2>
              <p style={{ color: '#64748b', fontSize: '14.5px', margin: 0 }}>
                Your application has been received and is queued for verification.
              </p>

              <div
                style={{
                  display: 'inline-block',
                  marginTop: '16px',
                  padding: '8px 18px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    color: '#64748b',
                    display: 'block',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Application ID
                </span>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#2563eb',
                    letterSpacing: '0.02em',
                  }}
                >
                  {submittedData.applicationId}
                </span>
              </div>
            </div>

            {/* Application Summary Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
                padding: '24px 0',
                borderBottom: '1px solid #f1f5f9',
                fontSize: '14px',
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#94a3b8',
                    marginBottom: '10px',
                  }}
                >
                  Applicant Details
                </h4>
                <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                  {submittedData.personal.fullName}
                </div>
                <div style={{ color: '#64748b', marginBottom: '3px' }}>
                  {submittedData.personal.email}
                </div>
                <div style={{ color: '#64748b', marginBottom: '3px' }}>
                  +91 {submittedData.personal.phone}
                </div>
                <div style={{ color: '#64748b' }}>
                  {submittedData.personal.city}, {submittedData.personal.state}
                </div>
              </div>

              <div>
                <h4
                  style={{
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#94a3b8',
                    marginBottom: '10px',
                  }}
                >
                  Academic & Domain
                </h4>
                <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                  {submittedData.academic.domain}
                </div>
                <div style={{ color: '#64748b', marginBottom: '3px' }}>
                  {submittedData.academic.college}
                </div>
                <div style={{ color: '#64748b', marginBottom: '3px' }}>
                  {submittedData.academic.degree} ({submittedData.academic.branch}) &bull; {submittedData.academic.year}
                </div>
                <div style={{ color: '#64748b' }}>
                  Duration: {submittedData.academic.duration} ({submittedData.academic.mode})
                </div>
              </div>

              <div>
                <h4
                  style={{
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#94a3b8',
                    marginBottom: '10px',
                  }}
                >
                  Payment & Document
                </h4>
                <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                  Fee Paid: ₹{submittedData.payment.amount}
                </div>
                <div style={{ color: '#64748b', marginBottom: '3px' }}>
                  UTR Ref: <strong>{submittedData.payment.transactionId}</strong>
                </div>
                <div style={{ color: '#64748b', marginBottom: '3px' }}>
                  Resume: {submittedData.documents.resumeName}
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    marginTop: '4px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#fffbeb',
                    color: '#b45309',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  Status: Payment Pending Verification
                </div>
              </div>
            </div>

            {/* Next Steps Notice */}
            <div
              style={{
                padding: '20px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                marginTop: '20px',
                fontSize: '13.5px',
                color: '#475569',
              }}
            >
              <h5
                style={{
                  fontWeight: 600,
                  color: '#0f172a',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ShieldCheck size={16} color="#2563eb" /> What happens next?
              </h5>
              <ol style={{ paddingLeft: '18px', margin: 0, lineHeight: '1.7' }}>
                <li>Our verification desk validates your payment reference and credentials within 24 hours.</li>
                <li>You will receive your official Internship Offer Letter & Schedule via email ({submittedData.personal.email}).</li>
                <li>For any inquiries, contact Gokul Tech Solutions at <strong>+91 9361033010</strong> or <strong>gokulsanth33010@gmail.com</strong>.</li>
              </ol>
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                marginTop: '28px',
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={handlePrint}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Printer size={16} /> Print / Save Receipt
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmittedData(null);
                  setCurrentStep(1);
                  setFormData({
                    personal: {
                      firstName: '',
                      lastName: '',
                      fullName: '',
                      email: '',
                      phone: '',
                      dob: '',
                      gender: '',
                      city: '',
                      state: '',
                      address: '',
                      linkedin: '',
                    },
                    academic: {
                      college: '',
                      degree: 'B.E / B.Tech',
                      branch: '',
                      year: '3rd Year',
                      cgpa: '',
                      domain: 'Full Stack Web Development (MERN)',
                      duration: '1 Month (Fast Track)',
                      mode: 'Online (Flexible)',
                    },
                    documents: {
                      resumeFile: null,
                      resumeName: '',
                      resumeSize: '',
                      portfolioUrl: '',
                      notes: '',
                    },
                    payment: {
                      method: 'UPI / QR Code',
                      transactionId: '',
                      agreed: false,
                    },
                  });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: '#111111',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Submit Another Application
              </button>

              <Link
                to="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  color: '#64748b',
                  border: '1px solid transparent',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-step Form Container */
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              overflow: 'hidden',
            }}
          >
            {/* Step Navigation Progress Tabs */}
            <div
              style={{
                display: 'flex',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: '#fafafa',
              }}
            >
              {steps.map((s) => {
                const isActive = currentStep === s.id;
                const isCompleted = currentStep > s.id;
                const Icon = s.icon;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      if (isCompleted) setCurrentStep(s.id);
                    }}
                    style={{
                      flex: '1 0 auto',
                      minWidth: '130px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '14px 10px',
                      backgroundColor: isActive ? '#ffffff' : 'transparent',
                      border: 'none',
                      whiteSpace: 'nowrap',
                      borderBottom: isActive
                        ? '2px solid #2563eb'
                        : '2px solid transparent',
                      cursor: isCompleted ? 'pointer' : 'default',
                      color: isActive
                        ? '#2563eb'
                        : isCompleted
                        ? '#0f172a'
                        : '#94a3b8',
                      fontWeight: isActive || isCompleted ? 600 : 500,
                      fontSize: '13.5px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: isActive
                          ? '#2563eb'
                          : isCompleted
                          ? '#ecfdf5'
                          : '#e2e8f0',
                        color: isActive
                          ? '#ffffff'
                          : isCompleted
                          ? '#10b981'
                          : '#64748b',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                    >
                      {isCompleted ? <Check size={13} /> : s.id}
                    </span>
                    <span className="step-label">{s.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form Content Area */}
            <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
              {/* STEP 1: PERSONAL */}
              {currentStep === 1 && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '4px',
                      }}
                    >
                      Step 1: Personal Details
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '13.5px', margin: 0 }}>
                      Provide your official contact and identification details.
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '18px',
                    }}
                  >
                    {/* First Name */}
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        First Name <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.personal.firstName}
                        onChange={handlePersonalChange}
                        placeholder="Enter your first name"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: errors.firstName ? '1px solid #ef4444' : '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                      {errors.firstName && (
                        <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                          {errors.firstName}
                        </span>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Last Name <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.personal.lastName}
                        onChange={handlePersonalChange}
                        placeholder="Enter your last name"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: errors.lastName ? '1px solid #ef4444' : '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                      {errors.lastName && (
                        <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                          {errors.lastName}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Email Address <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.personal.email}
                        onChange={handlePersonalChange}
                        placeholder="Enter your email address"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: errors.email ? '1px solid #ef4444' : '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                      {errors.email && (
                        <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Phone / WhatsApp (+91) <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.personal.phone}
                        onChange={handlePersonalChange}
                        placeholder="Enter 10-digit mobile number"
                        maxLength="10"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: errors.phone ? '1px solid #ef4444' : '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                      {errors.phone && (
                        <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.personal.dob}
                        onChange={handlePersonalChange}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.personal.gender}
                        onChange={handlePersonalChange}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        City / Town <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.personal.city}
                        onChange={handlePersonalChange}
                        placeholder="Enter your city / town"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: errors.city ? '1px solid #ef4444' : '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                      {errors.city && (
                        <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                          {errors.city}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        State <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.personal.state}
                        onChange={handlePersonalChange}
                        placeholder="Enter your state"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: errors.state ? '1px solid #ef4444' : '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        LinkedIn Profile (Optional)
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.personal.linkedin}
                        onChange={handlePersonalChange}
                        placeholder="LinkedIn profile URL (optional)"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '18px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#334155',
                        marginBottom: '6px',
                      }}
                    >
                      Residential / Permanent Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.personal.address}
                      onChange={handlePersonalChange}
                      rows="2"
                      placeholder="Enter street address, taluk, pincode"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#0f172a',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: ACADEMIC */}
              {currentStep === 2 && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '4px',
                      }}
                    >
                      Step 2: Academic & Track Selection
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '13.5px', margin: 0 }}>
                      Choose your college background and desired internship domain.
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '18px',
                    }}
                  >
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        College / University Name <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="college"
                        value={formData.academic.college}
                        onChange={handleAcademicChange}
                        placeholder="Enter college or university name"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: errors.college ? '1px solid #ef4444' : '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                      {errors.college && (
                        <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                          {errors.college}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Degree / Program <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <select
                        name="degree"
                        value={formData.academic.degree}
                        onChange={handleAcademicChange}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        {DEGREES.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Department / Branch <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="branch"
                        value={formData.academic.branch}
                        onChange={handleAcademicChange}
                        placeholder="Enter department / branch"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: errors.branch ? '1px solid #ef4444' : '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                      {errors.branch && (
                        <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                          {errors.branch}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Current Year of Study <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <select
                        name="year"
                        value={formData.academic.year}
                        onChange={handleAcademicChange}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        {YEARS.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Aggregate CGPA or % <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="cgpa"
                        value={formData.academic.cgpa}
                        onChange={handleAcademicChange}
                        placeholder="Enter CGPA or percentage"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: errors.cgpa ? '1px solid #ef4444' : '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                      {errors.cgpa && (
                        <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                          {errors.cgpa}
                        </span>
                      )}
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Preferred Internship Domain / Specialization <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <select
                        name="domain"
                        value={formData.academic.domain}
                        onChange={handleAcademicChange}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        {DOMAINS.map((domain) => (
                          <option key={domain} value={domain}>
                            {domain}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Internship Duration
                      </label>
                      <select
                        name="duration"
                        value={formData.academic.duration}
                        onChange={handleAcademicChange}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        {DURATIONS.map((dur) => (
                          <option key={dur} value={dur}>
                            {dur}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Preferred Training Mode
                      </label>
                      <select
                        name="mode"
                        value={formData.academic.mode}
                        onChange={handleAcademicChange}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <option value="Online (Flexible)">Online / Remote (Flexible)</option>
                        <option value="Hybrid (Salem)">Hybrid (Salem Tech Center)</option>
                        <option value="In-Office (Salem)">In-Office (Full-time Salem)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DOCUMENTS */}
              {currentStep === 3 && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '4px',
                      }}
                    >
                      Step 3: Documents Upload
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '13.5px', margin: 0 }}>
                      Upload your updated Resume / CV for profile screening.
                    </p>
                  </div>

                  {/* Primary Document: Resume Upload */}
                  <div style={{ marginBottom: '24px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        color: '#1e293b',
                        marginBottom: '8px',
                      }}
                    >
                      Resume / Curriculum Vitae (CV) <span style={{ color: '#ef4444' }}>*</span>
                    </label>

                    {formData.documents.resumeName ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '14px 18px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '6px',
                              backgroundColor: '#eff6ff',
                              color: '#2563eb',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <FileCheck size={20} />
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#0f172a',
                              }}
                            >
                              {formData.documents.resumeName}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>
                              {formData.documents.resumeSize} &bull; Ready for submission
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleRemoveResume}
                          style={{
                            padding: '6px 12px',
                            fontSize: '12.5px',
                            color: '#ef4444',
                            background: '#fee2e2',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 500,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <X size={14} /> Remove
                        </button>
                      </div>
                    ) : (
                      <label
                        style={{
                          display: 'block',
                          border: errors.resume
                            ? '2px dashed #ef4444'
                            : '2px dashed #cbd5e1',
                          borderRadius: '10px',
                          padding: '32px 20px',
                          textAlign: 'center',
                          backgroundColor: '#fafafa',
                          cursor: 'pointer',
                          transition: 'border-color 0.2s',
                        }}
                      >
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeUpload}
                          style={{ display: 'none' }}
                        />
                        <div
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            backgroundColor: '#eff6ff',
                            color: '#2563eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 12px',
                          }}
                        >
                          <Upload size={22} />
                        </div>
                        <div
                          style={{
                            fontSize: '14.5px',
                            fontWeight: 600,
                            color: '#0f172a',
                            marginBottom: '4px',
                          }}
                        >
                          Click to upload or drag and drop your Resume
                        </div>
                        <div style={{ fontSize: '12.5px', color: '#64748b' }}>
                          PDF or DOCX format (Maximum file size: 8 MB)
                        </div>
                      </label>
                    )}

                    {errors.resume && (
                      <span
                        style={{
                          color: '#ef4444',
                          fontSize: '12.5px',
                          marginTop: '6px',
                          display: 'block',
                        }}
                      >
                        {errors.resume}
                      </span>
                    )}
                  </div>


                  {/* Optional GitHub / Portfolio URL */}
                  <div style={{ marginBottom: '18px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#334155',
                        marginBottom: '6px',
                      }}
                    >
                      GitHub Profile / Portfolio / Project URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={formData.documents.portfolioUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          documents: {
                            ...prev.documents,
                            portfolioUrl: e.target.value,
                          },
                        }))
                      }
                      placeholder="GitHub or portfolio URL (optional)"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#0f172a',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: PAYMENT */}
              {currentStep === 4 && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '4px',
                      }}
                    >
                      Step 4: Registration Fee & Payment
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '13.5px', margin: 0 }}>
                      Complete the one-time registration fee payment to finalize your internship admission.
                    </p>
                  </div>

                  {/* Fee Summary Card */}
                  <div
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '18px',
                      backgroundColor: '#f8fafc',
                      marginBottom: '24px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #e2e8f0',
                        paddingBottom: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>
                          Industrial Internship Registration
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          Domain: {formData.academic.domain}
                        </div>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
                        ₹499
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                        color: '#64748b',
                        marginBottom: '6px',
                      }}
                    >
                      <span>Certificate Processing & LMS Portal Access</span>
                      <span>Included</span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                        color: '#64748b',
                        marginBottom: '10px',
                      }}
                    >
                      <span>Applicable Taxes (GST)</span>
                      <span>₹0 (Waived)</span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid #cbd5e1',
                        paddingTop: '12px',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#0f172a',
                      }}
                    >
                      <span>Total Payable</span>
                      <span style={{ color: '#2563eb', fontSize: '18px' }}>₹499</span>
                    </div>
                  </div>

                  {/* Payment Details Container */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '20px',
                      marginBottom: '24px',
                    }}
                  >
                    {/* UPI Scan & Pay Card */}
                    <div
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '18px',
                        backgroundColor: '#ffffff',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '10px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        Option 1: Scan & Pay via UPI
                      </div>

                      {/* Clean QR Graphic */}
                      <div
                        style={{
                          width: '160px',
                          height: '160px',
                          margin: '0 auto 12px',
                          padding: '6px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src="/images/upi-qr.png"
                          alt="Gokul Tech Solutions UPI QR Code"
                          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }}
                        />
                      </div>

                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                        Google Pay / PhonePe / Paytm / BHIM
                      </div>

                      {/* Copy UPI Button */}
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          backgroundColor: '#f1f5f9',
                          borderRadius: '6px',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          color: '#0f172a',
                        }}
                      >
                        <span>gokulsanth33010@oksbi</span>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: copiedUpi ? '#10b981' : '#2563eb',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          title="Copy UPI ID"
                        >
                          {copiedUpi ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    {/* Bank Transfer Card */}
                    <div
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '18px',
                        backgroundColor: '#ffffff',
                        fontSize: '13px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '10px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        Option 2: Direct Bank Transfer
                      </div>

                      <div style={{ marginBottom: '8px' }}>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '11.5px' }}>
                          Account Name
                        </span>
                        <strong style={{ color: '#0f172a' }}>Gokul Tech Solutions</strong>
                      </div>

                      <div style={{ marginBottom: '8px' }}>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '11.5px' }}>
                          Primary Mobile / Contact
                        </span>
                        <strong style={{ color: '#0f172a' }}>+91 9361033010</strong>
                      </div>

                      <div style={{ marginBottom: '8px' }}>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '11.5px' }}>
                          Address
                        </span>
                        <span style={{ color: '#334155' }}>
                          Salem (D/T), Mettur (T/K), Kolathur, PIN - 636303
                        </span>
                      </div>

                      <div
                        style={{
                          padding: '8px 10px',
                          backgroundColor: '#eff6ff',
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: '#1e40af',
                          marginTop: '12px',
                        }}
                      >
                        Pay ₹499 and enter the 12-digit UTR/Ref number below.
                      </div>
                    </div>
                  </div>

                  {/* Transaction ID & Verification Input */}
                  <div style={{ marginBottom: '18px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        color: '#0f172a',
                        marginBottom: '6px',
                      }}
                    >
                      UTR / UPI Transaction Reference Number (12 Digits) <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="transactionId"
                      value={formData.payment.transactionId}
                      onChange={handlePaymentChange}
                      placeholder="Enter 12-digit UTR or transaction ID"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        border: errors.transactionId
                          ? '1px solid #ef4444'
                          : '1px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '14.5px',
                        color: '#0f172a',
                        outline: 'none',
                        fontFamily: 'monospace',
                      }}
                    />
                    {errors.transactionId ? (
                      <span
                        style={{
                          color: '#ef4444',
                          fontSize: '12px',
                          marginTop: '4px',
                          display: 'block',
                        }}
                      >
                        {errors.transactionId}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: '#64748b',
                          fontSize: '12px',
                          marginTop: '4px',
                          display: 'block',
                        }}
                      >
                        Open your payment app receipt to copy the 12-digit UTR / transaction ID.
                      </span>
                    )}
                  </div>

                  {/* Declaration Checkbox */}
                  <div style={{ marginBottom: '16px' }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#334155',
                      }}
                    >
                      <input
                        type="checkbox"
                        name="agreed"
                        checked={formData.payment.agreed}
                        onChange={handlePaymentChange}
                        style={{ marginTop: '3px', cursor: 'pointer' }}
                      />
                      <span>
                        I declare that all personal and academic details provided are genuine, and
                        the payment transaction reference corresponds to my internship registration fee.
                      </span>
                    </label>
                    {errors.agreed && (
                      <span
                        style={{
                          color: '#ef4444',
                          fontSize: '12px',
                          marginTop: '4px',
                          display: 'block',
                        }}
                      >
                        {errors.agreed}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Form Navigation Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '24px',
                  borderTop: '1px solid #e2e8f0',
                  marginTop: '16px',
                }}
              >
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '9px 18px',
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 22px',
                      backgroundColor: '#111111',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Continue to {steps[currentStep].label} <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '11px 26px',
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? 'Registering...' : 'Submit Application & Register'}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

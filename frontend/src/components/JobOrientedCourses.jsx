import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle2, X } from 'lucide-react';

const COURSES = [
  {
    id: 'fullstack',
    badge: 'TRENDING • MOST POPULAR',
    badgeBg: '#dcfce7',
    badgeColor: '#15803d',
    title: 'Full Stack Development',
    description:
      'Master frontend and backend engineering by building full-fledged web applications from scratch with live deployment.',
    tags: ['React', 'Node.js', 'Java', 'MongoDB'],
    syllabus: [
      'HTML5, Modern CSS3, Flexbox & CSS Grid',
      'JavaScript ES6+, Asynchronous Programming & DOM APIs',
      'React.js Components, Hooks, State Management & Routing',
      'Node.js & Express.js RESTful API Architecture',
      'MongoDB & Mongoose Database Schema Design',
      'Authentication with JWT, OAuth2 & Security Protocols',
      'Live Cloud Deployment with Vercel, Render & AWS',
    ],
  },
  {
    id: 'python-data-science',
    badge: 'HIGH DEMAND',
    badgeBg: '#eff6ff',
    badgeColor: '#2563eb',
    title: 'Python & Data Science',
    description:
      'Master Python programming, data analytics, predictive modeling, machine learning, and dashboard visualization.',
    tags: ['Python', 'Pandas', 'Machine Learning', 'SQL'],
    syllabus: [
      'Core & Advanced Python OOPs, Generators & Decorators',
      'NumPy & Pandas for Complex Data Manipulation',
      'Data Visualization with Matplotlib & Seaborn',
      'Relational Database Modeling with Advanced SQL',
      'Supervised & Unsupervised Machine Learning Algorithms',
      'Scikit-Learn, Predictive Modeling & Feature Engineering',
      'Interactive Dashboard Deployment with Streamlit',
    ],
  },
  {
    id: 'cloud-devops',
    badge: 'TOP PLACEMENT',
    badgeBg: '#fef3c7',
    badgeColor: '#d97706',
    title: 'Cloud Computing & DevOps',
    description:
      'Learn AWS and Azure architecture, containerization with Docker, Kubernetes orchestration, and automated CI/CD.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    syllabus: [
      'AWS Core Services (EC2, S3, VPC, IAM, RDS, Route53)',
      'Linux Server Administration & Shell Scripting',
      'Docker Containerization, Multi-stage Builds & Compose',
      'Kubernetes Cluster Architecture, Pods & Deployments',
      'Automated CI/CD Pipelines with GitHub Actions & Jenkins',
      'Infrastructure as Code (IaC) with Terraform',
      'Monitoring & Logging with Prometheus & Grafana',
    ],
  },
  {
    id: 'ai-ml',
    badge: 'FUTURE TECH',
    badgeBg: '#fdf2f8',
    badgeColor: '#db2777',
    title: 'AI & Machine Learning',
    description:
      'Build intelligent models, implement deep learning, computer vision, natural language processing, and Generative AI.',
    tags: ['PyTorch', 'NLP', 'GenAI', 'Neural Nets'],
    syllabus: [
      'Mathematics for Machine Learning & Neural Networks',
      'Deep Learning with PyTorch & TensorFlow',
      'Computer Vision with OpenCV & Convolutional Neural Networks',
      'Natural Language Processing (NLP) & Text Transformers',
      'Large Language Models (LLMs) & Prompt Engineering',
      'LangChain & Vector Databases for Retrieval (RAG)',
      'Model Deployment & Scalable Inference Endpoints',
    ],
  },
  {
    id: 'java',
    badge: 'ENTERPRISE PICK',
    badgeBg: '#ffedd5',
    badgeColor: '#ea580c',
    title: 'Java Programming',
    description:
      'Deep dive into Object-Oriented Design, Spring Boot microservices, REST APIs, Hibernate ORM, and enterprise architecture.',
    tags: ['Core Java', 'Spring Boot', 'Microservices', 'MySQL'],
    syllabus: [
      'Core Java OOP Concepts, Collections Framework & Concurrency',
      'Java 17/21 Modern Language Features & Lambda Streams',
      'Spring Framework & Spring Boot Microservices',
      'Spring Data JPA, Hibernate ORM & Transaction Management',
      'REST API Design, Validation & Swagger Documentation',
      'Spring Security, JWT & Microservice Gateway Patterns',
      'MySQL / PostgreSQL Database Optimization & JUnit Testing',
    ],
  },
  {
    id: 'software-testing',
    badge: 'FAST TRACK',
    badgeBg: '#e0f2fe',
    badgeColor: '#0284c7',
    title: 'Software Testing & QA',
    description:
      'Become an industry-ready automation QA engineer with manual testing fundamentals, Selenium WebDriver, and Cucumber.',
    tags: ['Selenium', 'TestNG', 'Manual QA', 'API Testing'],
    syllabus: [
      'Software Testing Life Cycle (STLC) & Agile Methodologies',
      'Test Case Design, Defect Reporting & JIRA Tracking',
      'Core Java for Automation Engineering',
      'Selenium WebDriver Architecture & Page Object Model (POM)',
      'TestNG Framework for Parallel Test Execution',
      'BDD Framework with Cucumber & Gherkin Syntax',
      'API Automation with Postman & RestAssured',
    ],
  },
  {
    id: 'web-dev',
    badge: 'BEGINNER FRIENDLY',
    badgeBg: '#ffe4e6',
    badgeColor: '#e11d48',
    title: 'Modern Web Development',
    description:
      'Learn semantic HTML5, modern CSS3, responsive flexbox/grid layouts, JavaScript ES6+, and modern frontend styling.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    syllabus: [
      'Semantic HTML5 Architecture, Accessibility & SEO Best Practices',
      'Modern CSS3, Animations, Transitions & Custom Variables',
      'Responsive Mobile-First Design with Flexbox & CSS Grid',
      'Modern Bootstrap 5 & Tailwind-style Utility Frameworks',
      'JavaScript Fundamentals: Variables, Loops, Functions & Arrays',
      'DOM Manipulation, Event Handling & LocalStorage',
      'Building 5+ Real-world Responsive Client Portfolios & Websites',
    ],
  },
  {
    id: 'node-backend',
    badge: 'HIGH DEMAND',
    badgeBg: '#dcfce7',
    badgeColor: '#059669',
    title: 'Node.js Backend Dev',
    description:
      'Design high-throughput, event-driven RESTful APIs and microservices using Express, asynchronous Node.js, and NoSQL databases.',
    tags: ['Node.js', 'Express', 'REST APIs', 'JWT Auth'],
    syllabus: [
      'Node.js Event Loop, Streams, Buffers & File System Operations',
      'Building Robust RESTful APIs with Express.js',
      'Middleware Design, Request Validation & Centralized Error Handling',
      'MongoDB & Mongoose Database Indexing & Aggregations',
      'User Authentication, Password Hashing & JWT Security',
      'Redis In-Memory Caching for Blazing-Fast Performance',
      'Production Dockerization & Cloud Server Deployment',
    ],
  },
];

export default function JobOrientedCourses() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <section className="section" style={{ backgroundColor: '#ffffff', padding: '72px 0 80px' }}>
      <div className="container">
        {/* Header matching user reference */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.8vw, 40px)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.025em',
              marginBottom: '12px',
            }}
          >
            Job-Oriented <span style={{ color: '#0076ce' }}>IT Courses</span> for Career Success
          </h2>
          <p
            style={{
              fontSize: '15.5px',
              color: '#64748b',
              maxWidth: '720px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Choose from industry-verified programs tailored to prepare you for high-paying roles in software development, cloud, and QA.
          </p>
        </div>

        {/* 8 Courses Grid (4 columns) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {COURSES.map((course) => (
            <div
              key={course.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div>
                {/* Badge */}
                <div style={{ marginBottom: '12px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: course.badgeColor,
                      backgroundColor: course.badgeBg,
                      padding: '4px 10px',
                      borderRadius: '999px',
                    }}
                  >
                    {course.badge}
                  </span>
                </div>

                {/* Course Title */}
                <h3
                  style={{
                    fontSize: '17.5px',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '8px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {course.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '13px',
                    color: '#64748b',
                    lineHeight: 1.55,
                    marginBottom: '16px',
                  }}
                >
                  {course.description}
                </p>

                {/* Tech Pills */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '20px',
                  }}
                >
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: '#f1f5f9',
                        color: '#334155',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 9px',
                        borderRadius: '6px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Syllabus & Details Button */}
              <button
                type="button"
                onClick={() => setSelectedCourse(course)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  fontWeight: 600,
                  fontSize: '13px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dbeafe')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#eff6ff')}
              >
                <FileText size={15} />
                View Syllabus &amp; Details
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA Box matching reference */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '32px 24px',
            textAlign: 'center',
            marginTop: '44px',
          }}
        >
          <h4
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '6px',
            }}
          >
            Want to explore all our 16+ technology programs?
          </h4>
          <p
            style={{
              fontSize: '13.5px',
              color: '#64748b',
              margin: '0 0 20px 0',
            }}
          >
            Including IoT, Embedded Systems, Digital Marketing, Japanese Language &amp; more.
          </p>
          <Link
            to="/courses"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '11px 28px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          >
            Explore All 16+ Courses &amp; Detailed Curriculum
          </Link>
        </div>

        {/* Course Syllabus Modal Popup */}
        {selectedCourse && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.55)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              zIndex: 9999,
            }}
            onClick={() => setSelectedCourse(null)}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '32px 28px',
                maxWidth: '560px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  border: 'none',
                  background: '#f1f5f9',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#475569',
                }}
              >
                <X size={18} />
              </button>

              <span
                style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: selectedCourse.badgeColor,
                  backgroundColor: selectedCourse.badgeBg,
                  padding: '4px 10px',
                  borderRadius: '999px',
                  marginBottom: '10px',
                }}
              >
                {selectedCourse.badge}
              </span>

              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: '8px',
                }}
              >
                {selectedCourse.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  lineHeight: 1.55,
                  marginBottom: '20px',
                }}
              >
                {selectedCourse.description}
              </p>

              <h4
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#1e293b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '12px',
                }}
              >
                Comprehensive Syllabus Modules
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {selectedCourse.syllabus.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ color: '#2563eb', marginTop: '2px', flexShrink: 0 }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.45 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to="/apply-internship"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '11px 18px',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '14px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  Enroll / Apply Internship
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  style={{
                    padding: '11px 18px',
                    backgroundColor: '#f1f5f9',
                    color: '#334155',
                    fontWeight: 600,
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

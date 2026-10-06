import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Info, CheckCircle2, X, ArrowRight, BookOpen, Clock, Award, Laptop } from 'lucide-react';

const TRAINING_PROGRAMS = [
  {
    id: 'full-stack-java-angular',
    title: 'Full Stack Development with Java & Angular',
    category: 'Full Stack',
    duration: '3 to 6 Months',
    description:
      'Become a complete front-end and back-end developer by mastering essential technologies, building real-world projects with confidence, and gaining the skills needed to launch your full-stack development career.',
    syllabus: [
      'Core Java & Advanced OOPs Architecture',
      'Spring Boot Microservices & Hibernate ORM',
      'Angular Component Architecture, Routing & RxJS Observables',
      'TypeScript Fundamentals & Modern Frontend State',
      'RESTful Web Services & Swagger API Documentation',
      'MySQL Database Optimization & SQL Performance Tuning',
      'Full CI/CD Pipeline & Docker Cloud Deployment',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '17px',
            letterSpacing: '0.02em',
            marginBottom: '10px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Full Stack Developer
        </span>
        <svg width="80" height="54" viewBox="0 0 80 54" fill="none">
          <rect x="6" y="2" width="68" height="42" rx="4" stroke="#60a5fa" strokeWidth="2.5" fill="#1e293b" />
          <line x1="24" y1="48" x2="56" y2="48" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="44" x2="40" y2="48" stroke="#60a5fa" strokeWidth="2.5" />
          <path d="M16 16l8 6-8 6M34 28h12" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },
  {
    id: 'cloud-aws-azure',
    title: 'Cloud Engineering with AWS & Azure',
    category: 'Cloud & DevOps',
    duration: '3 Months',
    description:
      "Master cloud platforms trusted by the world's biggest companies, learn how to deploy and manage scalable applications, and gain the expertise to lead in a cloud-driven world.",
    syllabus: [
      'AWS Core Infrastructure (EC2, S3, VPC, Subnets, Security Groups)',
      'Microsoft Azure Virtual Networks & App Services',
      'Identity & Access Management (IAM & Azure Entra ID)',
      'Serverless Architectures with AWS Lambda & Azure Functions',
      'Cloud Storage Solutions, Relational DBs & NoSQL Clusters',
      'High Availability, Auto Scaling & Elastic Load Balancing',
      'Cloud Security, Compliance & Cost Optimization Frameworks',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <svg width="74" height="48" viewBox="0 0 74 48" fill="none">
          <path
            d="M56 38H18a14 14 0 01-2-27.8A18 18 0 0150 14a12 12 0 016 24z"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinejoin="round"
            fill="rgba(255, 255, 255, 0.15)"
          />
          <path d="M37 24v12M32 30l5-6 5 6" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span
          style={{
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '16px',
            letterSpacing: '0.12em',
            marginTop: '8px',
            textTransform: 'uppercase',
          }}
        >
          CLOUD
        </span>
      </div>
    ),
  },
  {
    id: 'devops-engineering',
    title: 'DevOps Engineering',
    category: 'Cloud & DevOps',
    duration: '3 Months',
    description:
      'Learn the essential tools and methodologies for modern software development, automate testing, integration, and deployment processes, and streamline workflows to boost efficiency and reliability.',
    syllabus: [
      'Linux Server Administration & Bash Automation',
      'Git & Advanced Distributed Branching Strategies',
      'Docker Container Architecture, Volumes & Compose',
      'Kubernetes Cluster Provisioning, Services & Ingress',
      'Continuous Integration & Delivery with Jenkins & GitHub Actions',
      'Infrastructure as Code (IaC) with Terraform & Ansible',
      'Prometheus Telemetry & Grafana Operational Dashboards',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        {/* Infinity Loop */}
        <svg width="90" height="46" viewBox="0 0 90 46" fill="none">
          <path
            d="M24 8a15 15 0 000 30c12 0 21-30 33-30a15 15 0 010 30c-12 0-21-30-33-30z"
            stroke="#2563eb"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#1d4ed8' }}>Dev</span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>&infin;</span>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#0284c7' }}>Ops</span>
        </div>
      </div>
    ),
  },
  {
    id: 'python-web-automation',
    title: 'Python for Web Development & Automation',
    category: 'Python & AI',
    duration: '3 Months',
    description:
      "Unlock the versatility of the world's most popular programming language, build everything from web apps to mobile and server-side solutions, and harness its power to create dynamic, scalable software.",
    syllabus: [
      'Python 3 Syntax, Functional Programming & Object-Oriented Design',
      'Web Frameworks: FastAPI & Django for Enterprise Web Apps',
      'Database Connectivity with PostgreSQL & SQLAlchemy ORM',
      'Automated Web Scraping with BeautifulSoup & Playwright',
      'Task Automation & OS Scripting for Production Environments',
      'Unit Testing with PyTest & Mocking Frameworks',
      'Building Production RESTful APIs & Cloud Server Deployment',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <svg width="58" height="58" viewBox="0 0 110 110" fill="none">
          <path
            d="M54.5 10c-24 0-22.5 10.4-22.5 10.4l.03 10.8h22.8v3.3H23.2C12.8 34.5 3 46.2 3 58.7c0 12.5 8.9 22.8 20.2 22.8h6.2v-8.7c0-12.7 10.9-22.8 22.8-22.8h22.7v-3.3h-22.7c-9.5 0-17.2-7.8-17.2-17.4 0-9.6 7.7-17.4 17.2-17.4h11.2c8.8 0 11.2-6.5 11.2-10.4C74.6 11.9 66 10 54.5 10zm-6.2 5.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z"
            fill="#3776ab"
          />
          <path
            d="M55.5 100c24 0 22.5-10.4 22.5-10.4l-.03-10.8H55.1v-3.3h31.7c10.4 0 20.2-11.7 20.2-24.2 0-12.5-8.9-22.8-20.2-22.8h-6.2v8.7c0 12.7-10.9 22.8-22.8 22.8H35.1v3.3h22.7c9.5 0 17.2 7.8 17.2 17.4 0 9.6-7.7 17.4-17.2 17.4H43.8c-8.8 0-11.2 6.5-11.2 10.4 0 9.6 8.6 11.5 20.1 11.5zm6.2-5.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"
            fill="#ffd43b"
          />
        </svg>
        <span
          style={{
            fontSize: '17px',
            fontWeight: 800,
            color: '#1e293b',
            letterSpacing: '-0.02em',
            marginTop: '4px',
          }}
        >
          python
        </span>
      </div>
    ),
  },
  {
    id: 'ai-data-science',
    title: 'Data Science & Artificial Intelligence',
    category: 'Python & AI',
    duration: '4 Months',
    description:
      'Master machine learning algorithms, statistical data analytics, NLP, deep neural networks, and generative AI models with real-world enterprise business datasets.',
    syllabus: [
      'Probability, Statistics & Linear Algebra for Data Science',
      'Advanced Pandas, NumPy & Exploratory Data Analysis (EDA)',
      'Supervised & Unsupervised Machine Learning with Scikit-Learn',
      'Deep Learning with PyTorch & TensorFlow Neural Architectures',
      'Computer Vision, Image Processing & Transfer Learning',
      'Generative AI, Large Language Models (LLMs) & LangChain',
      'Building Interactive End-to-End AI Products & Streamlit Apps',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <svg width="68" height="52" viewBox="0 0 68 52" fill="none">
          <circle cx="16" cy="14" r="6" stroke="#818cf8" strokeWidth="2.5" fill="#4338ca" />
          <circle cx="16" cy="38" r="6" stroke="#818cf8" strokeWidth="2.5" fill="#4338ca" />
          <circle cx="52" cy="14" r="6" stroke="#c084fc" strokeWidth="2.5" fill="#7e22ce" />
          <circle cx="52" cy="38" r="6" stroke="#c084fc" strokeWidth="2.5" fill="#7e22ce" />
          <circle cx="34" cy="26" r="7" stroke="#38bdf8" strokeWidth="2.5" fill="#0284c7" />
          <line x1="22" y1="16" x2="27" y2="23" stroke="#818cf8" strokeWidth="1.5" />
          <line x1="22" y1="36" x2="27" y2="29" stroke="#818cf8" strokeWidth="1.5" />
          <line x1="41" y1="23" x2="46" y2="16" stroke="#c084fc" strokeWidth="1.5" />
          <line x1="41" y1="29" x2="46" y2="36" stroke="#c084fc" strokeWidth="1.5" />
        </svg>
        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '15px', marginTop: '6px' }}>
          AI &amp; Data Science
        </span>
      </div>
    ),
  },
  {
    id: 'software-testing-automation',
    title: 'Software Testing & Automation QA',
    category: 'Software Testing',
    duration: '2.5 Months',
    description:
      'Become an industry-ready automation QA engineer with manual testing fundamentals, Selenium WebDriver, TestNG, Cucumber BDD, and REST Assured API testing.',
    syllabus: [
      'Software Testing Life Cycle (STLC), Agile & Scrum Methodologies',
      'Test Case Design, Execution & JIRA Defect Tracking',
      'Java Programming Fundamentals for Automation Engineers',
      'Selenium WebDriver Architecture & Page Object Model (POM)',
      'TestNG Framework for Robust Parallel Test Execution',
      'Cucumber BDD Framework & Gherkin Language',
      'API Automation with Postman & REST Assured',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <svg width="60" height="52" viewBox="0 0 60 52" fill="none">
          <path d="M30 4l18 8v16c0 14-18 20-18 20S12 42 12 28V12l18-8z" stroke="#34d399" strokeWidth="2.5" fill="#064e3b" />
          <path d="M22 26l6 6 12-12" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '15px', marginTop: '6px' }}>
          Automation QA
        </span>
      </div>
    ),
  },
  {
    id: 'mern-stack-development',
    title: 'MERN Stack Web Development',
    category: 'Full Stack',
    duration: '3 to 6 Months',
    description:
      'Master MongoDB, Express.js, React.js, and Node.js to engineer scalable single-page web applications with modern state management and cloud hosting.',
    syllabus: [
      'HTML5, Modern CSS3 & Tailwind CSS Architecture',
      'Modern JavaScript ES6+, Closures & Asynchronous Patterns',
      'React.js Component Architecture, Hooks & Redux Toolkit',
      'Building Scalable REST APIs with Node.js & Express.js',
      'MongoDB Document Modeling & Schema Validation',
      'JWT Authentication & Protected Routing',
      'Full Stack Deployment to Vercel, Render & AWS',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '16px',
        }}
      >
        <span style={{ fontSize: '26px', fontWeight: 900, color: '#10b981' }}>M</span>
        <span style={{ fontSize: '26px', fontWeight: 900, color: '#94a3b8' }}>E</span>
        <span style={{ fontSize: '26px', fontWeight: 900, color: '#0ea5e9' }}>R</span>
        <span style={{ fontSize: '26px', fontWeight: 900, color: '#22c55e' }}>N</span>
      </div>
    ),
  },
  {
    id: 'java-microservices',
    title: 'Java Microservices with Spring Boot',
    category: 'Full Stack',
    duration: '3 Months',
    description:
      'Deep dive into Object-Oriented Design, Spring Boot microservices, REST APIs, Hibernate ORM, Kafka event streaming, and enterprise architecture.',
    syllabus: [
      'Core Java & Advanced Concurrency Frameworks',
      'Spring Framework Architecture & Spring Boot 3+',
      'Spring Data JPA with MySQL & PostgreSQL',
      'Microservice Discovery with Eureka & Spring Cloud Gateway',
      'Event-Driven Architecture with Apache Kafka',
      'Dockerization & Kubernetes Deployment for Java Services',
      'Unit & Integration Testing with JUnit 5 & Mockito',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <svg width="48" height="52" viewBox="0 0 48 52" fill="none">
          <path d="M12 20c4 0 6 3 8 7 2-4 4-7 8-7 6 0 10 5 10 11 0 12-18 18-18 18S12 43 12 31c0-6 4-11 10-11z" stroke="#ffffff" strokeWidth="2.5" fill="rgba(255,255,255,0.15)" />
          <path d="M20 6c3 2 4 5 3 8M28 8c2 2 3 5 2 7" stroke="#fdba74" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '15px', marginTop: '6px' }}>
          Java Microservices
        </span>
      </div>
    ),
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development (React Native & Flutter)',
    category: 'Mobile & Languages',
    duration: '3 Months',
    description:
      'Build performant, cross-platform iOS and Android mobile apps from a single codebase using React Native, Flutter, Dart, and cloud backend integrations.',
    syllabus: [
      'React Native & Flutter Architecture Fundamentals',
      'Cross-Platform UI Widgets, Animations & Navigation',
      'Local Storage, SQLite & Firebase Realtime Integrations',
      'Native Device APIs (Camera, GPS, Push Notifications)',
      'State Management with Provider, Bloc & Redux',
      'App Performance Profiling & Memory Optimization',
      'Publishing to Apple App Store & Google Play Store',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <svg width="38" height="54" viewBox="0 0 38 54" fill="none">
          <rect x="3" y="2" width="32" height="50" rx="6" stroke="#ffffff" strokeWidth="2.5" fill="#0f172a" />
          <circle cx="19" cy="46" r="2.5" fill="#38bdf8" />
          <line x1="14" y1="7" x2="24" y2="7" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>
          Mobile Apps
        </span>
      </div>
    ),
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security & Ethical Hacking',
    category: 'Cloud & DevOps',
    duration: '3 Months',
    description:
      'Learn network security protocols, vulnerability assessment, penetration testing, defensive forensics, and ethical hacking to safeguard digital enterprise infrastructure.',
    syllabus: [
      'Computer Networking & TCP/IP Security Architecture',
      'Linux for Hackers & Kali Linux Penetration Testing Toolkit',
      'Web Application Vulnerability Assessment (OWASP Top 10)',
      'Network Scanning & Enumeration with Nmap & Wireshark',
      'System Hacking, Privilege Escalation & Cryptography',
      'SOC Fundamentals, SIEM Tools & Incident Response',
      'Preparation for CEH & CompTIA Security+ Certifications',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <svg width="48" height="52" viewBox="0 0 48 52" fill="none">
          <path d="M24 3L6 11v14c0 14 18 24 18 24s18-10 18-24V11L24 3z" stroke="#ef4444" strokeWidth="2.5" fill="rgba(239, 68, 68, 0.15)" />
          <circle cx="24" cy="24" r="5" fill="#ef4444" />
          <path d="M24 29v5" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '14px', marginTop: '6px', letterSpacing: '0.05em' }}>
          CYBER SECURITY
        </span>
      </div>
    ),
  },
  {
    id: 'embedded-systems-iot',
    title: 'Embedded Systems & IoT Engineering',
    category: 'Mobile & Languages',
    duration: '3 Months',
    description:
      'Design smart connected hardware systems using ARM Cortex microcontrollers, Embedded C, Raspberry Pi, Arduino, and IoT cloud protocol architectures.',
    syllabus: [
      'Embedded C Programming & Memory Management',
      'Microcontroller Architecture (ARM Cortex, STM32 & ESP32)',
      'Communication Protocols: UART, SPI, I2C & CAN Bus',
      'Sensors, Actuators & Real-Time Hardware Interfacing',
      'FreeRTOS Multitasking & Real-Time Kernel Management',
      'IoT Cloud Networking with MQTT, HTTP & AWS IoT Core',
      'PCB Design Basics & Prototyping Hardware Modules',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <rect x="10" y="10" width="30" height="30" rx="4" stroke="#10b981" strokeWidth="2.5" fill="#0f172a" />
          <circle cx="25" cy="25" r="5" fill="#10b981" />
          <line x1="2" y1="18" x2="10" y2="18" stroke="#10b981" strokeWidth="2" />
          <line x1="2" y1="32" x2="10" y2="32" stroke="#10b981" strokeWidth="2" />
          <line x1="40" y1="18" x2="48" y2="18" stroke="#10b981" strokeWidth="2" />
          <line x1="40" y1="32" x2="48" y2="32" stroke="#10b981" strokeWidth="2" />
        </svg>
        <span style={{ color: '#10b981', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>
          Embedded &amp; IoT
        </span>
      </div>
    ),
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth Strategy',
    category: 'Mobile & Languages',
    duration: '2.5 Months',
    description:
      'Master SEO, Google Ads, Meta Performance marketing, email funnels, and data analytics to drive scalable customer acquisition and brand visibility.',
    syllabus: [
      'Search Engine Optimization (Technical & On-Page SEO)',
      'Google Search, Display & Performance Max Ad Campaigns',
      'Meta (Facebook & Instagram) Targeted Lead Generation',
      'Content Marketing, Copywriting & Brand Positioning',
      'Marketing Automation & Conversion Rate Optimization (CRO)',
      'Google Analytics 4 (GA4) & Data Studio Reporting',
      'Executing Real ROI-Driven Corporate Ad Budgets',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <svg width="54" height="46" viewBox="0 0 54 46" fill="none">
          <path d="M6 38l12-14 10 8 20-22" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M38 10h10v10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>
          Digital Growth
        </span>
      </div>
    ),
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design & Product Prototyping',
    category: 'Full Stack',
    duration: '2.5 Months',
    description:
      'Design intuitive, user-centered digital interfaces using Figma, wireframing, interactive prototyping, design systems, and modern usability heuristics.',
    syllabus: [
      'UX Research, User Personas & Empathy Mapping',
      'Information Architecture & Low-Fidelity Wireframing',
      'Mastering Figma: Auto-Layout, Components & Variants',
      'Design Systems, Modern Color Theory & Typography',
      'High-Fidelity Interactive Micro-Animation Prototypes',
      'Usability Testing, A/B Testing & Heuristic Evaluation',
      'Designing & Documenting Production-Ready UX Case Studies',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="8" stroke="#ffffff" strokeWidth="2.5" fill="rgba(255,255,255,0.15)" />
          <circle cx="18" cy="18" r="4" fill="#ffffff" />
          <path d="M12 36l10-10 6 6 8-8" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>
          UI/UX Design
        </span>
      </div>
    ),
  },
  {
    id: 'business-analytics-bi',
    title: 'Business Analytics with PowerBI & Tableau',
    category: 'Python & AI',
    duration: '2.5 Months',
    description:
      'Transform complex raw business data into actionable executive insights, automated dashboards, and interactive visual reports using PowerBI, Tableau, and SQL.',
    syllabus: [
      'Advanced Excel Functions, Pivot Tables & Power Query',
      'Relational Database Queries & Complex SQL Joins',
      'PowerBI Desktop, DAX Measures & Star Schema Modeling',
      'Tableau Desktop Visualizations & Custom Calculations',
      'Data Cleansing, ETL Pipelines & Scheduled Data Refresh',
      'Executive KPI Dashboard Design & Storytelling',
      'Portfolio Capstone: Live Corporate Sales & Revenue BI Suites',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <svg width="54" height="44" viewBox="0 0 54 44" fill="none">
          <rect x="6" y="24" width="8" height="16" rx="2" fill="#ffffff" />
          <rect x="18" y="16" width="8" height="24" rx="2" fill="#ffffff" />
          <rect x="30" y="8" width="8" height="32" rx="2" fill="#ffffff" />
          <rect x="42" y="2" width="8" height="38" rx="2" fill="#ffffff" />
        </svg>
        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>
          PowerBI &amp; Tableau
        </span>
      </div>
    ),
  },
  {
    id: 'node-backend-engineering',
    title: 'Node.js & Scalable Backend Engineering',
    category: 'Full Stack',
    duration: '3 Months',
    description:
      'Design high-throughput, event-driven RESTful APIs and distributed microservices using Express, asynchronous Node.js, Redis, and NoSQL databases.',
    syllabus: [
      'Node.js Event Loop, Worker Threads & Stream Processing',
      'REST API Design & Validation with Joi / Zod',
      'MongoDB Aggregation Pipelines & Redis Cache Layers',
      'Message Queues with RabbitMQ & BullMQ',
      'Microservice Authentication, Rate Limiting & API Gateways',
      'Docker Containerization & Server Deployment',
      'Load Testing with k6 & Production Monitoring',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M25 4L44 15V37L25 48L6 37V15L25 4Z" stroke="#86efac" strokeWidth="2.5" fill="#14532d" />
          <path d="M18 20v10l7 4 7-4V20" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>
          Node.js Backend
        </span>
      </div>
    ),
  },
  {
    id: 'japanese-language-global',
    title: 'Japanese Language & Global IT Career Prep',
    category: 'Mobile & Languages',
    duration: '3 to 6 Months',
    description:
      'Master JLPT N5 / N4 Japanese language proficiency, business etiquette, and cultural communication to unlock high-paying IT jobs in Tokyo & global Japanese tech firms.',
    syllabus: [
      'Hiragana, Katakana & 150+ Essential Kanji Characters',
      'Sentence Structure, Grammar Particles & Daily Conversations',
      'Business Japanese (Keigo), Email Etiquette & IT Vocabulary',
      'Listening Comprehension & Native Pronunciation Practice',
      'JLPT N5 & N4 Model Exam Solving & Mock Tests',
      'Japanese IT Work Culture & Corporate Expectations',
      'Direct Placement Assistance for Bilateral Japan Tech Hubs',
    ],
    renderGraphic: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px',
        }}
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#dc2626',
            fontWeight: 900,
            fontSize: '18px',
          }}
        >
          日
        </div>
        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>
          JLPT Japanese
        </span>
      </div>
    ),
  },
];

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    document.title = 'Job-Oriented IT Courses in Chennai & Bangalore – Gokul Tech Solutions';
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Full Stack', 'Cloud & DevOps', 'Python & AI', 'Software Testing', 'Mobile & Languages'];

  const filteredPrograms =
    selectedCategory === 'All'
      ? TRAINING_PROGRAMS
      : TRAINING_PROGRAMS.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* =================================================================
          TOP ROYAL BLUE HERO BANNER (Matches user screenshot)
          ================================================================= */}
      <section
        style={{
          backgroundColor: '#0056d2',
          backgroundImage: 'linear-gradient(135deg, #0056d2 0%, #0045aa 100%)',
          paddingTop: 'calc(var(--header-height) + 64px)',
          paddingBottom: '72px',
          color: '#ffffff',
          textAlign: 'center',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              marginBottom: '18px',
            }}
          >
            Job-Oriented IT Courses in Chennai &amp; Bangalore with 100% Job Support
          </h1>

          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.92)',
              lineHeight: 1.65,
              maxWidth: '820px',
              margin: '0 auto',
            }}
          >
            Gokul Tech Solutions provides career-defining software courses in Chennai &amp; Bangalore.
            Master Full Stack, Cloud, DevOps, Python, AI/ML, and Testing with live client projects, 100%
            job confirmations, and dedicated 100% job support until placed.
          </p>
        </div>
      </section>

      {/* =================================================================
          EXPLORE OUR TRAINING PROGRAMS SECTION
          ================================================================= */}
      <section className="section" style={{ paddingTop: '56px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: 'clamp(24px, 3.2vw, 34px)',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}
            >
              Explore Our Training Programs
            </h2>
            <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
              Hands-on enterprise curriculum designed and mentored by senior engineering architects
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              marginBottom: '44px',
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === category ? '#0056d2' : '#f1f5f9',
                  color: selectedCategory === category ? '#ffffff' : '#475569',
                  transition: 'all 0.15s ease',
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Cards Grid (4 columns matching screenshot) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                style={{
                  borderRadius: '12px',
                  border: '1px solid #b9d8ee',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(0, 86, 210, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Top Half: Graphic Thumbnail */}
                <div style={{ height: '175px', width: '100%' }}>
                  {program.renderGraphic()}
                </div>

                {/* Bottom Half: Soft Blue Body matching screenshot */}
                <div
                  style={{
                    backgroundColor: '#dff0fa',
                    padding: '20px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '16.5px',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '10px',
                        lineHeight: 1.35,
                      }}
                    >
                      {program.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#334155',
                        lineHeight: 1.55,
                        marginBottom: '20px',
                      }}
                    >
                      {program.description}
                    </p>
                  </div>

                  {/* View Details Button with (i) icon */}
                  <button
                    type="button"
                    onClick={() => setSelectedProgram(program)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      backgroundColor: '#0056d2',
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
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0045aa')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0056d2')}
                  >
                    <Info size={16} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details Modal */}
      {selectedProgram && (
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
          onClick={() => setSelectedProgram(null)}
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
              onClick={() => setSelectedProgram(null)}
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
                color: '#0056d2',
                backgroundColor: '#eff6ff',
                padding: '4px 10px',
                borderRadius: '999px',
                marginBottom: '10px',
              }}
            >
              {selectedProgram.category} &bull; {selectedProgram.duration}
            </span>

            <h3
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#0f172a',
                marginBottom: '8px',
              }}
            >
              {selectedProgram.title}
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: '#64748b',
                lineHeight: 1.55,
                marginBottom: '20px',
              }}
            >
              {selectedProgram.description}
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
              {selectedProgram.syllabus.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ color: '#0056d2', marginTop: '2px', flexShrink: 0 }}>
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
                  backgroundColor: '#0056d2',
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
                onClick={() => setSelectedProgram(null)}
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
  );
}

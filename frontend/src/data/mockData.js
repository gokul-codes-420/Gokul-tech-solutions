// Fallback mock dataset for resilience when backend server is offline or on static CDN deployments

export const FALLBACK_SERVICES = [
  {
    _id: 'srv-1',
    id: 'srv-1',
    title: 'Strategic Business Consulting',
    shortDescription: 'Data-driven growth strategies, operational efficiency audits, and executive advisory.',
    description: 'We partner with enterprise leaders and agile startups to formulate resilient business models, optimize operational workflows, and execute market expansion initiatives that drive sustainable profitability.',
    icon: 'TrendingUp',
    features: [
      'Market Entry & Expansion Strategy',
      'Organizational Workflow Optimization',
      'Financial Forecasting & Due Diligence',
      'Change Management & Executive Coaching'
    ]
  },
  {
    _id: 'srv-2',
    id: 'srv-2',
    title: 'Enterprise Web & Cloud Systems',
    shortDescription: 'High-performance, fault-tolerant cloud applications built on modern microservices.',
    description: 'Our engineering team crafts secure, scalable web platforms and cloud-native systems designed for mission-critical reliability, sub-second latency, and seamless horizontal scaling.',
    icon: 'Globe',
    features: [
      'Microservices & Distributed Architecture',
      'Full-Stack Modern Web Applications',
      'Cloud Infrastructure (AWS, Azure, GCP)',
      'CI/CD Pipeline Automation & Monitoring'
    ]
  },
  {
    _id: 'srv-3',
    id: 'srv-3',
    title: 'Digital Transformation & Modernization',
    shortDescription: 'Legacy migration, API integration frameworks, and end-to-end digital ecosystem design.',
    description: 'Accelerate your organization by phasing out obsolete legacy bottlenecks. We replace monolithic systems with modular, real-time data pipelines and intuitive digital experiences.',
    icon: 'Cpu',
    features: [
      'Legacy Monolith Decomposition',
      'Unified RESTful & GraphQL API Gateways',
      'Automated Data Migration Protocols',
      'Enterprise Toolchain Harmonization'
    ]
  },
  {
    _id: 'srv-4',
    id: 'srv-4',
    title: 'Managed IT & Infrastructure',
    shortDescription: '24/7 proactive monitoring, zero-trust network architectures, and SLA guarantees.',
    description: 'Ensure continuous business uptime with enterprise-grade managed infrastructure, disaster recovery planning, compliance adherence, and around-the-clock systems monitoring.',
    icon: 'Server',
    features: [
      '24/7 Network Operations Center (NOC)',
      'Zero-Trust Security Perimeter Setup',
      'Automated Backup & Disaster Recovery',
      'SOC 2 & ISO 27001 Compliance Alignment'
    ]
  },
  {
    _id: 'srv-5',
    id: 'srv-5',
    title: 'Custom Product Engineering',
    shortDescription: 'From initial prototype to production deployment with human-centered UI/UX.',
    description: 'We deliver comprehensive digital products tailored to your domain. Our cross-functional teams build polished, intuitive software that delights end-users and scales effortlessly.',
    icon: 'Layers',
    features: [
      'End-to-End Product Roadmap Execution',
      'UX Research & Design Systems',
      'Cross-Platform Web & Mobile Development',
      'Automated Quality Assurance & Stress Testing'
    ]
  },
  {
    _id: 'srv-6',
    id: 'srv-6',
    title: 'Operations & Cybersecurity Shield',
    shortDescription: 'Proactive vulnerability assessments, incident response, and continuous defense.',
    description: 'Protect vital corporate assets with comprehensive cybersecurity architectures. We perform penetration testing, threat modeling, security hardening, and real-time intrusion monitoring.',
    icon: 'ShieldCheck',
    features: [
      'Comprehensive Penetration Testing',
      'Identity & Access Management (IAM)',
      'Encrypted Data At-Rest & In-Transit',
      'Rapid Incident Response & Forensics'
    ]
  }
];

export const FALLBACK_PRODUCTS = [
  {
    _id: 'prod-1',
    id: 'prod-1',
    name: 'Apex Enterprise Suite',
    slug: 'apex-enterprise-suite',
    category: 'Enterprise Software',
    shortDescription: 'All-in-one resource planning, financial telemetry, and multi-tenant collaboration.',
    description: 'Apex Enterprise Suite delivers a unified command center for mid-market and enterprise organizations. Unify supply chain telemetry, automated financial reconciliations, team bandwidth tracking, and compliance reporting in one cohesive platform.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    price: 24999,
    features: [
      'Unified Financial & Operational Telemetry',
      'Real-Time Multi-Region Inventory Sync',
      'Role-Based Granular Access Controls',
      'Native Bi-directional ERP & CRM Sync',
      'Automated Audit Trail Generation'
    ],
    specifications: {
      'Deployment': 'Cloud-Hosted or Hybrid On-Premise',
      'Supported Users': 'Up to 10,000 concurrent seats',
      'Uptime SLA': '99.99% Guaranteed Availability',
      'Security Standard': 'SOC 2 Type II, HIPAA, GDPR compliant',
      'API Protocols': 'REST, Webhooks, gRPC'
    },
    availability: 'Available'
  },
  {
    _id: 'prod-2',
    id: 'prod-2',
    name: 'Nova Cloud Analytics Engine',
    slug: 'nova-cloud-analytics-engine',
    category: 'Data & Analytics',
    shortDescription: 'Sub-second real-time streaming analytics and predictive machine learning models.',
    description: 'Empower decision-makers with instant clarity. Nova Analytics continuously ingests petabytes of operational telemetry and transforms raw signals into interactive dashboards, predictive forecasts, and proactive anomaly alerts.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    price: 18999,
    features: [
      'Sub-second Ingestion for Billion-row Datasets',
      'Prebuilt Predictive Financial Forecasting',
      'Self-Service Drag-and-Drop Visual Builder',
      'Automated Anomaly Detection with Slack/Teams alerts'
    ],
    specifications: {
      'Data Connectors': 'Snowflake, BigQuery, PostgreSQL, Kafka',
      'Query Latency': '< 250ms p95 average',
      'Storage Tier': 'Columnar Compressed Storage',
      'Export Formats': 'CSV, JSON, PDF, Parquet'
    },
    availability: 'In Stock'
  },
  {
    _id: 'prod-3',
    id: 'prod-3',
    name: 'Nexus Workflow Automation',
    slug: 'nexus-workflow-automation',
    category: 'Productivity',
    shortDescription: 'Intelligent process orchestration that connects disconnected enterprise SaaS tools.',
    description: 'Eliminate repetitive manual tasks and inter-departmental bottlenecks. Nexus allows operational teams to visually script multi-step approvals, automated data syncs, and event-driven notifications without writing code.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    price: 9999,
    features: [
      'Visual Drag-and-Drop Workflow Canvas',
      '200+ Enterprise Pre-Built Connectors',
      'Conditional Routing & Fallback Logic',
      'Detailed Audit Execution Logs'
    ],
    specifications: {
      'Trigger Speed': 'Instantaneous Event Webhooks',
      'Concurrency': '50,000 runs/hour',
      'Integration Library': 'Salesforce, Stripe, Jira, Zendesk, Hubspot',
      'Custom Scripting': 'JavaScript & Python runners'
    },
    availability: 'Available'
  },
  {
    _id: 'prod-4',
    id: 'prod-4',
    name: 'Quantum Identity & Access Shield',
    slug: 'quantum-identity-access-shield',
    category: 'Security',
    shortDescription: 'Adaptive multi-factor authentication, device posture checks, and zero-trust SSO.',
    description: 'Defend your distributed workforce against credential theft and unauthorized data exfiltration. Quantum Shield continuously evaluates session risk, device hygiene, and biometric proof before granting privilege escalation.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    price: 14999,
    features: [
      'FIDO2 & WebAuthn Passwordless Authentication',
      'Continuous Contextual Device Posture Validation',
      'Single Sign-On (SSO) with SCIM automated provisioning',
      'Privileged Access Management (PAM) with session replay'
    ],
    specifications: {
      'Directory Sync': 'Active Directory, Okta, Google Workspace, LDAP',
      'Latency Overhead': '< 15ms authentication resolution',
      'Certifications': 'FedRAMP Moderate Ready, ISO 27001',
      'Recovery': 'Hardware key self-service recovery'
    },
    availability: 'Available'
  },
  {
    _id: 'prod-5',
    id: 'prod-5',
    name: 'Pulse Realtime Operations Center',
    slug: 'pulse-operations-center',
    category: 'Infrastructure',
    shortDescription: 'Unified observability and telemetry for distributed serverless and Kubernetes clusters.',
    description: 'Get total visibility into your technology infrastructure. Pulse correlates distributed traces, container metrics, and distributed log streams to pinpoint service regressions before customers notice.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    price: 21999,
    features: [
      'Distributed Tracing with Automatic Dependency Graphing',
      'Kubernetes Cluster Resource Optimization',
      'Predictive Autoscaling Cost Management',
      'Single-Pane Infrastructure Health Console'
    ],
    specifications: {
      'Telemetry Standard': 'OpenTelemetry native compliant',
      'Agent Footprint': '< 1% CPU overhead per host',
      'Retention': 'Up to 365 days hot searchable storage',
      'Alert Channels': 'PagerDuty, Opsgenie, Webhook, SMS'
    },
    availability: 'In Stock'
  },
  {
    _id: 'prod-6',
    id: 'prod-6',
    name: 'Horizon Customer Intelligence Hub',
    slug: 'horizon-customer-intelligence',
    category: 'Enterprise Software',
    shortDescription: 'Unified 360-degree customer profiling, churn prediction, and omnichannel engagement.',
    description: 'Connect touchpoints across sales, support, and product usage into a single coherent customer narrative. Horizon flags at-risk accounts, suggests upsell windows, and streamlines executive account reviews.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    price: 16999,
    features: [
      '360-Degree Unified Profile Stitching',
      'Machine Learning Customer Health Scores',
      'Automated Quarterly Business Review Reports',
      'Executive Relationship Sentiment Analysis'
    ],
    specifications: {
      'Data Freshness': 'Real-time Event Ingestion',
      'CRM Support': 'Hubspot, Salesforce, Dynamics 365',
      'Security': 'End-to-End Field-Level Encryption',
      'Compliance': 'CCPA & GDPR deletion compliance'
    },
    availability: 'Available'
  }
];

export const FALLBACK_PROJECTS = [
  {
    _id: 'proj-1',
    id: 'proj-1',
    title: 'Global FinTech Core Banking Platform',
    category: 'Business',
    description: 'Engineered a next-generation high-throughput core banking ledger handling over 40,000 transactions per second with strict zero-loss guarantees.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
    technologies: ['Node.js', 'React', 'TypeScript', 'PostgreSQL', 'Kafka', 'Docker'],
    projectUrl: 'https://example.com/fintech-case-study',
  },
  {
    _id: 'proj-2',
    id: 'proj-2',
    title: 'Smart Logistics Fleet & Route Telemetry',
    category: 'Web',
    description: 'Built a real-time IoT tracking and route optimization engine for a nationwide fleet of 1,200 freight vehicles, slashing fuel overhead by 18%.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    technologies: ['React', 'Three.js', 'Express', 'MongoDB', 'Mapbox', 'WebSockets'],
    projectUrl: 'https://example.com/logistics-case-study',
  },
  {
    _id: 'proj-3',
    id: 'proj-3',
    title: 'Omnichannel Executive Health & Care App',
    category: 'Mobile',
    description: 'Designed and deployed an intuitive mobile patient health management portal integrating biometric health wearables and HIPAA-compliant telehealth.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    technologies: ['React Native', 'Node.js', 'Express', 'MongoDB', 'WebRTC'],
    projectUrl: 'https://example.com/health-case-study',
  },
  {
    _id: 'proj-4',
    id: 'proj-4',
    title: 'Enterprise Cyber Defense Command Center',
    category: 'Business',
    description: 'Consolidated distributed security sensors and SIEM pipelines into a unified reactive SecOps dashboard with automated containment playbooks.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
    technologies: ['React', 'Three.js', 'Express', 'MongoDB', 'Python', 'Tailscale'],
    projectUrl: 'https://example.com/security-case-study',
  },
  {
    _id: 'proj-5',
    id: 'proj-5',
    title: 'Autonomous Clean Energy Microgrid Monitor',
    category: 'Other',
    description: 'Architected edge computing firmware and cloud dispatch algorithms to balance solar and battery storage systems across 50 commercial facilities.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=80',
    technologies: ['React', 'Node.js', 'MQTT', 'TimescaleDB', 'Docker'],
    projectUrl: 'https://example.com/energy-case-study',
  }
];

export const FALLBACK_STATS = {
  clientsCount: '250+',
  projectsCount: '500+',
  uptimeRate: '99.99%',
  teamSize: '45+',
};

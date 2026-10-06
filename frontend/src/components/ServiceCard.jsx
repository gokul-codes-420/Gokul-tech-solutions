import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Globe,
  Cpu,
  Server,
  Layers,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  Code,
  Database,
} from 'lucide-react';

const iconMap = {
  TrendingUp,
  Globe,
  Cpu,
  Server,
  Layers,
  ShieldCheck,
  Briefcase,
  Code,
  Database,
};

export default function ServiceCard({ service }) {
  const IconComponent = iconMap[service.icon] || Briefcase;

  return (
    <div className="service-card">
      <div className="service-icon-box">
        <IconComponent size={22} />
      </div>

      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">
        {service.shortDescription || service.description}
      </p>

      <Link
        to={`/services/${service._id}`}
        className="service-learn-more"
        aria-label={`Learn more about ${service.title}`}
      >
        <span>Learn More</span>
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  variant = 'primary', // primary, secondary, accent, outline, danger
  size = 'md',        // sm, md, lg
  className = '',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  icon,
  ...props
}) {
  const classes = `btn btn-${variant} btn-${size} ${className}`;

  const content = (
    <>
      {loading && <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />}
      {!loading && icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}

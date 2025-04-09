import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb', // gray-200
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  };

  return (
    <div style={cardStyle} className={className}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  const headerStyle: React.CSSProperties = {
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb', // gray-200
  };

  return (
    <div style={headerStyle} className={className}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function CardTitle({ className, children }: CardTitleProps) {
  const titleStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.5,
    color: '#111827', // gray-900
  };

  return (
    <h3 style={titleStyle} className={className}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  const contentStyle: React.CSSProperties = {
    padding: '1rem',
  };

  return (
    <div style={contentStyle} className={className}>
      {children}
    </div>
  );
} 
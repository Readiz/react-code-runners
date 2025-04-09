import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function Textarea({ className, ...props }: TextareaProps) {
  const textareaStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    color: '#374151', // gray-700
    border: '1px solid #d1d5db', // gray-300
    borderRadius: '0.375rem',
    resize: 'none',
    outline: 'none',
  };
  
  return (
    <textarea
      style={textareaStyle}
      className={className}
      {...props}
    />
  );
} 
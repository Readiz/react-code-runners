import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
  const buttonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    borderRadius: '0.375rem',
    backgroundColor: '#2563eb', // blue-600
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 150ms',
    outline: 'none',
  };

  const disabledStyle: React.CSSProperties = {
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  const hoverStyle = !props.disabled ? {
    ':hover': {
      backgroundColor: '#1d4ed8', // blue-700
    }
  } : {};
  
  return (
    <button 
      style={{
        ...buttonStyle,
        ...(props.disabled ? disabledStyle : {}),
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
} 
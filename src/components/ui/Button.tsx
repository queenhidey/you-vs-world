'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  disabled = false,
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-bold rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-orange-600 hover:bg-orange-700 text-white',
    info: 'bg-purple-600 hover:bg-purple-700 text-white'
  };

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-lg',
    lg: 'py-4 px-8 text-xl'
  };

  const disabledClasses = disabled 
    ? 'bg-gray-500 text-gray-300 cursor-not-allowed hover:bg-gray-500' 
    : '';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button 
      className={combinedClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

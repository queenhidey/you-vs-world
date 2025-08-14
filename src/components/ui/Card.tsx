'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'solid';
}

export default function Card({ children, className = '', variant = 'glass' }: CardProps) {
  const baseClasses = 'rounded-lg p-6';
  
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    glass: 'bg-white/10 backdrop-blur-sm',
    solid: 'bg-white shadow-lg'
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
}

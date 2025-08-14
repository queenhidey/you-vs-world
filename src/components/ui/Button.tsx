/**
 * Button Component
 * 
 * Reusable button component with multiple variants and sizes.
 * Provides consistent styling and behavior across the application.
 */

'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Props for the Button component
 * Extends HTML button attributes while adding custom styling options
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Content to display inside the button */
  children: ReactNode;
}

/**
 * Configurable button component with preset styling variants
 * 
 * @param variant - Controls the color scheme and visual style
 * @param size - Controls the button dimensions and text size
 * @param children - Content to render inside the button
 * @param className - Additional CSS classes to apply
 * @param disabled - Whether the button is disabled
 * @param props - Additional HTML button attributes
 */
export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  disabled = false,
  ...props 
}: ButtonProps) {
  // Base classes applied to all buttons
  const baseClasses = 'font-bold rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center';
  
  // Color schemes for different button variants
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-orange-600 hover:bg-orange-700 text-white',
    info: 'bg-purple-600 hover:bg-purple-700 text-white'
  };

  // Size variations for padding and text size
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-lg',
    lg: 'py-4 px-8 text-xl'
  };

  // Disabled state styling - overrides hover effects
  const disabledClasses = disabled 
    ? 'bg-gray-500 text-gray-300 cursor-not-allowed hover:bg-gray-500' 
    : '';

  // Combine all classes for final button styling
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

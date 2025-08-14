/**
 * Card Component
 * 
 * Reusable container component that provides consistent styling for content sections.
 * Offers different visual variants including glass morphism and solid backgrounds.
 */

'use client';

import { ReactNode } from 'react';

/**
 * Props for the Card component
 */
interface CardProps {
  /** Content to display inside the card */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Visual style variant of the card */
  variant?: 'default' | 'glass' | 'solid';
}

/**
 * Flexible card container component with multiple styling options
 * 
 * @param children - Content to render inside the card
 * @param className - Additional CSS classes for custom styling
 * @param variant - Predefined visual style:
 *   - 'default': Basic white background with border
 *   - 'glass': Semi-transparent with blur effect (glass morphism)
 *   - 'solid': Solid white background with shadow
 */
export default function Card({ children, className = '', variant = 'glass' }: CardProps) {
  // Base styling applied to all card variants
  const baseClasses = 'rounded-lg p-6';
  
  // Different visual styles for various use cases
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    glass: 'bg-white/10 backdrop-blur-sm', // Glass morphism effect
    solid: 'bg-white shadow-lg' // Traditional solid card
  };

  // Combine base classes with variant-specific styling and custom classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
}

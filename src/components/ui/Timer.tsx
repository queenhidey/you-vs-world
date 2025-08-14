/**
 * Timer Component
 * 
 * Displays a countdown timer with automatic color coding based on remaining time.
 * Provides visual feedback for urgency with different styles and animations.
 */

'use client';

/**
 * Props for the Timer component
 */
interface TimerProps {
  /** Number of seconds remaining */
  timeLeft: number;
  /** Override automatic color coding with specific variant */
  variant?: 'normal' | 'warning' | 'danger' | 'expired';
  /** Size of the timer display */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the "seconds remaining" label */
  showLabel?: boolean;
}

/**
 * Timer display component with automatic styling based on time remaining
 * 
 * @param timeLeft - Seconds remaining on the timer
 * @param variant - Optional override for automatic color coding
 * @param size - Controls the size of the timer display
 * @param showLabel - Whether to show descriptive text below timer
 */
export default function Timer({ 
  timeLeft, 
  variant,
  size = 'lg',
  showLabel = true 
}: TimerProps) {
  
  /**
   * Determines the appropriate visual variant based on time remaining
   * Provides automatic color coding for urgency indication
   */
  const getVariant = () => {
    if (variant) return variant; // Use explicit variant if provided
    if (timeLeft <= 0) return 'expired';    // Time's up - critical
    if (timeLeft <= 3) return 'danger';     // Last 3 seconds - urgent
    if (timeLeft <= 5) return 'warning';    // Last 5 seconds - caution
    return 'normal';                        // Plenty of time - normal
  };

  const currentVariant = getVariant();

  // Base styling for all timer displays
  const baseClasses = 'inline-block rounded-full font-bold transition-all duration-300 text-center';
  
  // Color schemes and animations for different urgency levels
  const variantClasses = {
    normal: 'bg-green-600 text-white',                    // Safe - green
    warning: 'bg-yellow-500 text-black',                  // Caution - yellow
    danger: 'bg-red-600 text-white animate-pulse',        // Urgent - red with pulse
    expired: 'bg-red-600 text-white animate-pulse'        // Critical - red with pulse
  };

  // Size variations for different use cases
  const sizeClasses = {
    sm: 'px-4 py-2 text-2xl',
    md: 'px-6 py-3 text-4xl', 
    lg: 'px-8 py-4 text-6xl'
  };

  // Combine all styling classes
  const combinedClasses = `${baseClasses} ${variantClasses[currentVariant]} ${sizeClasses[size]}`;

  // Display either time remaining or "time's up" message
  const displayTime = timeLeft <= 0 ? '⏰ TIMES UP ⏰' : timeLeft;

  return (
    <div className="text-center">
      {/* Main timer display with optional pulsing background for expired state */}
      <div className={`${combinedClasses} ${timeLeft <= 0 ? 'relative' : ''}`}>
        {/* Animated background ring for expired timer */}
        {timeLeft <= 0 && (
          <div className="absolute -inset-2 bg-red-500 rounded-full animate-ping opacity-20"></div>
        )}
        {displayTime}
      </div>
      
      {/* Optional descriptive label */}
      {showLabel && timeLeft > 0 && (
        <p className="text-white text-lg mt-2">seconds remaining</p>
      )}
    </div>
  );
}

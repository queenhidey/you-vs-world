'use client';

interface TimerProps {
  timeLeft: number;
  variant?: 'normal' | 'warning' | 'danger' | 'expired';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function Timer({ 
  timeLeft, 
  variant,
  size = 'lg',
  showLabel = true 
}: TimerProps) {
  // Auto-determine variant based on time if not provided
  const getVariant = () => {
    if (variant) return variant;
    if (timeLeft <= 0) return 'expired';
    if (timeLeft <= 3) return 'danger';
    if (timeLeft <= 5) return 'warning';
    return 'normal';
  };

  const currentVariant = getVariant();

  const baseClasses = 'inline-block rounded-full font-bold transition-all duration-300 text-center';
  
  const variantClasses = {
    normal: 'bg-green-600 text-white',
    warning: 'bg-yellow-500 text-black',
    danger: 'bg-red-600 text-white animate-pulse',
    expired: 'bg-red-600 text-white animate-pulse'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-2xl',
    md: 'px-6 py-3 text-4xl', 
    lg: 'px-8 py-4 text-6xl'
  };

  const combinedClasses = `${baseClasses} ${variantClasses[currentVariant]} ${sizeClasses[size]}`;

  const displayTime = timeLeft <= 0 ? '⏰ TIMES UP ⏰' : timeLeft;

  return (
    <div className="text-center">
      <div className={`${combinedClasses} ${timeLeft <= 0 ? 'relative' : ''}`}>
        {timeLeft <= 0 && (
          <div className="absolute -inset-2 bg-red-500 rounded-full animate-ping opacity-20"></div>
        )}
        {displayTime}
      </div>
      {showLabel && timeLeft > 0 && (
        <p className="text-white text-lg mt-2">seconds remaining</p>
      )}
    </div>
  );
}

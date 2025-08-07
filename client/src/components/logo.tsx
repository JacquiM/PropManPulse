interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="Property Management Pulse" 
        className={`${sizeClasses[size]} rounded-lg`}
        onError={(e) => {
          // Fallback to SVG if PNG not found
          (e.target as HTMLImageElement).src = "/logo.svg";
        }}
      />
      {showText && (
        <span className={`ml-3 font-bold text-gray-900 ${textSizeClasses[size]}`}>
          Property Management Pulse
        </span>
      )}
    </div>
  );
}

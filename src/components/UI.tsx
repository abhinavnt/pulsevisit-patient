import React from 'react';
import { motion } from 'motion/react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  disabled = false,
  size = 'md'
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'custom'; 
  className?: string; 
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const baseStyle = "w-full rounded-2xl font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2";
  
  const sizeStyles = {
    sm: "py-2.5 text-sm",
    md: "py-4 text-lg",
    lg: "py-5 text-xl",
  };

  const variants = {
    primary: "bg-secondary text-white shadow-md shadow-secondary/20",
    secondary: "bg-primary text-white shadow-md shadow-primary/20",
    outline: "border-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50",
    ghost: "text-gray-500 hover:bg-gray-100",
    custom: "",
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${sizeStyles[size]} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export const Card = ({ children, className = '', onClick, ...props }: React.ComponentProps<"div">) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 ${onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const Input = ({ 
  label, 
  placeholder, 
  type = "text",
  icon: Icon
}: { 
  label?: string; 
  placeholder?: string; 
  type?: string;
  icon?: React.ElementType;
}) => (
  <div className="flex flex-col gap-2 w-full">
    {label && <label className="text-sm font-medium text-gray-600 ml-1">{label}</label>}
    <div className="relative flex items-center">
      {Icon && <Icon className="absolute left-4 text-gray-400 w-5 h-5" />}
      <input 
        type={type} 
        placeholder={placeholder}
        className={`w-full bg-white border border-gray-200 rounded-2xl py-4 ${Icon ? 'pl-12' : 'pl-4'} pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all`}
      />
    </div>
  </div>
);

export const Logo = ({ className = "w-40 h-20" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* ECG Line */}
    <path d="M20 60 H 60 L 75 20 L 100 90 L 120 40 L 135 60 H 150" stroke="#0F3D73" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    {/* House merging from the end of ECG */}
    <path d="M140 60 L 170 35 L 210 65 V 90 H 150 V 60" stroke="#1FA97A" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M170 90 V 70 H 190 V 90" stroke="#1FA97A" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Window */}
    <rect x="170" y="60" width="20" height="20" rx="4" fill="#1FA97A" />
    <path d="M180 60 V 80 M 170 70 H 190" stroke="#FFFFFF" strokeWidth="3" />
  </svg>
);

export const ScreenWrapper = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  React.useEffect(() => {
    // Scroll to top when a new screen mounts
    const container = document.getElementById('screen-container');
    if (container) {
      container.scrollTop = 0;
    }
  }, []);

  const hasBg = className.includes('bg-');

  return (
    <motion.div 
      id="screen-container"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`w-full h-full flex flex-col overflow-y-auto ${hasBg ? '' : 'bg-background'} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const TopBar = ({ title, onBack, className = '' }: { title: string; onBack?: () => void; className?: string }) => {
  return (
    <div className={`flex items-center justify-between p-6 bg-background sticky top-0 z-10 ${className}`}>
      {onBack ? (
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 active:scale-95 transition-transform">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      ) : <div className="w-10 h-10" />}
      <h1 className="text-lg font-bold text-primary">{title}</h1>
      <div className="w-10 h-10" />
    </div>
  );
};

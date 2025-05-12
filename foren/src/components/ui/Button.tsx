import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'solana';
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  className = '', 
  disabled = false,
  variant = 'primary' 
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-all duration-200 ease-in-out';
  const variantClasses = variant === 'solana' 
    ? 'text-white bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:bg-gradient-to-br focus:ring-2 focus:ring-purple-300'
    : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export { Button };
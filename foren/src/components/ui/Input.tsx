import React from 'react';

interface InputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type?: string;
  required?: boolean;
  className?: string;
  id?: string; // Optional: Adding an id for better accessibility and for connecting labels
  ariaLabel?: string; // Optional: For accessibility
}

const Input: React.FC<InputProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  required = false,
  className = '',
  id,
  ariaLabel
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      required={required}
      id={id}
      aria-label={ariaLabel}
      className={`px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${className}`}
    />
  );
};

export { Input };

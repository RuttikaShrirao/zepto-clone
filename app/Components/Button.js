'use client';

import React from 'react';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}) {
  const baseStyles =
    'font-bold rounded-lg transition-all active:scale-95 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-[#ff3269] hover:bg-[#e02657] text-white shadow-md',
    outline: 'border border-[#ff3269] text-[#ff3269] hover:bg-[#ff3269] hover:text-white',
    dark: 'bg-[#3b0066] hover:bg-[#4c0082] text-white shadow-md',
    ghost: 'hover:bg-purple-50 text-gray-700',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2',
    lg: 'text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
    >
      {children}
    </button>
  );
}

'use client';

import React from 'react';

export default function CategoryCard({
  category,
  isSelected = false,
  onClick = () => {},
  icon = '🏷️',
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all cursor-pointer ${
        isSelected
          ? 'bg-[#3b0066] text-white shadow-md'
          : 'bg-white border border-gray-200 text-gray-700 hover:bg-purple-50'
      }`}
    >
      <span>{icon}</span>
      <span>{category}</span>
    </button>
  );
}

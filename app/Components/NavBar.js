'use client';

import React, { useState } from 'react';
import { MOCK_LOCATIONS } from '../constant';

export default function NavBar({
  itemCount = 0,
  onSearch = () => {},
  onLocationChange = () => {},
  onOpenCart = () => {},
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(MOCK_LOCATIONS[0]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    setIsLocationOpen(false);
    if (onLocationChange) {
      onLocationChange(loc);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#3b0066] text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center cursor-pointer shrink-0">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#ff3269]">
            zepto
          </span>
        </div>

        {/* Desktop Location Selector (hidden on mobile) */}
        <div className="hidden sm:block relative">
          <button
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className="flex items-center gap-2 text-left bg-[#4c0082] hover:bg-[#5a009d] px-3 py-1.5 rounded-lg transition-colors text-sm cursor-pointer"
          >
            <svg
              className="w-5 h-5 text-[#ff3269] shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-300 flex items-center gap-1">
                10 Mins
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
              <span className="font-medium truncate max-w-[180px] text-xs">
                {selectedLocation}
              </span>
            </div>
          </button>

          {/* Location Dropdown */}
          {isLocationOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-2 z-50">
              <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Select Location
              </div>
              {MOCK_LOCATIONS.map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectLocation(loc)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-purple-50 transition-colors ${
                    selectedLocation === loc
                      ? 'font-semibold text-[#3b0066]'
                      : 'text-gray-700'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Search Bar (hidden on mobile) */}
        <div className="hidden sm:block flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products, brands and more..."
              className="w-full bg-white text-gray-900 placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3269] text-sm shadow-inner"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Mobile Action Controls (Location icon button & Search icon button) */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Mobile Location Icon Button */}
          <div className="relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="p-2 bg-[#4c0082] hover:bg-[#5a009d] rounded-lg transition-colors cursor-pointer"
              title="Select Location"
            >
              <svg
                className="w-5 h-5 text-[#ff3269]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {/* Mobile Location Dropdown */}
            {isLocationOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Select Location
                </div>
                {MOCK_LOCATIONS.map((loc, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectLocation(loc)}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-purple-50 transition-colors ${
                      selectedLocation === loc
                        ? 'font-semibold text-[#3b0066]'
                        : 'text-gray-700'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Search Icon Button */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="p-2 bg-[#4c0082] hover:bg-[#5a009d] rounded-lg transition-colors cursor-pointer"
            title="Search"
          >
            <svg
              className="w-5 h-5 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 bg-[#ff3269] hover:bg-[#e02657] text-white px-3 py-2 rounded-lg font-semibold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#3b0066]">
                  {itemCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </button>
        </div>

        {/* Desktop Cart Button */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-[#ff3269] hover:bg-[#e02657] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#3b0066]">
                  {itemCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar Dropdown Input */}
      {isMobileSearchOpen && (
        <div className="sm:hidden px-4 pb-3 pt-1 bg-[#3b0066] border-t border-purple-900/50">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              className="w-full bg-white text-gray-900 placeholder-gray-400 pl-9 pr-4 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3269] text-xs shadow-inner"
              autoFocus
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </header>
  );
}

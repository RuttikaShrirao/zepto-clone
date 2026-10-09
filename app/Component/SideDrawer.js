'use client';

import React from 'react';

export default function SideDrawer({
  isOpen = false,
  onClose = () => {},
  cartItems = [],
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between transform transition-transform ease-in-out duration-300">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#3b0066] text-white">
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 text-[#ff3269]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="text-lg font-bold">My Cart</h2>
              <span className="text-xs bg-[#ff3269] text-white font-semibold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#4c0082] rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 py-12">
                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-4xl">
                  🛍️
                </div>
                <h3 className="text-base font-bold text-gray-800">
                  Your Cart is Empty
                </h3>
                <p className="text-xs text-gray-500 max-w-xs">
                  Looks like you haven't added anything to your cart yet. Explore products and add them here!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-[#ff3269] hover:bg-[#e02657] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-3 flex items-center justify-between gap-3"
                  >
                    {/* Item Image & Title */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                        {item.image && item.image.startsWith('http') ? (
                          <img
                            src={item.image}
                            alt={item.title || item.name}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <span className="text-2xl">{item.image || '🛒'}</span>
                        )}
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-gray-800 truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-gray-400">{item.weight}</p>
                        <p className="text-xs font-extrabold text-gray-900 mt-1">
                          ₹{item.price * item.quantity}
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-gray-400 font-normal ml-1">
                              (₹{item.price} each)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 text-xs font-bold transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-xs font-bold text-gray-800 bg-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 text-xs font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Subtotal */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-600">Subtotal</span>
                <span className="font-extrabold text-gray-900 text-base">
                  ₹{subtotal}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Taxes and delivery charges calculated at checkout.
              </p>
              <button className="w-full bg-[#ff3269] hover:bg-[#e02657] text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95 text-sm flex items-center justify-center gap-2">
                <span>Proceed to Checkout</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

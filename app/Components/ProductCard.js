'use client';

import React from 'react';
import Button from './Button';

export default function ProductCard({
  product,
  cartQuantity = 0,
  onAddToCart = () => {},
  onUpdateQuantity = () => {},
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-md p-3 flex flex-col justify-between transition-all group">
      <div>
        {/* Product Image Container */}
        <div className="relative bg-white rounded-lg p-2 flex items-center justify-center mb-3 h-36 border border-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="h-28 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
          <span className="font-bold uppercase truncate max-w-[90px]">
            {product.category}
          </span>
          {product.rating && (
            <span className="flex items-center gap-0.5 text-amber-500 font-bold">
              ★ {product.rating.rate}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug min-h-[32px]">
          {product.title}
        </h3>
      </div>

      {/* Pricing & Add to Cart Controls */}
      <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
        <div>
          <span className="text-sm font-extrabold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {cartQuantity > 0 ? (
          <div className="flex items-center border border-[#ff3269] rounded-lg overflow-hidden bg-purple-50">
            <button
              onClick={() => onUpdateQuantity(product.id, cartQuantity - 1)}
              className="px-2 py-0.5 text-[#ff3269] font-bold text-xs hover:bg-[#ff3269] hover:text-white transition-colors"
            >
              -
            </button>
            <span className="px-2 py-0.5 text-xs font-bold text-gray-800">
              {cartQuantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(product.id, cartQuantity + 1)}
              className="px-2 py-0.5 text-[#ff3269] font-bold text-xs hover:bg-[#ff3269] hover:text-white transition-colors"
            >
              +
            </button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddToCart(product)}
          >
            ADD
          </Button>
        )}
      </div>
    </div>
  );
}

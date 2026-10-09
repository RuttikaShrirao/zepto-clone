'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import NavBar from "./Component/NavBar";
import SideDrawer from "./Component/SideDrawer";
import CategoryCard from "./Component/CategoryCard";
import ProductCard from "./Component/ProductCard";
import { API_ENDPOINTS, getCategoryIcon } from "./constant";

// Fetch functions
const fetchProducts = async () => {
  const res = await fetch(API_ENDPOINTS.PRODUCTS);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

const fetchCategories = async () => {
  const res = await fetch(API_ENDPOINTS.CATEGORIES);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  [key: string]: any;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // TanStack Query hooks
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Cart Handlers
  const handleAddToCart = (product: any) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Filter products by category and search
  const filteredProducts = products.filter((product: any) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <NavBar
        itemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={((query: string) => setSearchQuery(query)) as any}
      />

      <SideDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems as any}
        onUpdateQuantity={handleUpdateQuantity as any}
        onRemoveItem={handleRemoveItem as any}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Categories */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Categories</h2>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs sm:text-sm font-semibold text-[#ff3269] hover:underline cursor-pointer"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            <CategoryCard
              category={`All Items (${products.length})`}
              isSelected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              icon="✨"
            />
            {categories.map((cat: string) => (
              <CategoryCard
                key={cat}
                category={cat}
                isSelected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                icon={getCategoryIcon(cat)}
              />
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 capitalize">
              {selectedCategory === 'all' ? 'Featured Products' : selectedCategory}
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 p-4 h-64 animate-pulse flex flex-col justify-between"
                >
                  <div className="bg-gray-200 h-32 rounded-lg w-full" />
                  <div className="space-y-2 mt-3">
                    <div className="bg-gray-200 h-3 rounded w-3/4" />
                    <div className="bg-gray-200 h-3 rounded w-1/2" />
                  </div>
                  <div className="bg-gray-200 h-6 rounded w-full mt-2" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="p-8 text-center bg-red-50 rounded-xl border border-red-100 space-y-2">
              <p className="text-sm font-bold text-red-600">
                {error?.message || 'Failed to load products'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-xs bg-red-600 text-white font-bold px-4 py-2 rounded-lg cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-gray-100 space-y-3">
              <div className="text-4xl">🔍</div>
              <h3 className="text-base font-bold text-gray-800">No products found</h3>
              <p className="text-xs text-gray-500">
                Try searching for something else or clear category filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {filteredProducts.map((product: any) => {
                const itemInCart = cartItems.find((item) => item.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cartQuantity={itemInCart ? itemInCart.quantity : 0}
                    onAddToCart={handleAddToCart as any}
                    onUpdateQuantity={handleUpdateQuantity as any}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

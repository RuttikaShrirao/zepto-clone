'use client';

import React, { useState, useEffect } from 'react';
import NavBar from "./Component/NavBar";
import SideDrawer from "./Component/SideDrawer";
import CategoryCard from "./Component/CategoryCard";
import ProductCard from "./Component/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch Products & Categories from FakeStore API
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [resProducts, resCategories] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories'),
        ]);

        if (!resProducts.ok || !resCategories.ok) {
          throw new Error('Failed to fetch data from API');
        }

        const dataProducts: Product[] = await resProducts.json();
        const dataCategories: string[] = await resCategories.json();

        setProducts(dataProducts);
        setCategories(dataCategories);
      } catch (err: any) {
        setError(err.message || 'An error occurred while loading products');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const filteredProducts = products.filter((product) => {
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

  const getCategoryIcon = (catName: string) => {
    switch (catName.toLowerCase()) {
      case "electronics":
        return "💻";
      case "jewelery":
        return "💎";
      case "men's clothing":
        return "👔";
      case "women's clothing":
        return "👗";
      default:
        return "🏷️";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Navbar Component */}
      <NavBar
        itemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={((query: string) => setSearchQuery(query)) as any}
      />

      {/* Side Cart Drawer Component */}
      <SideDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems as any}
        onUpdateQuantity={handleUpdateQuantity as any}
        onRemoveItem={handleRemoveItem as any}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Categories Section */}
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
            {categories.map((cat) => (
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

        {/* Products Grid Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 capitalize">
              {selectedCategory === 'all' ? 'Featured Products' : selectedCategory}
            </h2>
          </div>

          {loading ? (
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
          ) : error ? (
            <div className="p-8 text-center bg-red-50 rounded-xl border border-red-100 space-y-2">
              <p className="text-sm font-bold text-red-600">{error}</p>
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
              {filteredProducts.map((product) => {
                const inCart = cartItems.find((item) => item.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product as any}
                    cartQuantity={inCart ? inCart.quantity : 0}
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

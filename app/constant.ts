// API Base URLs
export const API_ENDPOINTS = {
  PRODUCTS: 'https://fakestoreapi.com/products',
  CATEGORIES: 'https://fakestoreapi.com/products/categories',
};

// Mock Delivery Locations
export const MOCK_LOCATIONS = [
  'Home - Indiranagar, Bengaluru',
  'Work - Koramangala, Bengaluru',
  'Other - HSR Layout, Bengaluru',
];

// Default Category Icon Mapping
export const getCategoryIcon = (categoryName: string): string => {
  if (!categoryName) return '🏷️';
  switch (categoryName.toLowerCase()) {
    case 'electronics':
      return '💻';
    case 'jewelery':
      return '💎';
    case "men's clothing":
      return '👔';
    case "women's clothing":
      return '👗';
    default:
      return '🏷️';
  }
};

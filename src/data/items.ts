// This file is now deprecated - data is fetched from the API
// Keeping the interface for backward compatibility

export interface Item {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  condition: string;
  size: string;
  category: string;
  description: string;
  material: string;
  color: string;
  availability: 'store' | 'merchant';
  location?: string;
  seller: {
    name: string;
    rating: number;
    reviews: number;
  };
  measurements?: {
    chest?: string;
    waist?: string;
    length?: string;
    shoulders?: string;
  };
}

// Sample data for fallback - will be replaced by API data
export const items: Item[] = [];
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
  location?: string; // Location for merchant items
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

export const items: Item[] = [
  {
    id: 1,
    name: 'Designer Silk Blouse',
    brand: 'Zara',
    price: 28,
    originalPrice: 89,
    image: ' ',
    images: [
 
    ],
    condition: 'Like New',
    size: 'S',
    category: 'Women\'s Fashion',
    description: 'Elegant silk blouse perfect for both office and evening wear. Features a classic cut with subtle shimmer that catches the light beautifully.',
    material: '100% Silk',
    color: 'Cream',
    availability: 'store',
    seller: {
      name: 'Sarah M.',
      rating: 4.8,
      reviews: 127
    },
    measurements: {
      chest: '34"',
      length: '24"',
      shoulders: '14"'
    }
  },
  {
    id: 2,
    name: 'Vintage Denim Jacket',
    brand: 'Levi\'s',
    price: 45,
    originalPrice: 120,
    image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1021293/pexels-photo-1021293.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    condition: 'Good',
    size: 'M',
    category: 'Men\'s Fashion',
    description: 'Classic Levi\'s denim jacket with authentic vintage wash. Perfect for layering and adds instant cool to any outfit.',
    material: '100% Cotton Denim',
    color: 'Blue',
    availability: 'merchant',
    location: 'Downtown Fashion District, Los Angeles',
    seller: {
      name: 'Mike R.',
      rating: 4.9,
      reviews: 89
    },
    measurements: {
      chest: '40"',
      length: '26"',
      shoulders: '18"'
    }
  },
  {
    id: 3,
    name: 'Cashmere Sweater',
    brand: 'Everlane',
    price: 35,
    originalPrice: 110,
    image: 'https://images.pexels.com/photos/1021293/pexels-photo-1021293.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1021293/pexels-photo-1021293.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    condition: 'Excellent',
    size: 'L',
    category: 'Women\'s Fashion',
    description: 'Luxuriously soft cashmere sweater in a timeless design. Perfect for cozy days and sophisticated styling.',
    material: '100% Cashmere',
    color: 'Beige',
    availability: 'store',
    seller: {
      name: 'Emma L.',
      rating: 5.0,
      reviews: 203
    },
    measurements: {
      chest: '42"',
      length: '25"',
      shoulders: '16"'
    }
  },
  {
    id: 4,
    name: 'Linen Summer Dress',
    brand: 'Reformation',
    price: 42,
    originalPrice: 150,
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1021293/pexels-photo-1021293.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    condition: 'Like New',
    size: 'XS',
    category: 'Women\'s Fashion',
    description: 'Breezy linen dress perfect for summer days. Features a flattering A-line silhouette and adjustable straps.',
    material: '100% Linen',
    color: 'White',
    availability: 'merchant',
    location: 'SoHo Boutique District, New York',
    seller: {
      name: 'Jessica K.',
      rating: 4.7,
      reviews: 156
    },
    measurements: {
      chest: '32"',
      waist: '28"',
      length: '36"'
    }
  },
  {
    id: 5,
    name: 'Wool Coat',
    brand: 'Max Mara',
    price: 85,
    originalPrice: 350,
    image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1021293/pexels-photo-1021293.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    condition: 'Very Good',
    size: 'M',
    category: 'Women\'s Fashion',
    description: 'Elegant wool coat from Max Mara. Classic design that never goes out of style, perfect for professional settings.',
    material: '90% Wool, 10% Cashmere',
    color: 'Camel',
    availability: 'store',
    seller: {
      name: 'Anna P.',
      rating: 4.9,
      reviews: 78
    },
    measurements: {
      chest: '38"',
      length: '42"',
      shoulders: '15"'
    }
  },
  {
    id: 6,
    name: 'Silk Scarf',
    brand: 'Hermès',
    price: 65,
    originalPrice: 220,
    image: 'https://images.pexels.com/photos/35185/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/35185/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1021293/pexels-photo-1021293.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    condition: 'Excellent',
    size: 'One Size',
    category: 'Accessories',
    description: 'Authentic Hermès silk scarf with beautiful floral pattern. A timeless accessory that elevates any outfit.',
    material: '100% Silk',
    color: 'Multi',
    availability: 'merchant',
    location: 'Luxury Consignment, Beverly Hills',
    seller: {
      name: 'Claire D.',
      rating: 5.0,
      reviews: 45
    }
  }
];
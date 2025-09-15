const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateItemData {
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image?: string;
  images?: string[];
  condition: string;
  size: string;
  category: string;
  description: string;
  material: string;
  color: string;
  availability: 'store' | 'merchant';
  location?: string;
  sellerName?: string;
  sellerRating?: number;
  sellerReviews?: number;
  measurements?: {
    chest?: string;
    waist?: string;
    length?: string;
    shoulders?: string;
  };
}

export interface ItemFilters {
  category?: string;
  brand?: string;
  size?: string;
  condition?: string;
  availability?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface AdminStats {
  totalItems: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Items API
  async getItems(filters: ItemFilters = {}): Promise<Item[]> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    const endpoint = queryString ? `/items?${queryString}` : '/items';
    
    return this.request<Item[]>(endpoint);
  }

  async getItem(id: number): Promise<Item> {
    return this.request<Item>(`/items/${id}`);
  }

  async createItem(data: CreateItemData): Promise<{ id: number; message: string }> {
    return this.request<{ id: number; message: string }>('/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createItemWithFiles(data: FormData): Promise<{ id: number; message: string }> {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: 'POST',
      body: data,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async bulkCreateItems(items: CreateItemData[]): Promise<{ message: string; successCount: number; totalItems: number; errors: any[] }> {
    return this.request<{ message: string; successCount: number; totalItems: number; errors: any[] }>('/items/bulk', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
  }

  async updateItem(id: number, data: Partial<CreateItemData>): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteItem(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/items/${id}`, {
      method: 'DELETE',
    });
  }

  // Categories and Brands API
  async getCategories(): Promise<string[]> {
    return this.request<string[]>('/categories');
  }

  async getBrands(): Promise<string[]> {
    return this.request<string[]>('/brands');
  }

  // Admin API
  async getAdminStats(): Promise<AdminStats> {
    return this.request<AdminStats>('/admin/stats');
  }
}

export const apiService = new ApiService();
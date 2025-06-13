import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Upload, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Download,
  Eye,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Building2,
  MapPin,
  Save,
  X
} from 'lucide-react';
import { items } from '../data/items';

interface BulkItem {
  id?: number;
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'items' | 'bulk-upload' | 'users' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bulkItems, setBulkItems] = useState<BulkItem[]>([]);
  const [csvData, setCsvData] = useState('');
  const [showBulkForm, setShowBulkForm] = useState(false);

  // Mock admin stats
  const stats = {
    totalItems: items.length,
    totalUsers: 1247,
    totalSales: 89234,
    monthlyRevenue: 45678
  };

  const categories = ['All', ...new Set(items.map(item => item.category))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCsvData(text);
        parseCSV(text);
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (csvText: string) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const parsedItems: BulkItem[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim());
        const item: BulkItem = {
          name: values[0] || '',
          brand: values[1] || '',
          price: parseFloat(values[2]) || 0,
          originalPrice: parseFloat(values[3]) || 0,
          image: values[4] || 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
          images: [values[4] || 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'],
          condition: values[5] || 'Good',
          size: values[6] || 'M',
          category: values[7] || 'Women\'s Fashion',
          description: values[8] || '',
          material: values[9] || '',
          color: values[10] || '',
          availability: (values[11] as 'store' | 'merchant') || 'store',
          location: values[12] || '',
          seller: {
            name: values[13] || 'Admin',
            rating: parseFloat(values[14]) || 5.0,
            reviews: parseInt(values[15]) || 0
          }
        };
        parsedItems.push(item);
      }
    }
    setBulkItems(parsedItems);
  };

  const addSingleItem = () => {
    const newItem: BulkItem = {
      name: '',
      brand: '',
      price: 0,
      originalPrice: 0,
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: ['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'],
      condition: 'Good',
      size: 'M',
      category: 'Women\'s Fashion',
      description: '',
      material: '',
      color: '',
      availability: 'store',
      seller: {
        name: 'Admin',
        rating: 5.0,
        reviews: 0
      }
    };
    setBulkItems([...bulkItems, newItem]);
  };

  const updateBulkItem = (index: number, field: string, value: any) => {
    const updatedItems = [...bulkItems];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      updatedItems[index] = {
        ...updatedItems[index],
        [parent]: {
          ...updatedItems[index][parent as keyof BulkItem],
          [child]: value
        }
      };
    } else {
      updatedItems[index] = { ...updatedItems[index], [field]: value };
    }
    setBulkItems(updatedItems);
  };

  const removeBulkItem = (index: number) => {
    setBulkItems(bulkItems.filter((_, i) => i !== index));
  };

  const saveBulkItems = () => {
    console.log('Saving bulk items:', bulkItems);
    // Here you would typically send the data to your backend
    alert(`Successfully added ${bulkItems.length} items!`);
    setBulkItems([]);
  };

  const downloadTemplate = () => {
    const template = `name,brand,price,originalPrice,image,condition,size,category,description,material,color,availability,location,sellerName,sellerRating,sellerReviews
Designer Silk Blouse,Zara,28,89,https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg,Like New,S,Women's Fashion,Elegant silk blouse perfect for office wear,100% Silk,Cream,store,,Sarah M.,4.8,127
Vintage Denim Jacket,Levi's,45,120,https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg,Good,M,Men's Fashion,Classic vintage denim jacket,100% Cotton,Blue,merchant,Downtown Fashion District,Mike R.,4.9,89`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_upload_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getAvailabilityInfo = (availability: 'store' | 'merchant') => {
    if (availability === 'store') {
      return {
        icon: Building2,
        text: 'Available in Store',
        color: 'bg-blue-100 text-blue-700',
        iconColor: 'text-blue-600'
      };
    } else {
      return {
        icon: MapPin,
        text: 'With Merchant',
        color: 'bg-orange-100 text-orange-700',
        iconColor: 'text-orange-600'
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your 9ach marketplace</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex border-b overflow-x-auto">
            {[
              { key: 'overview', label: 'Overview', icon: TrendingUp },
              { key: 'items', label: 'Items', icon: Package },
              { key: 'bulk-upload', label: 'Bulk Upload', icon: Upload },
              { key: 'users', label: 'Users', icon: Users },
              { key: 'analytics', label: 'Analytics', icon: DollarSign }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === key
                    ? 'text-[#f4a622] border-b-2 border-[#f4a622]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Items</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalItems}</p>
                    </div>
                    <Package className="text-blue-600" size={32} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="text-green-600" size={32} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Sales</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalSales.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="text-purple-600" size={32} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="text-[#f4a622]" size={32} />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('bulk-upload')}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="text-[#f4a622]" size={24} />
                    <div className="text-left">
                      <p className="font-medium">Bulk Upload Items</p>
                      <p className="text-sm text-gray-600">Add multiple items at once</p>
                    </div>
                  </button>

                  <Link
                    to="/sell"
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="text-green-600" size={24} />
                    <div className="text-left">
                      <p className="font-medium">Add Single Item</p>
                      <p className="text-sm text-gray-600">List a new item</p>
                    </div>
                  </Link>

                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <TrendingUp className="text-blue-600" size={24} />
                    <div className="text-left">
                      <p className="font-medium">View Analytics</p>
                      <p className="text-sm text-gray-600">Check performance metrics</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'items' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>

                    <Link
                      to="/sell"
                      className="flex items-center gap-2 px-4 py-2 bg-[#f4a622] text-[#001e28] rounded-lg hover:bg-[#e6951f] transition-colors"
                    >
                      <Plus size={20} />
                      Add Item
                    </Link>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredItems.map((item) => {
                        const availabilityInfo = getAvailabilityInfo(item.availability);
                        const AvailabilityIcon = availabilityInfo.icon;
                        
                        return (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded-lg mr-4"
                                />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                  <div className="text-sm text-gray-500">{item.brand}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">${item.price}</div>
                              <div className="text-sm text-gray-500 line-through">${item.originalPrice}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`relative inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${availabilityInfo.color} group/availability`}>
                                <AvailabilityIcon size={12} className={availabilityInfo.iconColor} />
                                <span>{availabilityInfo.text}</span>
                                
                                {item.availability === 'merchant' && item.location && (
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/availability:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                    📍 {item.location}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                item.condition === 'Like New' ? 'bg-green-100 text-green-800' :
                                item.condition === 'Excellent' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {item.condition}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <Link
                                  to={`/item/${item.id}`}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Eye size={16} />
                                </Link>
                                <button className="text-gray-600 hover:text-gray-900">
                                  <Edit size={16} />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bulk-upload' && (
            <div className="space-y-6">
              {/* Upload Options */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Bulk Upload Items</h2>
                <p className="text-gray-600 mb-6">Upload multiple items at once using CSV or add them manually.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                    <p className="text-gray-600 mb-4">Upload CSV File</p>
                    <label className="inline-block px-4 py-2 bg-[#f4a622] text-[#001e28] rounded-lg cursor-pointer hover:bg-[#e6951f] transition-colors">
                      Choose File
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleCSVUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-6 text-center">
                    <Download className="mx-auto mb-4 text-gray-400" size={48} />
                    <p className="text-gray-600 mb-4">Download Template</p>
                    <button
                      onClick={downloadTemplate}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Download CSV
                    </button>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-6 text-center">
                    <Plus className="mx-auto mb-4 text-gray-400" size={48} />
                    <p className="text-gray-600 mb-4">Add Manually</p>
                    <button
                      onClick={addSingleItem}
                      className="px-4 py-2 bg-[#001e28] text-white rounded-lg hover:bg-[#003544] transition-colors"
                    >
                      Add Item
                    </button>
                  </div>
                </div>

                {bulkItems.length > 0 && (
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-600">{bulkItems.length} items ready to upload</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setBulkItems([])}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={saveBulkItems}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save size={16} />
                        Save All Items
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bulk Items List */}
              {bulkItems.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Items to Upload</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {bulkItems.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Item #{index + 1}</h4>
                          <button
                            onClick={() => removeBulkItem(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          <input
                            type="text"
                            placeholder="Item Name"
                            value={item.name}
                            onChange={(e) => updateBulkItem(index, 'name', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                          />
                          
                          <input
                            type="text"
                            placeholder="Brand"
                            value={item.brand}
                            onChange={(e) => updateBulkItem(index, 'brand', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                          />
                          
                          <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => updateBulkItem(index, 'price', parseFloat(e.target.value) || 0)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                          />
                          
                          <input
                            type="number"
                            placeholder="Original Price"
                            value={item.originalPrice}
                            onChange={(e) => updateBulkItem(index, 'originalPrice', parseFloat(e.target.value) || 0)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                          />
                          
                          <select
                            value={item.category}
                            onChange={(e) => updateBulkItem(index, 'category', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                          >
                            <option value="Women's Fashion">Women's Fashion</option>
                            <option value="Men's Fashion">Men's Fashion</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Bags">Bags</option>
                          </select>
                          
                          <select
                            value={item.size}
                            onChange={(e) => updateBulkItem(index, 'size', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                          >
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="One Size">One Size</option>
                          </select>
                          
                          <select
                            value={item.condition}
                            onChange={(e) => updateBulkItem(index, 'condition', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                          >
                            <option value="Like New">Like New</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Very Good">Very Good</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                          </select>
                          
                          <select
                            value={item.availability}
                            onChange={(e) => updateBulkItem(index, 'availability', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                          >
                            <option value="store">Store</option>
                            <option value="merchant">Merchant</option>
                          </select>
                          
                          {item.availability === 'merchant' && (
                            <input
                              type="text"
                              placeholder="Location"
                              value={item.location || ''}
                              onChange={(e) => updateBulkItem(index, 'location', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                            />
                          )}
                          
                          <input
                            type="text"
                            placeholder="Color"
                            value={item.color}
                            onChange={(e) => updateBulkItem(index, 'color', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                          />
                          
                          <input
                            type="text"
                            placeholder="Material"
                            value={item.material}
                            onChange={(e) => updateBulkItem(index, 'material', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                          />
                          
                          <input
                            type="url"
                            placeholder="Image URL"
                            value={item.image}
                            onChange={(e) => updateBulkItem(index, 'image', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622] md:col-span-2"
                          />
                        </div>
                        
                        <textarea
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateBulkItem(index, 'description', e.target.value)}
                          rows={2}
                          className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a622] resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <p className="text-gray-600">User management features coming soon...</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Analytics & Reports</h2>
              <p className="text-gray-600">Analytics dashboard coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
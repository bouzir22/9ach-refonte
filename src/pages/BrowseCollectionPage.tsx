import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, Grid, List, SlidersHorizontal, Building2, MapPin } from 'lucide-react';
import { items } from '../data/items';

const BrowseCollectionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', ...new Set(items.map(item => item.category))];
  const brands = ['All', ...new Set(items.map(item => item.brand))];
  const sizes = ['All', ...new Set(items.map(item => item.size))];
  const conditions = ['All', ...new Set(items.map(item => item.condition))];
  const availabilities = ['All', 'Store', 'Merchant'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || item.brand === selectedBrand;
    const matchesSize = selectedSize === 'All' || item.size === selectedSize;
    const matchesCondition = selectedCondition === 'All' || item.condition === selectedCondition;
    const matchesAvailability = selectedAvailability === 'All' || 
                               (selectedAvailability === 'Store' && item.availability === 'store') ||
                               (selectedAvailability === 'Merchant' && item.availability === 'merchant');
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesBrand && matchesSize && matchesCondition && matchesAvailability && matchesPrice;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'brand':
        return a.brand.localeCompare(b.brand);
      default:
        return b.id - a.id; // newest first
    }
  });

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Collection</h1>
          <p className="text-gray-600">Discover unique pre-loved fashion pieces</p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search items, brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="brand">Brand A-Z</option>
              </select>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-600'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-600'}`}
                >
                  <List size={20} />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <SlidersHorizontal size={20} />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 space-y-6`}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Filters</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Condition Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {availabilities.map(availability => (
                    <option key={availability} value={availability}>{availability}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedBrand('All');
                  setSelectedSize('All');
                  setSelectedCondition('All');
                  setSelectedAvailability('All');
                  setPriceRange([0, 200]);
                  setSearchTerm('');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Items Grid/List */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">{sortedItems.length} items found</p>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedItems.map((item) => {
                  const availabilityInfo = getAvailabilityInfo(item.availability);
                  const AvailabilityIcon = availabilityInfo.icon;
                  
                  return (
                    <Link
                      key={item.id}
                      to={`/item/${item.id}`}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-square relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Availability indicator */}
                        <div className="absolute top-3 left-3">
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${availabilityInfo.color} backdrop-blur-sm`}>
                            <AvailabilityIcon size={12} className={availabilityInfo.iconColor} />
                            <span>{availabilityInfo.text}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.brand}</p>
                          </div>
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{item.size}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="font-bold">${item.price}</span>
                            <span className="text-gray-500 text-sm line-through ml-2">${item.originalPrice}</span>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {item.condition}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedItems.map((item) => {
                  const availabilityInfo = getAvailabilityInfo(item.availability);
                  const AvailabilityIcon = availabilityInfo.icon;
                  
                  return (
                    <Link
                      key={item.id}
                      to={`/item/${item.id}`}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex"
                    >
                      <div className="w-32 h-32 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Availability indicator */}
                        <div className="absolute top-2 left-2">
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${availabilityInfo.color} backdrop-blur-sm`}>
                            <AvailabilityIcon size={10} className={availabilityInfo.iconColor} />
                            <span className="hidden sm:inline">{availabilityInfo.text}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-gray-600">{item.brand}</p>
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-lg">${item.price}</span>
                              <span className="text-gray-500 line-through">${item.originalPrice}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{item.size}</span>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                {item.condition}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {sortedItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedBrand('All');
                    setSelectedSize('All');
                    setSelectedCondition('All');
                    setSelectedAvailability('All');
                    setPriceRange([0, 200]);
                    setSearchTerm('');
                  }}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCollectionPage;
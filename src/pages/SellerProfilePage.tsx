import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Calendar, MessageCircle, Shield, Package, Eye, Edit, Trash2 } from 'lucide-react';

interface SellerItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  condition: string;
  size: string;
  status: 'available' | 'sold' | 'pending';
  listedDate: string;
  views: number;
  likes: number;
}

const SellerProfilePage = () => {
  const { sellerId } = useParams();
  const [activeTab, setActiveTab] = useState<'available' | 'sold' | 'all'>('available');
  const [isOwnProfile] = useState(sellerId === 'me'); // Simulate checking if this is the current user's profile

  const sellerInfo = {
    id: 1,
    name: 'Sarah Mitchell',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Los Angeles, CA',
    joinDate: 'January 2023',
    rating: 4.8,
    totalReviews: 127,
    totalSales: 89,
    responseRate: '98%',
    responseTime: '< 2 hours',
    bio: 'Fashion lover sharing my curated collection of designer and vintage pieces. All items are carefully maintained and authentically described.',
    verified: true
  };

  const sellerItems: SellerItem[] = [
    {
      id: 1,
      name: 'Designer Silk Blouse',
      brand: 'Zara',
      price: 28,
      originalPrice: 89,
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
      condition: 'Like New',
      size: 'S',
      status: 'available',
      listedDate: '2024-01-10',
      views: 45,
      likes: 12
    },
    {
      id: 2,
      name: 'Vintage Leather Jacket',
      brand: 'Mango',
      price: 65,
      originalPrice: 150,
      image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=400',
      condition: 'Excellent',
      size: 'M',
      status: 'sold',
      listedDate: '2024-01-05',
      views: 89,
      likes: 23
    },
    {
      id: 3,
      name: 'Cashmere Sweater',
      brand: 'Everlane',
      price: 35,
      originalPrice: 110,
      image: 'https://images.pexels.com/photos/1021293/pexels-photo-1021293.jpeg?auto=compress&cs=tinysrgb&w=400',
      condition: 'Very Good',
      size: 'L',
      status: 'pending',
      listedDate: '2024-01-08',
      views: 32,
      likes: 8
    },
    {
      id: 4,
      name: 'Summer Dress',
      brand: 'Reformation',
      price: 42,
      originalPrice: 150,
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400',
      condition: 'Like New',
      size: 'XS',
      status: 'available',
      listedDate: '2024-01-12',
      views: 67,
      likes: 15
    },
    {
      id: 5,
      name: 'Wool Coat',
      brand: 'Max Mara',
      price: 85,
      originalPrice: 350,
      image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=400',
      condition: 'Excellent',
      size: 'M',
      status: 'sold',
      listedDate: '2023-12-20',
      views: 156,
      likes: 34
    }
  ];

  const reviews = [
    {
      id: 1,
      buyer: 'Emma K.',
      rating: 5,
      comment: 'Beautiful item exactly as described! Fast shipping and great communication.',
      date: '2024-01-15',
      item: 'Vintage Leather Jacket'
    },
    {
      id: 2,
      buyer: 'Lisa M.',
      rating: 5,
      comment: 'Perfect condition and fits great. Sarah was very responsive to my questions.',
      date: '2024-01-10',
      item: 'Wool Coat'
    },
    {
      id: 3,
      buyer: 'Jennifer R.',
      rating: 4,
      comment: 'Good quality item, minor wear as mentioned. Happy with the purchase.',
      date: '2024-01-08',
      item: 'Designer Silk Blouse'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = activeTab === 'all' 
    ? sellerItems 
    : sellerItems.filter(item => item.status === activeTab);

  const availableItems = sellerItems.filter(item => item.status === 'available').length;
  const soldItems = sellerItems.filter(item => item.status === 'sold').length;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seller Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={sellerInfo.avatar}
                alt={sellerInfo.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {sellerInfo.verified && (
                <div className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full">
                  <Shield size={16} />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                <h1 className="text-3xl font-bold text-gray-900">{sellerInfo.name}</h1>
                {sellerInfo.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    Verified
                  </span>
                )}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600 mb-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{sellerInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Selling since {sellerInfo.joinDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span>{sellerInfo.rating} ({sellerInfo.totalReviews} reviews)</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 max-w-2xl">{sellerInfo.bio}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#001e28]">{sellerInfo.totalSales}</div>
                  <div className="text-sm text-gray-600">Total Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#001e28]">{availableItems}</div>
                  <div className="text-sm text-gray-600">Available Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#001e28]">{sellerInfo.responseRate}</div>
                  <div className="text-sm text-gray-600">Response Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#001e28]">{sellerInfo.responseTime}</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
              </div>
              
              {!isOwnProfile && (
                <button className="bg-[#f4a622] text-[#001e28] px-8 py-3 rounded-lg font-semibold hover:bg-[#e6951f] transition-colors flex items-center gap-2 mx-auto md:mx-0">
                  <MessageCircle size={20} />
                  Message Seller
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex border-b">
            {[
              { key: 'available', label: `Available (${availableItems})` },
              { key: 'sold', label: `Sold (${soldItems})` },
              { key: 'all', label: `All Items (${sellerItems.length})` }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === key
                    ? 'text-[#f4a622] border-b-2 border-[#f4a622]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                
                {isOwnProfile && (
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                      <Edit size={14} />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-600">{item.brand}</p>
                  </div>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{item.size}</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">${item.price}</span>
                    <span className="text-gray-500 text-sm line-through">${item.originalPrice}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.condition === 'Like New' ? 'bg-green-100 text-green-700' :
                    item.condition === 'Excellent' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.condition}
                  </span>
                </div>
                
                {isOwnProfile && (
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Eye size={12} />
                      <span>{item.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>❤️ {item.likes}</span>
                    </div>
                    <span>Listed {new Date(item.listedDate).toLocaleDateString()}</span>
                  </div>
                )}
                
                {item.status === 'available' && !isOwnProfile && (
                  <button className="w-full bg-[#001e28] text-white py-2 rounded-lg text-sm hover:bg-[#003544] transition-colors">
                    View Details
                  </button>
                )}
                
                {item.status === 'sold' && (
                  <div className="text-center py-2 text-gray-500 text-sm">
                    Sold on {new Date(item.listedDate).toLocaleDateString()}
                  </div>
                )}
                
                {item.status === 'pending' && (
                  <div className="text-center py-2 text-yellow-600 text-sm">
                    Sale Pending
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        {!isOwnProfile && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews ({reviews.length})</h2>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{review.buyer.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{review.buyer}</p>
                        <p className="text-xs text-gray-500">Purchased {review.item}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfilePage;
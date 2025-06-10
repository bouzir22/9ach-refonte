import React, { useState } from 'react';
import { User, Package, Heart, Settings, Star, Calendar, MapPin, Edit3, Camera } from 'lucide-react';

interface PurchaseHistoryItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  purchaseDate: string;
  status: 'delivered' | 'shipped' | 'processing';
  seller: string;
  rating?: number;
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [userProfile, setUserProfile] = useState({
    name: 'Jessica Thompson',
    email: 'jessica.thompson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: 'March 2023',
    bio: 'Fashion enthusiast who loves sustainable shopping and unique vintage finds.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  });

  const purchaseHistory: PurchaseHistoryItem[] = [
    {
      id: 1,
      name: 'Designer Silk Blouse',
      brand: 'Zara',
      price: 28,
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
      purchaseDate: '2024-01-15',
      status: 'delivered',
      seller: 'Sarah M.',
      rating: 5
    },
    {
      id: 2,
      name: 'Vintage Denim Jacket',
      brand: 'Levi\'s',
      price: 45,
      image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=400',
      purchaseDate: '2024-01-10',
      status: 'delivered',
      seller: 'Mike R.',
      rating: 4
    },
    {
      id: 3,
      name: 'Cashmere Sweater',
      brand: 'Everlane',
      price: 35,
      image: 'https://images.pexels.com/photos/1021293/pexels-photo-1021293.jpeg?auto=compress&cs=tinysrgb&w=400',
      purchaseDate: '2024-01-05',
      status: 'shipped',
      seller: 'Emma L.'
    },
    {
      id: 4,
      name: 'Wool Coat',
      brand: 'Max Mara',
      price: 85,
      image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=400',
      purchaseDate: '2023-12-28',
      status: 'processing',
      seller: 'Anna P.'
    }
  ];

  const wishlistItems = [
    {
      id: 5,
      name: 'Silk Scarf',
      brand: 'Hermès',
      price: 65,
      image: 'https://images.pexels.com/photos/35185/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Claire D.'
    },
    {
      id: 6,
      name: 'Leather Handbag',
      brand: 'Coach',
      price: 120,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Maria K.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleProfileUpdate = (field: string, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const totalSpent = purchaseHistory.reduce((sum, item) => sum + item.price, 0);
  const totalOrders = purchaseHistory.length;
  const avgRating = purchaseHistory
    .filter(item => item.rating)
    .reduce((sum, item) => sum + (item.rating || 0), 0) / purchaseHistory.filter(item => item.rating).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-2 right-2 bg-[#f4a622] text-white p-2 rounded-full hover:bg-[#e6951f] transition-colors">
                <Camera size={16} />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{userProfile.name}</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-gray-500 hover:text-[#f4a622] transition-colors"
                >
                  <Edit3 size={20} />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Member since {userProfile.joinDate}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 max-w-2xl">{userProfile.bio}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#001e28]">{totalOrders}</div>
                  <div className="text-sm text-gray-600">Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#001e28]">${totalSpent}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#001e28] flex items-center justify-center gap-1">
                    {avgRating.toFixed(1)}
                    <Star size={16} className="text-yellow-400 fill-current" />
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex border-b">
            {[
              { key: 'profile', label: 'Profile', icon: User },
              { key: 'orders', label: 'Purchase History', icon: Package },
              { key: 'wishlist', label: 'Wishlist', icon: Heart },
              { key: 'settings', label: 'Settings', icon: Settings }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
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
        <div className="bg-white rounded-lg shadow-sm p-8">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
              
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={userProfile.name}
                      onChange={(e) => handleProfileUpdate('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => handleProfileUpdate('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={userProfile.phone}
                      onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={userProfile.location}
                      onChange={(e) => handleProfileUpdate('location', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a622]"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={userProfile.bio}
                      onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a622] resize-none"
                    />
                  </div>
                  
                  <div className="md:col-span-2 flex gap-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-[#f4a622] text-white rounded-lg hover:bg-[#e6951f] transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900">{userProfile.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{userProfile.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{userProfile.phone}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-gray-900">{userProfile.location}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <p className="text-gray-900">{userProfile.bio}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Purchase History</h2>
              
              <div className="space-y-4">
                {purchaseHistory.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.brand}</p>
                            <p className="text-xs text-gray-500">Sold by {item.seller}</p>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-lg">${item.price}</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            Purchased on {new Date(item.purchaseDate).toLocaleDateString()}
                          </p>
                          
                          {item.rating && (
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-gray-600">Your rating:</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={i < item.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {item.status === 'delivered' && !item.rating && (
                          <div className="mt-3 flex gap-2">
                            <button className="px-4 py-2 bg-[#f4a622] text-white rounded-lg text-sm hover:bg-[#e6951f] transition-colors">
                              Rate Item
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                              Buy Again
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Wishlist ({wishlistItems.length} items)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                      <p className="text-xs text-gray-500 mb-3">Sold by {item.seller}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">${item.price}</span>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-[#001e28] text-white rounded-lg text-sm hover:bg-[#003544] transition-colors">
                            Add to Cart
                          </button>
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Heart size={16} className="fill-current" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Email notifications for new messages</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Order status updates</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span>Marketing emails</span>
                    </label>
                  </div>
                </div>
                
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold mb-4">Privacy</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Show my profile to other users</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span>Allow others to see my purchase history</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                  <div className="space-y-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Change Password
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
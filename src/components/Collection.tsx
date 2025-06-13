import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowRight, Sparkles, Building2, MapPin } from 'lucide-react';
import { useItems } from '../hooks/useItems';

const Collection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const { items, loading, error } = useItems();
  const displayItems = items.slice(0, 6);

  const getAlternateImages = (index: number) => {
    const item = displayItems[index];
    return item?.images?.slice(1, 4) || [];
  };

  const handleMouseEnter = (index: number) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    
    const timeout = setTimeout(() => {
      setHoveredIndex(index);
    }, 100);
    
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoveredIndex(null);
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

  if (loading) {
    return (
      <section id="collection" className="my-5 container mx-auto px-4">
        <h2 className="text-center mb-12 text-4xl font-bold">Preloved Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md animate-pulse">
              <div className="h-72 bg-gray-200 rounded-t-xl"></div>
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="collection" className="my-5 container mx-auto px-4">
        <h2 className="text-center mb-12 text-4xl font-bold">Preloved Collection</h2>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Error loading items: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="collection" className="my-5 container mx-auto px-4">
      <h2 className="text-center mb-12 text-4xl font-bold">Preloved Collection</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item, index) => {
          const availabilityInfo = getAvailabilityInfo(item.availability);
          const AvailabilityIcon = availabilityInfo.icon;
          
          return (
            <div 
              className="col" 
              key={item.id}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="card h-full shadow-md border-0 rounded-xl overflow-hidden bg-white group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={item.image} 
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ${hoveredIndex === index ? 'opacity-0 scale-110' : 'opacity-100 scale-100'} group-hover:scale-110`}
                    alt={item.name}
                  />
                  
                  {hoveredIndex === index && getAlternateImages(index).length > 0 && (
                    <div className="flex h-full">
                      {getAlternateImages(index).map((altImg, i) => (
                        <img
                          key={`${index}-${i}`}
                          src={altImg}
                          className="object-cover h-full transition-transform duration-500 hover:scale-105"
                          style={{
                            width: '33.33%',
                            borderRight: i < 2 ? '2px solid white' : 'none'
                          }}
                          alt={`Alternate view ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Availability indicator with location hover */}
                  <div className="absolute top-3 left-3">
                    <div className={`relative flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${availabilityInfo.color} backdrop-blur-sm group/availability`}>
                      <AvailabilityIcon size={12} className={availabilityInfo.iconColor} />
                      <span>{availabilityInfo.text}</span>
                      
                      {/* Location tooltip for merchant items */}
                      {item.availability === 'merchant' && item.location && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/availability:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          📍 {item.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Overlay with quick actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link 
                      to={`/item/${item.id}`}
                      className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:scale-105"
                    >
                      <Eye size={18} />
                      Quick View
                    </Link>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#001e28] transition-colors">{item.name}</h3>
                      <p className="text-sm text-gray-600 font-medium">{item.brand}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full border">{item.size}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm line-through">${item.originalPrice}</span>
                      <span className="text-xl font-bold text-gray-900">${item.price}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                      </span>
                    </div>
                  </div>

                  {/* Availability and Condition in same row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`relative flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${availabilityInfo.color} group/availability-card`}>
                      <AvailabilityIcon size={12} className={availabilityInfo.iconColor} />
                      <span>{availabilityInfo.text}</span>
                      
                      {/* Location tooltip for merchant items */}
                      {item.availability === 'merchant' && item.location && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/availability-card:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          📍 {item.location}
                        </div>
                      )}
                    </div>
                    
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      item.condition === 'Like New' ? 'bg-emerald-100 text-emerald-700' :
                      item.condition === 'Excellent' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.condition}
                    </span>
                  </div>
                </div>
                
                <div className="px-5 pb-5">
                  <Link 
                    to={`/item/${item.id}`}
                    className="group/btn relative w-full block text-center py-3 bg-gradient-to-r from-[#001e28] to-[#003544] text-white rounded-xl font-semibold transition-all duration-300 hover:from-[#f4a622] hover:to-[#e6951f] hover:text-[#001e28] hover:shadow-lg hover:shadow-[#f4a622]/30 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f4a622] to-[#e6951f] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Eye size={18} />
                      View Details
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center mt-12">
        <Link 
          to="/browse"
          className="group relative bg-gradient-to-r from-[#001e28] to-[#003544] text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-[#001e28]/30 flex items-center gap-3 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4a622] to-[#e6951f] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Sparkles size={22} className="relative z-10 group-hover:rotate-12 transition-transform duration-300 group-hover:text-[#001e28]" />
          <span className="relative z-10 group-hover:text-[#001e28] transition-colors duration-300">Browse All Collections</span>
          <ArrowRight className="relative z-10 group-hover:translate-x-2 group-hover:text-[#001e28] transition-all duration-300" size={22} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
        </Link>
      </div>
    </section>
  );
};

export default Collection;
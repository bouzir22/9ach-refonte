import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { items } from '../data/items';

const Collection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const displayItems = items.slice(0, 6);

  const getAlternateImages = (index: number) => {
    const item = displayItems[index];
    return item.images.slice(1, 4);
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

  return (
    <section id="collection" className="my-5 container mx-auto px-4">
      <h2 className="text-center mb-12 text-4xl font-bold">Preloved Collection</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item, index) => (
          <div 
            className="col" 
            key={item.id}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card h-full shadow-md border-0 rounded overflow-hidden bg-white">
              <div className="relative h-72">
                <img 
                  src={item.image} 
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'}`}
                  alt={item.name}
                />
                
                {hoveredIndex === index && (
                  <div className="flex h-full">
                    {getAlternateImages(index).map((altImg, i) => (
                      <img
                        key={`${index}-${i}`}
                        src={altImg}
                        className="object-cover h-full"
                        style={{
                          width: '33.33%',
                          borderRight: i < 2 ? '2px solid white' : 'none'
                        }}
                        alt={`Alternate view ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">{item.brand}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{item.size}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-gray-500 text-sm line-through mr-2">${item.originalPrice}</span>
                    <span className="text-lg font-bold text-gray-900">${item.price}</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {item.condition}
                  </span>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-white">
                <Link 
                  to={`/item/${item.id}`}
                  className="w-full block text-center py-2 border border-gray-800 rounded hover:bg-gray-800 hover:text-white transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Link 
          to="/browse"
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Browse All Collections
        </Link>
      </div>
    </section>
  );
};

export default Collection;
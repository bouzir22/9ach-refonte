import React, { useState } from 'react';

const Collection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const items = [
    {
      id: 1,
      name: 'Designer Silk Blouse',
      brand: 'Zara',
      price: 28,
      originalPrice: 89,
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
      condition: 'Like New',
      size: 'S'
    },
    {
      id: 2,
      name: 'Vintage Denim Jacket',
      brand: 'Levi\'s',
      price: 45,
      originalPrice: 120,
      image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800',
      condition: 'Good',
      size: 'M'
    },
    {
      id: 3,
      name: 'Cashmere Sweater',
      brand: 'Everlane',
      price: 35,
      originalPrice: 110,
      image: 'https://images.pexels.com/photos/1021293/pexels-photo-1021293.jpeg?auto=compress&cs=tinysrgb&w=800',
      condition: 'Excellent',
      size: 'L'
    },
    {
      id: 4,
      name: 'Linen Dress',
      brand: 'Reformation',
      price: 42,
      originalPrice: 150,
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
      condition: 'Like New',
      size: 'XS'
    },
    {
      id: 5,
      name: 'Wool Coat',
      brand: 'Max Mara',
      price: 85,
      originalPrice: 350,
      image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=800',
      condition: 'Very Good',
      size: 'M'
    },
    {
      id: 6,
      name: 'Silk Scarf',
      brand: 'Hermès',
      price: 65,
      originalPrice: 220,
      image: 'https://images.pexels.com/photos/35185/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      condition: 'Excellent',
      size: 'One Size'
    }
  ];

  const getAlternateImages = (index) => {
    const alternateImages = [];
    for (let i = 1; i <= 3; i++) {
      const nextIndex = (index + i) % items.length;
      alternateImages.push(items[nextIndex].image);
    }
    return alternateImages;
  };

  const handleMouseEnter = (index) => {
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
    <section id="collection" className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Preloved Collection</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div 
            key={item.id}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Image container with hover effect */}
            <div className="relative h-80 overflow-hidden">
              <img 
                src={item.image} 
                className={`absolute w-full h-full object-cover transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'}`}
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
            
            {/* Item details */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{item.size}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{item.brand}</p>
              
              <div className="flex items-center mb-3">
                <span className="text-gray-500 text-sm line-through mr-2">${item.originalPrice}</span>
                <span className="text-lg font-bold text-gray-900">${item.price}</span>
                <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {item.condition}
                </span>
              </div>
              
              <button className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors">
          Browse All Collections
        </button>
      </div>
    </section>
  );
};

export default Collection;
import React, { useState } from 'react';

const Collection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const images = [
    'https://st5.depositphotos.com/2597299/70062/i/450/depositphotos_700626598-stock-photo-handsome-muscular-man-black-white.jpg',
    'https://st4.depositphotos.com/12985790/20642/i/600/depositphotos_206425708-stock-photo-confident-male-model-autumn-outfit.jpg',
    'https://st2.depositphotos.com/4071389/7049/i/600/depositphotos_70494773-stock-photo-attractive-man-posing.jpg',
    'https://st5.depositphotos.com/88369228/75539/i/600/depositphotos_755396432-stock-photo-fashionable-rock-roll-styled-guy.jpg',
    'https://st4.depositphotos.com/12982378/20132/i/600/depositphotos_201324140-stock-photo-handsome-bearded-businessman-wearing-suit.jpg',
    'https://st4.depositphotos.com/12985790/20643/i/600/depositphotos_206430254-stock-photo-handsome-bearded-man-posing-autumn.jpg'
  ];

  const getAlternateImages = (index:any) => {
    const alternateImages = [];
    for (let i = 1; i <= 3; i++) {
      const nextIndex = (index + i) % images.length;
      alternateImages.push(images[nextIndex]);
    }
    return alternateImages;
  };

  const handleMouseEnter = (index:any) => {
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
        {images.map((img, index) => (
          <div 
            className="col" 
            key={img}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card h-full shadow-md border-0 rounded overflow-hidden">
              <div className="relative h-72">
                <img 
                  src={img} 
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'}`}
                  alt={`Preloved item ${index + 1}`}
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
                <h3 className="text-lg font-semibold">Designer Item {index + 1}</h3>
                <p className="text-gray-600 mt-2">Stylish and sustainable choice. Gently used with minimal wear.</p>
              </div>
              
              <div className="px-4 py-3 bg-white">
                <div className="flex justify-between items-center">
                  <span className="font-bold">$49.99</span>
                  <button className="px-3 py-1 border border-gray-800 rounded hover:bg-gray-800 hover:text-white transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
          Browse All Collections
        </button>
      </div>
    </section>
  );
};

export default Collection;
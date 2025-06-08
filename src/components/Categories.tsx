import React from 'react';

const categories = [
  {
    name: 'Women\'s Fashion',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
    itemCount: '2,500+ items',
    color: 'from-pink-500 to-rose-500'
  },
  {
    name: 'Men\'s Fashion',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800',
    itemCount: '1,800+ items',
    color: 'from-blue-500 to-indigo-500'
  }
  
];

const Categories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find exactly what you're looking for in our curated collections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-12 relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {category.itemCount}
                  </p>
                  
                  <button className="mt-4 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 hover:bg-white/30">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
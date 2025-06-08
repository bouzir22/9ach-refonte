import React from 'react';
import { Shield, Truck, RotateCcw, DollarSign, Leaf, Star } from 'lucide-react';

const features:any =[]
const oldFeatures= [
  {
    icon: DollarSign,
    title: 'Unbeatable Prices',
    description: 'Save up to 80% on designer and brand-name clothing compared to retail prices.'
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Every item is carefully inspected and authenticated before listing.'
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Free shipping on orders over $50. Most items ship within 24 hours.'
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Reduce fashion waste by giving clothes a second life. Good for you and the planet.'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy. Not satisfied? Send it back for a full refund.'
  },
  {
    icon: Star,
    title: 'Curated Selection',
    description: 'Hand-picked items from top brands and unique vintage pieces you won\'t find elsewhere.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose 9ach
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The smartest way to shop for pre-loved fashion with confidence and style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-white" size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
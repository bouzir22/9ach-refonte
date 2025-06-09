import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shirt, Tag, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with 9ach brand colors */}
      <div className="absolute inset-0 bg-[#001e28]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001e28] to-[#001e28]/90"></div>
      </div>

      {/* Floating clothing icons */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#f4a622]/20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              fontSize: `${16 + Math.random() * 8}px`
            }}
          >
            {i % 3 === 0 ? '👕' : i % 3 === 1 ? '👗' : '👖'}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shirt className="text-[#f4a622]" size={32} />
            <span className="text-[#f4a622] font-semibold text-lg">Pre-Loved Fashion</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Style,
            <span className="block text-[#f4a622]">
              Our Story
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform your wardrobe with authentic designer pieces, vintage treasures, and everyday essentials. 
            Every item tells a story - what will yours be?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              to="/browse"
              className="group bg-[#f4a622] text-[#001e28] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2"
            >
              <Shirt size={20} />
              Browse Collection
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </Link>
            
            <Link 
              to="/sell"
              className="group bg-white/10 backdrop-blur-md text-white border-2 border-[#f4a622] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[#f4a622]/20 flex items-center gap-2"
            >
              <Tag size={20} />
              Sell Your Clothes
            </Link>
          </div>

          {/* Fashion-focused stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f4a622] mb-2">50K+</div>
              <div className="text-gray-200 text-sm">Unique Pieces</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f4a622] mb-2">200+</div>
              <div className="text-gray-200 text-sm">Designer Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f4a622] mb-2">80%</div>
              <div className="text-gray-200 text-sm">Average Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f4a622] mb-2">24h</div>
              <div className="text-gray-200 text-sm">Fast Shipping</div>
            </div>
          </div>

          {/* Featured categories preview */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { name: "Women's", emoji: "👗" },
              { name: "Men's", emoji: "👔" },
            ].map((category, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-[#f4a622]/20 transition-all duration-300 cursor-pointer"
              >
                <div className="text-2xl mb-2">{category.emoji}</div>
                <div className="text-white text-sm font-medium">{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-[#f4a622] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#f4a622] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
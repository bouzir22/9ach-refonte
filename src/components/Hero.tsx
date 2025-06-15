import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shirt, Tag, TrendingUp, Crown, Zap } from 'lucide-react';

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
          <div className="flex items-center justify-center gap-4 mb-8">
            <img 
              src="/logo_9ach.png" 
              alt="9ach - Preloved Style" 
              className="h-20 w-auto animate-pulse"
            />
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
              className="group relative bg-gradient-to-r from-[#f4a622] to-[#e6951f] text-[#001e28] px-10 py-5 rounded-full font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-[#f4a622]/30 flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#e6951f] to-[#f4a622] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Shirt size={22} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Browse Collection</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" size={22} />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            </Link>
            
            <Link 
              to="/sell"
              className="group relative bg-transparent border-3 border-[#f4a622] text-[#f4a622] px-10 py-5 rounded-full font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-[#f4a622]/20 flex items-center gap-3 overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-[#f4a622] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Tag size={22} className="relative z-10 group-hover:rotate-12 transition-transform duration-300 group-hover:text-[#001e28]" />
              <span className="relative z-10 group-hover:text-[#001e28] transition-colors duration-300">Sell Your Clothes</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
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

          {/* Enhanced featured categories preview with creative icons */}
          <div className="mt-16 grid grid-cols-2 gap-6 max-w-lg mx-auto">
            <Link
              to="/browse?category=Women's Fashion"
              className="group relative bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-sm rounded-2xl p-6 hover:from-pink-500/30 hover:to-rose-500/30 transition-all duration-500 cursor-pointer border border-pink-500/30 hover:border-pink-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-3">
                  <Crown 
                    size={48} 
                    className="text-pink-300 group-hover:text-pink-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" 
                  />
                </div>
                <div className="text-white font-bold text-lg mb-1">Women's</div>
                <div className="text-pink-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">2,500+ items</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 rounded-2xl"></div>
            </Link>

            <Link
              to="/browse?category=Men's Fashion"
              className="group relative bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl p-6 hover:from-blue-500/30 hover:to-indigo-500/30 transition-all duration-500 cursor-pointer border border-blue-500/30 hover:border-blue-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-3">
                  <Zap 
                    size={48} 
                    className="text-blue-300 group-hover:text-blue-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" 
                  />
                </div>
                <div className="text-white font-bold text-lg mb-1">Men's</div>
                <div className="text-blue-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">1,800+ items</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 rounded-2xl"></div>
            </Link>
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
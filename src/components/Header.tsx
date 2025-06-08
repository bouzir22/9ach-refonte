import  { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingBag, User, Heart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                9ach
              </h1>
              <p className={`text-xs transition-colors duration-300 ${
                isScrolled ? 'text-gray-600' : 'text-white/80'
              }`}>
                Pre-loved Fashion
              </p>
            </div>
          </div>

          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isScrolled ? 'text-gray-400' : 'text-white/60'
              }`} size={20} />
              <input
                type="text"
                placeholder="Search for clothes, brands, styles..."
                className={`w-full pl-10 pr-4 py-2 rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-white focus:shadow-md' 
                    : 'bg-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:bg-white/30'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}>
              <Heart size={20} />
            </button>
            <button className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}>
              <ShoppingBag size={20} />
            </button>
            <button className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}>
              <User size={20} />
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-3 bg-white/95 backdrop-blur-md rounded-lg mt-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search clothes..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex justify-around pt-2">
              <button className="flex flex-col items-center gap-1 text-gray-700 hover:text-emerald-600 transition-colors duration-300">
                <Heart size={20} />
                <span className="text-xs">Wishlist</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-gray-700 hover:text-emerald-600 transition-colors duration-300">
                <ShoppingBag size={20} />
                <span className="text-xs">Cart</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-gray-700 hover:text-emerald-600 transition-colors duration-300">
                <User size={20} />
                <span className="text-xs">Account</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
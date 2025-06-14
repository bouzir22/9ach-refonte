import React from 'react';
import { Github, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, CreditCard, Shield, Truck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#001e28] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo_9ach.png" 
                alt="9ach - Preloved Style" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your trusted marketplace for pre-loved fashion. Discover unique pieces, save money, and help the environment with every purchase.
            </p>
            <div className="flex space-x-4">
              {[Github, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-[#001e28]/50 border border-gray-600 rounded-full flex items-center justify-center hover:bg-[#f4a622] hover:text-[#001e28] transition-colors duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#f4a622]">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#f4a622] transition-colors duration-300">Women's Fashion</a></li>
              <li><a href="#" className="hover:text-[#f4a622] transition-colors duration-300">Men's Fashion</a></li>
              <li><a href="#" className="hover:text-[#f4a622] transition-colors duration-300">Designer Bags</a></li>
              <li><a href="#" className="hover:text-[#f4a622] transition-colors duration-300">Vintage Collection</a></li>
              <li><a href="#" className="hover:text-[#f4a622] transition-colors duration-300">Shoes & Sneakers</a></li>
              <li><a href="#" className="hover:text-[#f4a622] transition-colors duration-300">Accessories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#f4a622]">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#f4a622] transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="hover:text-[#f4a622] transition-colors duration-300">Size Guide</a></li>
              <li><a href="#" className="hover:text-[#f4a622] transition-colors duration-300">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-[#f4a622] transition-colors duration-300">Shipping Info</a></li>
              <li><a href="#" className="hover:text-[#f4a622] transition-colors duration-300">Sell With Us</a></li>
              <li><a href="#" className="hover:text-[#f4a622] transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield size={20} className="text-[#f4a622]" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Truck size={20} className="text-[#f4a622]" />
              <span className="text-sm">Free Shipping Over $50</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <CreditCard size={20} className="text-[#f4a622]" />
              <span className="text-sm">30-Day Returns</span>
            </div>
          </div>
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 9ach. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
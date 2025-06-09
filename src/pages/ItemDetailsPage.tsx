import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, Shield, Truck, RotateCcw, MessageCircle } from 'lucide-react';
import { items } from '../data/items';

const ItemDetailsPage = () => {
  const { id } = useParams();
  const item = items.find(item => item.id === parseInt(id || '0'));
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Item not found</h2>
          <Link to="/" className="text-blue-600 hover:underline">Return to home</Link>
        </div>
      </div>
    );
  }

  const savings = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
            Back to Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={item.images[selectedImage]}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${item.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{item.brand}</span>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
                    <Heart size={20} />
                  </button>
                  <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900">${item.price}</span>
                  <span className="text-lg text-gray-500 line-through ml-2">${item.originalPrice}</span>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {savings}% off
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.condition === 'Like New' ? 'bg-green-100 text-green-800' :
                  item.condition === 'Excellent' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.condition}
                </span>
                <span className="text-gray-600">Size: {item.size}</span>
                <span className="text-gray-600">Color: {item.color}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>

            {/* Material & Care */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Material & Care</h3>
              <p className="text-gray-600">{item.material}</p>
            </div>

            {/* Measurements */}
            {item.measurements && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Measurements</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(item.measurements).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seller Info */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">Seller Information</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.seller.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm">{item.seller.rating} ({item.seller.reviews} reviews)</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <MessageCircle size={16} />
                  Message
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors">
                Add to Cart - ${item.price}
              </button>
              
              <button className="w-full border-2 border-black text-black py-4 rounded-lg font-semibold text-lg hover:bg-black hover:text-white transition-colors">
                Buy Now
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="mx-auto mb-2 text-green-600" size={24} />
                <p className="text-xs text-gray-600">Authenticity Guaranteed</p>
              </div>
              <div className="text-center">
                <Truck className="mx-auto mb-2 text-blue-600" size={24} />
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="mx-auto mb-2 text-purple-600" size={24} />
                <p className="text-xs text-gray-600">30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
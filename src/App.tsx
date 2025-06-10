import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import BrowseCollectionPage from './pages/BrowseCollectionPage';
import SellProductPage from './pages/SellProductPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import SellerProfilePage from './pages/SellerProfilePage';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemDetailsPage />} />
        <Route path="/browse" element={<BrowseCollectionPage />} />
        <Route path="/sell" element={<SellProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/seller/:sellerId" element={<SellerProfilePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
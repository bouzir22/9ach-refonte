import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import BrowseCollectionPage from './pages/BrowseCollectionPage';
import SellProductPage from './pages/SellProductPage';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemDetailsPage />} />
        <Route path="/browse" element={<BrowseCollectionPage />} />
        <Route path="/sell" element={<SellProductPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
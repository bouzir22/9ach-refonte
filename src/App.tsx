import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
 
import Contact from './components/Contact';
import Footer from './components/Footer';
import Collection from './components/Collection';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Categories />
      <Collection />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Categories from '../components/Categories';
import Collection from '../components/Collection';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Collection />
      <Features />
      <Contact />
    </>
  );
};

export default HomePage;
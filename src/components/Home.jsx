import React from 'react';
import Hero from './Hero';
import About from './About';
import Products from './Products';
import FAQ from './FAQ';
import Contact from './Contact';

/**
 * Home Component
 * 1. Hero Section
 * 2. About Section
 * 3. Products Section
 * 4. FAQ / Help Center Section
 * 5. Contact Section
 */
export default function Home({ products, onAddToCart, onQuickView, lang = 'ar' }) {
  return (
    <main className="home-container">
      {/* 1. Hero Section */}
      <Hero lang={lang} />

      {/* 2. About Section */}
      <About lang={lang} />

      {/* 3. Products Section */}
      <Products
        products={products}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        lang={lang}
      />

      {/* 4. FAQ / Help Center Section */}
      <FAQ lang={lang} />

      {/* 5. Contact Section */}
      <Contact lang={lang} />
    </main>
  );
}

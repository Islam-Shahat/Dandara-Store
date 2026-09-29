import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import { initialProducts } from './data/products';
import { translations } from './data/translations';
import './App.css';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // 1. Language State (Arabic / English)
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem('dandra_lang');
    return savedLang || 'ar';
  });

  const t = translations[lang] || translations.ar;

  useEffect(() => {
    localStorage.setItem('dandra_lang', lang);
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    document.body.setAttribute('dir', dir);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  // 2. Theme State (Dark / Light Mode)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('dandra_theme');
    return saved || 'light';
  });

  useEffect(() => {
    localStorage.setItem('dandra_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 3. Quick View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  // 4. Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenCheckout = () => {
    if (cartItems.length === 0) {
      showToast(lang === 'ar' ? 'سلة التسوق فارغة! أضف بعض المنتجات أولاً' : 'Your cart is empty! Add some products first');
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  // Direct Buy from Quick View
  const handleDirectBuy = (product, quantity = 1) => {
    handleAddToCart(product, quantity);
    handleCloseQuickView();
    setIsCheckoutOpen(true);
  };

  // Show quick toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Add to cart handler with optional quantity
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    const pName = lang === 'en' && product.englishName ? product.englishName : product.name;
    showToast(lang === 'ar' ? `تمت إضافة "${pName}" (${quantity}) إلى السلة` : `Added "${pName}" (${quantity}) to cart`);
  };

  // Update quantity handler (+1 / -1)
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item handler
  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Clear cart handler
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Order completed callback
  const handleOrderCompleted = (orderSummary) => {
    setCartItems([]);
    showToast(lang === 'ar' ? `تم تأكيد طلبك رقم ${orderSummary.orderId} بنجاح 🎉` : `Order ${orderSummary.orderId} confirmed successfully! 🎉`);
  };

  // Total count of items in cart
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className={`app-root ${lang === 'en' ? 'lang-en' : 'lang-ar'}`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      data-theme={theme}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span>🛒 {toastMessage}</span>
        </div>
      )}

      {/* Header / Navbar with Lang & Theme Toggles */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* Home Component */}
      <Home
        products={initialProducts}
        onAddToCart={handleAddToCart}
        onQuickView={handleOpenQuickView}
        lang={lang}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleOpenCheckout}
        lang={lang}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
        onDirectBuy={handleDirectBuy}
        lang={lang}
      />

      {/* Checkout & Electronic Invoice Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        cartItems={cartItems}
        onOrderCompleted={handleOrderCompleted}
        lang={lang}
      />

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}

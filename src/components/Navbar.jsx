import React, { useState, useEffect } from 'react';
import { ShoppingBag, ShoppingCart, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({
  cartCount = 0,
  onOpenCart,
  theme = 'light',
  onToggleTheme,
  lang = 'ar',
  onToggleLang
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[lang] || translations.ar;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo" onClick={closeMenu}>
          <div className="logo-icon-wrap">
            <ShoppingBag size={22} />
          </div>
          <span className="logo-text">
            {t.brandName} <span>{t.brandSpan}</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#hero" className="nav-link" onClick={closeMenu}>
            {t.navHome}
          </a>
          <a href="#about" className="nav-link" onClick={closeMenu}>
            {t.navAbout}
          </a>
          <a href="#products" className="nav-link" onClick={closeMenu}>
            {t.navProducts}
          </a>
          <a href="#faq" className="nav-link" onClick={closeMenu}>
            {t.navFaq}
          </a>
          <a href="#contact" className="nav-link" onClick={closeMenu}>
            {t.navContact}
          </a>
        </nav>

        {/* Header Actions: Lang Switcher, Theme Toggle, Cart Icon & Mobile Toggle */}
        <div className="header-actions">
          {/* Language Switcher */}
          <button
            type="button"
            className="lang-toggle-btn"
            onClick={onToggleLang}
            aria-label="تبديل اللغة / Switch Language"
            title={lang === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
          >
            <Globe size={18} />
            <span className="lang-text">{lang === 'ar' ? 'English' : 'عربي'}</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? t.themeToggleLight : t.themeToggleDark}
            title={theme === 'dark' ? t.themeToggleLight : t.themeToggleDark}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="theme-icon sun" />
            ) : (
              <Moon size={20} className="theme-icon moon" />
            )}
          </button>

          {/* Cart Trigger */}
          <button
            type="button"
            className="cart-trigger-btn"
            onClick={onOpenCart}
            aria-label={t.cartTitle}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

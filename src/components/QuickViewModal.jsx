import React, { useState } from 'react';
import { X, Star, ShoppingCart, Check, Shield, Truck, RotateCcw, Zap, Sparkles, Plus, Minus } from 'lucide-react';
import { translations } from '../data/translations';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart, onDirectBuy, lang = 'ar' }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const t = translations[lang] || translations.ar;
  const displayName = lang === 'en' && product.englishName ? product.englishName : product.name;
  const secondaryName = lang === 'en' ? product.name : product.englishName;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleDirectBuy = () => {
    if (onDirectBuy) {
      onDirectBuy(product, quantity);
    }
  };

  return (
    <div className="quickview-backdrop" onClick={onClose}>
      <div
        className="quickview-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
      >
        {/* Close Button */}
        <button
          type="button"
          className="quickview-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* 1. Product Image Column */}
          <div className="quickview-image-side">
            <div className="quickview-img-wrapper">
              <img
                src={product.image}
                alt={displayName}
                className="quickview-main-img"
              />
              <span className="quickview-category-badge">{product.category}</span>
              {product.isFeatured && (
                <span className="quickview-featured-badge">
                  <Sparkles size={13} />
                  <span>{lang === 'ar' ? 'منتج مميز' : 'Featured'}</span>
                </span>
              )}
            </div>
          </div>

          {/* 2. Product Details Column */}
          <div className="quickview-details-side">
            <div className="quickview-header">
              <div className="quickview-badges-row">
                <span className="stock-status-badge in-stock">
                  <span className="stock-dot"></span>
                  {t.inStockText}
                </span>
                <span className="sku-tag">SKU: TECH-{product.id.toString().padStart(4, '0')}</span>
              </div>

              <h2 id="quickview-title" className="quickview-title">
                {displayName}
              </h2>
              {secondaryName && (
                <p className="quickview-english-name">{secondaryName}</p>
              )}

              {/* Rating and Reviews */}
              <div className="quickview-rating-row">
                <div className="stars-wrap">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating || 4.5) ? '#f59e0b' : '#e2e8f0'}
                      color={i < Math.floor(product.rating || 4.5) ? '#f59e0b' : '#cbd5e1'}
                    />
                  ))}
                </div>
                <strong className="rating-num">{product.rating || 4.8}</strong>
                <span className="reviews-count">({product.reviewsCount || 120} {t.reviewsCountText})</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="quickview-price-section">
              <div className="current-price-wrap">
                <span className="price-currency">$</span>
                <span className="price-amount">{Number(product.price).toFixed(2)}</span>
              </div>
              <span className="original-price-wrap">
                ${(Number(product.price) * 1.25).toFixed(2)}
              </span>
              <span className="discount-tag">{t.savePercentText}</span>
            </div>

            {/* Description */}
            <p className="quickview-description">{product.description}</p>

            {/* Tech Key Features */}
            <div className="quickview-features-list">
              <div className="quickview-feature-item">
                <Shield size={16} className="feature-icon" />
                <span>{t.warrantyFeature}</span>
              </div>
              <div className="quickview-feature-item">
                <Truck size={16} className="feature-icon" />
                <span>{t.shippingFeature}</span>
              </div>
              <div className="quickview-feature-item">
                <RotateCcw size={16} className="feature-icon" />
                <span>{t.returnFeature}</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="quickview-actions-wrap">
              <div className="quantity-control-group">
                <span className="quantity-label">{t.quantityLabel}</span>
                <div className="quantity-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="action-buttons-group">
                <button
                  type="button"
                  className={`btn-primary quickview-add-btn ${isAdded ? 'added' : ''}`}
                  onClick={handleAddToCart}
                >
                  {isAdded ? (
                    <>
                      <Check size={20} />
                      <span>{t.addedToCartBtn}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      <span>{t.addToCartBtn} {quantity > 1 ? `(${quantity})` : ''}</span>
                    </>
                  )}
                </button>

                {onDirectBuy && (
                  <button
                    type="button"
                    className="btn-secondary quickview-buy-btn"
                    onClick={handleDirectBuy}
                  >
                    <Zap size={18} />
                    <span>{t.buyNowBtn}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

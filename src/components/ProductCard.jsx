import React, { useState } from 'react';
import { ShoppingCart, Star, Check, Eye } from 'lucide-react';
import { translations } from '../data/translations';

export default function ProductCard({
  product,
  id = product?.id,
  name = product?.name,
  englishName = product?.englishName,
  category = product?.category,
  price = product?.price,
  description = product?.description,
  image = product?.image,
  rating = product?.rating || 4.5,
  reviewsCount = product?.reviewsCount || 80,
  onAddToCart,
  onQuickView,
  lang = 'ar'
}) {
  const [isAdded, setIsAdded] = useState(false);
  const t = translations[lang] || translations.ar;

  const displayName = lang === 'en' && englishName ? englishName : name;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product || { id, name, englishName, category, price, description, image, rating, reviewsCount });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <article className="product-card" id={`product-${id}`}>
      {/* 1. Image Container with Quick View Hover */}
      <div className="product-image-container" onClick={handleQuickViewClick}>
        <img
          src={image}
          alt={displayName}
          className="product-image"
          loading="lazy"
        />
        {/* Category Badge overlay */}
        <span className="product-category-badge">{category}</span>

        {/* Rating Badge */}
        {rating && (
          <div className="product-rating-badge">
            <Star className="star-icon" size={14} fill="#f59e0b" color="#f59e0b" />
            <span>{rating}</span>
          </div>
        )}

        {/* Quick View Button on Hover */}
        <button
          type="button"
          className="quickview-card-btn"
          onClick={handleQuickViewClick}
          aria-label={`${t.quickViewBtn} - ${displayName}`}
          title={t.quickViewBtn}
        >
          <Eye size={16} />
          <span>{t.quickViewBtn}</span>
        </button>
      </div>

      {/* 2. Product Information */}
      <div className="product-content">
        <h3 className="product-name" title={displayName} onClick={handleQuickViewClick}>
          {displayName}
        </h3>
        
        {/* Description */}
        <p className="product-description">{description}</p>

        {/* 3. Price & Button */}
        <div className="product-footer">
          <div className="product-price-box">
            <span className="price-label">{t.priceLabel}</span>
            <span className="product-price">${Number(price).toFixed(2)}</span>
          </div>

          <button
            type="button"
            className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
            onClick={handleAdd}
            aria-label={`${t.addToCartBtn} ${displayName}`}
          >
            {isAdded ? (
              <>
                <Check size={18} />
                <span>{t.addedToCartBtn}</span>
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                <span>{t.addToCartBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

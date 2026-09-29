import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { translations } from '../data/translations';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  lang = 'ar'
}) {
  if (!isOpen) return null;

  const t = translations[lang] || translations.ar;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckoutClick = () => {
    onClose();
    if (onProceedToCheckout) {
      onProceedToCheckout();
    }
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        role="dialog"
      >
        {/* Drawer Header */}
        <div className="cart-header">
          <div className="cart-title-wrap">
            <ShoppingBag size={22} />
            <h3>{t.cartTitle} ({totalItemCount})</h3>
          </div>
          <button
            type="button"
            className="close-cart-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Body */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={56} className="empty-cart-icon" />
              <h4>{t.cartEmptyTitle}</h4>
              <p>{t.cartEmptySub}</p>
              <button
                type="button"
                className="btn-primary"
                onClick={onClose}
              >
                {t.browseProductsBtn}
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => {
                const displayName = lang === 'en' && item.englishName ? item.englishName : item.name;
                return (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={displayName} className="cart-item-img" />
                    
                    <div className="cart-item-info">
                      <h4 className="cart-item-title">{displayName}</h4>
                      <span className="cart-item-category">{item.category}</span>
                      <span className="cart-item-price">${Number(item.price).toFixed(2)}</span>

                      <div className="cart-item-controls">
                        <div className="quantity-stepper">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          className="remove-item-btn"
                          onClick={() => onRemoveItem(item.id)}
                          title="Remove item"
                          aria-label={`Remove ${displayName}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer / Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>{t.subtotalLabel}</span>
              <strong className="summary-total">${totalAmount.toFixed(2)}</strong>
            </div>
            <p className="shipping-note">{t.shippingNoteText}</p>

            <button
              type="button"
              className="btn-primary checkout-btn"
              onClick={handleCheckoutClick}
            >
              <span>{t.checkoutProceedBtn}</span>
              {lang === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </button>

            <button
              type="button"
              className="clear-cart-link"
              onClick={onClearCart}
            >
              {t.clearCartBtn}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

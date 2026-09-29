import React from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { translations } from '../data/translations';

export default function Hero({ lang = 'ar' }) {
  const t = translations[lang] || translations.ar;

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Hero Text Content */}
        <div className="hero-content">
          <div className="hero-tag">
            <span>{t.heroTag}</span>
          </div>

          <h1 className="hero-title">
            {t.heroTitle}
          </h1>

          <p className="hero-description">
            {t.heroDescription}
          </p>

          <div className="hero-actions">
            <a href="#products" className="btn-primary hero-btn">
              <ShoppingBag size={20} />
              <span>{t.heroExploreBtn}</span>
              {lang === 'ar' ? (
                <ArrowLeft size={18} className="arrow-icon" />
              ) : (
                <ArrowRight size={18} className="arrow-icon" />
              )}
            </a>

            <a href="#about" className="btn-secondary hero-btn">
              <span>{t.heroAboutBtn}</span>
            </a>
          </div>

          {/* Quick Features Row */}
          <div className="hero-features">
            <div className="hero-feature-item">
              <div className="feature-icon-circle">
                <Truck size={18} />
              </div>
              <div>
                <strong>{t.heroFeatureFastShipping}</strong>
                <span>{t.heroFeatureFastShippingSub}</span>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="feature-icon-circle">
                <ShieldCheck size={18} />
              </div>
              <div>
                <strong>{t.heroFeatureOriginalWarranty}</strong>
                <span>{t.heroFeatureOriginalWarrantySub}</span>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="feature-icon-circle">
                <Headphones size={18} />
              </div>
              <div>
                <strong>{t.heroFeature247Support}</strong>
                <span>{t.heroFeature247SupportSub}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Card / Graphic */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop&q=80"
              alt="Tech and electronics desk setup"
              className="hero-main-image"
            />
            {/* Floating Info Cards */}
            <div className="floating-card floating-card-top">
              <div className="floating-card-icon">🔥</div>
              <div>
                <p className="floating-card-title">{t.heroFloatingDiscount}</p>
                <p className="floating-card-subtitle">{t.heroFloatingDiscountSub}</p>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <div className="floating-card-icon">⭐</div>
              <div>
                <p className="floating-card-title">{t.heroFloatingHappyClients}</p>
                <p className="floating-card-subtitle">{t.heroFloatingRating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

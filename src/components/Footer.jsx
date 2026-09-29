import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { translations } from '../data/translations';

export default function Footer({ lang = 'ar' }) {
  const t = translations[lang] || translations.ar;

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="logo-icon-wrap">
            <ShoppingBag size={20} />
          </div>
          <span className="logo-text">
            {t.brandName} <span>{t.brandSpan}</span>
          </span>
          <p className="footer-tagline">
            {t.footerTagline}
          </p>
        </div>

        <div className="footer-links-group">
          <h4>{t.footerQuickLinksTitle}</h4>
          <ul>
            <li><a href="#hero">{t.navHome}</a></li>
            <li><a href="#about">{t.navAbout}</a></li>
            <li><a href="#products">{t.navProducts}</a></li>
            <li><a href="#faq">{t.navFaq}</a></li>
            <li><a href="#contact">{t.navContact}</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>{t.footerCustomerServiceTitle}</h4>
          <ul>
            <li><a href="#faq">{t.footerPolicyShipping}</a></li>
            <li><a href="#faq">{t.footerPolicyReturns}</a></li>
            <li><a href="#faq">{t.footerPolicyPrivacy}</a></li>
            <li><a href="#faq">{t.footerPolicyTerms}</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>{t.footerRightsText}</p>
          <p className="credit-text">
            {lang === 'ar' ? 'تم التطوير بواسطة Islam Shahat' : 'Crafted with passion by Islam Shahat'}{' '}
            <Heart size={14} fill="#ef4444" color="#ef4444" className="inline-heart" />
          </p>
        </div>
      </div>
    </footer>
  );
}

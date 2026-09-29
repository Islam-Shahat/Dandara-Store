import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Search, Filter, ArrowUpDown, X, Sparkles, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { initialProducts } from '../data/products';
import { translations } from '../data/translations';

const ITEMS_PER_PAGE = 6;

export default function Products({
  products = initialProducts,
  onAddToCart,
  onQuickView,
  lang = 'ar'
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const t = translations[lang] || translations.ar;

  // Extract unique categories dynamically from products
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(products.map((p) => p.category))];
    return cats;
  }, [products]);

  // Filter and Sort logic
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search filter: matching name or description
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.englishName && product.englishName.toLowerCase().includes(query));

        // Category filter
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        if (sortBy === 'name-asc') {
          return lang === 'ar'
            ? a.name.localeCompare(b.name, 'ar')
            : (a.englishName || a.name).localeCompare(b.englishName || b.name, 'en');
        }
        return 0; // Default / featured
      });
  }, [products, searchQuery, selectedCategory, sortBy, lang]);

  // Visible sliced products
  const visibleProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, visibleCount);
  }, [filteredAndSortedProducts, visibleCount]);

  const hasMore = visibleCount < filteredAndSortedProducts.length;
  const canShowLess = visibleCount > ITEMS_PER_PAGE && filteredAndSortedProducts.length > ITEMS_PER_PAGE;

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredAndSortedProducts.length));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredAndSortedProducts.length);
  };

  const handleShowLess = () => {
    setVisibleCount(ITEMS_PER_PAGE);
    const section = document.getElementById('products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  // Calculate progress percentage
  const progressPercent = filteredAndSortedProducts.length > 0
    ? Math.min(100, Math.round((visibleProducts.length / filteredAndSortedProducts.length) * 100))
    : 0;

  return (
    <section id="products" className="products-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={16} />
            <span>{t.productsBadge}</span>
          </div>
          <h2 className="section-title">{t.productsTitle}</h2>
          <p className="section-subtitle">{t.productsSubtitle}</p>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="products-toolbar">
          {/* 1. Search Box */}
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label={t.searchPlaceholder}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                title={t.resetFilters}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* 2. Sort Dropdown */}
          <div className="sort-box">
            <ArrowUpDown className="sort-icon" size={18} />
            <select
              value={sortBy}
              onChange={handleSortChange}
              aria-label={t.sortLabel}
            >
              <option value="featured">{t.sortFeatured}</option>
              <option value="price-low">{t.sortPriceLow}</option>
              <option value="price-high">{t.sortPriceHigh}</option>
              <option value="rating-desc">{t.sortRating}</option>
              <option value="name-asc">{t.sortName}</option>
            </select>
          </div>
        </div>

        {/* 3. Category Filter Chips */}
        <div className="categories-filter">
          <div className="filter-label">
            <Filter size={16} />
            <span>{t.categoryLabel}</span>
          </div>
          <div className="category-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat === 'All' ? t.categoryAll : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Progress Indicator */}
        <div className="products-count-bar">
          <div className="count-info">
            <span>
              {t.showingCount} <strong>{visibleProducts.length}</strong> {t.ofTotal}{' '}
              <strong>{filteredAndSortedProducts.length}</strong> {t.productsCountUnit}
            </span>
          </div>

          {(searchQuery || selectedCategory !== 'All' || sortBy !== 'featured') && (
            <button type="button" className="reset-filters-link" onClick={handleReset}>
              {t.resetFilters}
            </button>
          )}
        </div>

        {/* Progress Line */}
        {filteredAndSortedProducts.length > 0 && (
          <div className="products-progress-track">
            <div
              className="products-progress-fill"
              style={{ width: `${progressPercent}%` }}
              title={`${progressPercent}%`}
            />
          </div>
        )}

        {/* 4. Products Responsive Grid (displays only visibleProducts) */}
        {visibleProducts.length > 0 ? (
          <>
            <div className="products-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  lang={lang}
                />
              ))}
            </div>

            {/* 5. See More / Pagination Controls */}
            {(hasMore || canShowLess) && (
              <div className="see-more-wrapper">
                {hasMore && (
                  <button
                    type="button"
                    className="btn-primary see-more-btn"
                    onClick={handleSeeMore}
                    id="see-more-btn"
                  >
                    <span>{t.seeMoreBtn}</span>
                    <ChevronDown size={18} />
                  </button>
                )}

                {hasMore && filteredAndSortedProducts.length - visibleCount > ITEMS_PER_PAGE && (
                  <button
                    type="button"
                    className="btn-secondary show-all-btn"
                    onClick={handleShowAll}
                  >
                    <Layers size={16} />
                    <span>{t.showAllBtn} ({filteredAndSortedProducts.length})</span>
                  </button>
                )}

                {canShowLess && !hasMore && (
                  <button
                    type="button"
                    className="btn-secondary show-less-btn"
                    onClick={handleShowLess}
                  >
                    <span>{t.showLessBtn}</span>
                    <ChevronUp size={18} />
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="empty-products-state">
            <div className="empty-icon-wrap">
              <Search size={48} />
            </div>
            <h3>{t.emptyTitle}</h3>
            <p>{t.emptySubtitle}</p>
            <button type="button" className="btn-primary" onClick={handleReset}>
              {t.emptyResetBtn}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

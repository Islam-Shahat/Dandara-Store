import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, Search, MessageSquare, ShieldCheck, Truck, CreditCard, RotateCcw } from 'lucide-react';
import { translations } from '../data/translations';

const faqData = [
  {
    id: 1,
    category: 'shipping',
    questionAr: 'كم تستغرق مدة الشحن والتوصيل للمنتجات؟',
    questionEn: 'How long does product shipping and delivery take?',
    answerAr: 'يستغرق التوصيل داخل القاهرة والجيزة من 24 إلى 48 ساعة فقط، وباقي المحافظات خلال 2 إلى 3 أيام عمل كحد أقصى مع إمكانية التتبع المباشر للشحنة.',
    answerEn: 'Delivery takes 24 to 48 hours within Cairo and Giza, and 2 to 3 business days for other governorates with direct live shipment tracking.'
  },
  {
    id: 2,
    category: 'shipping',
    questionAr: 'هل الشحن مجاني لجميع الطلبات؟',
    questionEn: 'Is shipping free for all orders?',
    answerAr: 'نعم! نقدم شحناً مجانياً تلقائياً لجميع الطلبات التي تتجاوز قيمتها 100 دولار أمريكي، وللطلبات الأقل تكون رسوم الشحن رمزية بقيمة 10 دولارات فقط.',
    answerEn: 'Yes! We offer free shipping automatically for all orders exceeding $100. For smaller orders, shipping is a flat fee of only $10.'
  },
  {
    id: 3,
    category: 'warranty',
    questionAr: 'ما هي مدة الضمان على الأجهزة والملحقات الإلكترونية؟',
    questionEn: 'What is the warranty period for electronics and peripherals?',
    answerAr: 'جميع منتجاتنا أصلية 100% ومشمولة بضمان استبدال رسمي معتمد لمدة 12 شهراً ضد عيوب الصناعة من الوكلاء المعتمدين.',
    answerEn: 'All our products are 100% genuine and covered by an official 12-month replacement warranty against manufacturing defects.'
  },
  {
    id: 4,
    category: 'warranty',
    questionAr: 'كيف أستفيد من خدمة الضمان والصيانة؟',
    questionEn: 'How can I claim warranty and maintenance services?',
    answerAr: 'ببساطة تواصل مع فريق الدعم الفني عبر الواتساب أو نموذج الاتصال برقم الطلب أو الفاتورة، وسنقوم باستلام الجهاز لفحصه واستبداله فوراً.',
    answerEn: 'Simply reach out to our technical support team with your order ID or invoice, and we will arrange pickup, inspection, and immediate replacement.'
  },
  {
    id: 5,
    category: 'payment',
    questionAr: 'ما هي طرق الدفع المتاحة داخل المتجر؟',
    questionEn: 'What payment methods are available in the store?',
    answerAr: 'نوفر الدفع نقدياً عند الاستلام (COD)، البطاقات الائتمانية والبنكية (Visa / MasterCard / ميزة)، المحافظ الإلكترونية (فودافون كاش، إنستاباي InstaPay)، و Apple Pay.',
    answerEn: 'We support Cash on Delivery (COD), Credit and Debit cards (Visa / MasterCard / Meeza), Mobile Wallets (Vodafone Cash, InstaPay), and Apple Pay.'
  },
  {
    id: 6,
    category: 'payment',
    questionAr: 'هل يمكنني استخدام كوبونات الخصم وقسائم الشراء؟',
    questionEn: 'Can I apply discount coupons and promo codes?',
    answerAr: 'بالتأكيد! يمكنك إدخال كود الخصم مثل TECH10 أو WELCOME20 في صفحة إتمام الطلب وسيتم تطبيق نسبة الخصم فوراً على إجمالي الفاتورة.',
    answerEn: 'Absolutely! You can enter coupon codes such as TECH10 or WELCOME20 during checkout to get instant discounts applied to your total.'
  },
  {
    id: 7,
    category: 'returns',
    questionAr: 'ما هي سياسة الاسترجاع والاستبدال؟',
    questionEn: 'What is the return and exchange policy?',
    answerAr: 'يحق لك استرجاع أو استبدال أي منتج خلال 14 يوماً من تاريخ الاستلام بشرط أن يكون المنتج بحالته الأصلية وبتغليف المصنع.',
    answerEn: 'You can return or exchange any product within 14 days of delivery, provided it remains in its original condition and packaging.'
  },
  {
    id: 8,
    category: 'returns',
    questionAr: 'متى وكيف يتم استرداد المبلغ المدفوع؟',
    questionEn: 'When and how are refunds processed?',
    answerAr: 'يتم استرداد المبلغ بنفس طريقة الدفع الأصلية (تحويل بنكي أو محفظة إلكترونية أو نقداً) خلال 3 إلى 5 أيام عمل من فحص المنتج المسترجع.',
    answerEn: 'Refunds are credited using the original payment method (Bank transfer, Mobile wallet, or Cash) within 3 to 5 business days after inspection.'
  }
];

export default function FAQ({ lang = 'ar' }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState([1]); // First item opened by default

  const t = translations[lang] || translations.ar;

  const toggleItem = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const qText = lang === 'ar' ? item.questionAr : item.questionEn;
      const aText = lang === 'ar' ? item.answerAr : item.answerEn;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        qText.toLowerCase().includes(query) ||
        aText.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery, lang]);

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <HelpCircle size={16} />
            <span>{t.faqBadge}</span>
          </div>
          <h2 className="section-title">{t.faqTitle}</h2>
          <p className="section-subtitle">{t.faqSubtitle}</p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="faq-toolbar">
          <div className="faq-search-box">
            <Search size={18} className="faq-search-icon" />
            <input
              type="text"
              placeholder={t.faqSearchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t.faqSearchPlaceholder}
            />
          </div>

          <div className="faq-category-pills">
            <button
              type="button"
              className={`faq-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              {t.faqCategoryAll}
            </button>
            <button
              type="button"
              className={`faq-pill ${activeCategory === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveCategory('shipping')}
            >
              <Truck size={14} />
              <span>{t.faqCategoryShipping}</span>
            </button>
            <button
              type="button"
              className={`faq-pill ${activeCategory === 'warranty' ? 'active' : ''}`}
              onClick={() => setActiveCategory('warranty')}
            >
              <ShieldCheck size={14} />
              <span>{t.faqCategoryWarranty}</span>
            </button>
            <button
              type="button"
              className={`faq-pill ${activeCategory === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveCategory('payment')}
            >
              <CreditCard size={14} />
              <span>{t.faqCategoryPayment}</span>
            </button>
            <button
              type="button"
              className={`faq-pill ${activeCategory === 'returns' ? 'active' : ''}`}
              onClick={() => setActiveCategory('returns')}
            >
              <RotateCcw size={14} />
              <span>{t.faqCategoryReturns}</span>
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              const question = lang === 'ar' ? faq.questionAr : faq.questionEn;
              const answer = lang === 'ar' ? faq.answerAr : faq.answerEn;

              return (
                <div
                  key={faq.id}
                  className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-q-title">
                      <span className="faq-q-icon">?</span>
                      <span className="faq-q-text">{question}</span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                    />
                  </button>

                  <div className={`faq-answer-collapse ${isOpen ? 'expanded' : ''}`}>
                    <div className="faq-answer-content">
                      <p>{answer}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="faq-empty-state">
              <p>{t.emptyTitle}</p>
            </div>
          )}
        </div>

        {/* Bottom Support CTA Box */}
        <div className="faq-support-cta">
          <div className="cta-icon-wrap">
            <MessageSquare size={32} />
          </div>
          <div className="cta-text-side">
            <h3>{t.faqNeedHelpTitle}</h3>
            <p>{t.faqNeedHelpSub}</p>
          </div>
          <a href="#contact" className="btn-primary cta-btn">
            <span>{t.faqContactUsBtn}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

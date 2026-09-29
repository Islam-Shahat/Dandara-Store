import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Truck,
  CheckCircle2,
  Printer,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  QrCode,
  Phone,
  User,
  MapPin
} from 'lucide-react';

function generateOrderId() {
  const year = new Date().getFullYear();
  const num = Math.floor(100000 + Math.random() * 900000);
  return `ORD-${year}-${num}`;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems = [],
  onOrderCompleted,
  lang = 'ar'
}) {
  const [step, setStep] = useState(1); // 1: Shipping Info, 2: Payment, 3: Invoice/Receipt
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: lang === 'ar' ? 'القاهرة' : 'Cairo',
    address: '',
    notes: '',
    paymentMethod: 'cod', // 'cod' | 'card' | 'wallet' | 'applepay'
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    walletPhone: ''
  });

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [orderSummary, setOrderSummary] = useState(null);

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 100;
  const shippingCost = isFreeShipping ? 0 : 10;
  
  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = (subtotal * appliedCoupon.percent) / 100;
  }
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'TECH10') {
      setAppliedCoupon({ code: 'TECH10', percent: 10, label: 'خصم التقنية 10%' });
    } else if (code === 'WELCOME20') {
      setAppliedCoupon({ code: 'WELCOME20', percent: 20, label: 'خصم الترحيب 20%' });
    } else if (code === 'DANDRA') {
      setAppliedCoupon({ code: 'DANDRA', percent: 15, label: 'كوبون دندرة 15%' });
    } else {
      setCouponError('رمز الكوبون غير صحيح. جرّب TECH10 أو WELCOME20');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('يرجى ملء جميع الحقول المطلوبة للمتابعة.');
      return;
    }
    setStep(2);
  };

  const handleConfirmOrder = () => {
    const randomOrderId = generateOrderId();
    const now = new Date();
    const dateStr = now.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const summary = {
      orderId: randomOrderId,
      date: dateStr,
      customer: { ...formData },
      items: [...cartItems],
      subtotal,
      shippingCost,
      discountAmount,
      grandTotal,
      appliedCoupon
    };

    setOrderSummary(summary);
    setStep(3);

    if (onOrderCompleted) {
      onOrderCompleted(summary);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleFinishAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="checkout-backdrop" onClick={step === 3 ? undefined : onClose}>
      <div
        className={`checkout-modal ${step === 3 ? 'invoice-view' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="checkout-header no-print">
          <div className="checkout-steps-indicator">
            <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <span className="step-circle">{step > 1 ? '✓' : '1'}</span>
              <span className="step-text">بيانات التوصيل</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <span className="step-circle">{step > 2 ? '✓' : '2'}</span>
              <span className="step-text">الدفع والتأكيد</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step-node ${step === 3 ? 'active completed' : ''}`}>
              <span className="step-circle">3</span>
              <span className="step-text">الفاتورة الإلكترونية</span>
            </div>
          </div>

          <button
            type="button"
            className="checkout-close-btn"
            onClick={handleFinishAndClose}
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="checkout-body">
          {/* ================= STEP 1: SHIPPING DETAILS ================= */}
          {step === 1 && (
            <form className="checkout-form-grid" onSubmit={handleNextToPayment}>
              <div className="checkout-form-side">
                <h3 className="checkout-section-title">
                  <MapPin size={20} className="section-icon" />
                  <span>معلومات الشحن والتسليم</span>
                </h3>

                <div className="form-group">
                  <label htmlFor="fullName">الاسم الكامل *</label>
                  <div className="input-with-icon">
                    <User size={18} className="field-icon" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="أدخل اسمك بالكامل"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="phone">رقم الهاتف *</label>
                    <div className="input-with-icon">
                      <Phone size={18} className="field-icon" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="01xxxxxxxxx"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">المحافظة / المدينة *</label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="القاهرة">القاهرة</option>
                      <option value="الجيزة">الجيزة</option>
                      <option value="الإسكندرية">الإسكندرية</option>
                      <option value="الشرقية">الشرقية</option>
                      <option value="الدقهلية">الدقهلية</option>
                      <option value="البحيرة">البحيرة</option>
                      <option value="القليوبية">القليوبية</option>
                      <option value="الغربية">الغربية</option>
                      <option value="المنوفية">المنوفية</option>
                      <option value="أسيوط">أسيوط</option>
                      <option value="سوهاج">سوهاج</option>
                      <option value="قنا">قنا</option>
                      <option value="الأقصر">الأقصر</option>
                      <option value="أسوان">أسوان</option>
                      <option value="البحر الأحمر">البحر الأحمر</option>
                      <option value="محافظة أخرى">محافظة أخرى</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">العنوان بالتفصيل *</label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows="2"
                    placeholder="اسم الشارع، رقم المبنى، الشقة، علامة مميزة..."
                    value={formData.address}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="notes">ملاحظات التوصيل (اختياري)</label>
                  <input
                    type="text"
                    id="notes"
                    name="notes"
                    placeholder="مواعيد التوصيل المفضلة أو أي تعليمات للمندوب"
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>

                <button type="submit" className="btn-primary proceed-btn">
                  <span>الانتقال لخطوة الدفع</span>
                  <ArrowLeft size={18} />
                </button>
              </div>

              {/* Order Summary Sidebar */}
              <div className="checkout-summary-side">
                <div className="summary-card">
                  <h4 className="summary-card-title">
                    <ShoppingBag size={18} />
                    <span>ملخص الطلب ({cartItems.length} منتجات)</span>
                  </h4>

                  <div className="checkout-mini-items">
                    {cartItems.map((item) => (
                      <div key={item.id} className="mini-item-row">
                        <img src={item.image} alt={item.name} className="mini-item-thumb" />
                        <div className="mini-item-details">
                          <p className="mini-item-name">{item.name}</p>
                          <span className="mini-item-qty">الكمية: {item.quantity} × ${Number(item.price).toFixed(2)}</span>
                        </div>
                        <span className="mini-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Box */}
                  <div className="coupon-box-wrapper">
                    {appliedCoupon ? (
                      <div className="applied-coupon-pill">
                        <div className="pill-left">
                          <Tag size={16} />
                          <span>{appliedCoupon.label}</span>
                        </div>
                        <button type="button" onClick={handleRemoveCoupon} className="remove-coupon-btn">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="coupon-input-group">
                        <input
                          type="text"
                          placeholder="كود الخصم (TECH10)"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button type="button" onClick={handleApplyCoupon} className="btn-apply-coupon">
                          تطبيق
                        </button>
                      </div>
                    )}
                    {couponError && <p className="coupon-error-text">{couponError}</p>}
                  </div>

                  <div className="summary-calc-list">
                    <div className="calc-row">
                      <span>المجموع الفرعي:</span>
                      <strong>${subtotal.toFixed(2)}</strong>
                    </div>

                    {discountAmount > 0 && (
                      <div className="calc-row discount-row">
                        <span>الخصم المطبق:</span>
                        <strong>-${discountAmount.toFixed(2)}</strong>
                      </div>
                    )}

                    <div className="calc-row">
                      <span>رسوم الشحن:</span>
                      {isFreeShipping ? (
                        <strong className="free-shipping-tag">مجاناً 🎉</strong>
                      ) : (
                        <strong>${shippingCost.toFixed(2)}</strong>
                      )}
                    </div>

                    <div className="calc-row grand-total-row">
                      <span>الإجمالي النهائي:</span>
                      <strong className="grand-total-amount">${grandTotal.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* ================= STEP 2: PAYMENT METHOD ================= */}
          {step === 2 && (
            <div className="checkout-step-payment">
              <div className="payment-options-grid">
                <div className="payment-select-side">
                  <h3 className="checkout-section-title">
                    <CreditCard size={20} className="section-icon" />
                    <span>اختر طريقة الدفع المناسبة</span>
                  </h3>

                  <div className="payment-methods-list">
                    {/* COD */}
                    <label className={`payment-method-card ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                      />
                      <div className="payment-card-content">
                        <div className="payment-icon-circle cod">💵</div>
                        <div>
                          <strong>الدفع نقدياً عند الاستلام (COD)</strong>
                          <p>ادفع نقداً لمندوب الشحن عند استلام وفحص المنتجات.</p>
                        </div>
                      </div>
                    </label>

                    {/* Credit Card */}
                    <label className={`payment-method-card ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                      />
                      <div className="payment-card-content">
                        <div className="payment-icon-circle card">💳</div>
                        <div>
                          <strong>بطاقة بنكية (Visa / MasterCard / Meeza)</strong>
                          <p>دفع آمن وفوري ومحمي بتشفير 256-bit SSL.</p>
                        </div>
                      </div>
                    </label>

                    {/* Electronic Wallet */}
                    <label className={`payment-method-card ${formData.paymentMethod === 'wallet' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wallet"
                        checked={formData.paymentMethod === 'wallet'}
                        onChange={handleInputChange}
                      />
                      <div className="payment-card-content">
                        <div className="payment-icon-circle wallet">📱</div>
                        <div>
                          <strong>محفظة إلكترونية (فودافون كاش / إنستاباي InstaPay)</strong>
                          <p>تحويل سريع عبر رقم المحفظة الإلكترونية.</p>
                        </div>
                      </div>
                    </label>

                    {/* Apple Pay */}
                    <label className={`payment-method-card ${formData.paymentMethod === 'applepay' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="applepay"
                        checked={formData.paymentMethod === 'applepay'}
                        onChange={handleInputChange}
                      />
                      <div className="payment-card-content">
                        <div className="payment-icon-circle apple">🍏</div>
                        <div>
                          <strong>Apple Pay / Google Pay</strong>
                          <p>إتمام الدفع بلمسة واحدة أو عبر بصمة الوجه.</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Dynamic payment input fields */}
                  {formData.paymentMethod === 'card' && (
                    <div className="card-input-box">
                      <div className="form-group">
                        <label>رقم البطاقة (16 رقم)</label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="4111 2222 3333 4444"
                          maxLength="19"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-row-2">
                        <div className="form-group">
                          <label>تاريخ الانتهاء</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            placeholder="MM/YY"
                            maxLength="5"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>رمز الأمان (CVC)</label>
                          <input
                            type="text"
                            name="cardCvc"
                            placeholder="123"
                            maxLength="4"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'wallet' && (
                    <div className="wallet-input-box">
                      <div className="form-group">
                        <label>رقم المحفظة / عنوان إنستاباي</label>
                        <input
                          type="text"
                          name="walletPhone"
                          placeholder="01xxxxxxxxx أو username@instapay"
                          value={formData.walletPhone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}

                  <div className="payment-actions-row">
                    <button
                      type="button"
                      className="btn-secondary back-btn"
                      onClick={() => setStep(1)}
                    >
                      <ArrowRight size={18} />
                      <span>الرجوع للمعلومات</span>
                    </button>

                    <button
                      type="button"
                      className="btn-primary confirm-order-btn"
                      onClick={handleConfirmOrder}
                    >
                      <ShieldCheck size={20} />
                      <span>تأكيد الطلب (${grandTotal.toFixed(2)})</span>
                    </button>
                  </div>
                </div>

                {/* Shipping Review Side */}
                <div className="shipping-review-card">
                  <h4 className="summary-card-title">
                    <Truck size={18} />
                    <span>بيانات التسليم المسجلة</span>
                  </h4>
                  <div className="review-details-list">
                    <div className="review-detail-item">
                      <span className="review-label">الاسم:</span>
                      <strong className="review-value">{formData.fullName}</strong>
                    </div>
                    <div className="review-detail-item">
                      <span className="review-label">الهاتف:</span>
                      <strong className="review-value" dir="ltr">{formData.phone}</strong>
                    </div>
                    <div className="review-detail-item">
                      <span className="review-label">المدينة:</span>
                      <strong className="review-value">{formData.city}</strong>
                    </div>
                    <div className="review-detail-item">
                      <span className="review-label">العنوان:</span>
                      <strong className="review-value">{formData.address}</strong>
                    </div>
                  </div>

                  <div className="security-badge-box">
                    <ShieldCheck size={28} className="shield-icon" />
                    <div>
                      <strong>تسوق محمي وآمن 100%</strong>
                      <p>جميع بياناتك محمية ومشفرة وفق أعلى معايير الأمان العالمية.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: INVOICE & RECEIPT ================= */}
          {step === 3 && orderSummary && (
            <div className="invoice-container">
              {/* Screen-only congratulations bar */}
              <div className="order-success-banner no-print">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={42} />
                </div>
                <div>
                  <h2>تم تأكيد طلبك بنجاح! 🎉</h2>
                  <p>شكراً لتسوقك من دندرة ستور. تم إرسال رسالة تأكيد إلى هاتفك وسيتم شحن طلبك في أقرب وقت.</p>
                </div>
              </div>

              {/* Printable Invoice Card */}
              <div className="printable-invoice" id="invoice-printable-area">
                {/* Invoice Top Brand Header */}
                <div className="invoice-top-header">
                  <div className="invoice-brand">
                    <div className="invoice-logo">
                      <ShoppingBag size={24} />
                    </div>
                    <div>
                      <h1 className="brand-name">دندرة <span>ستور</span></h1>
                      <p className="brand-tagline">متجر الإلكترونيات والتقنية الحديثة</p>
                    </div>
                  </div>

                  <div className="invoice-meta-right">
                    <span className="invoice-badge">فاتورة ضريبية رسمية</span>
                    <h3 className="invoice-number">{orderSummary.orderId}</h3>
                    <p className="invoice-date">التاريخ: {orderSummary.date}</p>
                  </div>
                </div>

                <hr className="invoice-divider" />

                {/* Customer & Order Information Grid */}
                <div className="invoice-info-grid">
                  <div className="invoice-info-block">
                    <h4>بيانات العميل والشحن:</h4>
                    <p><strong>الاسم:</strong> {orderSummary.customer.fullName}</p>
                    <p><strong>الهاتف:</strong> <span dir="ltr">{orderSummary.customer.phone}</span></p>
                    <p><strong>المحافظة / المدينة:</strong> {orderSummary.customer.city}</p>
                    <p><strong>العنوان:</strong> {orderSummary.customer.address}</p>
                  </div>

                  <div className="invoice-info-block">
                    <h4>تفاصيل الدفع والتسليم:</h4>
                    <p>
                      <strong>طريقة الدفع:</strong>{' '}
                      {orderSummary.customer.paymentMethod === 'cod' && 'الدفع عند الاستلام (COD)'}
                      {orderSummary.customer.paymentMethod === 'card' && 'بطاقة بنكية (Visa/MasterCard)'}
                      {orderSummary.customer.paymentMethod === 'wallet' && 'محفظة إلكترونية'}
                      {orderSummary.customer.paymentMethod === 'applepay' && 'Apple Pay'}
                    </p>
                    <p><strong>حالة الطلب:</strong> <span className="status-badge-paid">مؤكد وجارِ التجهيز</span></p>
                    <p><strong>الشحن المقدر:</strong> خلال 24 - 48 ساعة</p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="invoice-table-wrapper">
                  <table className="invoice-items-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>المنتج والمواصفات</th>
                        <th>التصنيف</th>
                        <th>سعر الوحدة</th>
                        <th>الكمية</th>
                        <th>الإجمالي</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderSummary.items.map((item, idx) => (
                        <tr key={item.id}>
                          <td>{idx + 1}</td>
                          <td className="item-name-cell">
                            <strong>{item.name}</strong>
                          </td>
                          <td>{item.category}</td>
                          <td>${Number(item.price).toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td><strong>${(item.price * item.quantity).toFixed(2)}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Invoice Totals & QR Code */}
                <div className="invoice-bottom-grid">
                  <div className="invoice-qr-side">
                    <div className="qr-box">
                      <QrCode size={76} />
                    </div>
                    <div>
                      <p className="qr-text">امسح الكود لتتبع حالة الشحن والفاتورة الرقمية</p>
                      <span className="security-stamp">✓ فاتورة إلكترونية معتمدة</span>
                    </div>
                  </div>

                  <div className="invoice-totals-side">
                    <div className="invoice-calc-row">
                      <span>المجموع الفرعي:</span>
                      <strong>${orderSummary.subtotal.toFixed(2)}</strong>
                    </div>

                    {orderSummary.discountAmount > 0 && (
                      <div className="invoice-calc-row discount">
                        <span>الخصم ({orderSummary.appliedCoupon?.code}):</span>
                        <strong>-${orderSummary.discountAmount.toFixed(2)}</strong>
                      </div>
                    )}

                    <div className="invoice-calc-row">
                      <span>رسوم الشحن والتوصيل:</span>
                      <strong>
                        {orderSummary.shippingCost === 0 ? 'مجاني' : `$${orderSummary.shippingCost.toFixed(2)}`}
                      </strong>
                    </div>

                    <div className="invoice-calc-row total-highlight">
                      <span>المبلغ الإجمالي المدفوع:</span>
                      <strong className="final-invoice-amount">${orderSummary.grandTotal.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>

                <div className="invoice-footer-note">
                  <p>شكراً لتعاملكم مع دندرة ستور! لأي استفسار أو طلب مساعدة يرجى التواصل مع الدعم الفني على support@dandra-store.com</p>
                </div>
              </div>

              {/* Action Buttons for Invoice */}
              <div className="invoice-actions-footer no-print">
                <button
                  type="button"
                  className="btn-primary print-invoice-btn"
                  onClick={handlePrintInvoice}
                >
                  <Printer size={18} />
                  <span>طباعة الفاتورة 🖨️ / حفظ PDF</span>
                </button>

                <button
                  type="button"
                  className="btn-secondary continue-shopping-btn"
                  onClick={handleFinishAndClose}
                >
                  <span>العودة للمتجر ومتابعة التسوق</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

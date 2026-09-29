import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { translations } from '../data/translations';

export default function Contact({ lang = 'ar' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const t = translations[lang] || translations.ar;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 800);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Mail size={16} />
            <span>{t.contactBadge}</span>
          </div>
          <h2 className="section-title">{t.contactTitle}</h2>
          <p className="section-subtitle">{t.contactSubtitle}</p>
        </div>

        <div className="contact-wrapper">
          {/* Contact Details Cards */}
          <div className="contact-info-panel">
            <div className="contact-info-header">
              <h3>{t.contactInfoTitle}</h3>
              <p>{t.contactInfoSub}</p>
            </div>

            <div className="contact-items-list">
              <div className="contact-item">
                <div className="contact-icon-box">
                  <MapPin size={22} />
                </div>
                <div>
                  <span className="contact-label">اتصل بنا</span>
                  <a href="tel:+201557523934" className="contact-value" dir="ltr">
                    +20 1557523934
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={22} />
                </div>
                <div>
                  <span className="contact-label">البريد الإلكتروني</span>
                  <a href="mailto:support@store.com" className="contact-value">
                    islam@store.com
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <Mail size={22} />
                </div>
                <div>
                  <span className="contact-label">العنوان</span>
                  <span className="contact-value">قنا مصر</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <Clock size={22} />
                </div>
                <div>
                  <span className="contact-label">{t.contactWorkHoursLabel}</span>
                  <strong className="contact-value">{t.contactWorkHoursVal}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-panel">
            {isSubmitted && (
              <div className="success-alert">
                <CheckCircle2 size={24} className="alert-icon" />
                <div>
                  <h4>{t.contactSuccessTitle}</h4>
                  <p>{t.contactSuccessSub}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{t.contactFormNameLabel}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="مثال: إسلام شحات"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t.contactFormEmailLabel}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="islam@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">{t.contactFormPhoneLabel}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="01xxxxxxxxx"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">{t.contactFormSubjectLabel}</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">{lang === 'ar' ? '-- اختر موضوع الرسالة --' : '-- Select subject --'}</option>
                    <option value="general">{t.contactFormSubjectGeneral}</option>
                    <option value="support">{t.contactFormSubjectSupport}</option>
                    <option value="order">{t.contactFormSubjectOrder}</option>
                    <option value="suggestion">{t.contactFormSubjectSuggestion}</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">{t.contactFormMessageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  placeholder={t.contactFormMessagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span>{lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'}</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>{t.contactFormSubmitBtn}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

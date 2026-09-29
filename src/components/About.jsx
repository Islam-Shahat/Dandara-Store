import React from 'react';
import { Award, Zap, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: <Award size={28} className="highlight-icon" />,
      title: "أصالة وجودة مضمونة",
      description: "جميع منتجاتنا أصلية 100% ويتم فحصها بعناية من قِبل خبرائنا لضمان أعلى معايير الجودة."
    },
    {
      icon: <Zap size={28} className="highlight-icon" />,
      title: "توصيل فائق السرعة",
      description: "نلتزم بشبكة توصيل ذكية لضمان وصول طلباتك إلى باب بيتك في أسرع وقت وبأمان تام."
    },
    {
      icon: <HeartHandshake size={28} className="highlight-icon" />,
      title: "تجربة عميل استثنائية",
      description: "فريق دعم مكرّس لخدمتك على مدار الساعة للإجابة على استفساراتك ومساعدتك في كل خطوة."
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* About Image / Visual Side */}
          <div className="about-visual">
            <div className="about-img-box">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                alt="فريق العمل"
                className="about-image"
              />
              <div className="experience-badge">
                <span className="years-number">+7</span>
                <span className="years-text">سنوات من الخبرة والتميز</span>
              </div>
            </div>
          </div>

          {/* About Content Side */}
          <div className="about-content">
            <div className="section-badge">
              <span>من نحن</span>
            </div>
            <h2 className="section-title">نحن نبني مستقبل التسوق الذكي والموثوق</h2>
            <p className="about-lead">
              انطلق متجرنا برؤية واضحة: تقديم منتجات مبتكرة وعصرية تلبي احتياجاتك اليومية 
              بأفضل قيمة مادية وبأسهل تجربة شراء ممكنة.
            </p>

            <p className="about-paragraph">
              نؤمن بأن التسوق الإلكتروني لا يقتصر فقط على شراء منتج، بل هو تجربة متكاملة 
              تبدأ من لحظة التصفح حتى ما بعد استلام المنتج وخدمة ما بعد البيع.
            </p>

            {/* Checklist */}
            <div className="about-checklist">
              <div className="check-item">
                <CheckCircle2 size={20} className="check-icon" />
                <span>أكثر من 50,000 عميل راضٍ عن خدماتنا</span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={20} className="check-icon" />
                <span>سياسة استرجاع مرنة وسهلة بدون أي تعقيدات</span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={20} className="check-icon" />
                <span>طرق دفع متعددة وآمنة ومشفرة بالكامل</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards in About */}
        <div className="about-highlights-grid">
          {highlights.map((item, index) => (
            <div key={index} className="highlight-card">
              <div className="highlight-icon-box">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

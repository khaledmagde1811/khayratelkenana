import { useState, useEffect, useRef } from 'react'
import { FaBookOpen, FaHandHoldingHeart, FaFemale, FaHome, FaUsersCog, FaMosque } from 'react-icons/fa'
import { Link } from 'react-router-dom';const services = [
  {
    icon: FaBookOpen,
    title: 'محو الأمية',
    description: 'برامج تعليمية متخصصة لمحو الأمية وتمكين الأفراد من القراءة والكتابة لبناء مستقبل أفضل',
    accent: '#1d6f42',
    lightBg: 'rgba(29, 111, 66, 0.08)',
    number: '٠١',
  },
  {
    icon: FaHandHoldingHeart,
    title: 'رعاية الأيتام',
    description: 'كفالة ورعاية الأيتام وتوفير احتياجاتهم التعليمية والمعيشية والنفسية لضمان حياة كريمة',
    accent: '#2563eb',
    lightBg: 'rgba(37, 99, 235, 0.08)',
    number: '٠٢',
  },
  {
    icon: FaFemale,
    title: 'دعم المطلقات والأرامل',
    description: 'برامج دعم شاملة تشمل المساعدة المادية والتدريب المهني والدعم النفسي لتمكين المرأة',
    accent: '#7c3aed',
    lightBg: 'rgba(124, 58, 237, 0.08)',
    number: '٠٣',
  },
  {
    icon: FaHome,
    title: 'دعم الأسر المحتاجة',
    description: 'تقديم المساعدات الغذائية والمالية للأسر المحتاجة وضمان توفير الاحتياجات الأساسية',
    accent: '#d97706',
    lightBg: 'rgba(217, 119, 6, 0.08)',
    number: '٠٤',
  },
  {
    icon: FaUsersCog,
    title: 'رعاية كبار السن',
    description: 'خدمات رعاية متكاملة لكبار السن تشمل الرعاية الصحية والاجتماعية والترفيهية',
    accent: '#dc2626',
    lightBg: 'rgba(220, 38, 38, 0.08)',
    number: '٠٥',
  },
  {
    icon: FaMosque,
    title: 'تحفيظ القرآن الكريم',
    description: 'حلقات تحفيظ القرآن الكريم للأطفال والكبار مع نخبة من المعلمين المتخصصين',
    accent: '#059669',
    lightBg: 'rgba(5, 150, 105, 0.08)',
    number: '٠٦',
  },
]

// ─── Hook: observer على عنصر واحد ───────────────────────────────────────────
function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.15, ...options })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

// ─── كارت منفرد — له observer خاص بيه فبيظهر بـ stagger حقيقي ──────────────
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const inView  = useInView(cardRef, { threshold: 0.15 })

  const IconComponent = service.icon

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        // ── fade-up: بيستخدم CSS transition مش animation ──────────────────
        // لما inView يتغير → transition بتشتغل مع delay مختلف لكل كارت
        // لما hovered يتغير → transform بيتغير بدون delay
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? 'translateY(-6px)' : 'translateY(0)'
          : 'translateY(50px)',
        transition: inView
          ? [
              `opacity 0.7s ease ${index * 0.13}s`,
              `transform 0.7s ease ${index * 0.13}s`,
              'background-color 0.35s ease',
              'border-color 0.35s ease',
              'box-shadow 0.35s ease',
            ].join(', ')
          : 'none',
        // ── باقي الستايل كما هو تماماً ──
        position: 'relative',
        backgroundColor: hovered ? service.lightBg : 'var(--bg-card)',
        border: `1.5px solid ${hovered ? service.accent : 'var(--border-color)'}`,
        borderRadius: '20px',
        padding: '36px 28px',
        cursor: 'pointer',
        boxShadow: hovered
          ? `0 24px 48px rgba(0,0,0,0.1), 0 0 0 1px ${service.accent}22`
          : '0 1px 4px rgba(0,0,0,0.05)',
        overflow: 'hidden',
      }}
    >
      {/* رقم watermark */}
      <div style={{
        position: 'absolute',
        top: '12px', left: '20px',
        fontSize: '4rem',
        fontWeight: '900',
        color: hovered ? service.accent : 'var(--border-color)',
        opacity: 0.15,
        lineHeight: 1,
        transition: 'all 0.35s ease',
        fontFamily: 'monospace',
        userSelect: 'none',
      }}>
        {service.number}
      </div>

      {/* شريط علوي */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0, left: 0,
        height: '3px',
        backgroundColor: service.accent,
        borderRadius: '20px 20px 0 0',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'right',
        transition: 'transform 0.35s ease',
      }} />

      {/* الأيقونة */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        backgroundColor: hovered ? service.accent : 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        transition: 'all 0.35s ease',
        boxShadow: hovered ? `0 8px 20px ${service.accent}40` : 'none',
      }}>
        <IconComponent
          size={28}
          color={hovered ? '#ffffff' : service.accent}
          style={{ transition: 'all 0.35s ease' }}
        />
      </div>

      {/* العنوان */}
      <h3 style={{
        fontSize: '1.15rem',
        fontWeight: '800',
        color: hovered ? service.accent : 'var(--text-primary)',
        marginBottom: '12px',
        transition: 'color 0.3s ease',
      }}>
        {service.title}
      </h3>

      {/* الوصف */}
      <p style={{
        fontSize: '0.92rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.9,
      }}>
        {service.description}
      </p>

      {/* سهم */}
      <div style={{
        marginTop: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: service.accent,
        fontWeight: '700',
        fontSize: '0.875rem',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateX(0)' : 'translateX(10px)',
        transition: 'all 0.3s ease',
      }}>
        اعرف أكثر
        <span>←</span>
      </div>
    </div>
  )
}

// ─── الكمبوننت الرئيسية ───────────────────────────────────────────────────────
export default function ServicesSection() {
  const headerRef    = useRef(null)
  const ctaRef       = useRef(null)
  const headerInView = useInView(headerRef)
  const ctaInView    = useInView(ctaRef)

  return (
    <section style={{
      backgroundColor: 'var(--bg-primary)',
      padding: '100px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ديكور خلفية */}
      <div style={{
        position: 'absolute', top: '-100px', left: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(29,111,66,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', right: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(29,111,66,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* ===== Header ===== */}
        <div
          ref={headerRef}
          style={{
            marginBottom: '80px',
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              width: '48px', height: '4px',
              backgroundColor: 'var(--btn-primary-bg)',
              borderRadius: '999px',
            }} />
            <span style={{
              color: 'var(--btn-primary-bg)',
              fontWeight: '700',
              fontSize: '0.9rem',
            }}>
              ما نقدمه لمجتمعنا
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: '800',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              maxWidth: '500px',
            }}>
              خدماتنا للمجتمع
              <span style={{ color: 'var(--btn-primary-bg)', display: 'block' }}>
                بكل محبة وإخلاص 
              </span>
            </h2>

            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              maxWidth: '380px',
              lineHeight: 1.8,
            }}>
              نقدم مجموعة متكاملة من الخدمات الاجتماعية لخدمة أبناء مجتمعنا والنهوض بهم نحو حياة أفضل
            </p>
          </div>
        </div>

        {/* ===== الكروت — كل كارت بـ observer لوحده = stagger حقيقي ===== */}
        <div className="services-grid-v2">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* ===== CTA ===== */}
        <div
          ref={ctaRef}
          style={{
            marginTop: '72px',
            textAlign: 'center',
            padding: '48px 32px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(29,111,66,0.08) 0%, rgba(29,111,66,0.03) 100%)',
            border: '1px solid rgba(29,111,66,0.15)',
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}
        >
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: '20px',
          }}>
            تريد الاستفادة من خدماتنا أو الانضمام لفريق التطوع؟
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
         <Link to="/contact" style={{ textDecoration: 'none' }}>
  <button
    style={{
      backgroundColor: 'var(--btn-primary-bg)',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      padding: '14px 32px',
      fontFamily: 'Almarai, sans-serif',
      fontWeight: '700',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(29,111,66,0.3)',
    }}
    onMouseOver={e => {
      e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover)'
      e.currentTarget.style.transform = 'translateY(-2px)'
    }}
    onMouseOut={e => {
      e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)'
      e.currentTarget.style.transform = 'translateY(0)'
    }}
  >
    تواصل معنا الآن
  </button>
</Link>
                        <Link to="https://docs.google.com/forms/d/e/1FAIpQLSfDzQ8vMZoI4gRf_mMT5cWGPauN7ODu-poPnvoUAp0QQyW_YA/viewform?usp=header" >
                        
            <button
              style={{
                backgroundColor: 'transparent',
                color: 'var(--btn-secondary-text)',
                border: '2px solid var(--btn-secondary-border)',
                borderRadius: '10px',
                padding: '14px 32px',
                fontFamily: 'Almarai, sans-serif',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--btn-secondary-text)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              انضم كمتطوع 
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
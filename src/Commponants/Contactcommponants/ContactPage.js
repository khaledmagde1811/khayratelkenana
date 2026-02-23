import { useState, useRef, useEffect } from 'react'
import {
  FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt,
  FaFacebook, FaYoutube, FaPaperPlane, FaCheckCircle
} from 'react-icons/fa'
import emailjs from '@emailjs/browser'

// ✅ init مرة واحدة برة الكومبوننت
emailjs.init('z9k6c8Yy2pFXZDFGl')

function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect() }
    }, { threshold: 0.1, ...options })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

const contactCards = [
  {
    icon: FaPhone,
    title: 'اتصل بنا',
    value: '01034686688',
    sub: 'متاحون من السبت للخميس',
    accent: '#1d6f42',
    href: 'tel:01034686688',
    btnText: 'اتصل الآن',
    external: false,
  },
  {
    icon: FaWhatsapp,
    title: 'واتساب',
    value: '01034686688',
    sub: 'راسلنا في أي وقت',
    accent: '#25d366',
    href: 'https://wa.me/201034686688',
    btnText: 'راسلنا على واتساب',
    external: true,
  },
  {
    icon: FaEnvelope,
    title: 'البريد الإلكتروني',
    value: 'khayratelkenana@gmail.com',
    sub: 'سنرد خلال ٢٤ ساعة',
    accent: '#2563eb',
    href: 'mailto:khayratelkenana@gmail.com',
    btnText: 'أرسل بريداً',
    external: false,
  },
  {
    icon: FaMapMarkerAlt,
    title: 'موقعنا',
    value: 'مصر — القاهرة',
    sub: 'مقر المؤسسة الرئيسي',
    accent: '#d97706',
    href: 'https://maps.app.goo.gl/z7WuQUnoN5XAP4io8',
    btnText: 'عرض الموقع',
    external: true,
  },
]

export default function ContactPage() {
  const headerRef    = useRef(null)
  const formRef      = useRef(null)
  const headerInView = useInView(headerRef)
  const formInView   = useInView(formRef)

  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [error, setError]     = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await emailjs.send(
        'service_7vdb3j3',
        'template_vkqzfti',
        {
          from_name:  form.name,
          from_email: form.email || 'لم يُذكر',
          phone:      form.phone || 'لم يُذكر',
          message:    form.message,
          to_email:   'khayratelkenana@gmail.com',
          time:       new Date().toLocaleString('ar-EG'),
        }
      )
      console.log('EmailJS success:', result)
      setSent(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setError('حدث خطأ أثناء الإرسال، تحقق من الاتصال وحاول مرة أخرى')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) {
          .contact-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-main-grid  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .contact-cards-grid { grid-template-columns: 1fr !important; }
          .form-row           { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ===== Hero ===== */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2318 0%, #1d6f42 60%, #2d9e62 100%)',
        padding: '140px 24px 80px',
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
        }} />
        <div ref={headerRef} style={{
          maxWidth: '650px', margin: '0 auto',
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '6px 18px', borderRadius: '999px', marginBottom: '24px',
          }}>
            <FaPhone size={12} color="#4ade80" />
            <span style={{ color: '#4ade80', fontWeight: '700', fontSize: '0.85rem' }}>
              نحن هنا من أجلك
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '800', color: '#fff', lineHeight: 1.2, marginBottom: '20px',
          }}>
            تواصل معنا
          </h1>
          <p style={{
            fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.9, maxWidth: '480px', margin: '0 auto',
          }}>
            يسعدنا التواصل معك في أي وقت، سواء للاستفسار أو الدعم أو الانضمام إلينا
          </p>
        </div>
      </div>

      <div style={{ height: '4px', background: 'linear-gradient(to left, #1d6f42, #4ade80, #1d6f42)' }} />

{/* ===== كروت التواصل ===== */}
<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 0' }}>
  <div className="contact-cards-grid" style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  }}>
    {contactCards.map((card, i) => {
      const IconComponent = card.icon
      const isHovered = hovered === i
      return (
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '20px', padding: '32px 24px',
            border: `1.5px solid ${isHovered ? card.accent : 'var(--border-color)'}`,
            textAlign: 'center', transition: 'all 0.35s ease',
            transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
            boxShadow: isHovered ? `0 20px 48px rgba(0,0,0,0.1)` : '0 2px 8px rgba(0,0,0,0.04)',
            position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          {/* خلفية */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundColor: card.accent,
            opacity: isHovered ? 0.04 : 0,
            transition: 'opacity 0.35s ease',
            pointerEvents: 'none',
          }} />

          {/* شريط علوي */}
          <div style={{
            position: 'absolute', top: 0, right: 0, left: 0, height: '3px',
            backgroundColor: card.accent,
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.35s ease',
          }} />

          {/* أيقونة */}
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            backgroundColor: isHovered ? card.accent : 'var(--bg-secondary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '20px', transition: 'all 0.35s ease',
            boxShadow: isHovered ? `0 8px 24px ${card.accent}40` : 'none',
            position: 'relative', zIndex: 1,
          }}>
            <IconComponent size={26} color={isHovered ? '#fff' : card.accent} />
          </div>

          <h3 style={{
            fontSize: '1rem', fontWeight: '800',
            color: isHovered ? card.accent : 'var(--text-primary)',
            marginBottom: '10px', transition: 'color 0.3s ease',
            position: 'relative', zIndex: 1,
          }}>
            {card.title}
          </h3>

          <p style={{
            fontSize: '0.85rem', fontWeight: '700',
            color: 'var(--text-primary)', marginBottom: '8px',
            wordBreak: 'break-all', position: 'relative', zIndex: 1,
          }}>
            {card.value}
          </p>

          <p style={{
            fontSize: '0.8rem', color: 'var(--text-secondary)',
            fontWeight: '600', marginBottom: '20px',
            position: 'relative', zIndex: 1,
          }}>
            {card.sub}
          </p>

          
 
           <a href={card.href}
            target={card.external ? '_blank' : '_self'}
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              textDecoration: 'none',
              backgroundColor: isHovered ? card.accent : 'var(--bg-secondary)',
              color: isHovered ? '#fff' : card.accent,
              fontWeight: '700', fontSize: '0.85rem',
              padding: '10px 20px', borderRadius: '10px',
              transition: 'all 0.3s ease',
              border: `1px solid ${card.accent}44`,
              position: 'relative', zIndex: 1,
            }}
          >
            {card.btnText}
          </a>
        </div>   
      )
    })}
  </div>
</div>

      {/* ===== فورم + معلومات ===== */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <div className="contact-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: '32px', alignItems: 'start',
        }}>

          {/* ===== الفورم ===== */}
          <div ref={formRef} style={{
            opacity: formInView ? 1 : 0,
            transform: formInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}>
            <div style={{
              backgroundColor: 'var(--bg-card)', borderRadius: '24px',
              padding: '40px', border: '1px solid var(--border-color)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}>
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '36px', height: '4px', backgroundColor: '#1d6f42', borderRadius: '999px' }} />
                  <span style={{ color: '#1d6f42', fontWeight: '700', fontSize: '0.85rem' }}>أرسل رسالة</span>
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  كيف يمكننا مساعدتك؟
                </h2>
              </div>

              {sent ? (
                <div style={{
                  textAlign: 'center', padding: '48px 24px',
                  backgroundColor: 'rgba(29,111,66,0.06)',
                  borderRadius: '16px', border: '1px solid rgba(29,111,66,0.2)',
                }}>
                  <FaCheckCircle size={48} color="#1d6f42" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    تم إرسال رسالتك!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    شكراً لتواصلك معنا، سنرد عليك في أقرب وقت ممكن
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    style={{
                      marginTop: '20px', backgroundColor: '#1d6f42', color: '#fff',
                      border: 'none', borderRadius: '10px', padding: '10px 24px',
                      fontFamily: 'Almarai, sans-serif', fontWeight: '700',
                      cursor: 'pointer', fontSize: '0.9rem',
                    }}
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* الاسم */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                      الاسم الكامل <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type="text" name="name" required
                      value={form.name} onChange={handleChange}
                      placeholder="أدخل اسمك الكامل"
                      style={{
                        width: '100%', padding: '12px 16px', borderRadius: '12px',
                        fontSize: '0.9rem', fontFamily: 'Almarai, sans-serif',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1.5px solid var(--border-color)',
                        color: 'var(--text-primary)', outline: 'none',
                        boxSizing: 'border-box', transition: 'border-color 0.3s ease',
                      }}
                      onFocus={e => e.target.style.borderColor = '#1d6f42'}
                      onBlur={e  => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </div>

                  {/* إيميل + هاتف */}
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email" name="email"
                        value={form.email} onChange={handleChange}
                        placeholder="example@gmail.com"
                        style={{
                          width: '100%', padding: '12px 16px', borderRadius: '12px',
                          fontSize: '0.9rem', fontFamily: 'Almarai, sans-serif',
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1.5px solid var(--border-color)',
                          color: 'var(--text-primary)', outline: 'none',
                          boxSizing: 'border-box', transition: 'border-color 0.3s ease',
                        }}
                        onFocus={e => e.target.style.borderColor = '#1d6f42'}
                        onBlur={e  => e.target.style.borderColor = 'var(--border-color)'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        رقم الهاتف
                      </label>
                      <input
                        type="tel" name="phone"
                        value={form.phone} onChange={handleChange}
                        placeholder="01xxxxxxxxx"
                        style={{
                          width: '100%', padding: '12px 16px', borderRadius: '12px',
                          fontSize: '0.9rem', fontFamily: 'Almarai, sans-serif',
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1.5px solid var(--border-color)',
                          color: 'var(--text-primary)', outline: 'none',
                          boxSizing: 'border-box', transition: 'border-color 0.3s ease',
                        }}
                        onFocus={e => e.target.style.borderColor = '#1d6f42'}
                        onBlur={e  => e.target.style.borderColor = 'var(--border-color)'}
                      />
                    </div>
                  </div>

                  {/* الرسالة */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                      رسالتك <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <textarea
                      name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="اكتب رسالتك هنا..."
                      style={{
                        width: '100%', padding: '12px 16px', borderRadius: '12px',
                        fontSize: '0.9rem', fontFamily: 'Almarai, sans-serif',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1.5px solid var(--border-color)',
                        color: 'var(--text-primary)', outline: 'none',
                        resize: 'vertical', boxSizing: 'border-box',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={e => e.target.style.borderColor = '#1d6f42'}
                      onBlur={e  => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </div>

                  {/* رسالة خطأ */}
                  {error && (
                    <div style={{
                      backgroundColor: 'rgba(220,38,38,0.08)',
                      border: '1px solid rgba(220,38,38,0.25)',
                      borderRadius: '10px', padding: '12px 16px',
                      fontSize: '0.875rem', color: '#dc2626', fontWeight: '600',
                    }}>
                      ⚠️ {error}
                    </div>
                  )}

                  {/* زرار الإرسال */}
                  <button
                    type="submit" disabled={loading}
                    style={{
                      backgroundColor: '#1d6f42', color: '#fff', border: 'none',
                      borderRadius: '12px', padding: '14px 32px',
                      fontFamily: 'Almarai, sans-serif', fontWeight: '700', fontSize: '1rem',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 16px rgba(29,111,66,0.3)',
                    }}
                    onMouseOver={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseOut={e  => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {loading ? (
                      <>
                        <div style={{
                          width: '18px', height: '18px', borderRadius: '50%',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff',
                          animation: 'spin 0.8s linear infinite',
                        }} />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane size={16} />
                        إرسال الرسالة
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ===== معلومات إضافية ===== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* واتساب */}
            <a href="https://wa.me/201034686688" target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                textDecoration: 'none', backgroundColor: '#25d366',
                borderRadius: '20px', padding: '28px',
                boxShadow: '0 8px 32px rgba(37,211,102,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(37,211,102,0.4)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,211,102,0.3)'
              }}
            >
              <div style={{
                width: '60px', height: '60px', borderRadius: '16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <FaWhatsapp size={32} color="#fff" />
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>
                  تواصل سريع عبر
                </p>
                <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '800', marginBottom: '4px' }}>واتساب</p>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: '700' }}>01034686688</p>
              </div>
            </a>

            {/* أوقات العمل */}
            <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '20px', padding: '28px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#1d6f42', boxShadow: '0 0 0 3px rgba(29,111,66,0.2)' }} />
                أوقات التواصل
              </h3>
              {[
                { day: 'السبت — الخميس', time: '٩ ص — ٥ م', active: true },
                { day: 'الجمعة', time: 'مغلق', active: false },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', borderBottom: i === 0 ? '1px solid var(--border-color)' : 'none',
                }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{item.day}</span>
                  <span style={{
                    fontSize: '0.85rem', fontWeight: '700',
                    color: item.active ? '#1d6f42' : '#dc2626',
                    backgroundColor: item.active ? 'rgba(29,111,66,0.1)' : 'rgba(220,38,38,0.1)',
                    padding: '3px 12px', borderRadius: '999px',
                  }}>
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* سوشيال ميديا */}
            <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '20px', padding: '28px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px' }}>
                تابعنا على السوشيال ميديا
              </h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { icon: FaFacebook, color: '#1877f2', label: 'فيسبوك', href: 'https://www.facebook.com/people/%D8%AE%D9%8A%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D9%83%D9%86%D8%A7%D9%86%D8%A9/61581746799969/' },
                  { icon: FaWhatsapp, color: '#25d366', label: 'واتساب', href: 'https://wa.me/201034686688' },
                ].map((s, i) => {
                  const Icon = s.icon
                  return (
                    <a key={i} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                      style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: s.color, textDecoration: 'none', transition: 'all 0.3s ease',
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.backgroundColor = s.color
                        e.currentTarget.style.borderColor = s.color
                        e.currentTarget.style.transform = 'translateY(-3px)'
                        e.currentTarget.querySelector('svg') && (e.currentTarget.querySelector('svg').style.color = '#fff')
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                        e.currentTarget.style.borderColor = 'var(--border-color)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <Icon size={20} color={s.color} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
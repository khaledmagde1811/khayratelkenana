import { useState, useRef, useEffect } from 'react'
import { FaUniversity, FaMobileAlt, FaCopy, FaCheckCircle, FaHeart, FaShieldAlt, FaLock } from 'react-icons/fa'
import { SiVodafone } from 'react-icons/si'
import emailjs from '@emailjs/browser'

emailjs.init({ publicKey: 'z9k6c8Yy2pFXZDFGl' })

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

const donationAmounts = [50, 100, 200, 500, 1000]

const paymentMethods = [
  {
    id: 'instapay',
    name: 'انستاباي',
    icon: FaMobileAlt,
    accent: '#7c3aed',
    lightBg: 'rgba(124,58,237,0.08)',
    description: 'تحويل فوري عبر تطبيق انستاباي',
    details: [
      { label: 'اسم المستخدم', value: 'khayratelkenana' },
      { label: 'رقم الهاتف',   value: '01034686688' },
    ],
    steps: [
      'افتح تطبيق البنك أو المحفظة',
      'اختر "انستاباي"',
      'أدخل اسم المستخدم أو رقم الهاتف',
      'أدخل المبلغ واضغط إرسال',
    ],
  },
  {
    id: 'vodafone',
    name: 'فودافون كاش',
    icon: SiVodafone,
    accent: '#dc2626',
    lightBg: 'rgba(220,38,38,0.08)',
    description: 'تحويل سريع عبر فودافون كاش',
    details: [
      { label: 'رقم الهاتف', value: '01034686688' },
      { label: 'الاسم',      value: 'خيرات الكنانة' },
    ],
    steps: [
      'اضغط *9# أو افتح تطبيق فودافون كاش',
      'اختر "تحويل أموال"',
      'أدخل الرقم 01034686688',
      'أدخل المبلغ وأكد التحويل',
    ],
  },
  {
    id: 'bank',
    name: 'تحويل بنكي',
    icon: FaUniversity,
    accent: '#1d6f42',
    lightBg: 'rgba(29,111,66,0.08)',
    description: 'تحويل آمن عبر البنك',
    details: [
      { label: 'اسم الحساب',  value: 'مؤسسة خيرات الكنانة للدفاع الاجتماعي' },
      { label: 'رقم الحساب',  value: '1234567890123456' },
      { label: 'اسم البنك',   value: 'بنك مصر' },
      { label: 'رقم الآيبان', value: 'EG123456789012345678901234' },
    ],
    steps: [
      'افتح تطبيق البنك الخاص بك',
      'اختر "تحويل بنكي"',
      'أدخل بيانات الحساب أعلاه',
      'أرسل إيصال التحويل على واتساب',
    ],
  },
]

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      title="نسخ"
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: copied ? '#1d6f42' : 'var(--text-secondary)',
        padding: '4px', borderRadius: '6px',
        transition: 'all 0.2s ease', flexShrink: 0,
        display: 'flex', alignItems: 'center',
      }}
    >
      {copied ? <FaCheckCircle size={14} /> : <FaCopy size={14} />}
    </button>
  )
}

export default function DonatePage() {
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef)

  const [activeMethod, setActiveMethod] = useState('instapay')
  const [selectedAmt,  setSelectedAmt]  = useState(100)
  const [customAmt,    setCustomAmt]    = useState('')
  const [donorName,    setDonorName]    = useState('')
  const [confirmed,    setConfirmed]    = useState(false)
  const [sending,      setSending]      = useState(false)  // ✅ جوه الكومبوننت

  const activeCard = paymentMethods.find(m => m.id === activeMethod)
  const finalAmt   = customAmt || selectedAmt

  // ✅ جوه الكومبوننت
  const handleConfirm = async () => {
    if (!finalAmt || finalAmt === '0') {
      alert('من فضلك اختر مبلغ التبرع')
      return
    }
    setSending(true)
    try {
await emailjs.send(
  'service_7vdb3j3',        // ✅ مباشرة مش من .env
  'template_9qq6muo',       // ✅ مباشرة مش من .env
  {
    donor_name: donorName || 'متبرع مجهول',
    amount:     finalAmt,
    method:     activeCard.name,
    time:       new Date().toLocaleString('ar-EG'),
  }
)
      setConfirmed(true)
    } catch (error) {
      alert('حدث خطأ، حاول مرة أخرى')
      console.error(error)
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>

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
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)', pointerEvents: 'none',
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
            <span style={{ color: '#4ade80', fontWeight: '700', fontSize: '0.85rem' }}>
              تبرعك يصنع الفرق
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '800', color: '#fff', lineHeight: 1.2, marginBottom: '20px',
          }}>
            تبرع الآن
          </h1>
          <p style={{
            fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.9, maxWidth: '500px', margin: '0 auto',
          }}>
            تبرعك مهما كان صغيراً يُحدث فرقاً حقيقياً في حياة أسرة محتاجة
          </p>
        </div>
      </div>

      <div style={{ height: '4px', background: 'linear-gradient(to left, #1d6f42, #4ade80, #1d6f42)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px' }}>
        <div className="donate-grid">

          {/* ===== يسار ===== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* اختيار المبلغ */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '24px', padding: '32px',
              border: '1px solid var(--border-color)',
            }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                اختر مبلغ التبرع
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                بالجنيه المصري
              </p>

              <div className="amounts-grid">
                {donationAmounts.map(amt => (
                  <button
                    key={amt}
                    onClick={() => { setSelectedAmt(amt); setCustomAmt('') }}
                    style={{
                      padding: '14px', borderRadius: '12px',
                      fontFamily: 'Almarai, sans-serif', fontWeight: '800', fontSize: '1rem',
                      cursor: 'pointer', transition: 'all 0.25s ease',
                      backgroundColor: selectedAmt === amt && !customAmt ? '#1d6f42' : 'var(--bg-secondary)',
                      color:           selectedAmt === amt && !customAmt ? '#fff' : 'var(--text-primary)',
                      border:          selectedAmt === amt && !customAmt ? '2px solid #1d6f42' : '2px solid var(--border-color)',
                      boxShadow:       selectedAmt === amt && !customAmt ? '0 4px 16px rgba(29,111,66,0.3)' : 'none',
                    }}
                  >
                    {amt} ج.م
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '16px', position: 'relative' }}>
                <input
                  type="number"
                  placeholder="أو أدخل مبلغاً آخر..."
                  value={customAmt}
                  onChange={e => { setCustomAmt(e.target.value); setSelectedAmt(null) }}
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '12px',
                    fontSize: '0.95rem', fontFamily: 'Almarai, sans-serif',
                    backgroundColor: 'var(--bg-secondary)',
                    border: `2px solid ${customAmt ? '#1d6f42' : 'var(--border-color)'}`,
                    color: 'var(--text-primary)', outline: 'none',
                    boxSizing: 'border-box', transition: 'border-color 0.3s ease',
                  }}
                />
                <span style={{
                  position: 'absolute', left: '16px', top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '700',
                }}>
                  ج.م
                </span>
              </div>

              <div style={{ marginTop: '16px' }}>
                <input
                  type="text"
                  placeholder="اسمك (اختياري)"
                  value={donorName}
                  onChange={e => setDonorName(e.target.value)}
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '12px',
                    fontSize: '0.95rem', fontFamily: 'Almarai, sans-serif',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '2px solid var(--border-color)',
                    color: 'var(--text-primary)', outline: 'none',
                    boxSizing: 'border-box', transition: 'border-color 0.3s ease',
                  }}
                  onFocus={e => e.target.style.borderColor = '#1d6f42'}
                  onBlur={e  => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>
            </div>

            {/* طريقة الدفع */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '24px', padding: '32px',
              border: '1px solid var(--border-color)',
            }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '20px' }}>
                طريقة الدفع
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {paymentMethods.map(method => {
                  const IconComponent = method.icon
                  const isActive = activeMethod === method.id
                  return (
                    <button
                      key={method.id}
                      onClick={() => setActiveMethod(method.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        padding: '16px 20px', borderRadius: '14px',
                        fontFamily: 'Almarai, sans-serif', cursor: 'pointer',
                        backgroundColor: isActive ? method.lightBg : 'var(--bg-secondary)',
                        border: `2px solid ${isActive ? method.accent : 'var(--border-color)'}`,
                        transition: 'all 0.25s ease', textAlign: 'right',
                      }}
                    >
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '12px',
                        backgroundColor: isActive ? method.accent : 'var(--bg-card)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'all 0.25s ease',
                        boxShadow: isActive ? `0 4px 12px ${method.accent}40` : 'none',
                      }}>
                        <IconComponent size={20} color={isActive ? '#fff' : method.accent} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '0.95rem', fontWeight: '800', margin: 0,
                          color: isActive ? method.accent : 'var(--text-primary)',
                          transition: 'color 0.25s ease',
                        }}>
                          {method.name}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                          {method.description}
                        </p>
                      </div>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '50%',
                        border: `2px solid ${isActive ? method.accent : 'var(--border-color)'}`,
                        backgroundColor: isActive ? method.accent : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'all 0.25s ease',
                      }}>
                        {isActive && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fff' }} />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ===== يمين ===== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* ملخص */}
            <div style={{
              backgroundColor: activeCard.lightBg, borderRadius: '20px', padding: '24px',
              border: `1.5px solid ${activeCard.accent}33`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>مبلغ التبرع</span>
                <span style={{ fontSize: '1.6rem', fontWeight: '800', color: activeCard.accent }}>
                  {finalAmt || '0'} ج.م
                </span>
              </div>
              {donorName && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>باسم</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>{donorName}</span>
                </div>
              )}
            </div>

            {/* تفاصيل الدفع */}
            <div style={{
              backgroundColor: 'var(--bg-card)', borderRadius: '24px', padding: '32px',
              border: '1px solid var(--border-color)', flex: 1,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  backgroundColor: activeCard.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 16px ${activeCard.accent}40`,
                }}>
                  <activeCard.icon size={22} color="#fff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                    {activeCard.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                    {activeCard.description}
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeCard.details.map((detail, i) => (
                  <div key={i} style={{
                    backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', padding: '14px 16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', margin: '0 0 4px' }}>
                        {detail.label}
                      </p>
                      <p style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, wordBreak: 'break-all' }}>
                        {detail.value}
                      </p>
                    </div>
                    <CopyBtn text={detail.value} />
                  </div>
                ))}
              </div>

              {/* الخطوات */}
              <div style={{
                backgroundColor: 'rgba(29,111,66,0.05)', borderRadius: '16px', padding: '20px',
                border: '1px solid rgba(29,111,66,0.12)', marginBottom: '24px',
              }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '14px' }}>
                  خطوات التبرع
                </h4>
                {activeCard.steps.map((step, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    marginBottom: i < activeCard.steps.length - 1 ? '12px' : 0,
                  }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      backgroundColor: activeCard.accent, color: '#fff',
                      fontSize: '0.75rem', fontWeight: '800',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, paddingTop: '2px' }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* زرار التأكيد */}
              {confirmed ? (
                <div style={{
                  textAlign: 'center', padding: '20px',
                  backgroundColor: 'rgba(29,111,66,0.08)',
                  borderRadius: '14px', border: '1px solid rgba(29,111,66,0.2)',
                }}>
                  <FaCheckCircle size={32} color="#1d6f42" style={{ marginBottom: '8px' }} />
                  <p style={{ fontWeight: '800', color: '#1d6f42', fontSize: '1rem', margin: '0 0 4px' }}>
                    شكراً لك!
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                    جزاك الله خيراً على تبرعك
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleConfirm}
                  disabled={sending}
                  style={{
                    width: '100%', padding: '16px',
                    borderRadius: '14px', border: 'none',
                    fontFamily: 'Almarai, sans-serif', fontWeight: '800', fontSize: '1rem',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    opacity: sending ? 0.7 : 1,
                    backgroundColor: activeCard.accent, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    boxShadow: `0 4px 20px ${activeCard.accent}40`,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={e => { if (!sending) e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseOut={e  => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {sending ? (
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
                      <FaHeart size={16} />
                      أكدت التحويل — جزاك الله خيراً
                    </>
                  )}
                </button>
              )}

              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>

            {/* أمان */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              justifyContent: 'center', padding: '16px',
              backgroundColor: 'var(--bg-card)', borderRadius: '14px',
              border: '1px solid var(--border-color)',
            }}>
              <FaShieldAlt size={16} color="#1d6f42" />
              <FaLock size={14} color="var(--text-secondary)" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                تبرعك آمن وموثوق — جميع البيانات محمية
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
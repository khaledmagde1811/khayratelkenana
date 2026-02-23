import { useState, useEffect, useRef, useCallback } from 'react'

// ─── بيانات الأنشطة ──────────────────────────────────────────────────────────
import img3 from '../../imges/img3.jpeg'
import img4 from '../../imges/img4.jpeg'
import img5 from '../../imges/img5.jpeg'
import img6 from '../../imges/img6.jpeg'
import img7 from '../../imges/img7.jpeg'

const activities = [
  {
    id: 1,
    category: 'تعليم',
    title: 'شرح السيرة النبوية للأولاد',
    description: 'فضلُ تعلّم الطفلِ السيرةَ النبوية عظيم، فهي تغرس في قلبه حبَّ النبي ﷺ، وتعرّفه بقيم العلم والرحمة والأخلاق، وتبني شخصيته على القدوة الحسنة منذ الصغر.',
    date: 'مارس ٢٠٢٤',
    location: '   مقر المؤسسة',
    img: img3,
    accent: '#1d6f42',
  },
  {
    id: 2,
    category: 'تربية',
    title: ' دروس التربية ',
    description: 'في دروس التربية يتعلّم الطفل الأخلاق الجميلة، مثل الاحترام والصدق والتعاون، ليكبر بقلب طيب وسلوك حسن',
    date: 'نوفمبر ٢٠٢٣',
    location: '   مقر المؤسسة',
    img: img4,
    accent: '#2563eb',
  },
  {
    id: 3,
    category: 'احتفال بعودة المدارس ',
    title: 'توزيع هدايا علي الطلاب ',
    date: 'يونيو ٢٠٢٤',
    description: 'مع عودة الدراسة يبدأ فصلٌ جديد من الاجتهاد والطموح، وتعود المدارس لتنبض بالحياة والفرح. هي فرصة لبداية قوية، وتنظيم الوقت، وتحقيق أهداف جديدة نحو عام مليء بالنجاح والتفوّق',
        location: '   مقر المؤسسة',
    img: img5,
    accent: '#059669',
  },
  {
    id: 4,
    category: 'تكريم',
    title: 'تكريم طلاب البستان    ',
    description: 'حفظ القرآن من أعظم القيم التي يتعلّمها الطفل، فهو ينير قلبه، ويغرس في نفسه الأخلاق الحميدة، ويقوده نحو السلوك الصالح والبركة في حياته',
    date: 'أبريل ٢٠٢٤',
       location: '   مقر المؤسسة',
    img: img6,
    accent: '#d97706',
  },
  {
    id: 5,
    category: 'تربية ',
    title: 'دروس تربية من أحاديث النبي صلى الله عليه وسلم   ',
    description: 'الدروس التربوية من أحاديث النبي ﷺ ذات أهمية كبيرة، فهي تغرس في قلب الطفل القيم الأخلاقية مثل الصدق، والأمانة، والاحترام، وتعلّمه كيفية التعامل مع الآخرين بحكمة ولطف، لتكوّن شخصيته على القدوة الحسنة منذ الصغر',
    date: 'فبراير ٢٠٢٤',
        location: '   مقر المؤسسة',
    img: img7,
    accent: '#dc2626',
  },
]

// ─── Hook: IntersectionObserver ───────────────────────────────────────────────
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

// ─── بطاقة نشاط واحدة ────────────────────────────────────────────────────────
function ActivityCard({ activity, index, isActive }) {
  const cardRef = useRef(null)
  const inView  = useInView(cardRef, { threshold: 0.1 })

  return (
    <div
      ref={cardRef}
      style={{
        opacity:   inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(60px)',
        flex:      '0 0 auto',
        width:     '340px',
        height:    '100%',          // ✅
        display:   'flex',          // ✅
        flexDirection: 'column',    // ✅
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-card)',
        border: `1.5px solid ${isActive ? activity.accent : 'var(--border-color)'}`,
        boxShadow: isActive
          ? `0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px ${activity.accent}33`
          : '0 2px 8px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        scrollSnapAlign: 'start',
        transition: `
          opacity 0.7s ease ${index * 0.12}s,
          transform 0.7s ease ${index * 0.12}s,
          box-shadow 0.4s ease,
          border-color 0.4s ease
        `,
      }}
    >
      {/* الصورة */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={activity.img}
          alt={activity.title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.07)'}
          onMouseOut={e  => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          backgroundColor: activity.accent,
          color: '#fff', fontSize: '0.75rem', fontWeight: '700',
          padding: '4px 12px', borderRadius: '999px',
        }}>
          {activity.category}
        </div>
        <div style={{
          position: 'absolute', bottom: '14px', right: '14px',
          color: '#fff', fontSize: '0.78rem', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '5px',
          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
        }}>
          <span>📅</span> {activity.date}
        </div>
      </div>

      {/* المحتوى */}
      <div style={{
        padding: '22px 20px',
        display: 'flex',         // ✅
        flexDirection: 'column', // ✅
        flex: 1,                 // ✅ يملا الباقي
      }}>
        <h3 style={{
          fontSize: '1.05rem', fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '10px', lineHeight: 1.4,
        }}>
          {activity.title}
        </h3>

        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
          marginBottom: '16px',
          flex: 1,               // ✅ يملا المساحة ويدفع الـ location لأسفل
        }}>
          {activity.description}
        </p>

        {/* الموقع دايماً في الأسفل ✅ */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '0.8rem', color: activity.accent, fontWeight: '600',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '12px',
        }}>
          <span>📍</span>
          <span>{activity.location}</span>
        </div>
      </div>
    </div>
  )
}

// ─── الكمبوننت الرئيسية ───────────────────────────────────────────────────────
export default function ActivitiesGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging]   = useState(false)
  const [startX, setStartX]           = useState(0)
  const [scrollLeft, setScrollLeft]   = useState(0)

  const sliderRef  = useRef(null)
  const headerRef  = useRef(null)
  const dotsRef    = useRef(null)

  const headerInView = useInView(headerRef)
  const dotsInView   = useInView(dotsRef)

  // ─── Auto-play كل 4 ثواني ─────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % activities.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // ─── Scroll الـ slider لما activeIndex يتغير ─────────────────────────────
  useEffect(() => {
    if (!sliderRef.current) return
    const cardWidth = 340 + 20 // width + gap
    sliderRef.current.scrollTo({
      left: activeIndex * cardWidth,
      behavior: 'smooth',
    })
  }, [activeIndex])

  // ─── Mouse drag للـ slider ────────────────────────────────────────────────
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }
  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x    = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    sliderRef.current.scrollLeft = scrollLeft - walk
  }
  const handleMouseUp = () => setIsDragging(false)

  // ─── تتبع الـ scroll لتحديث activeIndex ──────────────────────────────────
  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return
    const cardWidth = 340 + 20
    const index = Math.round(sliderRef.current.scrollLeft / cardWidth)
    setActiveIndex(Math.min(index, activities.length - 1))
  }, [])

  return (
    <section style={{
      backgroundColor: 'var(--bg-primary)',
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── خلفية ديكورية ── */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(29,111,66,0.06) 0%, transparent 70%)',
        transform: 'translate(30%, -30%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(29,111,66,0.05) 0%, transparent 70%)',
        transform: 'translate(-30%, 30%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* ===== Header ===== */}
        <div
          ref={headerRef}
          style={{
            marginBottom: '56px',
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* تاق علوي */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '44px', height: '4px',
              backgroundColor: 'var(--btn-primary-bg)',
              borderRadius: '999px',
            }} />
            <span style={{
              color: 'var(--btn-primary-bg)',
              fontWeight: '700',
              fontSize: '0.9rem',
            }}>
              على أرض الواقع
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
              fontWeight: '800',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              maxWidth: '480px',
            }}>
              أنشطتنا وفعالياتنا
              <span style={{ color: 'var(--btn-primary-bg)', display: 'block' }}>
                لحظات صنعنا فيها الفرق 
              </span>
            </h2>

            <p style={{
              fontSize: '0.975rem',
              color: 'var(--text-secondary)',
              maxWidth: '360px',
              lineHeight: 1.8,
            }}>
              نوثّق هنا أبرز أنشطة وفعاليات المؤسسة على مدار العام، من حفلات التخرج إلى القوافل الطبية وكل ما بينهما
            </p>
          </div>
        </div>
      </div>

      {/* ===== السلايدر — full width ===== */}
      <div
  ref={sliderRef}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseUp}
  onScroll={handleScroll}
  className="activities-slider"
  style={{
    display: 'flex',
    alignItems: 'stretch', // ✅ ده اللي هيساوي الطول
    gap: '20px',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    paddingRight: '24px',
    paddingLeft: '24px',
    paddingBottom: '20px',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'touch',
  }}
>
        {activities.map((activity, index) => (
  <div
    key={activity.id}
    onClick={() => setActiveIndex(index)}
    style={{ display: 'flex' }} // ✅ عشان يورث الـ stretch
  >
    <ActivityCard
      activity={activity}
      index={index}
      isActive={activeIndex === index}
    />
  </div>
))}

        {/* padding آخر لإن RTL بيحتاج مساحة */}
        <div style={{ flex: '0 0 4px' }} />
      </div>

      {/* ===== Dots + Arrows ===== */}
      <div
        ref={dotsRef}
        style={{
          maxWidth: '1200px',
          margin: '36px auto 0',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: dotsInView ? 1 : 0,
          transform: dotsInView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
        }}
      >
        {/* العداد */}
        <span style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          fontWeight: '600',
        }}>
          <span style={{ color: 'var(--btn-primary-bg)', fontSize: '1.1rem' }}>
            {String(activeIndex + 1).padStart(2, '٠')}
          </span>
          {' / '}
          {String(activities.length).padStart(2, '٠')}
        </span>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {activities.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: activeIndex === i ? '28px' : '8px',
                height: '8px',
                borderRadius: '999px',
                backgroundColor: activeIndex === i
                  ? 'var(--btn-primary-bg)'
                  : 'var(--border-color)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* أزرار التنقل */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveIndex(prev => Math.max(prev - 1, 0))}
            style={{
              width: '44px', height: '44px',
              borderRadius: '50%',
              border: '1.5px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              opacity: activeIndex === 0 ? 0.35 : 1,
            }}
            onMouseOver={e => {
              if (activeIndex !== 0) {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)'
                e.currentTarget.style.borderColor = 'var(--btn-primary-bg)'
                e.currentTarget.style.color = '#fff'
              }
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'var(--bg-card)'
              e.currentTarget.style.borderColor = 'var(--border-color)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
          >
            ›
          </button>
          <button
            onClick={() => setActiveIndex(prev => Math.min(prev + 1, activities.length - 1))}
            style={{
              width: '44px', height: '44px',
              borderRadius: '50%',
              border: '1.5px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              opacity: activeIndex === activities.length - 1 ? 0.35 : 1,
            }}
            onMouseOver={e => {
              if (activeIndex !== activities.length - 1) {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)'
                e.currentTarget.style.borderColor = 'var(--btn-primary-bg)'
                e.currentTarget.style.color = '#fff'
              }
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'var(--bg-card)'
              e.currentTarget.style.borderColor = 'var(--border-color)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
          >
            ‹
          </button>
        </div>
      </div>

    </section>
  )
}
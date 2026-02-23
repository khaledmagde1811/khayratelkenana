import { useState, useEffect, useRef } from 'react'
import { FaMapMarkerAlt, FaCalendarAlt, FaTag, FaArrowLeft } from 'react-icons/fa'
import img8 from '../../imges/img8.jpeg'
import img9 from '../../imges/img9.jpeg'
import img10 from '../../imges/img10.jpeg'
import img11 from '../../imges/img11.jpeg'

const activities = [
    {
        id: 1,
        category: 'تعليم',
        title: 'شرح السيرة النبوية للأولاد',
        description: 'فضلُ تعلّم الطفلِ السيرةَ النبوية عظيم، فهي تغرس في قلبه حبَّ النبي ﷺ، وتعرّفه بقيم العلم والرحمة والأخلاق، وتبني شخصيته على القدوة الحسنة منذ الصغر.',
        date: 'مارس ٢٠٢٤',
        location: 'مقر المؤسسة',
        img: img8,
        accent: '#1d6f42',
        featured: true,
    },
    {
        id: 2,
        category: 'تربية',
        title: 'دروس التربية',
        description: 'في دروس التربية يتعلّم الطفل الأخلاق الجميلة، مثل الاحترام والصدق والتعاون، ليكبر بقلب طيب وسلوك حسن.',
        date: 'نوفمبر ٢٠٢٣',
        location: 'مقر المؤسسة',
        img: img9,
        accent: '#2563eb',
        featured: false,
    },
    {
        id: 3,
        category: 'احتفال',
        title: 'توزيع هدايا على الطلاب',
        description: 'مع عودة الدراسة يبدأ فصلٌ جديد من الاجتهاد والطموح، وتعود المدارس لتنبض بالحياة والفرح.',
        date: 'يونيو ٢٠٢٤',
        location: 'مقر المؤسسة',
        img: img10,
        accent: '#059669',
        featured: false,
    },
    {
        id: 4,
        category: 'تكريم',
        title: 'تكريم طلاب البستان',
        description: 'حفظ القرآن من أعظم القيم التي يتعلّمها الطفل، فهو ينير قلبه ويغرس في نفسه الأخلاق الحميدة.',
        date: 'أبريل ٢٠٢٤',
        location: 'مقر المؤسسة',
        img: img11,
        accent: '#d97706',
        featured: false,
    },
]

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

// ─── كارت صغير (جانبي) ───────────────────────────────────────────────────────
function SmallCard({ activity, index, onClick }) {
    const ref = useRef(null)
    const inView = useInView(ref)
    const [hovered, setHovered] = useState(false)

    return (
        <div
            ref={ref}
            onClick={onClick}   // ✅
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                display: 'flex', gap: '16px', alignItems: 'flex-start',
                padding: '16px',
                borderRadius: '16px',
                backgroundColor: hovered ? 'var(--bg-secondary)' : 'transparent',
                border: `1px solid ${hovered ? activity.accent + '44' : 'transparent'}`,
                cursor: 'pointer',   // ✅
                transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, background 0.3s ease, border-color 0.3s ease`,
            }}
        >
            {/* صورة مصغرة */}
            <div style={{
                width: '90px', height: '90px', borderRadius: '12px',
                overflow: 'hidden', flexShrink: 0,
                border: `2px solid ${hovered ? activity.accent : 'transparent'}`,
                transition: 'border-color 0.3s ease',
            }}>
                <img src={activity.img} alt={activity.title} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                    transform: hovered ? 'scale(1.08)' : 'scale(1)',
                }} />
            </div>

            {/* المحتوى */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    backgroundColor: `${activity.accent}18`,
                    color: activity.accent,
                    fontSize: '0.72rem', fontWeight: '700',
                    padding: '2px 10px', borderRadius: '999px', marginBottom: '8px',
                }}>
                    <FaTag size={9} />
                    {activity.category}
                </div>
                <h4 style={{
                    fontSize: '0.92rem', fontWeight: '800',
                    color: hovered ? activity.accent : 'var(--text-primary)',
                    lineHeight: 1.4, marginBottom: '8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    transition: 'color 0.3s ease',
                }}>
                    {activity.title}
                </h4>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600',
                }}>
                    <FaCalendarAlt size={10} />
                    {activity.date}
                </div>

                {/* hint صغير */}
                <div style={{
                    marginTop: '6px',
                    fontSize: '0.72rem', color: activity.accent,
                    fontWeight: '700', opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                }}>
                    اضغط لعرضها ←
                </div>
            </div>
        </div>
    )
}

// ─── الكارت الكبير (Featured) ─────────────────────────────────────────────────
function FeaturedCard({ activity }) {
    const ref = useRef(null)
    const inView = useInView(ref)
    const [hovered, setHovered] = useState(false)

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                borderRadius: '24px', overflow: 'hidden',
                position: 'relative', height: '520px',
                cursor: 'pointer',
                boxShadow: hovered
                    ? '0 32px 80px rgba(0,0,0,0.2)'
                    : '0 8px 32px rgba(0,0,0,0.1)',
                transition: 'opacity 0.8s ease, transform 0.8s ease, box-shadow 0.4s ease',
            }}
        >
            <img src={activity.img} alt={activity.title} style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 0.7s ease',
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }} />

            {/* Gradient overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
            }} />

            {/* Badge أعلى */}
            <div style={{
                position: 'absolute', top: '20px', right: '20px',
                display: 'flex', gap: '8px',
            }}>
                <div style={{
                    backgroundColor: activity.accent, color: '#fff',
                    fontSize: '0.75rem', fontWeight: '700',
                    padding: '5px 14px', borderRadius: '999px',
                    display: 'flex', alignItems: 'center', gap: '5px',
                }}>
                    <FaTag size={10} />
                    {activity.category}
                </div>
                <div style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff', fontSize: '0.75rem', fontWeight: '600',
                    padding: '5px 12px', borderRadius: '999px',
                    display: 'flex', alignItems: 'center', gap: '5px',
                    border: '1px solid rgba(255,255,255,0.15)',
                }}>
                    مميز
                </div>
            </div>

            {/* المحتوى أسفل */}
            <div style={{
                position: 'absolute', bottom: 0, right: 0, left: 0,
                padding: '32px',
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    marginBottom: '14px',
                    fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600',
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaCalendarAlt size={11} /> {activity.date}
                    </span>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.4)' }} />
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaMapMarkerAlt size={11} /> {activity.location}
                    </span>
                </div>

                <h2 style={{
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                    fontWeight: '800', color: '#fff',
                    lineHeight: 1.3, marginBottom: '12px',
                }}>
                    {activity.title}
                </h2>

                <p style={{
                    fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.7, marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {activity.description}
                </p>

                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    color: '#4ade80', fontWeight: '700', fontSize: '0.875rem',
                    opacity: hovered ? 1 : 0.7,
                    transform: hovered ? 'translateX(-4px)' : 'translateX(0)',
                    transition: 'all 0.3s ease',
                }}>
                    اقرأ المزيد
                    <FaArrowLeft size={13} />
                </div>
            </div>
        </div>
    )
}

// ─── كارت عرضي (wide) ────────────────────────────────────────────────────────
function WideCard({ activity, index, reverse }) {
    const ref = useRef(null)
    const inView = useInView(ref)
    const [hovered, setHovered] = useState(false)

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`wide-card ${reverse ? 'wide-card-reverse' : ''}`}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                borderRadius: '20px', overflow: 'hidden',
                backgroundColor: 'var(--bg-card)',
                border: `1px solid ${hovered ? activity.accent + '44' : 'var(--border-color)'}`,
                boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s, border-color 0.3s ease, box-shadow 0.3s ease`,
            }}
        >
            {/* الصورة */}
            <div className="wide-card-img" style={{ overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <img src={activity.img} alt={activity.title} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                    transform: hovered ? 'scale(1.06)' : 'scale(1)',
                }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)',
                }} />
            </div>

            {/* المحتوى */}
            <div style={{
                flex: 1, padding: '28px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    backgroundColor: `${activity.accent}15`, color: activity.accent,
                    fontSize: '0.75rem', fontWeight: '700',
                    padding: '4px 12px', borderRadius: '999px',
                    marginBottom: '14px', width: 'fit-content',
                }}>
                    <FaTag size={10} />
                    {activity.category}
                </div>

                <h3 style={{
                    fontSize: '1.2rem', fontWeight: '800',
                    color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: '12px',
                }}>
                    {activity.title}
                </h3>

                <p style={{
                    fontSize: '0.9rem', color: 'var(--text-secondary)',
                    lineHeight: 1.8, marginBottom: '20px', flex: 1,
                }}>
                    {activity.description}
                </p>

                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '16px', borderTop: '1px solid var(--border-color)',
                    flexWrap: 'wrap', gap: '8px',
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '14px',
                        fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600',
                        flexWrap: 'wrap',
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaCalendarAlt size={11} color={activity.accent} /> {activity.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaMapMarkerAlt size={11} color={activity.accent} /> {activity.location}
                        </span>
                    </div>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        color: activity.accent, fontWeight: '700', fontSize: '0.85rem',
                        opacity: hovered ? 1 : 0,
                        transition: 'all 0.3s ease',
                    }}>
                        اقرأ المزيد <FaArrowLeft size={12} />
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── الكمبوننت الرئيسية ───────────────────────────────────────────────────────
export default function Activitiescommponants() {
    const headerRef = useRef(null)
    const headerInView = useInView(headerRef)

    // ✅ state للـ featured الحالي
    const [featuredId, setFeaturedId] = useState(activities[0].id)

    const featured = activities.find(a => a.id === featuredId)
    const sidebar = activities.filter(a => a.id !== featuredId).slice(0, 2)
    const wide = activities.filter(a => a.id !== featuredId).slice(2)

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

                <div ref={headerRef} style={{
                    maxWidth: '700px', margin: '0 auto',
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
                            على أرض الواقع
                        </span>
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: '800', color: '#fff', lineHeight: 1.2, marginBottom: '20px',
                    }}>
                        أنشطتنا وفعالياتنا
                    </h1>
                    <p style={{
                        fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)',
                        lineHeight: 1.9, maxWidth: '500px', margin: '0 auto',
                    }}>
                        نوثّق هنا أبرز أنشطة وفعاليات المؤسسة، لحظات صنعنا فيها الفرق في حياة كثيرين
                    </p>
                </div>
            </div>

            <div style={{ height: '4px', background: 'linear-gradient(to left, #1d6f42, #4ade80, #1d6f42)' }} />

            {/* ===== المحتوى ===== */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>

                {/* فاصل */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
                    <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--btn-primary-bg)', borderRadius: '999px' }} />
                    <span style={{ color: 'var(--btn-primary-bg)', fontWeight: '700', fontSize: '0.9rem' }}>
                        أبرز الفعاليات
                    </span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600' }}>
                        {activities.length} فعاليات موثّقة
                    </span>
                </div>

                {/* ===== Featured + Sidebar ===== */}
                <div className="mag-hero-grid" style={{ marginBottom: '48px' }}>
                    <FeaturedCard activity={featured} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <h3 style={{
                            fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)',
                            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px',
                        }}>
                            فعاليات أخرى
                        </h3>
                        {sidebar.map((act, i) => (
                            <SmallCard
                                key={act.id}
                                activity={act}
                                index={i}
                                onClick={() => setFeaturedId(act.id)}  // ✅
                            />
                        ))}
                    </div>
                </div>

                {/* ===== فاصل ===== */}
                {wide.length > 0 && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                            <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--btn-primary-bg)', borderRadius: '999px' }} />
                            <span style={{ color: 'var(--btn-primary-bg)', fontWeight: '700', fontSize: '0.9rem' }}>
                                المزيد من الأنشطة
                            </span>
                            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
                        </div>

                        {/* ===== Wide Cards ===== */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {wide.map((act, i) => (
                                <WideCard key={act.id} activity={act} index={i} reverse={i % 2 !== 0} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { FaHeart, FaUsers, FaHandHoldingHeart, FaMosque } from 'react-icons/fa'


const stats = [
  { icon: FaUsers,            value: '+500',  label: 'أسرة مستفيدة' },
  { icon: FaHandHoldingHeart, value: '+1200', label: 'متبرع كريم'   },
  { icon: FaMosque,           value: '+50',   label: 'نشاط سنوياً'  },
]

export default function HeroSection({ darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled]             = useState(false)
  const [mounted, setMounted]               = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav, .desktop-actions { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-stats { flex-direction: column !important; gap: 12px !important; }
          .hero-content-box { padding: 32px 24px !important; }
          .hero-btns { flex-direction: column !important; }
          .hero-btns a { text-align: center !important; justify-content: center !important; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.08); }
        }

        .hero-badge  { animation: fadeUp 0.7s ease forwards 0.1s; opacity: 0; }
        .hero-title  { animation: fadeUp 0.7s ease forwards 0.25s; opacity: 0; }
        .hero-desc   { animation: fadeUp 0.7s ease forwards 0.4s; opacity: 0; }
        .hero-btns   { animation: fadeUp 0.7s ease forwards 0.55s; opacity: 0; }
        .hero-stats  { animation: fadeUp 0.7s ease forwards 0.7s; opacity: 0; }

        .orb-1 { animation: pulse 6s ease-in-out infinite; }
        .orb-2 { animation: pulse 8s ease-in-out infinite 2s; }
        .orb-3 { animation: floatY 7s ease-in-out infinite; }
        .ring  { animation: rotateSlow 20s linear infinite; }

        .nav-link {
          position: relative;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: color 0.25s ease;
          padding-bottom: 4px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; right: 0;
          width: 0; height: 2px;
          background: #4ade80;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; left: 0; right: auto; }

        .stat-card:hover { transform: translateY(-4px) !important; }
        .btn-primary:hover {
          background: linear-gradient(135deg, #15803d, #16a34a) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 12px 32px rgba(29,111,66,0.5) !important;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.2) !important;
          transform: translateY(-2px) !important;
        }
      `}</style>

  

      {/* Overlay متدرج */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -2,
        background: 'linear-gradient(135deg, rgba(5,30,15,0.92) 0%, rgba(10,50,25,0.85) 40%, rgba(5,20,10,0.9) 100%)',
      }} />

      {/* ===== ديكور كرات ===== */}
      <div className="orb-1" style={{
        position: 'fixed', top: '-150px', right: '-150px', zIndex: -1,
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(29,111,66,0.35) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="orb-2" style={{
        position: 'fixed', bottom: '-100px', left: '-100px', zIndex: -1,
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* حلقات ديكورية */}
      <div className="ring" style={{
        position: 'fixed', top: '10%', left: '-80px', zIndex: -1,
        width: '300px', height: '300px', borderRadius: '50%',
        border: '1px solid rgba(74,222,128,0.12)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', top: '15%', left: '-50px', zIndex: -1,
        width: '220px', height: '220px', borderRadius: '50%',
        border: '1px solid rgba(74,222,128,0.08)',
        pointerEvents: 'none',
      }} />

      {/* نجوم صغيرة */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'fixed', zIndex: -1,
          width: `${3 + (i % 3)}px`, height: `${3 + (i % 3)}px`,
          borderRadius: '50%',
          backgroundColor: 'rgba(74,222,128,0.6)',
          top:  `${15 + i * 12}%`,
          left: `${5 + i * 8}%`,
          animation: `pulse ${4 + i}s ease-in-out infinite ${i * 0.5}s`,
          pointerEvents: 'none',
        }} />
      ))}

 
      {/* ===== Hero Content ===== */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', padding: '120px 24px 60px',
      }}>
        <div style={{ maxWidth: '780px', width: '100%', textAlign: 'center' }}>

          {/* Badge */}
          <div className="hero-badge" style={{ marginBottom: '28px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: 'rgba(74,222,128,0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(74,222,128,0.3)',
              padding: '8px 20px', borderRadius: '999px',
            }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                backgroundColor: '#4ade80',
                boxShadow: '0 0 8px rgba(74,222,128,0.8)',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <span style={{ color: '#4ade80', fontWeight: '700', fontSize: '0.85rem' }}>
                نعمل من أجل مجتمع أفضل
              </span>
            </div>
          </div>

          {/* العنوان */}
          <h1 className="hero-title" style={{
            fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
            fontWeight: '800', color: '#fff',
            lineHeight: 1.25, marginBottom: '24px',
            textShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}>
            خيرات الكنانة
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #4ade80, #86efac)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              للدفاع الاجتماعي
            </span>
          </h1>

          {/* الوصف */}
          <p className="hero-desc" style={{
            fontSize: '1.15rem', color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.9, marginBottom: '40px', fontWeight: '500',
            maxWidth: '560px', margin: '0 auto 40px',
          }}>
            نسعى لتمكين الأفراد والأسر من خلال برامج الدفاع الاجتماعي والتنمية المستدامة، لنبني معاً مجتمعاً قائماً على الرحمة والعطاء
          </p>

          {/* الأزرار */}
          <div className="hero-btns" style={{
            display: 'flex', gap: '14px', justifyContent: 'center',
            flexWrap: 'wrap', marginBottom: '60px',
          }}>
            <Link
              className="btn-primary"
              target="_blank"
              to="https://docs.google.com/forms/d/e/1FAIpQLSfDzQ8vMZoI4gRf_mMT5cWGPauN7ODu-poPnvoUAp0QQyW_YA/viewform?usp=header"
              style={{
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #1d6f42, #16a34a)',
                color: '#fff', fontWeight: '700', fontSize: '1rem',
                padding: '15px 36px', borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(29,111,66,0.45)',
                transition: 'all 0.3s ease',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <FaUsers size={16} />
              انضم إلينا
            </Link>

            <Link
              className="btn-secondary"
              to="/activities"
              style={{
                textDecoration: 'none',
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                color: '#fff', fontWeight: '700', fontSize: '1rem',
                padding: '15px 36px', borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.25)',
                transition: 'all 0.3s ease',
              }}
            >
              اعرف أكثر ←
            </Link>
          </div>

          {/* الإحصائيات */}
         
        </div>
      </div>

      {/* سهم للأسفل */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        animation: 'floatY 2.5s ease-in-out infinite',
      }}>
        <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: '600', letterSpacing: '0.1em' }}>
          اكتشف المزيد
        </span>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem',
        }}>
          ↓
        </div>
      </div>

    </div>
  )
}
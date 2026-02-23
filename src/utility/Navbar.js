import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'الرئيسية',      href: '/' },
  { name: 'أنشطة المؤسسة', href: '/activities' },
  { name: 'التبرعات ',        href: '/donation' },
  { name: 'تواصل معنا',    href: '/contact' },
]

export default function Navbar({ darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav, .desktop-actions { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      <header style={{
        position:        'fixed',
        top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter:  scrolled ? 'blur(12px)' : 'none',
        borderBottom:    scrolled ? '1px solid var(--border-color)' : 'none',
        opacity:         scrolled ? 1 : 0,
        pointerEvents:   scrolled ? 'all' : 'none',
        transition:      'all 0.4s ease',
      }}>
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 32px', maxWidth: '1280px', margin: '0 auto',
        }}>
          <Link to="/" style={{
            fontWeight: '800', fontSize: '1.1rem',
            color: 'var(--text-primary)', textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            خيرات الكنانة للدفاع الاجتماعي
          </Link>

          <div style={{ display: 'flex', gap: '28px' }} className="desktop-nav">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} style={{
                textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem',
                color: 'var(--text-primary)', transition: 'color 0.2s',
              }}>
                {item.name}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-actions">
            <button onClick={() => setDarkMode(!darkMode)} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '50%', padding: '8px', cursor: 'pointer',
              color: darkMode ? '#facc15' : '#374151', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              {darkMode ? <SunIcon style={{ width: 20, height: 20 }} /> : <MoonIcon style={{ width: 20, height: 20 }} />}
            </button>
            <Link to="/login" style={{
              textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem',
              color: 'var(--btn-secondary-text)', border: '2px solid var(--btn-secondary-border)',
              borderRadius: '8px', padding: '8px 18px',
            }}>
              تسجيل الدخول
            </Link>
          </div>

          <button type="button" onClick={() => setMobileMenuOpen(true)}
            className="mobile-menu-btn"
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '8px', padding: '8px', cursor: 'pointer',
              color: 'var(--text-primary)', display: 'none',
              alignItems: 'center', justifyContent: 'center',
            }}>
            <Bars3Icon style={{ width: 24, height: 24 }} />
          </button>
        </nav>
      </header>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.3)' }} />
        <DialogPanel style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 51,
          width: '100%', maxWidth: '300px', overflowY: 'auto',
          backgroundColor: 'var(--bg-primary)', padding: '24px',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <span style={{ fontWeight: '800', color: 'var(--text-primary)' }}>خيرات الكنانة</span>
            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
              <XMarkIcon style={{ width: 24, height: 24 }} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none', padding: '12px 16px', borderRadius: '8px',
                  fontWeight: '600', color: 'var(--text-primary)', backgroundColor: 'var(--bg-card)',
                }}>
                {item.name}
              </Link>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </>
  )
}
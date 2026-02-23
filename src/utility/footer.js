import { Link } from 'react-router-dom'
import { FaFacebook, FaWhatsapp, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'

const footerLinks = [
  {
    title: 'روابط سريعة',
    links: [
  { name: 'الرئيسية',      href: '/' },

  { name: 'أنشطة المؤسسة', href: '/activities' },

  { name: 'التبرعات ',        href: '/donation' },

  { name: 'تواصل معنا',    href: '/contact' },
    ],
  },
{
  title: 'خدماتنا',
  links: [
    { name: 'محو الأمية' },
    { name: 'رعاية الأيتام' },
    { name: 'دعم الأسر المحتاجة' },
    { name: 'تحفيظ القرآن الكريم' },
    { name: 'رعاية كبار السن' },
  ],
},
]

const socialLinks = [
  { icon: FaFacebook, href: 'https://www.facebook.com/people/%D8%AE%D9%8A%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D9%83%D9%86%D8%A7%D9%86%D8%A9/61581746799969/', color: '#1877f2', label: 'فيسبوك' },
  { icon: FaWhatsapp, href: 'https://wa.me/201034686688', color: '#25d366', label: 'واتساب' },
  
]

const contactInfo = [
  { icon: FaPhone,        text: '010346866688',             href: 'tel:01000000000' },
  { icon: FaEnvelope,     text: 'khayratelkenana.com', href: 'mailto:info@khayratelkenana.com' },
  { icon: FaMapMarkerAlt, text: '   ممر 9 - شارع 1 - جسر السويس - القاهرة ',  href: 'https://maps.app.goo.gl/ESa6MBUBRkq5LWhSA' },
]

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-primary)',
      borderTop:       '1px solid var(--border-color)',
      position:        'relative',
      overflow:        'hidden',
    }}>

      {/* شريط علوي ملون */}
      <div style={{
        height:     '4px',
        background: 'linear-gradient(to left, #1d6f42, #4ade80, #1d6f42)',
      }} />

      {/* ديكور */}
      <div style={{
        position:      'absolute', bottom: '-100px', left: '-100px',
        width:         '400px', height: '400px', borderRadius: '50%',
        background:    'radial-gradient(circle, rgba(29,111,66,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ===== المحتوى الرئيسي ===== */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 40px' }}>
        <div className="footer-grid">

          {/* ===== عمود المؤسسة ===== */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width:           '48px', height: '48px',
                borderRadius:    '14px',
                backgroundColor: 'var(--btn-primary-bg)',
                display:         'flex', alignItems: 'center', justifyContent: 'center',
                fontSize:        '1.4rem',
                boxShadow:       '0 4px 12px rgba(29,111,66,0.3)',
                flexShrink:      0,
              }}>
                🌿
              </div>
              <div>
                <p style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                  خيرات الكنانة
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                  للدفاع الاجتماعي
                </p>
              </div>
            </div>

            <p style={{
              fontSize:    '0.92rem',
              color:       'var(--text-secondary)',
              lineHeight:  1.9,
              marginBottom:'24px',
            }}>
              نعمل من أجل بناء مجتمعٍ متعاون يقوم على الرحمة والعطاء، ونسعى لحماية الأفراد ودعم المحتاجين.
            </p>

            {/* ✅ سوشيال ميديا - تم إضافة <a */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map((social, i) => {
                const IconComponent = social.icon
                return (
                  
                  <a
                    key={i}
                    href={social.href}
                    title={social.label}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      width:           '40px', height: '40px',
                      borderRadius:    '10px',
                      backgroundColor: 'var(--bg-card)',
                      border:          '1px solid var(--border-color)',
                      display:         'flex', alignItems: 'center', justifyContent: 'center',
                      color:           social.color,
                      transition:      'all 0.3s ease',
                      textDecoration:  'none',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.backgroundColor = social.color
                      e.currentTarget.style.color           = '#fff'
                      e.currentTarget.style.transform       = 'translateY(-3px)'
                      e.currentTarget.style.borderColor     = social.color
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-card)'
                      e.currentTarget.style.color           = social.color
                      e.currentTarget.style.transform       = 'translateY(0)'
                      e.currentTarget.style.borderColor     = 'var(--border-color)'
                      
                    }}
                    
                  >
                    
                    <IconComponent size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* ===== أعمدة الروابط ===== */}
          {footerLinks.map((col, i) => (
            <div key={i}>
              <h4 style={{
                fontSize:      '1rem',
                fontWeight:    '800',
                color:         'var(--text-primary)',
                marginBottom:  '20px',
                paddingBottom: '10px',
                borderBottom:  '2px solid var(--btn-primary-bg)',
                display:       'inline-block',
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link, j) => (
<li key={j}>
  {link.href ? (
    <Link
      to={link.href}
      style={{
        textDecoration: 'none',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      onMouseOver={e => {
        e.currentTarget.style.color = 'var(--btn-primary-bg)'
        e.currentTarget.style.paddingRight = '6px'
      }}
      onMouseOut={e => {
        e.currentTarget.style.color = 'var(--text-secondary)'
        e.currentTarget.style.paddingRight = '0'
      }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--btn-primary-bg)', flexShrink: 0 }} />
      {link.name}
    </Link>
  ) : (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--btn-primary-bg)', flexShrink: 0 }} />
      {link.name}
    </span>
  )}
</li>
                ))}
              </ul>
            </div>
          ))}

          {/* ===== عمود التواصل ===== */}
          <div>
            <h4 style={{
              fontSize:      '1rem',
              fontWeight:    '800',
              color:         'var(--text-primary)',
              marginBottom:  '20px',
              paddingBottom: '10px',
              borderBottom:  '2px solid var(--btn-primary-bg)',
              display:       'inline-block',
            }}>
              تواصل معنا
            </h4>

            {/* ✅ معلومات التواصل - تم إضافة <a */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {contactInfo.map((item, i) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={i}
                    href={item.href}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      gap:            '10px',
                      textDecoration: 'none',
                      color:          'var(--text-secondary)',
                      fontSize:       '0.88rem',
                      fontWeight:     '600',
                      transition:     'color 0.2s ease',
                    }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--btn-primary-bg)'}
                    onMouseOut={e  => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <div style={{
                      width:           '34px', height: '34px',
                      borderRadius:    '9px',
                      backgroundColor: 'rgba(29,111,66,0.1)',
                      display:         'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink:      0,
                    }}>
                      <IconComponent size={15} color="var(--btn-primary-bg)" />
                    </div>
                    {item.text}
                  </a>
                )
              })}
            </div>

            {/* زرار تبرع */}
            <Link
              to="/donation"
              style={{
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                gap:             '8px',
                textDecoration:  'none',
                backgroundColor: 'var(--btn-primary-bg)',
                color:           '#fff',
                fontWeight:      '700',
                fontSize:        '0.9rem',
                padding:         '12px 24px',
                borderRadius:    '12px',
                boxShadow:       '0 4px 14px rgba(29,111,66,0.3)',
                transition:      'all 0.3s ease',
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover)'
                e.currentTarget.style.transform       = 'translateY(-2px)'
                e.currentTarget.style.boxShadow       = '0 8px 20px rgba(29,111,66,0.4)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)'
                e.currentTarget.style.transform       = 'translateY(0)'
                e.currentTarget.style.boxShadow       = '0 4px 14px rgba(29,111,66,0.3)'
              }}
            >
              <FaHeart size={14} />
              تبرع الآن
            </Link>
          </div>
        </div>
      </div>

      {/* ===== الكوبيرايت ===== */}
      <div style={{
        borderTop: '1px solid var(--border-color)',
        padding:   '20px 24px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
          © {new Date().getFullYear()} جميع الحقوق محفوظة —{' '}
          <span style={{ color: 'var(--btn-primary-bg)', fontWeight: '700' }}>
            خيرات الكنانة للدفاع الاجتماعي
          </span>
        </p>
      </div>
    </footer>
  )
}
import { useState, useEffect } from 'react'
import {
  FaUserTie, FaHandsHelping, FaCogs, FaLightbulb, FaQuoteRight,
  FaSeedling, FaHandshake, FaChartLine, FaTrophy
} from 'react-icons/fa'
import img1 from '../../imges/img1.jpeg'
import img2 from '../../imges/img2.jpeg'

const founder = {
  name: 'الأستاذ / محمد أحمد',
  role: 'المؤسس والرئيس التنفيذي',
  bio: 'صاحب رؤية إنسانية عميقة وإيمان راسخ بقدرة المجتمع على التغيير، أسس خيرات الكنانة ليكون جسراً بين المحتاجين وأهل الخير.',
}

const team = [
  { name: 'الأستاذ / محمد أبو بكر', role: 'مدير البرامج الاجتماعية',  icon: FaHandsHelping, accent: '#2563eb' },
  { name: 'الأستاذ / محمد خجلي',    role: 'مسؤول التواصل والشراكات',    icon: FaLightbulb,    accent: '#7c3aed' },
  { name: 'المهندس / خالد مجدي',    role: 'مدير المشاريع والتطوير',      icon: FaCogs,         accent: '#d97706' },
  { name: 'الأستاذ / سعيد مصطفى',  role: 'المسؤول المالي والإداري',     icon: FaUserTie,      accent: '#059669' },
]

const story = [
  {
    icon: FaSeedling,
    accent: '#1d6f42',
    title: 'فكرة وُلدت من الواقع',
    text: 'في أحد أحياء مصر الشعبية، رأى الأستاذ محمد أحمد بأم عينيه أسراً تعاني في صمت. لم يكتفِ بالتعاطف، بل قرر أن يفعل شيئاً حقيقياً.',
  },
  {
    icon: FaHandshake,
    accent: '#2563eb',
    title: 'انطلاقة خيرات الكنانة',
    text: 'بدأت الجمعية بمجموعة صغيرة من المتطوعين المخلصين، وكان الحلم أكبر من الإمكانيات لكن الإرادة كانت أقوى.',
  },
  {
    icon: FaChartLine,
    accent: '#7c3aed',
    title: 'توسع وشراكات',
    text: 'حصلت الجمعية على اعتراف رسمي وبدأت شراكات مع وزارة التضامن الاجتماعي، وامتدت خدماتها لتشمل محو الأمية وتحفيظ القرآن ورعاية الأيتام.',
  },
  {
    icon: FaTrophy,
    accent: '#d97706',
    title: 'أثر حقيقي في المجتمع',
    text: 'اليوم تخدم خيرات الكنانة مئات الأسر سنوياً، وتضم فريقاً من المتطوعين المتفانين الذين يؤمنون أن الخير لا يموت.',
  },
]

export default function AboutSection() {
  const [hoveredTeam, setHoveredTeam]   = useState(null)
  const [hoveredStory, setHoveredStory] = useState(null)

  // ===== Scroll Triggered Animation =====
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = document.querySelectorAll('.scroll-hidden')
    elements.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section style={{
      backgroundColor: 'var(--bg-secondary)',
      padding:         '100px 24px',
      position:        'relative',
      overflow:        'hidden',
    }}>

      {/* ===== ديكور ===== */}
      <div style={{
        position:   'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(to left, #1d6f42, #4ade80, #1d6f42)',
      }} />
      <div style={{
        position:      'absolute', top: '-200px', left: '-200px',
        width:         '600px', height: '600px', borderRadius: '50%',
        background:    'radial-gradient(circle, rgba(29,111,66,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* ===== Header ===== */}
        <div className="scroll-hidden" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display:         'inline-flex', alignItems: 'center', gap: '10px',
            backgroundColor: 'rgba(29,111,66,0.1)',
            border:          '1px solid rgba(29,111,66,0.25)',
            padding:         '8px 20px', borderRadius: '999px', marginBottom: '20px',
          }}>
            <FaSeedling color="var(--btn-primary-bg)" size={14} />
            <span style={{ color: 'var(--btn-primary-bg)', fontWeight: '700', fontSize: '0.9rem' }}>
              من نحن
            </span>
          </div>
          <h2 style={{
            fontSize:     'clamp(2rem, 5vw, 3.2rem)',
            fontWeight:   '800', color: 'var(--text-primary)',
            lineHeight:   1.3, marginBottom: '16px',
          }}>
            قصتنا مع الخير
          </h2>
          <p style={{
            fontSize:   '1.1rem', color: 'var(--text-secondary)',
            maxWidth:   '550px', margin: '0 auto', lineHeight: 1.8,
          }}>
            رحلة إنسانية بدأت بإيمان وتستمر بعطاء لا ينتهي
          </p>
        </div>

        {/* ===== المؤسس ===== */}
        <div className="scroll-hidden" style={{ marginBottom: '80px' }}>
          <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius:    '24px',
            padding:         '40px',
            border:          '1px solid var(--border-color)',
            position:        'relative',
            overflow:        'hidden',
          }}>
            <div style={{
              position:   'absolute', top: 0, right: 0, bottom: 0, width: '6px',
              background: 'linear-gradient(to bottom, #1d6f42, #4ade80)',
            }} />

            <FaQuoteRight
              size={60} color="var(--btn-primary-bg)"
              style={{ opacity: 0.07, position: 'absolute', bottom: '16px', left: '20px' }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{
                width:           '56px', height: '56px', borderRadius: '16px',
                backgroundColor: 'var(--btn-primary-bg)',
                display:         'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink:      0,
              }}>
                <FaUserTie size={24} color="#fff" />
              </div>
              <div>
                <div style={{
                  display:         'inline-block',
                  backgroundColor: 'rgba(29,111,66,0.1)',
                  color:           'var(--btn-primary-bg)',
                  padding:         '3px 12px', borderRadius: '999px',
                  fontSize:        '0.8rem', fontWeight: '700', marginBottom: '6px',
                }}>
                  {founder.role}
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                  {founder.name}
                </h3>
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(29,111,66,0.05)',
              borderRadius:    '16px', padding: '24px 28px',
              border:          '1px solid rgba(29,111,66,0.12)', marginBottom: '20px',
            }}>
              <div style={{
                display:         'inline-block',
                backgroundColor: 'rgba(29,111,66,0.12)', color: 'var(--btn-primary-bg)',
                padding:         '3px 12px', borderRadius: '999px',
                fontSize:        '0.8rem', fontWeight: '700', marginBottom: '12px',
              }}>
                رسالتنا
              </div>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 2, fontWeight: '500', margin: 0 }}>
                نعمل من أجل بناء مجتمعٍ متعاون، يقوم على الرحمة والعطاء والمسؤولية. نسعى لحماية الأفراد، ودعم المحتاجين، ورعاية الفئات الأكثر ضعفًا، لنُعيد للإنسان كرامته، وللمجتمع توازنه، وللخير مكانه بين الناس.
              </p>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.9, margin: 0 }}>
              {founder.bio}
            </p>
          </div>
        </div>

        {/* ===== قصة التأسيس ===== */}
        <div style={{ marginBottom: '100px' }}>
          <div className="scroll-hidden" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              كيف بدأت الرحلة؟
            </h3>
          </div>

          <div className="story-cards-grid">
            {story.map((item, index) => {
              const IconComponent = item.icon
              const isHovered     = hoveredStory === index
              return (
                <div key={index} className="scroll-hidden">
                  <div
                    onMouseEnter={() => setHoveredStory(index)}
                    onMouseLeave={() => setHoveredStory(null)}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderRadius:    '20px',
                      padding:         '32px 24px',
                      border:          `1.5px solid ${isHovered ? item.accent : 'var(--border-color)'}`,
                      position:        'relative',
                      overflow:        'hidden',
                      transition:      'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                      transform:       isHovered ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow:       isHovered ? '0 16px 40px rgba(0,0,0,0.1)' : 'none',
                      height:          '100%',
                    }}
                  >
                    <div style={{
                      position:   'absolute', top: 0, right: 0, bottom: 0, width: '4px',
                      background: `linear-gradient(to bottom, ${item.accent}, ${item.accent}88)`,
                      borderRadius: '0 20px 20px 0',
                    }} />

                    <div style={{
                      width:           '56px', height: '56px', borderRadius: '14px',
                      backgroundColor: isHovered ? item.accent : 'var(--bg-secondary)',
                      display:         'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom:    '20px',
                      transition:      'all 0.3s ease',
                      boxShadow:       isHovered ? `0 8px 20px ${item.accent}40` : 'none',
                    }}>
                      <IconComponent size={24} color={isHovered ? '#fff' : item.accent} />
                    </div>

                    <h4 style={{
                      fontSize:     '1.1rem', fontWeight: '800',
                      color:        isHovered ? item.accent : 'var(--text-primary)',
                      marginBottom: '10px', transition: 'color 0.3s ease',
                    }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.9 }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ===== فريق العمل ===== */}
        <div style={{ marginBottom: '80px' }}>
          <div className="scroll-hidden" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              فريق العمل
            </h3>
          </div>

          <div className="team-grid-v2">
            {team.map((member, index) => {
              const IconComponent = member.icon
              const isHovered     = hoveredTeam === index
              return (
                <div key={index} className="scroll-hidden">
                  <div
                    onMouseEnter={() => setHoveredTeam(index)}
                    onMouseLeave={() => setHoveredTeam(null)}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border:          `1.5px solid ${isHovered ? member.accent : 'var(--border-color)'}`,
                      borderRadius:    '20px',
                      padding:         '32px 20px',
                      textAlign:       'center',
                      cursor:          'pointer',
                      transition:      'all 0.35s ease',
                      transform:       isHovered ? 'translateY(-6px)' : 'translateY(0)',
                      boxShadow:       isHovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
                      position:        'relative',
                      overflow:        'hidden',
                      height:          '100%',
                    }}
                  >
                    <div style={{
                      position:        'absolute', inset: 0,
                      backgroundColor: member.accent,
                      opacity:         isHovered ? 0.05 : 0,
                      transition:      'opacity 0.35s ease',
                      borderRadius:    '20px',
                    }} />

                    <div style={{
                      width:           '68px', height: '68px', borderRadius: '18px',
                      backgroundColor: isHovered ? member.accent : 'var(--bg-secondary)',
                      display:         'flex', alignItems: 'center', justifyContent: 'center',
                      margin:          '0 auto 20px',
                      transition:      'all 0.35s ease',
                      boxShadow:       isHovered ? `0 8px 20px ${member.accent}40` : 'none',
                    }}>
                      <IconComponent size={26} color={isHovered ? '#fff' : member.accent} style={{ transition: 'all 0.35s ease' }} />
                    </div>

                    <h4 style={{
                      fontSize:     '0.95rem', fontWeight: '800',
                      color:        isHovered ? member.accent : 'var(--text-primary)',
                      marginBottom: '8px', transition: 'color 0.3s ease',
                    }}>
                      {member.name}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600', lineHeight: 1.5 }}>
                      {member.role}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ===== الصور ===== */}
        <div>
          <div className="scroll-hidden" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              ذكرى مع المتطوعين لن تُنسى أبداً
            </h3>
          </div>

          <div className="about-imgs-grid">
            {[img1, img2].map((src, i) => (
              <div key={i} className="scroll-hidden" style={{
                borderRadius: '20px', overflow: 'hidden',
                boxShadow:    '0 8px 24px rgba(0,0,0,0.1)',
                transition:   'transform 0.3s ease',
              }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={e  => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={src} alt={`نشاط ${i + 1}`} style={{
                  width: '100%', height: '300px',
                  objectFit: 'cover', display: 'block',
                }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
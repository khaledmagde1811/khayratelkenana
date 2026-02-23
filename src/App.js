import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Homepage from './Piges/Homepage'
import Footer from './utility/footer'
import Activities from './Piges/Activities'
import Navbar from './utility/Navbar'
import Contact from './Piges/Contact'
import Donationes from './Piges/Donationes'
import ScrollToTop from './utility/ScrollToTop'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }
  }, [darkMode])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('.scroll-hidden').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Homepage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/activities" element={<Activities darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/donation" element={<Donationes darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
      <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
    </BrowserRouter>
  )
}

export default App
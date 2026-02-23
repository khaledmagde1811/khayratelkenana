import React from 'react'
import Herosection from '../Commponants/Home-commponants/Herosection'
import ServicesSection from '../Commponants/Home-commponants/ServicesSection'
import ActivitiesGallery from '../Commponants/Home-commponants/ActivitiesGallery'
import AboutSection from '../Commponants/Home-commponants/AboutSection'

const Homepage = ({ darkMode, setDarkMode }) => {
  return (
    <>
      <Herosection darkMode={darkMode} setDarkMode={setDarkMode} />
      <ServicesSection darkMode={darkMode} setDarkMode={setDarkMode} />
      <ActivitiesGallery darkMode={darkMode} setDarkMode={setDarkMode} />
      <AboutSection darkMode={darkMode} setDarkMode={setDarkMode} />
      
    </>
  )
}

export default Homepage
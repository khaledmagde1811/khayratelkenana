import React from 'react'
import Activitiescommponants from '../Commponants/Activitiescommponants/Activitiescommponants'

const Activities = ({ darkMode, setDarkMode }) => {
  return (
    <div>
      <Activitiescommponants darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  )
}

export default Activities
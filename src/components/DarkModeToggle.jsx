import { useEffect, useState } from 'react'

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
    document.body.classList.toggle('dark', isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', !darkMode)
    document.body.classList.toggle('dark', !darkMode)
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded dark:bg-gray-800 dark:hover:bg-gray-600"
    >
      {darkMode ? '🌞' : '🌜'}
    </button>
  )
}

export default DarkModeToggle

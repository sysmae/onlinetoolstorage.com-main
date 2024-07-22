// DarkModeToggle.js
import { useEffect } from 'react'
import useDarkModeStore from '@/stores/darkModeStore'

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode, initializeDarkMode } = useDarkModeStore()

  useEffect(() => {
    initializeDarkMode()
  }, [initializeDarkMode])

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

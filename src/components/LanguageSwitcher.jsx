import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LanguageSwitcher = () => {
  const router = useRouter()
  const { asPath } = router
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'ko', name: '한국어' },
    { code: 'en', name: 'English' },
    // { code: 'fr', name: 'Français' },
    // { code: 'es', name: 'Español' },
  ]

  const switchLanguagePath = (lang) => {
    const pathSegments = asPath.split('/')
    const langIndex = languages.findIndex((l) => l.code === pathSegments[1])

    if (langIndex !== -1) {
      pathSegments[1] = lang
    } else {
      pathSegments.splice(1, 0, lang)
    }

    return pathSegments.join('/')
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.language-switcher')) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className="relative language-switcher">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 rounded-md focus:outline-none"
      >
        🌐
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={switchLanguagePath(lang.code)}
              locale={lang.code}
              passHref
            >
              <span
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition ease-in-out cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClose()
                }}
              >
                {lang.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher

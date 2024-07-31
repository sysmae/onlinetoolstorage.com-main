import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

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

  const handleCookie = (lang) => {
    Cookies.set('NEXT_LOCALE', lang, { expires: 365 })
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
    <div className="language-switcher">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md bg-gray-100 px-4 py-2 text-gray-600 transition duration-150 ease-in-out hover:bg-gray-200 hover:text-gray-900 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-600"
      >
        🌐
      </button>
      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-white py-2 shadow-xl">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={switchLanguagePath(lang.code)}
              locale={lang.code}
              passHref
            >
              <span
                className="block cursor-pointer px-4 py-2 text-sm text-gray-800 transition ease-in-out hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCookie(lang.code)
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

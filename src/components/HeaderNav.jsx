// components/HeaderNav.jsx
import React, { useState, useEffect, useRef } from 'react'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'
import Link from 'next/link'
import { useRouter } from 'next/router'

const HeaderNav = ({ handleLinkClick, locale }) => {
  const [categories, setCategories] = useState([])
  const navRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchSidebarData() {
      try {
        const res = await fetch(`/locales/${locale}/sidebar.json`)
        const data = await res.json()
        setCategories(data.categories)
      } catch (error) {
        console.error('Failed to load sidebar data:', error)
      }
    }

    fetchSidebarData()
  }, [locale])

  useEffect(() => {
    const handleRouteChange = () => {
      setCategories(
        categories.map((cat) => ({
          ...cat,
          isOpen: false, // Close all categories on route change
        })),
      )
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [categories, router.events])

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setCategories(
        categories.map((cat) => ({
          ...cat,
          isOpen: false, // Close all categories on outside click
        })),
      )
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [categories])

  return (
    <ul className="flex grow flex-row flex-wrap" ref={navRef}>
      {categories.map((category, index) => (
        <li
          key={index}
          className="hidden border-b border-gray-300 hover:text-purple-700 dark:border-gray-700 dark:hover:text-purple-500 lg:block lg:border-none"
        >
          <button
            aria-label="Toggle Category"
            onClick={() => {
              setCategories(
                categories.map((cat) => ({
                  ...cat,
                  isOpen: cat.name === category.name ? !cat.isOpen : false, // Toggle the clicked category
                })),
              )
            }}
            className="flex items-center hover:bg-purple-300 lg:p-2"
          >
            <div>{category.emoji}</div>
            <div className="hidden font-semibold xl:block">{category.name}</div>

            {category.isOpen ? (
              <MdExpandLess className="ml-2 text-gray-400" />
            ) : (
              <MdExpandMore className="ml-2 text-gray-400" />
            )}
          </button>
          <ul
            className={`${
              category.isOpen ? 'max-h-full' : 'max-h-0'
            } absolute overflow-hidden bg-slate-50 transition dark:bg-gray-800`}
          >
            {category.subcategories.map((sub, idx) => (
              <li key={idx}>
                <Link href={sub.link} locale={locale}>
                  <span
                    onClick={() => {
                      handleLinkClick()
                      setCategories(
                        categories.map((cat) => ({
                          ...cat,
                          isOpen: false,
                        })),
                      ) // Close all categories on link click
                    }}
                    className="flex items-center justify-between p-1 pl-4 text-xl text-purple-800 transition duration-300 ease-in-out hover:bg-purple-200 dark:text-gray-300 dark:hover:text-gray-500"
                  >
                    {sub.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default HeaderNav

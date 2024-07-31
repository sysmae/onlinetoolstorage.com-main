// components/ModalNav.jsx
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

const ModalNav = ({ locale, handleLinkClick }) => {
  const [modalCategories, setModalCategories] = useState([])

  useEffect(() => {
    async function fetchSidebarData() {
      try {
        const res = await fetch(`/locales/${locale}/sidebar.json`)
        const data = await res.json()
        setModalCategories(data.categories)
      } catch (error) {
        console.error('Failed to load sidebar data:', error)
      }
    }

    fetchSidebarData()
  }, [locale])

  return (
    <ul className="mb-20 space-y-1">
      {modalCategories.map((category, index) => (
        <li
          key={index}
          className=" border-b border-gray-300 dark:border-gray-700"
        >
          <button
            aria-label="Toggle Category"
            onClick={() => {
              const isOpen = category.isOpen
              setModalCategories(
                modalCategories.map((cat) => ({
                  ...cat,
                  isOpen: cat.name === category.name ? !isOpen : cat.isOpen,
                })),
              )
            }}
            className="mt-4 flex w-full items-center justify-between bg-purple-700 px-4 py-2 text-left text-2xl text-purple-100 hover:bg-purple-200 hover:text-purple-700 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700 "
          >
            {category.name}
            {category.isOpen ? (
              <MdExpandLess className="text-gray-400 transition duration-300 ease-in-out" />
            ) : (
              <MdExpandMore className="text-gray-400 transition duration-300 ease-in-out" />
            )}
          </button>
          <ul
            className={`${category.isOpen ? 'max-h-full ' : 'max-h-0'} overflow-hidden`}
          >
            {category.subcategories.map((sub, idx) => (
              <li key={idx}>
                <Link href={sub.link} locale={locale}>
                  <span
                    onClick={handleLinkClick}
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

export default ModalNav

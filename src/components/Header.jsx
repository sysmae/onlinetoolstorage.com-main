import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CgMenuRound } from 'react-icons/cg'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

import DarkModeToggle from '@/components/DarkModeToggle'
import SearchComponent from '@components/SearchComponent'

import LanguageSwitcher from '@components/LanguageSwitcher'

Modal.setAppElement('#__next') // Set the root element ID for accessibility

const Nav = ({ categories, setCategories, handleLinkClick }) => {
  return (
    <ul className="space-y-1 mb-20">
      {categories.map((category, index) => (
        <li
          key={index}
          className="border-b border-gray-300 dark:border-gray-700"
        >
          <button
            onClick={() => {
              const isOpen = category.isOpen
              setCategories(
                categories.map((cat) => ({
                  ...cat,
                  isOpen: cat.name === category.name ? !isOpen : cat.isOpen,
                })),
              )
            }}
            className="w-full text-left flex mt-4 justify-between items-center px-4 py-2 text-2xl bg-purple-700 text-purple-100 hover:bg-purple-200 hover:text-purple-700 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none "
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
                <Link href={sub.link}>
                  <span
                    onClick={handleLinkClick}
                    className="text-purple-800 dark:text-gray-300 dark:hover:text-gray-500 hover:bg-purple-200 text-xl flex justify-between items-center p-1 pl-4 transition duration-300 ease-in-out"
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
const NavHover = ({ categories }) => {
  const [hoverIndex, setHoverIndex] = useState(null)

  const handleClick = () => {
    setHoverIndex(null)
  }

  return (
    <ul className="flex flex-row justify-center items-center space-x-2 pt-[80px] font-bold">
      {categories.map((category, index) => (
        <li key={index} className="relative">
          <div
            className="cursor-pointer py-1 bg-indigo-100 dark:bg-gray-700 rounded-lg px-2 hover:bg-purple-500 dark:hover:bg-purple-500"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <span className="lg:hidden px-2">{category.emoji}</span>
            <span className="hidden lg:inline">{category.name}</span>
            {hoverIndex === index && (
              <ul
                className={`absolute z-9999 ${
                  index >= categories.length - 3 ? 'right-0' : 'left-0'
                } bg-white dark:bg-gray-900 shadow-md mt-1 opacity-100 transition-opacity duration-300 ease-in-out`}
              >
                {category.subcategories.map((sub, idx) => (
                  <Link key={idx} href={sub.link} onClick={handleClick}>
                    <li className="pl-4 py-1 pr-3 cursor-pointer hover:bg-gray-100 dark:hover:text-purple-600 whitespace-nowrap">
                      {sub.name}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const router = useRouter()
  const locale = router.locale || 'ko'

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  useEffect(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset'
    document.body.style.paddingRight = isModalOpen
      ? `${scrollBarWidth}px`
      : '0px'

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
  }, [locale, isModalOpen])

  const handleLinkClick = () => {
    if (isModalOpen) {
      toggleModal()
    }
  }

  return (
    <>
      <div className="flex flex-col  items-center justify-between">
        <header className="flex px-4 py-2 bg-gray-50 shadow-md dark:bg-gray-800 fixed top-0 left-0 right-0 z-50 ">
          <Link href="/" passHref>
            <span className="flex items-center space-x-3">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                priority
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/logo.png'
                }}
              />
              <span className="text-xl font-bold hidden md:block">온툴모</span>
            </span>
          </Link>
          <div className="flex-grow mx-2 lg:mx-6">
            <SearchComponent />
          </div>
          <div className="flex items-center space-x-3 md:space-x-6 min-w-[200px]">
            <button
              className="rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 p-2"
              onClick={toggleModal}
            >
              <CgMenuRound size="24px" color="violet" />
            </button>
            <DarkModeToggle />
            <LanguageSwitcher />
          </div>
        </header>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={toggleModal}
          contentLabel="Menu Modal"
          overlayClassName="fixed inset-0 bg-black bg-opacity-90 dark:bg-opacity-95 z-40"
          className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-5 z-50 rounded-t-lg dark:text-white overflow-auto"
          style={{
            content: {
              height: '80vh', // 뷰포트 높이의 80%로 설정
              inset: 'auto 0 0 0', // Top, right, bottom, left
              overflow: 'auto', // 내용이 넘칠 경우 스크롤 허용
            },
          }}
        >
          <button
            onClick={toggleModal}
            className="absolute top-0 right-0 p-2 text-lg font-semibold text-gray-600 bg-purple-300 dark:text-gray-200"
          >
            ✕
          </button>
          <aside className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <div className="h-full overflow-y-auto">
              <Nav
                categories={categories}
                setCategories={setCategories}
                handleLinkClick={handleLinkClick}
              />
            </div>
          </aside>
        </Modal>
        <NavHover categories={categories} />
      </div>
    </>
  )
}

export default Header

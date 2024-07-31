import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Modal from 'react-modal'

import { CgMenuRound } from 'react-icons/cg'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

import DarkModeToggle from '@/components/DarkModeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'

Modal.setAppElement('#__next') // Set the root element ID for accessibility

const ModalNav = ({ categories, setCategories, handleLinkClick }) => {
  const router = useRouter()
  const locale = router.locale || 'ko'
  console.log(locale)

  return (
    <ul className="mb-20 space-y-1">
      {categories.map((category, index) => (
        <li
          key={index}
          className=" border-b border-gray-300 dark:border-gray-700"
        >
          <button
            aria-label="Togggle Category"
            onClick={() => {
              const isOpen = category.isOpen
              setCategories(
                categories.map((cat) => ({
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

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const router = useRouter()
  const ref = useRef()

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
      <div ref={ref} className="flex grow flex-col">
        <header className="inset-x-0 top-0 z-50 flex w-screen flex-wrap items-center justify-between bg-gray-50 p-4 shadow-md dark:bg-gray-800">
          <Link href="/" locale={locale}>
            <div className="flex flex-row items-center justify-center gap-x-2">
              <Image
                className="cursor-pointer dark:hidden"
                src="/logo-header.png"
                alt="Logo"
                objectFit="contain"
                width={40}
                height={40}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/logo.png'
                }}
              />
              <Image
                className="hidden cursor-pointer dark:block"
                src="/logo-header-dark.png"
                alt="Logo"
                objectFit="contain"
                width={40}
                height={40}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/logo.png'
                }}
              />
              {/* <span className="text-sm lg:text-xl  font-bold ">OTM</span> */}
            </div>
          </Link>
          {/* <div className="flex-grow mx-2 lg:mx-6">
            <SearchComponent />
          </div> */}
          <div className="flex flex-row">
            <ul className="flex grow flex-row flex-wrap">
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
                          isOpen:
                            cat.name === category.name ? !cat.isOpen : false, // 다른 카테고리는 닫힘
                        })),
                      )
                    }}
                    className="flex items-center hover:bg-purple-300 lg:p-2"
                  >
                    <div>{category.emoji}</div>

                    {category.isOpen ? (
                      <MdExpandLess className="ml-2  text-gray-400" />
                    ) : (
                      <MdExpandMore className="ml-2  text-gray-400" />
                    )}
                  </button>
                  <ul
                    className={`${
                      category.isOpen ? 'max-h-full' : 'max-h-0'
                    } transition-max-height absolute overflow-hidden bg-slate-50 dark:bg-gray-800 `}
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
                              ) // 링크 클릭 시 모든 카테고리 닫힘
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
          </div>
          <div className="flex min-w-[200px] items-center space-x-3 md:space-x-6">
            <button
              className="rounded-md bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600"
              onClick={toggleModal}
            >
              <CgMenuRound size="24px" />
            </button>
            <DarkModeToggle />
            <LanguageSwitcher />
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={toggleModal}
            contentLabel="Menu Modal"
            overlayClassName="fixed inset-0 bg-black bg-opacity-90 dark:bg-opacity-95 z-40"
            className="absolute inset-x-0 bottom-0 z-50 overflow-auto rounded-t-lg bg-white p-5 dark:bg-gray-800 dark:text-white lg:inset-x-96"
            style={{
              content: {
                height: '80vh', // 뷰포트 높이의 80%로 설정
                overflow: 'auto', // 내용이 넘칠 경우 스크롤 허용
              },
            }}
          >
            <button
              onClick={toggleModal}
              className="absolute right-0 top-0 bg-purple-300 p-2 text-lg font-semibold text-gray-600 dark:text-gray-200"
            >
              ✕
            </button>
            <aside className="w-full bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
              <div className="h-full overflow-y-auto">
                <ModalNav
                  categories={categories}
                  setCategories={setCategories}
                  handleLinkClick={handleLinkClick}
                />
              </div>
            </aside>
          </Modal>
        </header>
      </div>
    </>
  )
}

export default Header

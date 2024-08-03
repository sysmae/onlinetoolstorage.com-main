// components/Header.jsx
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import { CgMenuRound } from 'react-icons/cg'
import HeaderNav from '@/components/HeaderNav'
import DarkModeToggle from '@/components/DarkModeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ModalNav from './ModalNav'

Modal.setAppElement('#__next') // Set the root element ID for accessibility

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
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
  }, [isModalOpen])

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
            </div>
          </Link>

          <div className="flex flex-row">
            <HeaderNav handleLinkClick={handleLinkClick} locale={locale} />
          </div>

          <div className="flex min-w-[200px] items-center space-x-3 pr-4 md:space-x-6">
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
                <ModalNav handleLinkClick={handleLinkClick} locale={locale} />
              </div>
            </aside>
          </Modal>
        </header>
      </div>
    </>
  )
}

export default Header

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CgMenuRound } from 'react-icons/cg'
import Modal from 'react-modal'

import DarkModeToggle from '@/components/DarkModeToggle'
import LanguageSwitcher from '@components/LanguageSwitcher'
import SearchComponent from '@components/SearchComponent'
import SideBar from '@components/SideBar'

Modal.setAppElement('#__next') // ensure this matches the root element ID in your project

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  return (
    <>
      <header className="flex flex-col lg:flex-row items-center justify-between px-4 py-2 bg-gray-50 shadow-md dark:bg-gray-800 fixed top-0 left-0 right-0 z-50">
        <div className="flex w-full lg:w-auto items-center">
          <Link href="/" passHref>
            <span className="flex items-center space-x-3">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                priority
              />
              <span className="text-xl font-bold hidden md:block">온툴모</span>
            </span>
          </Link>
          {/* This makes SearchComponent only visible on screens larger than lg */}
          <div className="flex-grow mx-2 lg:mx-6 hidden lg:flex">
            <SearchComponent />
          </div>
        </div>
        <div className="flex items-center space-x-3 md:space-x-6 min-w-[200px] lg:hidden">
          {/* Button and icons appear only on screens smaller than lg */}
          <button
            className="rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 p-2"
            onClick={toggleModal}
          >
            <CgMenuRound size="24px" />
          </button>
          <DarkModeToggle />
          <LanguageSwitcher />
        </div>
        {/* This makes SearchComponent only visible on screens smaller than lg */}
        <div className="w-full lg:hidden mt-3">
          <SearchComponent />
        </div>
      </header>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Bottom Modal"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-25 z-40"
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-5 z-50 rounded-t-lg dark:text-white overflow-auto"
      >
        <button
          onClick={toggleModal}
          className="absolute top-0 right-0 p-2 text-lg font-semibold text-gray-600 dark:text-gray-200"
        >
          ✕
        </button>
        <SideBar isModal={true} closeModal={toggleModal} />
      </Modal>
    </>
  )
}

export default Header

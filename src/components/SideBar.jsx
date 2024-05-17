// components/SideBar.js
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

function SideBar({ isModal, closeModal }) {
  const [categories, setCategories] = useState([])
  const router = useRouter()
  const locale = router.locale || 'ko'

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
  }, [locale]) // locale이 변경되면 다시 데이터 불러오기

  // const sidebarClass = isModal
  //   ? 'w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
  //   : 'w-full h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white hidden lg:block'
  const sidebarClass = isModal
    ? 'w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
    : 'lg:w-full h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white lg:block hidden'

  // 링크 클릭 시 모달을 닫는 함수
  const handleLinkClick = () => {
    if (isModal && closeModal) {
      closeModal()
    }
  }

  return (
    <aside className={sidebarClass}>
      <div className="h-full overflow-y-auto">
        <ul>
          {categories.map((category) => (
            <Category
              key={category.name}
              category={category}
              handleLinkClick={handleLinkClick}
            />
          ))}
        </ul>
      </div>
    </aside>
  )
}

function Category({ category, handleLinkClick }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <li className="border-b border-gray-300 dark:border-gray-700">
      <button
        onClick={toggle}
        className="w-full text-left flex justify-between items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
      >
        {category.name}
        {isOpen ? <MdExpandLess /> : <MdExpandMore />}
      </button>
      {isOpen && (
        <ul className="pl-4">
          {category.subcategories.map((sub) => (
            <li key={sub.name} className="py-1">
              <Link href={sub.link}>
                <span
                  onClick={handleLinkClick}
                  className="text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 flex justify-between items-center"
                >
                  {sub.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
export default SideBar

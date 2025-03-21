import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { FiSearch, FiX } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

import { Input } from '@/components//ui/input'

function SearchComponent() {
  const { i18n } = useTranslation()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [notFoundMsg, setNotFoundMsg] = useState('')
  const inputRef = useRef(null)
  const locale = i18n.language

  // Custom debounce implementation
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [query])

  useEffect(() => {
    async function fetchData(languageCode, dataType) {
      const response = await fetch(`/locales/${languageCode}/${dataType}.json`)
      const data = await response.json()

      const searchData = Object.keys(data).map((key) => ({
        id: key,
        title: data[key].title,
        url: data[key].url,
      }))

      const fuse = new Fuse(searchData, {
        keys: ['title'],
        includeScore: true,
      })

      return fuse
    }

    async function fetchAllData() {
      const dataTypes = [
        'business',
        'crypto',
        'design',
        'development',
        'finance',
        'general',
        'math-sciences',
        'random',
        'units',
      ]

      const fusePromises = dataTypes.map((dataType) =>
        fetchData(locale, dataType),
      )

      const fuses = await Promise.all(fusePromises)
      return fuses
    }

    fetchAllData().then((fuses) => {
      if (debouncedQuery) {
        const searchResults = fuses.flatMap((fuse) =>
          fuse.search(debouncedQuery).map(({ item }) => item),
        )

        setResults(searchResults)
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    })

    if (locale === 'en') {
      setNotFoundMsg("Can't Find Tool? Request Here!")
    }
    if (locale === 'ko') {
      setNotFoundMsg('필요한 도구를 댓글로 건의하세요!')
    }
  }, [debouncedQuery, locale])

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput)
    if (!showSearchInput) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 100)
    }
  }

  const handleBlur = () => {
    if (query === '') {
      setShowSearchInput(false)
    }
  }

  const handleClear = () => {
    setQuery('')
    setIsOpen(false)
    setShowSearchInput(false)
  }

  const inputClass = showSearchInput
    ? 'pl-10 pr-10 py-2 text-lg focus:outline-bold z-50 dark:bg-gray-800 w-full bg-purple-200'
    : 'pl-10 pr-10 py-2 text-lg w-full focus:outline-bold dark:bg-gray-700 bg-purple-100'

  return (
    <div className="relative w-full">
      <div className={`flex w-full items-center border-b border-gray-300`}>
        <FiSearch
          onClick={toggleSearchInput}
          className="absolute left-0 top-1/2 ml-3 size-5 -translate-y-1/2 cursor-pointer text-gray-400"
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleBlur}
          className={inputClass}
        />
        {query && (
          <FiX
            onClick={handleClear}
            className="absolute right-0 top-1/2 mr-3 size-5 -translate-y-1/2 cursor-pointer text-gray-400"
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-10 z-10 max-h-60 overflow-auto bg-white shadow-lg transition-opacity duration-300 ease-in-out">
          <ul>
            {results.length === 0 && (
              <li className="w-full p-2 text-gray-500 dark:text-gray-400">
                <Link
                  className="hover:text-violet-400"
                  href="/#comments"
                  onClick={handleClear}
                >
                  {notFoundMsg}
                </Link>
              </li>
            )}
            {results.map((page) => (
              <li
                key={page.id}
                className="p-2 hover:bg-purple-100 dark:bg-gray-500 dark:text-gray-100 dark:hover:bg-purple-500"
              >
                <Link
                  onClick={() => {
                    setQuery('')
                    setIsOpen(false)
                    setShowSearchInput(false)
                  }}
                  href={page.url}
                  className="block"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchComponent

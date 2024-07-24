import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { useDebounce } from 'use-debounce'
import { FiSearch, FiX } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

function SearchComponent() {
  const { i18n } = useTranslation()
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 500)
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [showSearchInput, setShowSearchInput] = useState(false)
  const inputRef = useRef(null)
  const locale = i18n.language

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
        'calculator',
        'charmap',
        'convert',
        'crypto',
        'image',
        'network',
        'random',
        'text',
        'time',
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
      <div className={`flex items-center border-b border-gray-300 w-full`}>
        <FiSearch
          onClick={toggleSearchInput}
          className="text-gray-400 w-5 h-5 cursor-pointer absolute left-0 ml-3 transform -translate-y-1/2 top-1/2"
        />
        <input
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
            className="text-gray-400 w-5 h-5 cursor-pointer absolute right-0 mr-3 transform -translate-y-1/2 top-1/2"
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 top-10 bg-white shadow-lg max-h-60 overflow-auto transition-opacity duration-300 ease-in-out">
          <ul>
            {results.length === 0 && (
              <li className="p-2 text-gray-500 dark:text-gray-400 w-full">
                No results found
              </li>
            )}
            {results.map((page) => (
              <li
                key={page.id}
                className="p-2 hover:bg-purple-100 dark:bg-gray-500 dark:hover:bg-purple-500 dark:text-gray-100"
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

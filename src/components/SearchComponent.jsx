import React, { useState, useEffect, useRef } from 'react'
import Fuse from 'fuse.js'
import { useDebounce } from 'use-debounce'
import { FiSearch } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

function SearchComponent() {
  const { i18n } = useTranslation()
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 300)
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
        // description: data[key].description,
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

  const inputClass = showSearchInput
    ? 'py-2 w-[90vw] fixed focus:outline-none z-50'
    : 'pl-10 pr-3 py-2 w-full focus:outline-none'

  return (
    <div className="relative w-full">
      <div className={`flex items-center border-b border-gray-300  w-full`}>
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
          onClick={toggleSearchInput}
          onBlur={handleBlur}
          className={inputClass}
        />
      </div>
      <button
        className="sm:hidden absolute right-3 top-1/2 transform -translate-y-1/2"
        onClick={toggleSearchInput}
      ></button>
      {isOpen && (
        <div className="absolute z-10 top-5  w-[90vw] bg-white shadow-lg max-h-60 overflow-auto transition-opacity duration-300 ease-in-out">
          <ul>
            {results.map((page) => (
              <li key={page.id} className="p-2 hover:bg-gray-100">
                <a href={page.url} className="block">
                  {page.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchComponent

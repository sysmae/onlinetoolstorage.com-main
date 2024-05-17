import React, { useState, useEffect, useRef } from 'react'
import Fuse from 'fuse.js'
import { useDebounce } from 'use-debounce'
import { FiSearch } from 'react-icons/fi'

function SearchComponent() {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 300)
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [showSearchInput, setShowSearchInput] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    async function fetchData(languageCode, dataType) {
      const response = await fetch(`/locales/${languageCode}/${dataType}.json`)
      const data = await response.json()

      const searchData = Object.keys(data).map((key) => ({
        id: key,
        title: data[key].title,
        description: data[key].description,
        url: data[key].url,
      }))

      const fuse = new Fuse(searchData, {
        keys: ['title', 'description'],
        includeScore: true,
      })

      return fuse
    }

    async function fetchAllData() {
      const languageCode = 'ko'
      const cryptoFuse = await fetchData(languageCode, 'crypto')
      const randomFuse = await fetchData(languageCode, 'random')
      const unitsFuse = await fetchData(languageCode, 'units')

      return { cryptoFuse, randomFuse, unitsFuse }
    }

    fetchAllData().then(({ cryptoFuse, randomFuse, unitsFuse }) => {
      if (debouncedQuery) {
        const cryptoResult = cryptoFuse.search(debouncedQuery)
        const randomResult = randomFuse.search(debouncedQuery)
        const unitsResult = unitsFuse.search(debouncedQuery)

        const mergedResults = [
          ...cryptoResult.map(({ item }) => item),
          ...randomResult.map(({ item }) => item),
          ...unitsResult.map(({ item }) => item),
        ]

        setResults(mergedResults)
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    })
  }, [debouncedQuery])

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
    ? 'py-2 w-[90vw] fixed focus:outline-none z-50' // Full width when search input is shown
    : 'pl-10 pr-3 py-2 w-full focus:outline-none' // No width when hidden, hiding the input

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

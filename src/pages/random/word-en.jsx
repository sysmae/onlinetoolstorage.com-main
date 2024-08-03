import React, { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const category = 'random'

function generateRandomName(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function generateMultipleNames(length, count) {
  const names = []
  for (let i = 0; i < count; i++) {
    names.push(generateRandomName(length))
  }
  return names
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [length, setLength] = useState(5) // 기본 이름 길이
  const [count, setCount] = useState(1) // 생성할 이름의 수
  const [names, setNames] = useState([])
  const [toast, setToast] = useState('') // Toast 상태 관리

  const handleGenerate = () => {
    const generatedNames = generateMultipleNames(length, count)
    setNames(generatedNames)
  }

  const handleCopy = (name) => {
    navigator.clipboard.writeText(name)
    setToast(`${name} copied to clipboard!`)
    setTimeout(() => setToast(''), 3000) // Toast 메시지 자동 사라짐
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto max-w-lg px-4 py-8">
        <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
          Random English Word Generator
        </h3>
        <div className="mb-6 space-y-4">
          <label className="block text-gray-700 dark:text-gray-300">
            Length of Words:
            <Input
              type="number"
              value={length}
              onChange={(e) =>
                setLength(Math.max(parseInt(e.target.value, 10) || 1, 1))
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            />
          </label>
          <label className="block text-gray-700 dark:text-gray-300">
            Number of Words to Generate:
            <Input
              type="number"
              value={count}
              onChange={(e) =>
                setCount(Math.max(parseInt(e.target.value, 10) || 1, 1))
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            />
          </label>
        </div>
        <Button
          onClick={handleGenerate}
          className="w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white transition duration-200 ease-in-out hover:bg-blue-600"
        >
          Generate
        </Button>
        <ul className="mt-6 flex flex-wrap gap-4">
          {names.map((name, index) => (
            <li
              key={index}
              className="flex h-12 min-w-[150px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-gray-200 text-center text-xl font-bold text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              onClick={() => handleCopy(name)}
            >
              <span className="truncate">{name}</span>
            </li>
          ))}
        </ul>
        {toast && (
          <div className="fixed bottom-4 right-4 rounded-md bg-green-500 p-3 text-white shadow-lg">
            {toast}
          </div>
        )}
      </div>

      <CustomContent category={category} />
    </>
  )
}

import React, { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'random'

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function Home() {
  const [min, setMin] = useState(1) // 최소값 기본 설정
  const [max, setMax] = useState(10) // 최대값 기본 설정
  const [count, setCount] = useState(1) // 생성할 숫자의 수 기본 설정
  const [numbers, setNumbers] = useState([])

  const handleGenerate = () => {
    const generatedNumbers = Array.from({ length: count }, () =>
      generateRandomNumber(min, max),
    )
    setNumbers(generatedNumbers)
  }
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="mt-4">
        <div className="flex flex-col md:flex-row space-y-2 md:space-x-4 md:space-y-0">
          <label className="flex items-center">
            Min:
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(parseInt(e.target.value, 10))}
              className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="flex items-center">
            Max:
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value, 10))}
              className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="flex items-center">
            Number of Numbers:
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
        </div>

        <button
          onClick={handleGenerate}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate
        </button>

        <ul className="mt-4">
          {numbers.map((number, index) => (
            <li key={index} className="mb-2">
              {number}
            </li>
          ))}
        </ul>
      </div>

      <CustomContent category={category} />
    </>
  )
}

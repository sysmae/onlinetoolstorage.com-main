import React, { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const category = 'random'

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
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
      <div className="flex flex-col items-center p-6 xl:pt-12">
        <div className="mb-6 w-full max-w-sm space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="flex flex-col text-gray-700 dark:text-gray-200">
              Min:
              <Input
                type="number"
                value={min}
                onChange={(e) => setMin(parseInt(e.target.value, 10))}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </label>
            <label className="flex flex-col text-gray-700 dark:text-gray-200">
              Max:
              <Input
                type="number"
                value={max}
                onChange={(e) => setMax(parseInt(e.target.value, 10))}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </label>
            <label className="flex flex-col text-gray-700 dark:text-gray-200">
              Number of Numbers:
              <Input
                type="number"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value, 10))}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </label>
          </div>
          <Button
            onClick={handleGenerate}
            className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Generate
          </Button>
        </div>

        {numbers.length > 0 && (
          <div className="mt-6 w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
            <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-100 dark:text-gray-700">
              Generated Numbers
            </h2>
            <ul className="flex flex-wrap justify-center gap-2">
              {numbers.map((number, index) => (
                <li
                  key={index}
                  className="flex size-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700"
                >
                  {number}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <CustomContent category={category} />
    </>
  )
}

import React, { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button } from '@/components/ui/button'

const category = 'random'

function generateLottoNumbers() {
  let numbers = new Set()
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1)
  }
  return [...numbers].sort((a, b) => a - b)
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
  const [lottoNumbers, setLottoNumbers] = useState([])

  const handleGenerate = () => {
    setLottoNumbers(generateLottoNumbers())
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="mt-8 flex flex-col items-center xl:pt-12">
        <Button
          onClick={handleGenerate}
          className="mb-6 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Generate Numbers
        </Button>
        {lottoNumbers.length > 0 && (
          <div className="mt-6 flex flex-col items-center rounded-lg bg-white p-4 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Generated Numbers
            </h2>
            <ul className="grid grid-cols-3 gap-4">
              {lottoNumbers.map((number, index) => (
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

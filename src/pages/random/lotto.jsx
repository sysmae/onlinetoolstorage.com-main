import React, { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
      <div className="mt-4">
        <button
          onClick={handleGenerate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate
        </button>
        {lottoNumbers.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Generated Number</h2>
            <ul>
              {lottoNumbers.map((number, index) => (
                <li key={index} className="mb-2">
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

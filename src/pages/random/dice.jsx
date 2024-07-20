import React, { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'random'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [result, setResult] = useState('')

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1 // 1부터 6까지의 랜덤 숫자 생성
    setResult(randomNumber)
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">
          Dice Roll Generator: A Simple Tool for Random Results
        </h2>
        <div
          className={`w-24 h-24 flex items-center justify-center rounded-lg bg-white font-bold text-xl shadow-lg border border-gray-300`}
        >
          {result ? result : '-'}
        </div>
        <button
          onClick={rollDice}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-300"
        >
          Roll Dice
        </button>
      </div>
      <CustomContent category={category} />
    </>
  )
}

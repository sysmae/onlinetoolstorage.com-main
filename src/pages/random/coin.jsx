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
  const [flipping, setFlipping] = useState(false)

  const flipCoin = () => {
    setFlipping(true)
    setTimeout(() => {
      const outcomes = ['앞(Front)', '뒤(Back)']
      const randomResult = outcomes[Math.floor(Math.random() * outcomes.length)]
      setResult(randomResult)
      setFlipping(false) // 애니메이션 완료
    }, 1000) // 애니메이션 지속 시간 설정
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Coin Toss</h2>
        <div
          className={`w-24 h-24 flex items-center justify-center rounded-full bg-yellow-400 font-bold text-xl shadow-lg ${flipping ? 'animate-spin' : ''}`}
        >
          {flipping ? '' : result}
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
          onClick={flipCoin}
          disabled={flipping}
        >
          Coin Toss
        </button>
      </div>
      <CustomContent category={category} />
    </>
  )
}

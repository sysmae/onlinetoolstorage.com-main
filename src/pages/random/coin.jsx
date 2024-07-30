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
      <div className="flex h-screen flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">Coin Toss</h2>
        <div
          className={`flex size-24 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold shadow-lg ${flipping ? 'animate-spin' : ''}`}
        >
          {flipping ? '' : result}
        </div>
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white shadow"
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

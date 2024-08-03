import React, { useState } from 'react'
import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button } from '@/components/ui/button'

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
  const [isRolling, setIsRolling] = useState(false)

  const rollDice = () => {
    setIsRolling(true)

    // Simulate rolling effect by toggling the state after a short delay
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1 // 1부터 6까지의 랜덤 숫자 생성
      setResult(randomNumber)
      setIsRolling(false)
    }, 500) // Adjust this duration for how long the rolling effect lasts
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex flex-col items-center justify-center xl:mt-12">
        <h3 className="mb-4 text-2xl font-bold">
          Dice Roll Generator: A Simple Tool for Random Results
        </h3>
        <div
          className={`flex items-center justify-center rounded-lg border border-gray-300 bg-white text-5xl font-bold shadow-lg transition-transform dark:bg-gray-800 ${
            isRolling ? 'animate-roll' : ''
          }`}
          style={{ height: '100px', width: '100px' }} // Adjust size as needed
        >
          {isRolling ? '?' : result || '-'}
        </div>
        <Button onClick={rollDice} className="mt-4">
          Roll Dice
        </Button>
      </div>
      <CustomContent category={category} />
      <style jsx>{`
        @keyframes roll {
          0% {
            transform: rotateX(0deg);
          }
          25% {
            transform: rotateX(90deg);
          }
          50% {
            transform: rotateX(180deg);
          }
          75% {
            transform: rotateX(270deg);
          }
          100% {
            transform: rotateX(360deg);
          }
        }
        .animate-roll {
          animation: roll 0.5s ease-in-out;
        }
      `}</style>
    </>
  )
}

import React, { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'random'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function Home() {
  const [userChoice, setUserChoice] = useState('')
  const [computerChoice, setComputerChoice] = useState('')
  const [result, setResult] = useState('')

  const choices = [
    { name: '가위', emoji: '✌️' },
    { name: '바위', emoji: '✊' },
    { name: '보', emoji: '🖐️' },
  ]

  const playGame = (userChoice) => {
    const randomIndex = Math.floor(Math.random() * choices.length)
    const computerChoice = choices[randomIndex]

    setUserChoice(userChoice.emoji)
    setComputerChoice(computerChoice.emoji)

    determineWinner(userChoice.name, computerChoice.name)
  }

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult('비겼습니다!')
      return
    }

    if (
      (user === '가위' && computer === '보') ||
      (user === '바위' && computer === '가위') ||
      (user === '보' && computer === '바위')
    ) {
      setResult('이겼습니다!')
    } else {
      setResult('졌습니다!')
    }
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Rock Paper Scissors</h2>
        <div className="mb-4">
          {choices.map((choice) => (
            <button
              key={choice.name}
              onClick={() => playGame(choice)}
              className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded m-2"
            >
              {choice.emoji} {choice.name}
            </button>
          ))}
        </div>
        <div>
          <p>Your Choice: {userChoice}</p>
          <p>Computer&apos;s Choice: {computerChoice}</p>
          <p className="text-xl mt-4">{result}</p>
        </div>
      </div>

      <CustomContent category={category} />
    </>
  )
}

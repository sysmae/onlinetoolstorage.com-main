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
      setResult('Draw! 비겼습니다!')
      return
    }

    if (
      (user === '가위' && computer === '보') ||
      (user === '바위' && computer === '가위') ||
      (user === '보' && computer === '바위')
    ) {
      setResult('Win! 이겼습니다!')
    } else {
      setResult('Lose! 졌습니다!')
    }
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto flex flex-col items-center px-4 py-8">
        <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
          Rock Paper Scissors
        </h3>
        <div className="mb-6 flex space-x-4">
          {choices.map((choice) => (
            <Button
              key={choice.name}
              onClick={() => playGame(choice)}
              className="flex size-24 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-2xl font-semibold text-gray-800 transition duration-200 ease-in-out hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            >
              {choice.emoji}
            </Button>
          ))}
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Your Choice:{' '}
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {userChoice}
            </span>
          </p>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Computer&apos;s Choice:{' '}
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {computerChoice}
            </span>
          </p>
          <p className="mt-4 text-xl font-bold">{result}</p>
        </div>
      </div>

      <CustomContent category={category} />
    </>
  )
}

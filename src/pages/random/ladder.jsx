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
  const [participants, setParticipants] = useState('')
  const [results, setResults] = useState([])
  const [isStarted, setIsStarted] = useState(false)
  const startGame = () => {
    const participantList = participants
      .split(',')
      .map((participant) => participant.trim())
    const shuffledParticipants = participantList.sort(() => 0.5 - Math.random())
    setResults(shuffledParticipants)
    setIsStarted(true)
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Ladder</h2>
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="참여자를 쉼표로 구분하여 입력하세요 (예: A, B, C, D)"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={startGame}
        >
          Start
        </button>
        {isStarted && (
          <div>
            <h2 className="font-bold mb-2">Result:</h2>
            <ul>
              {results.map((result, index) => (
                <li key={index}>{`${index + 1}: ${result}`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}

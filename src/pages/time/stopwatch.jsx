import React, { useState, useEffect, useRef, forwardRef } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['time'])), // Ensure 'time' is the correct category for i18n
      locale,
    },
  }
}

export default function Home() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const increment = useRef(null)

  // Start the stopwatch
  const handleStart = () => {
    setIsRunning(true)
    increment.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 10)
    }, 10)
  }

  // Stop the stopwatch
  const handleStop = () => {
    clearInterval(increment.current)
    setIsRunning(false)
  }

  // Reset the stopwatch
  const handleReset = () => {
    clearInterval(increment.current)
    setIsRunning(false)
    setElapsedTime(0)
  }

  // Format the time display
  const formatTime = () => {
    const milliseconds = ('0' + (Math.floor(elapsedTime / 10) % 100)).slice(-2)
    const seconds = ('0' + (Math.floor(elapsedTime / 1000) % 60)).slice(-2)
    const minutes = ('0' + Math.floor(elapsedTime / 60000)).slice(-2)
    return `${minutes}:${seconds}:${milliseconds}`
  }

  return (
    <>
      <CustomSEOContent category="time" />
      <CustomH1Content category="time" />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-4xl font-bold mb-2">Stopwatch</h2>
        <p className="text-2xl font-semibold">{formatTime()}</p>
        <div className="space-x-4 mt-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Stop
          </button>
          <button
            onClick={handleReset}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>
      </div>
      <CustomContent category="time" />
    </>
  )
}

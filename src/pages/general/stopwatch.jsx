import React, { useState, useRef } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Button } from '@/components/ui/button'

const category = 'general'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const startTime = useRef(null)
  const interval = useRef(null)

  // Start the stopwatch
  const handleStart = () => {
    setIsRunning(true)
    startTime.current = Date.now() - elapsedTime
    interval.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime.current)
    }, 10)
  }

  // Stop the stopwatch
  const handleStop = () => {
    clearInterval(interval.current)
    setIsRunning(false)
  }

  // Reset the stopwatch
  const handleReset = () => {
    clearInterval(interval.current)
    setIsRunning(false)
    setElapsedTime(0)
    startTime.current = null
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
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h3 className="mb-2 text-4xl font-bold">Stopwatch</h3>
        <p className="text-2xl font-semibold">{formatTime()}</p>
        <div className="mt-4 space-x-4">
          <Button
            onClick={handleStart}
            disabled={isRunning}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Start
          </Button>
          <Button
            onClick={handleStop}
            disabled={!isRunning}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Stop
          </Button>
          <Button
            onClick={handleReset}
            className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Reset
          </Button>
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}

import React, { useState, useEffect, useRef } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'time'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState(1500) // 25 minutes
  const [enableAlarm, setEnableAlarm] = useState(true)
  const endTime = useRef(null)

  useEffect(() => {
    let interval = null
    if (isActive && !isPaused) {
      const now = Date.now()
      endTime.current = now + secondsLeft * 1000
      interval = setInterval(() => {
        const seconds = Math.round((endTime.current - Date.now()) / 1000)
        if (seconds >= 0) {
          setSecondsLeft(seconds)
        } else {
          clearInterval(interval)
          if (enableAlarm) playAlarm()
          setIsActive(false)
          setIsPaused(true)
        }
      }, 500)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, isPaused, enableAlarm, secondsLeft])

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setIsActive(false)
    setIsPaused(true)
    setSecondsLeft(1500) // Reset the timer back to 25 minutes
  }

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const playAlarm = () => {
    const audio = new Audio('/alarm.mp3') // Ensure this path is correct and the file is served correctly
    audio.play()
  }

  const toggleAlarm = () => {
    setEnableAlarm(!enableAlarm)
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="text-center mt-10">
        <h2 className="text-4xl font-bold mb-4">Pomodoro Timer</h2>
        <p className="text-2xl font-semibold">{formatTime()}</p>
        <div className="space-x-4 mt-4">
          <button
            onClick={handleStart}
            disabled={isActive}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded text-xl disabled:opacity-50"
          >
            Start
          </button>
          <button
            onClick={handlePauseResume}
            disabled={!isActive}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded text-xl disabled:opacity-50 min-w-32"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={handleReset}
            disabled={!isActive}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded text-xl disabled:opacity-50"
          >
            Reset
          </button>
          <button
            onClick={toggleAlarm}
            className={`bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-6 rounded text-xl ${
              enableAlarm ? 'bg-opacity-100' : 'bg-opacity-50'
            }`}
          >
            {enableAlarm ? 'Disable Alarm' : 'Enable Alarm'}
          </button>
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}

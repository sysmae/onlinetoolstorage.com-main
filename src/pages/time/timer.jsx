import React, { useState, useEffect, useRef, forwardRef } from 'react'

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

export const TimeInput = forwardRef(
  ({ value, onChange, placeholder, max }, ref) => (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="text-lg font-semibold text-center">
        {placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}
      </p>
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="mx-2 p-3 text-lg border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
        placeholder={placeholder}
        min="0"
        max={max}
        ref={ref}
      />
    </div>
  ),
)

TimeInput.displayName = 'TimeInput'

export default function Home() {
  const [hours, setHours] = useState(null)
  const [minutes, setMinutes] = useState(null)
  const [seconds, setSeconds] = useState(null)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const endTime = useRef(null)
  const minutesRef = useRef(null)
  const secondsRef = useRef(null)

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        const now = Date.now()
        const seconds = Math.round((endTime.current - now) / 1000)
        if (seconds > 0) {
          setSecondsLeft(seconds)
        } else {
          clearInterval(interval)
          setIsActive(false)
          alert('Time’s up!') // Notify user that time has expired
        }
      }, 500) // Update every 500 milliseconds to check the timer
    }
    return () => clearInterval(interval)
  }, [isActive])

  const handleStart = () => {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
    setSecondsLeft(totalSeconds)
    endTime.current = Date.now() + totalSeconds * 1000
    setIsActive(true)
  }

  const handlePauseResume = () => {
    setIsActive(!isActive)
    if (!isActive) {
      const remainingTime = Math.round((endTime.current - Date.now()) / 1000)
      setSecondsLeft(remainingTime)
      endTime.current = Date.now() + remainingTime * 1000
    }
  }

  const handleReset = () => {
    setIsActive(false)
    setSecondsLeft(0) // Reset seconds left
    setHours(0)
    setMinutes(0)
    setSeconds(0)
  }
  const handleChange = (setter, nextRef) => (e) => {
    const value = e.target.value.replace(/^0+/, '') || '0'
    setter(value)
    if (value.length === 2 && nextRef) {
      nextRef.current.focus()
    }
  }

  const formatTime = () => {
    const h = Math.floor(secondsLeft / 3600)
    const m = Math.floor((secondsLeft % 3600) / 60)
    const s = secondsLeft % 60
    return `${h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
  }

  return (
    <>
      <CustomSEOContent category="time" />
      <CustomH1Content category="time" />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-4xl font-bold">Online Timer</h2>
        <div className="my-4 flex justify-center space-x-3">
          <TimeInput
            value={hours}
            onChange={handleChange(setHours, minutesRef)}
            placeholder="Hours"
            max="99"
            nextInputRef={minutesRef}
          />
          <TimeInput
            value={minutes}
            onChange={handleChange(setMinutes, secondsRef)}
            placeholder="Minutes"
            max="59"
            ref={minutesRef}
          />
          <TimeInput
            value={seconds}
            onChange={handleChange(setSeconds, null)}
            placeholder="Seconds"
            max="59"
            ref={secondsRef}
          />
        </div>
        <p className="text-2xl">{formatTime()}</p>
        <div className="space-x-4 mt-4">
          <button
            onClick={handleStart}
            disabled={isActive}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start
          </button>
          <button
            onClick={handlePauseResume}
            disabled={!isActive}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            {isActive ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>
      </div>
      <CustomContent category="time" />
    </>
  )
}

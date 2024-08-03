import React, { useState, useEffect, useRef, forwardRef } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Input } from '@/components/ui/input'
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

export const TimeInput = forwardRef(
  ({ value, onChange, placeholder, max }, ref) => (
    <div className="flex w-full flex-col items-center justify-center">
      <p className="text-center text-lg font-semibold">
        {placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}
      </p>
      <Input
        type="number"
        value={value}
        onChange={onChange}
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
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const endTime = useRef(null)
  const minutesRef = useRef(null)
  const secondsRef = useRef(null)
  const interval = useRef(null)

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now()
      const seconds = Math.round((endTime.current - now) / 1000)
      if (seconds >= 0) {
        setSecondsLeft(seconds)
      } else {
        clearInterval(interval.current)
        setIsActive(false)
        alert('Time’s up!')
      }
    }

    if (isActive) {
      interval.current = setInterval(updateTimer, 500)
      updateTimer()
    } else {
      clearInterval(interval.current)
    }

    return () => clearInterval(interval.current)
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
    setSecondsLeft(0)
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
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h3 className="text-4xl font-bold">Online Timer</h3>
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
        <div className="mt-4 space-x-4">
          <Button
            onClick={handleStart}
            disabled={isActive}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Start
          </Button>
          <Button
            onClick={handlePauseResume}
            disabled={!isActive}
            className="rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
          >
            {isActive ? 'Pause' : 'Resume'}
          </Button>
          <Button
            onClick={handleReset}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Reset
          </Button>
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}

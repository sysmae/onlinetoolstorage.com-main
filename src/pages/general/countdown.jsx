import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'general'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = targetDate.getTime() - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        const milliseconds = Math.floor((difference % 1000) / 10)
        setTimeLeft({ days, hours, minutes, seconds, milliseconds })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        }) // Reset timer if the countdown is over
      }
    }

    const interval = setInterval(updateTimer, 10) // Update every 10 milliseconds

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="m-10 text-center">
      <h3 className=" mb-6 text-5xl font-bold text-blue-600 dark:text-blue-100">
        Countdown to Event
      </h3>
      <div className="space-y-4 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 p-8 text-4xl font-bold text-white shadow-xl">
        <div className="flex items-center justify-center space-x-2">
          <span className="rounded bg-white px-3 py-1 text-blue-800 shadow">
            {timeLeft.days}
          </span>
          <span>Days</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="rounded bg-white px-3 py-1 text-blue-800 shadow">
            {timeLeft.hours}
          </span>
          <span>Hours</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="rounded bg-white px-3 py-1 text-blue-800 shadow">
            {timeLeft.minutes}
          </span>
          <span>Minutes</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="rounded bg-white px-3 py-1 text-blue-800 shadow">
            {timeLeft.seconds}
          </span>
          <span>Seconds</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="rounded bg-white px-3 py-1 text-blue-800 shadow">
            {timeLeft.milliseconds}
          </span>
          <span>Milliseconds</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DDTHH:mm')) // Managing date as string for input compatibility

  const handleDateChange = (e) => {
    setDate(e.target.value) // Update state
  }

  const targetDate = new Date(date) // Convert string to Date object

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <input
          type="datetime-local"
          value={date}
          onChange={handleDateChange}
          className="block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-lg leading-tight text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <CountdownTimer targetDate={targetDate} />
      </div>
      <CustomContent category={category} />
    </>
  )
}

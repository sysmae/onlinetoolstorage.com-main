import React, { useState } from 'react'
import dayjs from 'dayjs'
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

const TimeUntilEvent = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime()
    const difference = targetDate.getTime() - now

    if (difference > 0) {
      const totalSeconds = Math.floor(difference / 1000)
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const totalHours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)
      return {
        formatted: (
          <>
            <span>{days} Days</span>
            <br />
            <span>{hours} Hours</span>
            <br />
            <span>{minutes} Minutes</span>
            <br />
            <span>{seconds} Seconds</span>
          </>
        ),
        hoursMinutes: `Or: ${totalHours} hours and ${minutes} minutes`, // 새로운 속성 추가
        minSec: `Or: ${Math.floor(totalSeconds / 60)} minutes and ${totalSeconds % 60} seconds`,
        totalSeconds: `Or: ${totalSeconds} seconds`,
      }
    } else {
      return {
        formatted: 'The event has already occurred.',
        hoursMinutes: '',
        totalSeconds: '',
        minSec: '',
        hoursMinutes: '', // 이벤트가 이미 발생한 경우 빈 문자열 반환
      }
    }
  }

  const { formatted, hoursMinutes, totalSeconds, minSec } = calculateTimeLeft() // Destructure for easier use

  return (
    <div className="text-center mt-12 px-6 sm:px-8 lg:px-10">
      <h2 className="text-6xl font-bold text-blue-900 mb-10">
        Time Until Event
      </h2>
      <div className="text-5xl font-bold bg-violet-500 rounded-3xl shadow-2xl p-12 space-y-4">
        <p className="mb-4">{formatted}</p>
        <p className="text-4xl">{hoursMinutes}</p>
        <p className="text-4xl">{minSec}</p>
        <p className="text-4xl">{totalSeconds}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DDTHH:mm'))

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const targetDate = new Date(date) // Convert string to Date object

  return (
    <>
      <CustomSEOContent category="time" />
      <CustomH1Content category="time" />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <input
          type="datetime-local"
          value={date}
          onChange={handleDateChange}
          className="form-input block w-full px-4 py-3 text-lg leading-tight text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <TimeUntilEvent targetDate={targetDate} />
      </div>
      <CustomContent category="time" />
    </>
  )
}

import React, { useState } from 'react'
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
    <div className="mt-12 px-6 text-center sm:px-8 lg:px-10">
      <h2 className="mb-10 text-6xl font-bold text-blue-900">
        Time Until Event
      </h2>
      <div className="space-y-4 rounded-3xl bg-violet-500 p-12 text-5xl font-bold shadow-2xl">
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
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <input
          type="datetime-local"
          value={date}
          onChange={handleDateChange}
          className="form-input block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-lg leading-tight text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <TimeUntilEvent targetDate={targetDate} />
      </div>
      <CustomContent category={category} />
    </>
  )
}

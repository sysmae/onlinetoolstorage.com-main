import React, { useState } from 'react'
import dayjs from 'dayjs'
import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Input } from '@/components/ui/input'

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
            <div>
              {days} <span className="text-lg font-normal">Days</span>
            </div>
            <div>
              {hours} <span className="text-lg font-normal">Hours</span>
            </div>
            <div>
              {minutes} <span className="text-lg font-normal">Minutes</span>
            </div>
            <div>
              {seconds} <span className="text-lg font-normal">Seconds</span>
            </div>
          </>
        ),
        hoursMinutes: `Or: ${totalHours} hours and ${minutes} minutes`,
        minSec: `Or: ${Math.floor(totalSeconds / 60)} minutes and ${totalSeconds % 60} seconds`,
        totalSeconds: `Or: ${totalSeconds} seconds`,
      }
    } else {
      return {
        formatted: 'The event has already occurred.',
        hoursMinutes: '',
        minSec: '',
        totalSeconds: '',
      }
    }
  }

  const { formatted, hoursMinutes, minSec, totalSeconds } = calculateTimeLeft()

  return (
    <div className="mt-12 px-6 text-center sm:px-8 lg:px-10">
      <h3 className="mb-6 text-4xl font-bold text-blue-900 dark:text-blue-200">
        Time Until Event
      </h3>
      <div className="rounded-xl bg-violet-500 p-8 text-white shadow-lg">
        <p className="mb-4 text-3xl">{formatted}</p>
        <p className="text-xl">{hoursMinutes}</p>
        <p className="text-xl">{minSec}</p>
        <p className="text-xl">{totalSeconds}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DDTHH:mm'))

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const targetDate = new Date(date)

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Input
          type="datetime-local"
          value={date}
          onChange={handleDateChange}
          className="mb-6 w-full max-w-xs rounded-lg border border-gray-300 p-3 dark:bg-gray-700 dark:text-gray-200"
        />
        <TimeUntilEvent targetDate={targetDate} />
      </div>
      <CustomContent category={category} />
    </>
  )
}

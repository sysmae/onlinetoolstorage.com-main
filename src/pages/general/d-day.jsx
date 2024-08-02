import { useState } from 'react'
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

export default function Home() {
  const calculateDday = (targetDate) => {
    const now = dayjs()
    const target = dayjs(targetDate)
    const diff = Math.ceil(
      target.diff(now, 'millisecond') / (1000 * 60 * 60 * 24),
    )
    return diff
  }

  const [targetDate, setTargetDate] = useState(dayjs().format('YYYY-MM-DD'))
  const dday = calculateDday(targetDate)

  const handleDateChange = (event) => {
    setTargetDate(event.target.value)
  }

  let ddayText = `D-${dday}`
  if (dday === 0) {
    ddayText = 'D-Day'
  } else if (dday === 1) {
    ddayText = 'D-1'
  } else if (dday < 0) {
    ddayText = `D+${Math.abs(dday)}`
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex min-h-[300px] flex-col items-center justify-center bg-gray-100">
        <h2 className="mb-5 text-2xl font-bold text-gray-800">
          D-Day Calculator (디데이 계산기)
        </h2>
        <input
          type="date"
          value={targetDate}
          onChange={handleDateChange}
          className="mb-5 rounded border border-gray-300 bg-white p-2 text-lg text-gray-800 shadow"
        />
        <p className="text-xl text-gray-700">{ddayText}</p>
      </div>
      <CustomContent category={category} />
    </>
  )
}

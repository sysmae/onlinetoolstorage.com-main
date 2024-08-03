import { useState } from 'react'
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
      <div className="flex flex-col items-center justify-center gap-4  pt-8">
        {/* <input
          type="date"
          value={targetDate}
          onChange={handleDateChange}
          className="mb-5 rounded border border-gray-300 bg-white p-2 text-lg shadow"
        /> */}
        <Input
          type="date"
          value={targetDate}
          onChange={handleDateChange}
          className="mb-5 flex flex-1 rounded border border-gray-300 bg-white p-2 text-lg text-gray-800 shadow"
        />
        <p className="text-2xl">{ddayText}</p>
      </div>
      <CustomContent category={category} />
    </>
  )
}

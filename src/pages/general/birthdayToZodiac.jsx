import { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Button } from '@/components/ui/button'

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

function convertBirthdayToZodiac(month, day) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return '양자리 (Aries)'
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return '황소자리 (Taurus)'
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return '쌍둥이자리 (Gemini)'
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return '게자리 (Cancer)'
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return '사자자리 (Leo)'
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return '처녀자리 (Virgo)'
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return '천칭자리 (Libra)'
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return '전갈자리 (Scorpio)'
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return '사수자리 (Sagittarius)'
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return '염소자리 (Capricorn)'
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return '물병자리 (Aquarius)'
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return '물고기자리 (Pisces)'
  } else {
    return '별자리를 찾을 수 없습니다. (Unable to find zodiac sign)'
  }
}

export default function Home() {
  const [birthday, setBirthday] = useState('')
  const [zodiac, setZodiac] = useState('')

  const handleCalculateZodiac = () => {
    const [year, month, day] = birthday
      .split('-')
      .map((num) => parseInt(num, 10))
    const zodiacSign = convertBirthdayToZodiac(month, day)
    setZodiac(zodiacSign)
  }
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className=" flex flex-col items-center justify-center">
        <div className="flex gap-4 px-4 py-8">
          <Input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-1 dark:text-gray-700"
          />
          <Button onClick={handleCalculateZodiac}>Calculate (계산하기)</Button>
        </div>
        {zodiac && <p className="mt-2 text-3xl">{zodiac}</p>}
      </div>

      <CustomContent category={category} />
    </>
  )
}

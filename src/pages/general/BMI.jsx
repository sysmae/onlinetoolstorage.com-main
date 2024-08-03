import { useState } from 'react'

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

export default function Home() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBMI] = useState('')
  const [status, setStatus] = useState('')

  const calculateBMI = () => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100 // 키를 미터로 변환
      const calculatedBMI = weight / heightInMeters ** 2
      setBMI(calculatedBMI.toFixed(2)) // 소수점 둘째자리까지 반올림
      determineBMIStatus(calculatedBMI) // BMI 상태 결정
    }
  }

  const determineBMIStatus = (bmi) => {
    if (bmi < 18.5) {
      setStatus('저체중')
    } else if (bmi >= 18.5 && bmi < 25) {
      setStatus('정상')
    } else if (bmi >= 25 && bmi < 30) {
      setStatus('과체중')
    } else {
      setStatus('비만')
    }
  }
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="py-8">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height (cm) / 키 (cm)"
            />
            <p>cm</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight (kg) / 체중 (kg)"
            />
            <p>kg</p>
          </div>

          <Button onClick={calculateBMI}>Calculate / 계산하기</Button>
        </div>

        {bmi && (
          <div className="mt-4">
            <p>Your BMI(당신의 BMI): {bmi}</p>
            <p>Weight Status(체중 상태): {status}</p>
          </div>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}

import { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'finance'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [time, setTime] = useState('')
  const [result, setResult] = useState(null)

  const calculateCompoundInterest = (P, r, t) => {
    // P: Principal amount, r: Annual interest rate, t: Time in years
    const amount = P * Math.pow(1 + r / 100, t)
    return amount.toFixed(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!principal || !rate || !time) {
      alert('Please fill all fields')
      return
    }
    const calculatedResult = calculateCompoundInterest(principal, rate, time)
    setResult(calculatedResult)
  }
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex flex-col items-center justify-center xl:pt-12 ">
        <form onSubmit={handleSubmit} className="rounded p-8 shadow-md">
          <div className="mb-4 ">
            <label
              htmlFor="principal"
              className="mb-2 block text-sm font-bold "
            >
              Principal Amount
            </label>
            <Input
              type="number"
              id="principal"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rate" className="mb-2 block text-sm font-bold">
              Annual Interest Rate (%)
            </label>
            <Input
              type="number"
              id="rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="mb-2  block text-sm font-bold">
              Time (years)
            </label>
            <Input
              type="number"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Calculate
          </Button>
          {result && (
            <div className="mt-4">
              <p className="text-lg">
                Calculated Amount:{' '}
                <span className="font-semibold">{result}</span>
              </p>
            </div>
          )}
        </form>
      </div>
      <CustomContent category={category} />
    </>
  )
}

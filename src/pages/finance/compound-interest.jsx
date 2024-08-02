import { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'finance'

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
      <div className="flex min-h-screen flex-col items-center justify-center ">
        <form onSubmit={handleSubmit} className="rounded p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold">
            Compound Interest Calculator
          </h2>
          <div className="mb-4 ">
            <label
              htmlFor="principal"
              className="mb-2 block text-sm font-bold "
            >
              Principal Amount
            </label>
            <input
              type="number"
              id="principal"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rate" className="mb-2 block text-sm font-bold">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              id="rate"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="mb-2  block text-sm font-bold">
              Time (years)
            </label>
            <input
              type="number"
              id="time"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Calculate
          </button>
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

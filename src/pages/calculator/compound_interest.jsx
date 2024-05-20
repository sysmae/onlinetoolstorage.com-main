import { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'calculator'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
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
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <form onSubmit={handleSubmit} className="p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6">
            Compound Interest Calculator
          </h2>
          <div className="mb-4 ">
            <label
              htmlFor="principal"
              className="block text-sm font-bold mb-2 "
            >
              Principal Amount
            </label>
            <input
              type="number"
              id="principal"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rate" className="block text-sm font-bold mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              id="rate"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block  text-sm font-bold mb-2">
              Time (years)
            </label>
            <input
              type="number"
              id="time"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

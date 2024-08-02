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
  const [input, setInput] = useState({
    period: '',
    faceAmount: '',
    effectiveInterestRate: '',
    faceInterestRate: '',
  })
  const [amortizationSchedule, setAmortizationSchedule] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { period, faceAmount, effectiveInterestRate, faceInterestRate } =
      input
    const schedule = calculateAmortizationSchedule(
      parseInt(period, 10),
      parseFloat(faceAmount),
      parseFloat(effectiveInterestRate) / 100,
      parseFloat(faceInterestRate) / 100,
    )
    setAmortizationSchedule(schedule)
  }

  const calculateAmortizationSchedule = (
    period,
    faceAmount,
    effectiveInterestRate,
    faceInterestRate,
  ) => {
    let schedule = []
    let bookValueAtStart = calculateInitialBookValue(
      period,
      faceAmount,
      effectiveInterestRate,
      faceInterestRate,
    ) // 기초장부금액 계산

    for (let year = 1; year <= period; year++) {
      const faceInterest = faceAmount * faceInterestRate // 액면 이자 계산
      const effectiveInterest = bookValueAtStart * effectiveInterestRate // 유효 이자 계산
      const amortization = effectiveInterest - faceInterest // 상각액 계산
      const bookValueAtEnd = bookValueAtStart + amortization // 기말장부금액 계산

      schedule.push({
        year,
        bookValueAtStart: bookValueAtStart.toFixed(2),
        effectiveInterest: effectiveInterest.toFixed(2),
        faceInterest: faceInterest.toFixed(2),
        amortization: amortization.toFixed(2),
        bookValueAtEnd: bookValueAtEnd.toFixed(2),
      })

      bookValueAtStart = bookValueAtEnd // 다음 기간의 기초장부금액 업데이트
    }

    return schedule
  }

  // 기초장부금액 계산 함수
  const calculateInitialBookValue = (
    period,
    faceAmount,
    effectiveInterestRate,
    faceInterestRate,
  ) => {
    let totalPresentValue = 0

    // 각 기간에 대한 액면 이자의 현재 가치를 계산하여 더합니다.
    for (let year = 1; year <= period; year++) {
      const faceInterest = faceAmount * faceInterestRate
      const presentValueOfFaceInterest =
        faceInterest / Math.pow(1 + effectiveInterestRate, year)
      totalPresentValue += presentValueOfFaceInterest
    }

    // 마지막 기간에 대한 액면 금액의 현재 가치를 더합니다.
    const presentValueOfFaceAmount =
      faceAmount / Math.pow(1 + effectiveInterestRate, period)
    totalPresentValue += presentValueOfFaceAmount

    return totalPresentValue
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="mx-auto max-w-4xl py-8">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700">기간 (년)</label>
            <input
              type="number"
              name="period"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={input.period}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">액면 금액</label>
            <input
              type="number"
              name="faceAmount"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={input.faceAmount}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">유효 이자율 (%)</label>
            <input
              type="number"
              name="effectiveInterestRate"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={input.effectiveInterestRate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">액면 이자율 (%)</label>
            <input
              type="number"
              name="faceInterestRate"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={input.faceInterestRate}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            상각표 생성
          </button>
        </form>
        {amortizationSchedule.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">년도</th>
                  <th className="px-4 py-2">기초 장부금액</th>
                  <th className="px-4 py-2">유효 이자</th>
                  <th className="px-4 py-2">액면 이자</th>
                  <th className="px-4 py-2">상각액</th>
                  <th className="px-4 py-2">기말 장부금액</th>
                </tr>
              </thead>
              <tbody>
                {amortizationSchedule.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                  >
                    <td className="border px-4 py-2">{row.year}</td>
                    <td className="border px-4 py-2">{row.bookValueAtStart}</td>
                    <td className="border px-4 py-2">
                      {row.effectiveInterest}
                    </td>
                    <td className="border px-4 py-2">{row.faceInterest}</td>
                    <td className="border px-4 py-2">{row.amortization}</td>
                    <td className="border px-4 py-2">{row.bookValueAtEnd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}

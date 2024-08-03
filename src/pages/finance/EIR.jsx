import { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'finance'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
            <label className="block text-gray-700 dark:text-gray-300">
              기간 (년)
            </label>
            <Input
              type="number"
              name="period"
              value={input.period}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              액면 금액
            </label>
            <Input
              type="number"
              name="faceAmount"
              value={input.faceAmount}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              유효 이자율 (%)
            </label>
            <Input
              type="number"
              name="effectiveInterestRate"
              value={input.effectiveInterestRate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              액면 이자율 (%)
            </label>
            <Input
              type="number"
              name="faceInterestRate"
              value={input.faceInterestRate}
              onChange={handleChange}
            />
          </div>
          <Button type="submit">상각표 생성</Button>
        </form>
        {amortizationSchedule.length > 0 && (
          <div className="overflow-x-auto">
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-2">년도</TableHead>
                  <TableHead className="px-4 py-2">기초 장부금액</TableHead>
                  <TableHead className="px-4 py-2">유효 이자</TableHead>
                  <TableHead className="px-4 py-2">액면 이자</TableHead>
                  <TableHead className="px-4 py-2">상각액</TableHead>
                  <TableHead className="px-4 py-2">기말 장부금액</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {amortizationSchedule.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="border px-4 py-2">
                      {row.year}
                    </TableCell>
                    <TableCell className="border px-4 py-2">
                      {row.bookValueAtStart}
                    </TableCell>
                    <TableCell className="border px-4 py-2">
                      {row.effectiveInterest}
                    </TableCell>
                    <TableCell className="border px-4 py-2">
                      {row.faceInterest}
                    </TableCell>
                    <TableCell className="border px-4 py-2">
                      {row.amortization}
                    </TableCell>
                    <TableCell className="border px-4 py-2">
                      {row.bookValueAtEnd}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}
